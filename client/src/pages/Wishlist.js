import React from 'react';
import empty from '../assets/images/wishlist.jpg';
import {useState} from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Fourstar, Fourhalf, Fivestar, Threestar } from '../components/Svg';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { HeartIcon } from '@heroicons/react/24/solid';

function Wishlist() {
    
    const [open, setOpen] = useState(false);

    const {wishlist, wishlistClear} = useOutletContext()
    const navigate = useNavigate()
   const handleClickOpen = () => {
    setOpen(true);
};


const handleClose = () => {
    setOpen(false);
};

const handleClearWishlist = () => {
    wishlistClear()
}



   

    if (wishlist && wishlist.length === 0) {
        return (
            <div className='grid place-items-center mb-5'>
                <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center'>
                    <div className="relative z-1 flex items-center justify-center h-full">
                        <h1 className="text-white text-xl md:text-4xl">My Wishlist</h1>
                    </div>
                </div>
                <img className='mt-5 lg:my-6' src={empty} alt="empty_cart" />
                
                
            </div>
        );
    } else {
        return (
            <div className='w-full'>
                <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center'>
                    <div className="relative z-1 flex items-center justify-center h-full">
                        <h1 className="text-white text-xl md:text-4xl"> My Wishlist</h1>
                    </div>
                </div>
                <div className='grid place-items-center my-7'>
                <div className='w-full flex justify-center px-[6%] lg:px-[5%] '>
                <div className=' text-black place-self-start max-w-[1036px] text-3xl font-bold flex justify-between w-full items-center'> 
                            <h2 className='flex items-center'>Wishlist <HeartIcon className="w-6 h-6 text-red-500 animate-blink" /><span className=' text-gray-500 text-xl'>{wishlist.length} ITEMS</span></h2>
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
                                <DialogTitle sx={{padding: '14px 12px', fontSize: '17px'}} id="alert-dialog-title">
                                    {"Are you sure you want to clear wishlist ?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button 
                                     variant='contained'
                                    onClick={handleClose}>Cancel</Button>
                                    <Button 
                                    sx={{
                                    color: "white",
                                    fontWeight: '700',
                                    backgroundColor: '#EF1F22',
                                    '&:hover':{
                                        backgroundColor: '#ED5D52 '
                                    }
                                    }}
                                    onClick={handleClearWishlist}
                                    >
                                    Clear Wishlist
                                    </Button>
                                </DialogActions>
                                </Dialog>
                            </React.Fragment>  
                            </span>
                            </div>
                            </div>

                    <div className='md:flex flex-wrap md:w-11/12 max-w-[1036px]'>
                    {
                     wishlist.map((selector,i)=>{
                        return (
                            <div key={i} className='my-3 md:m-3'>
                                <div className='w-80 max-w-80 h-72 shadow-md shadow-slate-300'>
                                    <img className='w-full h-full' src={selector.imgurl} alt='' />
                                </div>
                                <div className='w-full flex justify-between'>
                                <div>
                                <h2 className="text-black lg:text-xl text-lg font-semibold mt-2">{selector.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</h2>
                                {selector.rating === 4 ? <Fourstar styleProp="flex" widthSize="15px" /> :
                                    selector.rating === 4.5 ? <Fourhalf styleProp="flex" widthSize="15px" /> :
                                    selector.rating === 5 ? <Fivestar styleProp='flex' widthSize="15px" /> : <Threestar styleProp="flex" widthSize='15px' />
                                    }
                                     <span className="font-semibold line-through text-md text-gray-500">${selector.price}.00</span>
                                     <span className="text-black font-semibold text-lg ml-1">${selector.discountprice}.00</span>
                           </div>
                           <div className='flex items-end'>
                            <Button 
                              sx={{
                                color: "white",
                                fontWeight: '700',
                                backgroundColor: 'black ',
                                '&:hover':{
                                    backgroundColor: '#2F2E2E'
                                }
                                }}
                                onClick={()=>navigate(`products/${selector.brand.replace(/[\s]/, '-')}`)}
                                >
                                Checkout
                            </Button>
                           </div>
                           </div>
                            </div>
                        )
                     })

                    }
                  </div>                      
                 
                </div>
            </div>
        );
    }
}

export default Wishlist;
