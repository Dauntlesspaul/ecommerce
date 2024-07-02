import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Logout, Marker, Order, Settings } from '../components/Svg';
import createAxiosInstance from '../components/axiosInstance';
import {formatDate} from '../components/Time'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { deliveryDate5, deliveryDate7, deliveryDate2, deliveryDate1 } from '../components/DeliveryDate';
library.add(faUser);

const axiosInstance = createAxiosInstance();

function MyOrder() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/order-list')
        setData(response.data)
        setLoading(false)
      } catch (error) {
        navigate('/login');
        console.log(error);
      }
    };
    fetchData();
  }, [ navigate]);

  


  const handleLogOut = async () => {
    await axiosInstance.post('/logout');
    setOpen(false);
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="preloader z-50">
        <div>
          <svg
            className="cart"
            role="img"
            aria-label="Shopping cart line animation"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
              <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                <circle cx="43" cy="111" r="13" />
                <circle cx="102" cy="111" r="13" />
              </g>
              <g className="cart__lines" stroke="currentColor">
                <polyline
                  className="cart__top"
                  points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                  strokeDasharray="338 338"
                  strokeDashoffset="-338"
                />
                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx="43"
                    cy="111"
                    r="13"
                    strokeDasharray="81.68 81.68"
                    strokeDashoffset="81.68"
                  />
                </g>
                <g className="cart__wheel2" transform="rotate(90,102,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx="102"
                    cy="111"
                    r="13"
                    strokeDasharray="81.68 81.68"
                    strokeDashoffset="81.68"
                  />
                </g>
              </g>
            </g>
          </svg>
          <p className='text-black font-medium text-lg'>Bringing you the goods…</p>
        </div>
      </div>
    );
  }

  return (
    <>
        <div className="grid place-items-center">
          <div className="relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center">
            <div className="relative z-1 flex items-center justify-center h-full">
              <h1 className="text-white text-xl md:text-4xl">My Profile</h1>
            </div>
          </div>
          <div className="my-5 md:my-11 md:flex w-full md:w-11/12 xl:w-10/12">
            <div className="px-3 md:px-0 flex-grow md:w-1/3 h-fit md:border md:border-slate-300">
               <Link to="/profile">
               <div className="relative w-full h-14 md:h-16 text-black flex items-center shadow-slate-300 shadow-sm px-3  hover:bg-gray-300">
                <div className="absolute inset-x-0 -top-1 h-1 shadow-lg shadow-slate-300"></div>
                <span><FontAwesomeIcon icon="fa-regular fa-user" className="text-black text-xl" /></span>
                <span className="ml-1 font-medium text-lg">Profile</span>
              </div>
              </Link>
              <Link to='/profile/address'>
              <div className="w-full h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-gray-300">
                <span><Marker fillColor="black" w="20" /></span>
                <span className="ml-2 font-medium text-lg">Address</span>
              </div>
              </Link>
              <div className="w-full h-14 md:h-16 text-white flex items-center px-3 shadow-sm shadow-slate-300 bg-gray-800">
              <span><Order fillColor="white" w="20" /></span>
              <span className="ml-1 font-medium text-lg">Orders</span>
              </div>
              <Link to="/profile/passwordmanagement">
              <div className="w-full h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-gray-300">
                <span><Settings fillColor="black" w="20" /></span>
                <span className="ml-1 font-medium text-lg">Password Management</span>
              </div>
              </Link>
              <button onClick={handleClickOpen} className="w-full cursor-pointer h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-red-500">
                <span><Logout fillColor="black" w="20" /></span>
                <span className="ml-1 font-medium text-lg">Log Out</span>
              </button>
              <React.Fragment>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle sx={{padding: '14px 12px', fontSize: '17px'}} id="alert-dialog-title">
                    {"Are you sure you want to logout ?"}
                  </DialogTitle>
                  <DialogActions>
                    <Button 
                     variant='contained'
                    onClick={handleClose}>Cancel</Button>
                    <Button 
                    onClick={handleLogOut} 
                    sx={{
                      color: "white",
                      fontWeight: '700',
                      backgroundColor: 'red',
                      '&:hover':{
                        backgroundColor: '#ED5D52 '
                      }
                    }}
                    >
                      Log out
                      </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </div>
            <div className="my-5 md:my-0 border border-slate-300 shadow-sm shadow-slate-300 mx-3 p-4 md:flex-grow min-h-52 md:w-2/3 relative">
            <h2 className="text-black text-xl md:text-2xl font-semibold my-2">My Orders</h2>
            <hr className="my-3" />
            <div className='space-y-4'>
             {data.length > 0 ? 
              data.map((item, i)=>{
                     const {line1, city, postal_code, state, country}= item.customerDetails.address
                return (<div className='relative p-3 rounded-md shadow-md' key={i}>
                    <div className='flex items-center'><h2 className='font-semibold'>Order ID: <span className='text-[#808080]'>{item.orderId}</span></h2> <span className=' rounded-md p-1 bg-green-600 text-white font-semibold ml-5 text-sm'>{item.paymentStatus === 'paid' && 'Successful'}</span></div>
                    <h2 className='font-semibold'>Customer Name: <span className='font-normal'>{item.customerDetails.name}</span></h2>
                    <h2 className='font-semibold'>Email: <span className='font-normal'>{item.customerDetails.email}</span></h2>
                    <h2 className='font-semibold'>Delivery Status: <span className='text-red-500'>{item.deliveryStatus}</span></h2>
                    <h2 className='font-semibold'>Delivery Date: <span className='font-normal'>{item.totalDetails.amount_shipping / 100 === 0 ? deliveryDate5(item.createdAt) + ` - ` + deliveryDate7(item.createdAt) : item.totalDetails.amount_shipping / 100 === 15 ? deliveryDate1(item.createdAt) : deliveryDate2(item.createdAt)}</span></h2>
                    <div>
                      {
                        item.cart.map((items, i)=>{

                          return (
                            <span key={i}>
                            <div className='flex my-2'>
                            <div className=' shadow-md w-max mr-4'>
                            <img  className='w-32 h-32' src={items.imgurl} alt=''/>
                            </div>
                            <div>
                              {<>
                                <h2>{items.brand}</h2>
                                <p>Price: $ {(Number(items.discountprice)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                                <p>Quantity: {items.selected}</p>
                                <p>Size(s): {items.sizeIndex.map(size=> ' ' + items.size[size]) + ','}</p>
                              </>}
                            </div>
                            </div>
                            </span>
                          )
                        })
                      }
                    </div>
                    <div className='lg:flex w-full lg:justify-between'>
                    <div>
                       <h2><LocationOnOutlinedIcon sx={{fontSize: '17px', marginTop: '-3px'}}/> {`${line1}, ${city}, ${postal_code}, ${state}, ${country}.`}</h2>
                       <h2>
                        <AddIcCallOutlinedIcon sx={{ fontSize: '17px', marginTop: '-3px' }} />
                        {item.customerDetails?.phone
                          ? (String(item.customerDetails.phone)[0] === '0' ? (
                            <> {item.customerDetails.phone}</>
                          ) : (
                            <> +{item.customerDetails.phone}</>
                          ))
                          : 'No phone number available'}
                      </h2>

                       <h2><AccessTimeOutlinedIcon sx={{fontSize: '17px', marginTop: '-3px'}}/> {formatDate(item.createdAt)}</h2>
                    </div>
                    <div className='text-start lg:text-right'>
                    <h2 className='font-semibold'>SubTotal: <span className='font-normal'>${(item.amountSubtotal / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></h2>
                    <h2 className='font-semibold'>Discount: <span className='font-normal'>{item.totalDetails.amount_discount === 0 ? 'N/A' : <>${(item.totalDetails.amount_discount / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + `,` } <br/>{`Coupon code: ` + item.coupon} </>}</span></h2>
                    <h2 className='font-semibold'>Shipping: <span className='font-normal'>{item.totalDetails.amount_shipping / 100 === 0 ? 'Free' : `$` + (item.totalDetails.amount_shipping / 100).toFixed(2)}</span></h2>
                    <h2 className='font-semibold'>Total: <span className='font-normal'>${(item.amountTotal / 100).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></h2>
                    <h2 className='font-semibold'>Payment Method: <span className='font-normal'>{item.paymentMethodTypes[0]}</span></h2>
                    </div>
                    </div>
                </div>)
              })
              :
              <h2 className='text-base md:text-lg text-black'>Your have no ordered item </h2>
             }
            
            </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default MyOrder;
