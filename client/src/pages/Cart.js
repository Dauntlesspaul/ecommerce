import React, { useEffect, useState } from 'react';
import empty from '../assets/images/empty.png';
import { Link, useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import { Fourstar, Fourhalf, Fivestar, Threestar } from '../components/Svg';
import { ToastContainer } from 'react-toastify';
import DraggableCartButton from '../components/DraggableCartButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

function Cart() {
    const [total, setTotal] = useState(0);;
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const location = useLocation()
    const handleClickOpen = () => {
        setOpen(true);
    };
    

    const handleClose = () => {
        setOpen(false);
    };
    const { cart,  updateCart, removeOne, deleteItem, reduceSize, increaseSize, clearCart} = useOutletContext()

  

    

    useEffect(() => {
        let totalAmount = 0;
        cart.forEach((item) => {
            totalAmount += item.discountprice * item.selected;
        });
        setTotal(totalAmount);
    }, [cart]);

const handleAddToCart = (items)=>{
    updateCart(items)
}

const handleRemoveFromCart = (items)=>{
    removeOne(items)
}

const handleDeleteItem = (items)=>{
    deleteItem(items)
}
const handleReduceSize = (items)=>{
    reduceSize(items)
}
    
const handleIncreaseSize = (items)=>{
    increaseSize(items)
}
const handleClearCart = () =>{
    clearCart()
}
  





    if (cart && cart.length === 0) {
        return (
            <div className='grid place-items-center mb-5'>
                <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center'>
                    <div className="relative z-1 flex items-center justify-center h-full">
                        <h1 className="text-white text-xl md:text-4xl">Shopping Cart</h1>
                    </div>
                </div>
                <img className='mt-5' src={empty} alt="empty_cart" />
                <h2 className='text-lg md:text-2xl font-semibold mt-3'>Cart is empty</h2>
                <h2 className='text-md md:text-xl font-medium mb-3'>No item in Cart, proceed to <Link to="/allproducts"><span className=' text-red-600 text-lg md:text-2xl'>Store</span></Link></h2>
            </div>
        );
    } else {
        return (
            <div className='w-full'>
                <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center'>
                    <div className="relative z-1 flex items-center justify-center h-full">
                        <h1 className="text-white text-xl md:text-4xl">Shopping Cart</h1>
                    </div>
                </div>
                <div className='grid place-items-center  my-7'>
                    <div className='w-full lg:w-8/12  md:flex '>
                        <div className='w-full grid place-items-center md:h-fit '>
                           <div className='text-black place-self-start 2xl:px-16 px-[4%] text-3xl font-bold flex justify-between w-full items-center'> 
                            <h2>Cart <span className=' text-gray-500 text-xl'>{cart.length} ITEMS</span></h2>
                             <span> 
                                 <IconButton
                                    onClick={handleClickOpen} 
                                    >
                                    <DeleteIcon
                                    className=' hover:text-red-700 cursor-pointer'
                                    />
                                    </IconButton>
                                <React.Fragment>
                                <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                >
                                <DialogTitle  sx={{padding: '14px 12px', fontSize: '17px'}} id="alert-dialog-title">
                                    {"Are you sure you want to clear cart ?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button 
                                    variant='contained'
                                    onClick={handleClose}
                                    >Cancel
                                    </Button>
                                    <Button 
                                    sx={{
                                    color: "white",
                                    fontWeight: '700',
                                    backgroundColor: '#EF1F22',
                                    '&:hover':{
                                        backgroundColor: '#ED5D52 '
                                    }
                                    }}
                                    onClick={handleClearCart}
                                    >
                                    Clear Cart
                                    </Button>
                                </DialogActions>
                                </Dialog>
                            </React.Fragment>  
                            </span>
                            </div>
                            {cart.map((selector, i) => {
                                return (
                                    <div key={i} className='w-11/12 max-w-[700px]  p-3 my-2 shadow-md shadow-gray-200 flex'>
                                        <div className=' lg:w-44 lg:h-36 w-28 h-20 mr-3'><img className='w-full h-full' src={selector.imgurl} alt="" /></div>
                                        <div className='flex justify-between w-full'>
                                            <div>
                                                <span className='text-md text-black font-semibold md:text-lg'>{selector.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</span>
                                                {selector.rating === 4 ? <Fourstar styleProp="flex" widthSize="13px" /> :
                                                    selector.rating === 4.5 ? <Fourhalf styleProp="flex" widthSize="13px" /> :
                                                        selector.rating === 5 ? <Fivestar styleProp='flex' widthSize="13px" /> : <Threestar styleProp="flex" widthSize='13px' />}
                                                <span className='text-black font-medium md:text-lg'>Quantity</span>
                                                <div className='flex mb-2 items-center justify-evenly h-8 w-32 bg-gray-50 font-bold text-lg border-2 border-gray-200'>
                                                    <button onClick={() => handleRemoveFromCart({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl })} >-</button>
                                                    <span className='mx-4'>{selector.selected}</span>
                                                    <button onClick={() => handleAddToCart({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl })} >+</button>
                                                </div>
                                                <div className='flex my-2 items-center justify-evenly h-8 w-32 bg-gray-50 font-bold text-lg border-2 border-gray-200'>
                                                    <button onClick={() => handleReduceSize({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl, size: selector.size, sizeIdex: selector.sizeIdex })} >-</button>
                                                    <span className='mx-2 text-sm'>Size {selector.size[selector.sizeIdex]}</span>
                                                    <button onClick={() => handleIncreaseSize({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl, size: selector.size, sizeIdex: selector.sizeIdex })} >+</button>
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-center'>
                                                <span className='text-xs text-gray-500 mt-8'>${selector.discountprice}.00 x {selector.selected}</span>
                                                <span>${selector.discountprice * selector.selected}.00</span>
                                                <Button 
                                                variant='contained'
                                                color='error'
                                                 sx={{
                                                    marginTop: '4px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                 }}
                                                  onClick={() => handleDeleteItem({ brand: selector.brand, units: selector.units, discountprice: selector.discountprice, rating: selector.rating, imgurl: selector.imageurl })}>
                                                  <RemoveShoppingCartOutlinedIcon sx={{fontSize: '17px', marginRight: '3px'}} /> <span className='mt-[3px]'>Remove</span> 
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className='w-full grid place-items-center xl:w-6/12 h-fit'>
                            <div className=' md:px-8 px-6 mt-11 border-2 py-3 shadow-sm shadow-gray-300 border-gray-200 w-11/12 xl:w-full p-2 grid'>
                                <h2 className='text-black text-xl mt-3 md:text-2xl font-semibold'>Order Summary</h2>
                                <p className='flex justify-between  '><span className='md:text-lg'>Item(s)</span><span className='md:text-lg'>Price</span></p>
                                <hr />
                                {
                                    cart.map((items, i)=>{
                                      return  <p key={i} className='flex justify-between my-1'><span>{items.brand} X{items.selected}</span> <span>${items.discountprice}.00 X{items.selected}</span></p>
                                    })
                                }
                                 <hr />
                                <p className='flex justify-between my-1'><span className='md:text-lg'>TOTAL</span><span className='md:text-lg'>${(total).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></p>
                                <Button
                                variant='contained'
                                onClick={()=> navigate('/cart/checkout', { state: { from: location }})}
                                ><CreditScoreOutlinedIcon/> <span className='mt-[2px] ml-2'>Proceed to Checkout</span>
                                </Button>
                            </div>
                           
                            <ToastContainer/>
                        </div>
                    </div>
                </div>
                <DraggableCartButton cart={cart}/>
            </div>
        );
    }
}

export default Cart;
