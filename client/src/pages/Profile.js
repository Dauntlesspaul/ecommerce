import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Logout, Marker, Order, Settings } from '../components/Svg';
import createAxiosInstance from '../components/axiosInstance';
import ProfileUpload from '../components/ProfileUpload';
import CropperComponent from '../components/Cropper';

library.add(faUser);

const axiosInstance = createAxiosInstance();

function Profile() {
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profilePicRemoved, setProfilePicRemoved] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/user-profile');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      navigate('/login');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [profilePicRemoved, navigate])

  const handleProfileUploadClick = () => {
    setPopup(true);
  };

  const handleImageSelect = (selectedImage) => {
    setImage(selectedImage);
  };

  const changeProfilePic = (newFetchedData) => {
    setData((prevData) => ({
      ...prevData,
      profilePicture: newFetchedData.profilePicture
    }));
  };

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
      {!popup ? (
        <div className="grid place-items-center">
          <div className="relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center">
            <div className="relative z-1 flex items-center justify-center h-full">
              <h1 className="text-white text-xl md:text-4xl">My Profile</h1>
            </div>
          </div>
          <div className="my-5 md:my-11 md:flex w-full md:w-11/12 xl:w-10/12">
            <div className="px-3 md:px-0 flex-grow md:w-1/3 md:border md:border-slate-300">
              <div className="w-full h-14 md:h-16 text-white flex items-center px-3 shadow-sm shadow-slate-300 bg-gray-800">
                <span><FontAwesomeIcon icon="fa-regular fa-user" className="text-white text-xl" /></span>
                <span className="ml-2 font-medium text-lg">Profile</span>
              </div>
              <Link to="/profile/address">
              <div className="w-full h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-gray-300">
                <span><Marker fillColor="black" w="20" /></span>
                <span className="ml-1 font-medium text-lg">Address</span>
              </div>
              </Link>
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
              <div onClick={handleClickOpen} className="w-full cursor-pointer h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-red-500">
                <span><Logout fillColor="black" w="20" /></span>
                <span className="ml-1 font-medium text-lg">Log Out</span>
              </div>
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
                    onClick={handleClose}>Cancel
                    </Button>
                    <Button 
                    onClick={handleLogOut} 
                    sx={{
                      color: "white",
                      fontWeight: '700',
                      backgroundColor: '#EF1F22',
                      '&:hover':{
                        backgroundColor: '#ED5D52 '
                      }
                    }}
                    >
                      Log Out
                    </Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </div>
            <div className="my-5 md:my-0 border border-slate-300 shadow-sm shadow-slate-300 mx-3 p-3 md:flex-grow md:w-2/3 relative">
              <h2 className="text-black text-xl md:text-2xl font-semibold my-2">User Details</h2>
              <hr className="my-3" />
              <div className='relative p-3 rounded-md shadow-md'>
              <ProfileUpload 
              setPopup={setPopup} 
              popup={popup} 
              triggerClick={handleProfileUploadClick} 
              onImageSelect={handleImageSelect} 
              profilePicture={data.profilePicture} 
              setProfilePicRemoved={setProfilePicRemoved}/>
              <h2 className="text-black text-lg md:text-xl font-semibold">Personal Information</h2>
              <hr className="my-2" />
              <p className="text-lg md:text-xl"><span className="font-medium">First Name: </span> {data.firstname}</p>
              <p className="text-lg md:text-xl"><span className="font-medium">Last Name: </span>{data.lastname}</p>
              <p className="text-lg md:text-xl"><span className="font-medium">Email: </span>{data.email}</p>
              <p className="text-lg md:text-xl"><span className="font-medium">Phone: </span>{data.phone}</p>
              <div className='w-full mt-10'>
              </div>
              <Button
                variant='contained'
                color='success'
                style={{
                  position: 'absolute',
                  bottom: '10px', 
                  right: '10px',
                  float: 'right' 
                }}
                onClick={()=> navigate('/profile/personal-info')}
              >
               Edit
              </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        image && (
          <div className="fixed inset-0 z-50 flex">
            <CropperComponent setPopup={setPopup} image={image}  setNewData={changeProfilePic} />
          </div>
        )
      )}
    </>
  );
}

export default Profile;
