import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import TextField from '@mui/material/TextField';
import soundFailUrl from '../assets/sounds/error-2-126514.mp3';
import Box from '@mui/material/Box';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {customTheme} from '../components/JsonObject';
import createAxiosInstance from '../components/axiosInstance';
import {ToastContainer, toast} from 'react-toastify'
import { Button, } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import CircularIndeterminate from '../components/Loader';
library.add();




const axiosInstance = createAxiosInstance();


function PersonalInfo() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    phone: '',
  });
  const navigate = useNavigate();
  
  useEffect(()=>{
    const fetchData = async()=> {
      try{
      const response = await axiosInstance.get(`/user-profile`)
      setFormData(response.data)
      setLoading(false)
      }catch(error){
        console.log(error)
        navigate('/login')
      }
    }
    fetchData()
  }, [navigate])

  const outerTheme = useTheme();
  const soundError = useMemo(() => new Audio(soundFailUrl), []);

  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    if (!formData.firstname || formData.firstname.trim() === '') {
      errors.country = 'Firstname is required';
      hasErrors = true;
    }
    if (!formData.lastname|| formData.lastname.trim() === '') {
      errors.state = 'Lastname is required';
      hasErrors = true;
    }
    
    setErrors(errors);
    return hasErrors;
  };


  const handleInputChange = (event, newValue) => {
    const { name, value } = event.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const handleSubmitEdit = async() =>{
   
    const hasErrors = validateForm();

    if (hasErrors) {
      soundError.play()
      toast.error('Please fill out all required fields');
      return;
    }


    const formDataObject = new FormData()
    let phoneNumber;
    if(formData.phone){
      phoneNumber = formData.phone
    }else{
      phoneNumber = ''
    }
    formDataObject.append('firstname', formData.firstname)
    formDataObject.append('lastname', formData.lastname)
    formDataObject.append('phone', phoneNumber)

    try{
      setSubmiting(true)
      await axiosInstance.post('/editprofile-info', formDataObject)
      setSubmiting(false)
      navigate(-1)
    }catch(error){
      navigate('/login')
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
              <h1 className="text-white text-xl md:text-4xl">Personal Information</h1>
            </div>
          </div>
          <div className='w-full max-w-5xl px-2 md:grid md:place-items-center md:my-4'>
            <div className='w-full '>
            <Button
            sx={{
              backgroundColor: "#E5E6E7 ",
              color: '#2F2F2F',
              marginTop: '20px',
             
            }}
            onClick={()=> navigate(-1)}
            >
              <ArrowBackIos fontSize='small'/> Back
            </Button>
            </div>
          <div className='my-8 border max-w-5xl border-slate-300 w-full py-3 px-4'>
          <h2 className=' text-black text-xl md:text-2xl font-semibold  mb-2'>Personal Information</h2>
          <hr className=' my-4 '/>
         <div className='grid place-items-center'>
            <Box
              sx={{
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              <ThemeProvider theme={customTheme(outerTheme)}>
              <div className='md:flex md:space-x-4'>
                <div className=' space-y-3 md:space-y-5 mb-3 w-full'>
                <TextField 
                name='firstname' 
                value={formData.firstname}
                onChange={handleInputChange}  
                label="FIRSTNAME" 
                error={!!errors.firstname}
                helperText={errors.firstname}
                fullWidth />
                <TextField 
                name='lastname' 
                value={formData.lastname}
                onChange={handleInputChange}  
                label="LASTNAME" 
                error={!!errors.lastname}
                helperText={errors.lastname}
                fullWidth />
                </div>
                <div className=' space-y-3 md:space-y-5 w-full'>
                <TextField 
                name='email'
                value={formData.email} 
                disabled={true}
                label="E-MAIL"
                fullWidth />
                <TextField 
                name='phone' 
                value={formData.phone}
                onChange={handleInputChange} 
                type='phone' 
                label="PHONE"
                fullWidth />
                </div>
                 </div>
              </ThemeProvider>
            </Box>
            </div>
            <div className='w-full flex justify-center'>
              <button 
                onClick={handleSubmitEdit} 
                className='w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-base lg:text-lg my-3 h-12  rounded-sm  flex justify-center items-center'>
                {submiting ? <CircularIndeterminate/> : <span>SAVE</span>}
              </button>
              </div>
            </div>
          </div>
          <ToastContainer/>
        </div>
    </>
  );
}

export default PersonalInfo;
