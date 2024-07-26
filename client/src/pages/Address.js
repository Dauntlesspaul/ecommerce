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
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

library.add(faUser);

const axiosInstance = createAxiosInstance();

function Address() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpenDeleteDialogue = () =>{
    setDeleteOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setDeleteOpen(false)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/useraddress');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        navigate('/login');
        console.log(error);
      }
    };
    fetchData();
  }, [ navigate]);

  
  const deleteAddress = async(key) => {
    setLoading(true)
    setDeleteOpen(false)
    try{

      const response = await axiosInstance.post(`/deleteaddress/?addressId=${key}`)
      setData(response.data)
      setLoading(false)

    }catch(error){

    }

  }

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
            <div className="px-3 md:px-0 flex-grow md:w-1/3 md:border md:border-slate-300">
               <Link to="/profile">
                <div className="relative w-full h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-gray-300">
                <div className="absolute inset-x-0 -top-1 h-1 shadow-lg shadow-slate-300"></div>
                <span><FontAwesomeIcon icon="fa-regular fa-user" className="text-black text-xl" /></span>
                <span className="ml-1 font-medium text-lg">Profile</span>
                </div>
              </Link>
              <div className="w-full h-14 md:h-16 text-white flex items-center px-3 shadow-sm shadow-slate-300 bg-gray-800">
                <span><Marker fillColor="white" w="20" /></span>
                <span className="ml-2 font-medium text-lg">Address</span>
              </div>
              <Link to="/profile/my-order">
              <div className="w-full h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-gray-300">
                <span><Order fillColor="black" w="20" /></span>
                <span className="ml-1 font-medium text-lg">Orders</span>
              </div>
              </Link>
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
                  <DialogTitle sx={{padding: '25px 18px', fontSize: '18px'}} id="alert-dialog-title">
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
            <div className="my-5 md:my-0 border border-slate-300 shadow-sm shadow-slate-300 mx-3 p-3 md:flex-grow min-h-52 md:w-2/3 relative">
              <h2 className="text-black text-xl md:text-2xl font-semibold my-2">My Address</h2>
              <hr className="my-3" />
              
              <div className='relative p-3 rounded-md shadow-md'>
               {data.addresses.length > 0 ? 
               <>
               {
                data.addresses.map((address, i)=>{
                 return(<div key={address._id} className='mb-10 flex'>
                    <div className='flex-1'>
                    <h2 className='text-lg md:text-xl font-semibold'>Address {i + 1} </h2>
                    <p className='text-base md:text-lg'>{address.houseno + ', ' + address.street + ', ' + address.city + ', ' + address.state + ', ' + address.country + '.' }</p>
                    <p className='text-base md:text-lg'><span className='font-semibold'>Zip Code:</span> {address.zipcode}</p>
                    <p className='text-base md:text-lg'><span className='font-semibold'>Contact:</span> {address.phone}</p>
                    </div>
                    <div className='items-end w-fit flex justify-between'>
                      <IconButton
                      onClick={()=>navigate('/profile/address/editaddress', {state:{addressId: address._id}})}
                      >
                      <ModeEditIcon
                       className=' hover:text-green-700 cursor-pointer'
                      />
                      </IconButton>
                      <IconButton
                      onClick={handleOpenDeleteDialogue}
                      >
                      <DeleteIcon
                      className=' hover:text-red-700 cursor-pointer'
                      />
                      </IconButton>

                      <React.Fragment>
                        <Dialog
                          open={deleteOpen}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle sx={{padding: '25px 18px', fontSize: '18px'}} id="alert-dialog-title">
                            {"Are you sure you want to delete address ?"}
                          </DialogTitle>
                          <DialogActions>
                            <Button 
                            variant='contained'
                            onClick={handleClose}>Cancel</Button>
                            <Button 
                            onClick={()=> deleteAddress(address._id)} 
                            sx={{
                              color: "white",
                              fontWeight: '700',
                              backgroundColor: 'red',
                              '&:hover':{
                                backgroundColor: '#ED5D52 '
                              }
                            }}
                            >
                              Delete
                              </Button>
                          </DialogActions>
                        </Dialog>
                      </React.Fragment>
                    </div>
                  </div>
                 )
                })
               }
               </>
               :
              <h2 className="text-black text-lg md:text-xl ">No Address Found</h2>
              }
              </div>
              <div className='my-6 h-4'></div>
               <Button
                variant='contained'
                color='success'
                style={{
                  position: 'absolute',
                  bottom: '10px', 
                  right: '10px', 
                }}
                onClick={()=> navigate('/profile/address/newaddress')}
              >
               + Add Address
              </Button>
            </div>
          </div>
        </div>
    </>
  );
}

export default Address;
