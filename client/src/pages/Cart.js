import React, { useEffect, useState, useRef } from 'react';
import empty from '../assets/images/empty_cart.svg';
import { Link } from 'react-router-dom';
import { Fourstar, Fourhalf, Fivestar,Threestar } from '../components/Svg';
import { useLocalStorage } from '../components/useLocalStorageHook';
import { ToastContainer, toast } from 'react-toastify';
import soundUrl from '../assets/sounds/90s-game-ui-6-185099.mp3';
import soundFailUrl from '../assets/sounds/error-2-126514.mp3';
import removeUrl from '../assets/sounds/tap-notification-180637.mp3';
import { Tag } from '../components/Svg';
import { RotatingLines } from "react-loader-spinner";

function Cart() {
    const [cart, setCart] = useLocalStorage('cart', []);
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [coupon, setCoupon] = useState('');
    const [valid, setValid] = useState(false);
    const [couponD, setCouponD] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const couponRef = useRef(null);

    useEffect(() => {
        const couponFromLocalStorage = localStorage.getItem('coupon');
        const couponCodeFromLocalStorage = localStorage.getItem('couponcode');
        if (!couponFromLocalStorage && couponCodeFromLocalStorage) {
            localStorage.setItem('coupon', JSON.stringify(false));
            localStorage.setItem('couponcode', JSON.stringify(''));
        } else {
            setCouponD(JSON.parse(couponFromLocalStorage));
            setCouponCode(JSON.parse(couponCodeFromLocalStorage));
        }
    }, []);

    useEffect(() => {
        const store = localStorage.getItem('cart');
        const data = JSON.parse(store);
        setData(data);
    }, [cart]);

    useEffect(() => {
        let totalAmount = 0;
        cart.forEach((item) => {
            totalAmount += item.discountprice * item.selected;
        });
        setTotal(totalAmount);
    }, [cart]);

    const addToCart = (item) => {
        const soundSuccess = new Audio(soundUrl);
        const soundError = new Audio(soundFailUrl);
        const index = cart.findIndex((obj) => obj.brand === item.brand);
        if (index === -1) {
            const newItem = { ...item, selected: 1 };
            setCart([...cart, newItem]);
            toast.success('New item added!');
            soundSuccess.play();
        } else {
            const updatedCart = cart.map((obj, i) =>
                i === index && obj.selected < obj.units
                    ? { ...obj, selected: obj.selected + 1 }
                    : obj
            );
            setCart(updatedCart);
            if (updatedCart[index].selected === updatedCart[index].units) {
                toast.warning('Item maximum quantity reached');
                soundError.play();
            } else {
                toast.info('Item quantity increased');
                soundSuccess.play();
            }
        }
    };

    const increaseSize = (item) => {
        const index = cart.findIndex((obj) => obj.brand === item.brand);
        const updatedCart = cart.map((obj, i) =>
            i === index && obj.sizeIdex < obj.size.length - 1
                ? { ...obj, sizeIdex: obj.sizeIdex + 1 }
                : obj
        );
        setCart(updatedCart);
    };

    const decreaseSize = (item) => {
        const index = cart.findIndex((obj) => obj.brand === item.brand);
        const updatedCart = cart.map((obj, i) =>
            i === index && obj.sizeIdex > 0
                ? { ...obj, sizeIdex: obj.sizeIdex - 1 }
                : obj
        );
        setCart(updatedCart);
    };

    const removeItem = (item) => {
        const removeSound = new Audio(removeUrl);
        const index = cart.findIndex((obj) => obj.brand === item.brand);
        const data = cart;
        data.splice(index, 1);
        setCart([...data]);
        toast.warning('Item removed');
        removeSound.play();
        const store = localStorage.getItem('cart');
        const storeValue = JSON.parse(store);
        if (storeValue.length === 1) {
            localStorage.setItem('coupon', JSON.stringify(false));
            localStorage.setItem('couponcode', JSON.stringify(''));
        }
    };

    const removeFromCart = (item) => {
        const removeSound = new Audio(removeUrl);
        const index = cart.findIndex((obj) => obj.brand === item.brand);
        const updatedCart = cart.map((obj, i) =>
            i === index && obj.selected > 1
                ? { ...obj, selected: obj.selected - 1 }
                : obj
        );
        setCart(updatedCart);
        if (cart[index].selected > 1) {
            toast.info('Item quantity decreased');
            removeSound.play();
        }
    };

    const checkValidity = (code) => {
        const soundError = new Audio(soundFailUrl);
        const soundSuccess = new Audio(soundUrl);
        const check = code.coupon;
        const regex = /^\s*$/;
        if (regex.test(check)) {
            toast.warning('Input a coupon code');
        } else if (check === 'WIT2168S' || check === 'DWITS') {
            setValid(true);
            setTimeout(() => {
                toast.warning('Coupon Code has expired');
                setValid(false);
                setCoupon('');
                soundError.play();
            }, 2000);
        } else if (check === 'DAU456SS' || check === 'DAUNTLESS' || check === 'DP245L') {
            setValid(true);
            setTimeout(() => {
                toast.success('You\'ve won a discount of 10% OFF the total price');
                setValid(false);
                soundSuccess.play();
                localStorage.setItem('coupon', JSON.stringify(true));
                localStorage.setItem('couponcode', JSON.stringify(coupon));
                setCouponCode(coupon);
                setCouponD(true);
                setCoupon('');
            }, 2000);
        } else {
            setValid(true);
            setTimeout(() => {
                toast.warning('Invalid Coupon Code');
                setValid(false);
                setCoupon('');
                soundError.play();
            }, 2000);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            couponRef.current.click();
        }
    };

    if (data && data.length === 0) {
        return (
            <div className='grid place-items-center'>
                <div className='bg-gray-100 shadow-md shadow-gray-300 text-blck text-xl font-bold w-full h-9 lg:h-14 lg:text-2xl grid place-content-center'> Shopping Cart</div>
                <img className='mt-5' src={empty} alt="empty_cart" />
                <h2>Cart is empty</h2>
                <h2>No item in Cart, proceed to <Link><span className=' text-red-600'>Store</span></Link></h2>
            </div>
        );
    } else {
        return (
            <div className='w-full'>
                <div className='bg-gray-100 shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-9 grid lg:h-14 lg:text-3xl place-content-center'> Shopping Cart</div>
                <div className='grid place-items-center lg:px-32 my-7'>
                    <div className='w-full md:flex'>
                        <div className='w-full grid place-items-center md:h-fit '>
                            <h2 className='text-black place-self-start pl-10 text-3xl font-bold'>Cart <span className=' text-gray-500 text-xl'>{data.length} ITEMS</span></h2>
                            {data.map((selector, i) => {
                                return (
                                    <div key={i} className='w-11/12 p-3 my-2 shadow-md shadow-gray-200 bg-gray-50 flex'>
                                        <div className=' lg:w-44 lg:h-36 w-28 h-20 mr-3'><img className='w-full h-full' src={selector.imgurl} alt="" /></div>
                                        <div className='flex justify-between w-full'>
                                            <div>
                                                <span className='text-md text-black font-semibold'>{selector.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</span>
                                                {selector.rating === 'four' ? <Fourstar styleProp="flex" widthSize="13px" /> :
                                                    selector.rating === 'fourhalf' ? <Fourhalf styleProp="flex" widthSize="13px" /> :
                                                    selector.rating === 'five' ? <Fivestar styleProp='flex' widthSize="13px"/> : <Threestar styleProp="flex" widthSize='13px'/> }
                                                <span className='text-black font-medium'>Quantity</span>
                                                <div className='flex mb-2 items-center justify-evenly h-8 w-32 bg-gray-50 font-bold text-lg border-2 border-gray-200'><button onClick={() => removeFromCart({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl })} >-</button><span className='mx-4'>{selector.selected}</span><button onClick={() => addToCart({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl })} >+</button></div>
                                                <div className='flex my-2 items-center justify-evenly h-8 w-32 bg-gray-50 font-bold text-lg border-2 border-gray-200'><button onClick={() => decreaseSize({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl, size: selector.size, sizeIdex: selector.sizeIdex })} >-</button><span className='mx-2 text-sm'>Size {selector.size[selector.sizeIdex]}</span><button onClick={() => increaseSize({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl, size: selector.size, sizeIdex: selector.sizeIdex })} >+</button></div>
                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <span className='text-xs text-gray-500 mt-8'>${selector.discountprice}.00 x {selector.selected}</span>
                                                <span>${selector.discountprice * selector.selected}.00</span>
                                                <button className='mt-2' onClick={() => removeItem({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl })}><span className='text-red-500 hover:text-red-400 font-semibold'>Remove</span></button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <ToastContainer />
                        <div className='w-full grid place-items-center xl:w-6/12 h-fit'>
                            <div className=' bg-gray-50 mt-11 border-2 shadow-md shadow-gray-300 border-gray-200 w-11/12  xl:w-full p-2 grid'>
                                <h2 className='text-black text-xl font-semibold'>Order Summary</h2>
                                <p className='flex justify-between my-2'><span>Price</span><span>${total}.00</span></p>
                                <p className='flex justify-between my-2'><span>Shipping</span><span>${total < 500 ? 50 : total < 1100 ? 100 : total < 3000 ? 150 : 200}.00</span></p>
                                <p className='flex justify-between my-2'><span>Discount</span>{couponD ? <span> 10% OFF </span> : <span> N/A</span>}</p>
                                <p className='flex justify-between my-2'><span>Coupon Code</span><span>{couponCode}</span></p>
                                <hr />
                                <p className='flex justify-between my-2'><span>TOTAL</span><span>${(total + (total < 500 ? 50 : total < 1100 ? 100 : total < 3000 ? 150 : 200) - (couponD ? ((total + (total < 500 ? 50 : total < 1100 ? 100 : total < 3000 ? 150 : 200)) * 10 / 100) : 0)).toFixed(2)}</span></p>
                                <p className='flex justify-between my-2'><span>Delivery Date</span><span></span></p>
                                <button className=' bg-blue-800 hover:bg-blue-700 w-11/12 h-11 text-lg  place-self-center text-white'>Proceed to Checkout</button>
                            </div>
                            <div className=' bg-gray-50 border-2 my-3 py-3 shadow-md shadow-gray-300 border-slate-200 w-11/12 p-2 grid xl:w-full '>
                                <h2 className='text-black text-xl font-semibold'>Coupon</h2>
                                <p className='my-2'>I have few coupon codes for you <span className='font-bold'>"DAUNTLESS", </span><span className='font-bold'>"DAU456SS",</span> <span className='font-bold'>"WIT2168S",</span> <span className='font-bold'>"DWITS",</span> <span className='font-bold'>"DP245L"</span> - Enjoy</p>
                                <div className='flex items-center w-full'>
                                    <input
                                        onKeyDown={handleKeyPress}
                                        type="text"
                                        name="coupon"
                                        value={coupon}
                                        placeholder='Coupon Code'
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            setCoupon(value);
                                        }}
                                        className=' w-full border-2 rounded-none border-slate-200 h-10 text-lg outline-none px-2'
                                    />
                                    <button
                                        ref={couponRef}
                                        onClick={() => checkValidity({ coupon: coupon })}
                                        className='w-12 border-2  border-gray-200  grid place-content-center bg-white h-10 '>
                                        {!valid ? <Tag fillColor="grey" widthSize='w-6 h-full scale-x-[-1]' /> :
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="23"
                                            />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
