import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocalStorage, useLocalStorageWishlist } from './useLocalStorageHook';
import soundUrl from '../assets/sounds/success.mp3';
import soundFailUrl from '../assets/sounds/error.mp3';
import removeUrl from '../assets/sounds/tap-notification-180637.mp3';
import like from '../assets/sounds/like.mp3';
import useSoundHook from './useSoundHook';
import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance();

function Layout() {
  const [cart, setCart] = useLocalStorage('cart', []);
  const [wishlist, setWishlist] = useLocalStorageWishlist('wishlist', []);
  const [couponDisplay, setCouponDisplay] = useLocalStorageWishlist('coupon', false);
  const [couponCode, setCouponCode] = useLocalStorageWishlist('couponcode', '');
  const [validating, setValidating] = useState(false);
  const [coupon, setCoupon] = useState('');
  const soundSuccess = useSoundHook(soundUrl);
  const soundError = useSoundHook(soundFailUrl);
  const removeSound = useSoundHook(removeUrl);
  const likeSound = useSoundHook(like);




  const handleUpdateCart = (item) => {
    const index = cart.findIndex((obj) => obj.brand === item.brand);
  
    if (index === -1) {
      const newItem = { 
        ...item, 
        selected: 1,
        sizeIndex: [0] 
      };
      setCart([...cart, newItem]);
      toast.success('New item added to the cart');
      soundSuccess();
    } else {
      const updatedCart = cart.map((obj, i) => {
        if (i === index && obj.selected < obj.units) {

          const updatedSizeIndex = [...obj.sizeIndex, 0]; 
          return { ...obj, selected: obj.selected + 1, sizeIndex: updatedSizeIndex };
        }
        return obj;
      });
      setCart(updatedCart);
      if (updatedCart[index].selected === updatedCart[index].units) {
        soundError();
        toast.error('Maximum quantity reached');
      } else {
        toast.info('Item quantity increased');
        soundSuccess();
      }
    }
  };
  
  

  const handleUpdateWishlist = (item) => {
    const index = wishlist.findIndex((obj) => obj.brand === item.brand);

    if (index === -1) {
      const newItem = { ...item };
      setWishlist([...wishlist, newItem]);
      likeSound();
    } else {
      const updatedWishlist = wishlist.filter((obj) => obj.brand !== item.brand);
      setWishlist(updatedWishlist);
      likeSound();
    }
  };

  const handleRemoveFromCart = (item) => {
    const index = cart.findIndex((obj) => obj.brand === item.brand);
  
    if (index !== -1) {
      const updatedCart = cart.map((obj, i) => {
        if (i === index && obj.selected > 1) {
          const updatedSizeIndex = obj.sizeIndex.slice(0, -1);
          return { ...obj, selected: obj.selected - 1, sizeIndex: updatedSizeIndex };
        }
        return obj;
      });
  
      setCart(updatedCart);
  
      if (updatedCart[index].selected > 1) {
        toast.info('Item quantity decreased');
        removeSound();
      }
    }
  };
  

  const handleDeleteItem = (item) => {
    if (cart.length === 1) {
      setCouponDisplay(false);
      setCouponCode('');
    }
    const index = cart.findIndex((obj) => obj.brand === item.brand);
    const data = cart;
    data.splice(index, 1);
    setCart([...data]);
    toast.info('Item removed');
    removeSound();
  };

  const handleIncreaseSize = (item, sizeIndex) => {
    const updatedCart = cart.map((obj) =>
      obj.brand === item.brand
        ? {
            ...obj,
            sizeIndex: obj.sizeIndex.map((idx, idxIndex) =>
              idxIndex === sizeIndex ? Math.min(idx + 1, obj.size.length - 1) : idx
            ),
          }
        : obj
    );
    setCart(updatedCart);
  };
  
  const handleReduceSize = (item, sizeIndex) => {
    const updatedCart = cart.map((obj) =>
      obj.brand === item.brand
        ? {
            ...obj,
            sizeIndex: obj.sizeIndex.map((idx, idxIndex) =>
              idxIndex === sizeIndex ? Math.max(idx - 1, 0) : idx
            ),
          }
        : obj
    );
    setCart(updatedCart);
  };

  const handleClearCart = () => {
    setCart([]);
    setCouponDisplay(false);
    setCouponCode('');
    removeSound();
  };

  const handleWishlistClear = () => {
    setWishlist([]);
    removeSound();
  };

  const checkValidity = async (code) => {
    setValidating(true);
    const check = code.trim();
    const regex = /^\s*$/;
    if (regex.test(check)) {
      toast.warning('Input a coupon code');
      soundError();
      setValidating(false);
      return;
    }
    try {
      const response = await axiosInstance.get(`/validate-coupon/?code=${check}`);
      setValidating(false);
      if (response.data.result === 'expired') {
        toast.error(response.data.message);
        soundError();
      } else if (response.data.result === 'success') {
        toast.success(response.data.message);
        soundSuccess();
        setCouponDisplay(true);
        setCouponCode(code);
      } else {
        toast.error(response.data.message);
        soundError();
      }
      setCoupon('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-white w-full'>
      <Header cartCount={cart.length} wishlistCount={wishlist.length} />
      <Outlet
        context={{
          validating,
          handleValidate: checkValidity,
          couponCode,
          couponDisplay,
          cart,
          toast,
          wishlist,
          coupon,
          removeSound,
          soundError,
          soundSuccess,
          setCoupon,
          updateCart: handleUpdateCart,
          removeOne: handleRemoveFromCart,
          deleteItem: handleDeleteItem,
          reduceSize: handleReduceSize,
          increaseSize: handleIncreaseSize,
          wishList: handleUpdateWishlist,
          clearCart: handleClearCart,
          wishlistClear: handleWishlistClear,
        }}
      />
      <Footer toast={toast} soundSuccess={soundSuccess} />
    </div>
  );
}

export default Layout;
