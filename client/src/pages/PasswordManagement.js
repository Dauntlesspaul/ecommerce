import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useOutletContext } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import createAxiosInstance from '../components/axiosInstance';
import { Logout, Marker, Order, Settings } from '../components/Svg';
import { FormHelperText, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {ToastContainer, toast} from 'react-toastify'
import { styled } from '@mui/material/styles';
import CircularIndeterminate from '../components/Loader';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

library.add(faUser);

const CustomFormControl = styled(FormControl)(({ theme }) => ({
  margin: '12px 0',
  width: '100%',
  '@media (min-width: 1480px)': {
    width: '32%',
    margin: '4px'
  },
  '& .MuiInputLabel-root': {
    color: 'gray',
    '&.Mui-focused': { color: 'black' }, 
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7', 
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2', 
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black',
    },
  },
  '& .MuiInputBase-input': {
    color: 'black', 
  },
}));

const axiosInstance = createAxiosInstance();

function PasswordManagement() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
   currentPassword: '',
   newPassword: '',
   confirmPassword: ''
  })
  const [newFormData, setNewFormData] = useState({
    setNewPassword: '',
    confirmNewPassword: ''
   })
  const [errors, setErrors] = useState({})
  const [newerrors, setNewErrors] = useState({})
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const {soundSuccess, soundError} = useOutletContext()
  const [incPassword, setIncPassword] = useState(true)
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
         const response = await axiosInstance.get('/passwordcheck');
        setLoading(false);
        if(response.data.message === 'No password'){
          setIncPassword(false)
        }
      } catch (error) {
        navigate('/login');
        console.log(error);
      }
    };
    fetchData();
  }, [navigate]);

  const handleChange =  (event) => {
   const {name, value} = event.target
   setFormData((prevData)=>{
   return  {
      ...prevData,
      [name]: value
    }
   })
  };

  const handleSetChange =  (event) => {
   
    const {name, value} = event.target
    setNewFormData((prevData)=>{
    return  {
       ...prevData,
       [name]: value
     }
    })
   };


  const handleLogOut = async () => {
    await axiosInstance.post('/logout');
    setOpen(false);
    navigate('/login');
  };

  const validateForm = () => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%*]{6,}$/;
    const errors = {};
    let hasErrors = false;
    if (!formData.currentPassword || formData.currentPassword.trim() === '') {
      errors.currentPassword = 'current password is required';
      hasErrors = true;
    }
    if (!formData.newPassword || formData.newPassword.trim() === '') {
      errors.newPassword = 'new password is required';
      hasErrors = true;
    }else if(!passwordRegex.test(formData.newPassword.trim()) ){
      errors.newPassword = 'The password must be a minimum of six characters long and can only contain the following special characters: !@#$%*';
      hasErrors = true;
    }
    if (!formData.confirmPassword|| formData.confirmPassword.trim() === '') {
      errors.confirmPassword = 'confirm password is required';
      hasErrors = true;
    }else if(formData.confirmPassword !== formData.newPassword){
      errors.confirmPassword = 'Passwords do not match. Please re-enter';
      hasErrors = true;
    }

    setErrors(errors);
    return hasErrors;
  };

  const newvalidateForm = () => {
    const passwordRegex = /^[a-zA-Z0-9!@#$%*]{6,}$/;
    const newerrors = {};
    let hasErrors = false;
    if (!newFormData.setNewPassword || newFormData.setNewPassword.trim() === '') {
      newerrors.setNewPassword = ' password is required';
      hasErrors = true;
    }else if(!passwordRegex.test(newFormData.setNewPassword.trim()) ){
      newerrors.setNewPassword = 'The password must be a minimum of six characters long and can only contain the following special characters: !@#$%*';
      hasErrors = true;
    }
    if (!newFormData.confirmNewPassword|| newFormData.confirmNewPassword.trim() === '') {
      newerrors.confirmNewPassword = 'confirm password is required';
      hasErrors = true;
    }else if(newFormData.confirmNewPassword !== newFormData.setNewPassword){
      newerrors.confirmNewPassword = 'Passwords do not match. Please re-enter';
      hasErrors = true;
    }

    setNewErrors(newerrors);
    return hasErrors;
  };

  const resetNewForm = () => {
    const reset ={
      setNewPassword: '',
      confirmNewPassword: '',
    }
    setNewFormData(reset)
    setNewErrors({})
   } 


 const resetForm = () => {
  const reset ={
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  setFormData(reset)
  setErrors({})
 } 

const handleSubmit = async()=>{
  const hasErrors = validateForm()

  if(hasErrors){
    soundError()
    return;
  }

   const formDataObject = new FormData()
   formDataObject.append('currentPassword', formData.currentPassword)
   formDataObject.append('newPassword', formData.newPassword)
   setSubmiting(true)
   try{
    
    const response = await axiosInstance.post('/changepassword', formDataObject)
    setSubmiting(false)
    resetForm()
    soundSuccess()
    toast.success(response.data.message)
   }catch(error){

    toast.error('Incorrect Current Password')
    soundError()
    setSubmiting(false)
    console.log(error)
   }
}

const handleNewSubmit = async()=>{
  const hasErrors = newvalidateForm()

  if(hasErrors){
    soundError.play()
    return;
  }

   const formDataObject = new FormData()
   formDataObject.append('newPassword', newFormData.setNewPassword)
   formDataObject.append('confirmPassword', newFormData.confirmNewPassword)
   setSubmiting(true)
   try{
    
    const response = await axiosInstance.post('/setpassword', formDataObject)
    setSubmiting(false)
    resetNewForm()
    soundSuccess()
    toast.success(response.data.message)
   }catch(error){

    toast.error('Failed to save new Password')
    soundError()
    setSubmiting(false)
    console.log(error)
   }
}


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
          <p className="text-black font-medium text-lg">Bringing you the goods…</p>
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
                <span>
                  <FontAwesomeIcon icon="fa-regular fa-user" className="text-black text-xl" />
                </span>
                <span className="ml-1 font-medium text-lg">Profile</span>
              </div>
            </Link>
            <Link to="/profile/address">
              <div className="w-full h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-gray-300">
                <span>
                  <Marker fillColor="black" w="20" />
                </span>
                <span className="ml-1 font-medium text-lg">Address</span>
              </div>
            </Link>
            <Link to="/profile/my-order">
            <div className="w-full h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-gray-300">
              <span>
                <Order fillColor="black" w="20" />
              </span>
              <span className="ml-1 font-medium text-lg">Orders</span>
            </div>
            </Link>
            <div className="w-full h-14 md:h-16 text-white flex items-center px-3 shadow-sm shadow-slate-300 bg-gray-800">
              <span>
                <Settings fillColor="white" w="20" />
              </span>
              <span className="ml-2 font-medium text-lg">Password Management</span>
            </div>
            <button
              onClick={handleClickOpen}
              className="w-full h-14 md:h-16 text-black flex items-center px-3 shadow-sm shadow-slate-300 hover:bg-red-500"
            >
              <span>
                <Logout fillColor="black" w="20" />
              </span>
              <span className="ml-1 font-medium text-lg">Log Out</span>
            </button>
            <React.Fragment>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle sx={{padding: '25px 18px', fontSize: '18px'}} id="alert-dialog-title">{"Are you sure you want to logout ?"}</DialogTitle>
                <DialogActions>
                  <Button
                    variant='contained'
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleLogOut}
                    sx={{
                      color: 'white',
                      fontWeight: '700',
                      backgroundColor: 'red',
                      '&:hover': {
                        backgroundColor: '#ED5D52 ',
                      },
                    }}
                  >
                    Log out
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </div>
          <div className="my-5 md:my-0 border border-slate-300 shadow-sm shadow-slate-300 mx-3 p-3 md:flex-grow min-h-52 md:w-2/3 relative">
            <h2 className="text-black text-xl md:text-2xl font-semibold my-2">Security</h2>
            <hr className="my-3" />
            {incPassword ? 
           <> <h2 className="text-black text-lg md:text-xl my-3 font-semibold ">Change Password</h2>
            <div className='relative p-3 rounded-md shadow-md'>
              <div>
              <CustomFormControl variant="outlined">
                <InputLabel htmlFor="current-password">Current Password</InputLabel>
                <OutlinedInput
                  id="current-password"
                  name='currentPassword'
                  value={formData.currentPassword}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  error={!!errors.currentPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Current Password"
                />
                <FormHelperText style={{ color : 'red'}} >
                  {!!errors.currentPassword && errors.currentPassword }
                </FormHelperText>
              </CustomFormControl>
              <CustomFormControl variant="outlined">
                <InputLabel htmlFor="new-password">New Password</InputLabel>
                <OutlinedInput
                  id="new-password"
                  name='newPassword'
                  value={formData.newPassword}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  error={!!errors.newPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"
                />
                <FormHelperText style={{ color : 'red'}} >
                  {!!errors.newPassword && errors.newPassword }
                </FormHelperText>
              </CustomFormControl>
              <CustomFormControl variant="outlined">
                <InputLabel htmlFor="confirm-new-password">Confirm New Password</InputLabel>
                <OutlinedInput
                  id="confirm-new-password"
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm New Password"
                />
                <FormHelperText style={{ color : 'red'}} >
                  {!!errors.confirmPassword && errors.confirmPassword }
                </FormHelperText>
              </CustomFormControl>
            </div>
            <div className='w-full flex justify-center'>
              <button 
              onClick={handleSubmit}
                className='w-full max-w-[620px] mt-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-base lg:text-lg my-3 h-12  rounded-md flex justify-center items-center'>
                {submiting ? <CircularIndeterminate/> : <span>SAVE CHANGES</span>}
              </button>
              </div>
              </div>
              </> :
             <><span className='flex space-x-1'> <WarningAmberIcon/> <h2 className='text-black text-lg md:text-xl font-medium '> No maunual password assosiated with this account </h2> </span>
              <h2 className='text-black text-lg md:text-xl my-2 '>Create a login password</h2>
              <div >
              <CustomFormControl variant="outlined">
                <InputLabel htmlFor="current-password">Set New Password</InputLabel>
                <OutlinedInput
                  id="set-new-password"
                  name='setNewPassword'
                  value={newFormData.setNewPassword}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleSetChange}
                  error={!!newerrors.setNewPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Set New Password"
                />
                <FormHelperText style={{ color : 'red'}} >
                  {!!newerrors.setNewPassword && newerrors.setNewPassword }
                </FormHelperText>
              </CustomFormControl>
              <CustomFormControl variant="outlined">
                <InputLabel htmlFor="new-password"> Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirm-new-password"
                  name='confirmNewPassword'
                  value={newFormData.confirmNewPassword}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleSetChange}
                  error={!!newerrors.confirmNewPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                <FormHelperText style={{ color : 'red'}} >
                  {!!newerrors.confirmNewPassword && newerrors.confirmNewPassword }
                </FormHelperText>
              </CustomFormControl>
              </div>
              <div className='w-full xl:justify-start flex justify-center'>
              <button 
              onClick={handleNewSubmit}
                className='w-full  mt-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-base lg:text-lg my-3 h-12  rounded-md flex justify-center items-center'>
                {submiting ? <CircularIndeterminate/> : <span>SET PASSWORD</span>}
              </button>
              </div>
            </>}
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}

export default PasswordManagement;
