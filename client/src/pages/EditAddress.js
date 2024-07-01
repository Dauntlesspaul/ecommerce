import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import soundFailUrl from '../assets/sounds/error-2-126514.mp3';
import Box from '@mui/material/Box';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import {customTheme} from '../components/JsonObject';
import JsonObject from '../components/JsonObject';
import createAxiosInstance from '../components/axiosInstance';
import {ToastContainer, toast} from 'react-toastify'
import { Button, } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import CircularIndeterminate from '../components/Loader';
library.add();




const axiosInstance = createAxiosInstance();
const countries = JsonObject()


function EditAddress() {
  const location = useLocation()
  const { addressId } = location.state || {};
  const [data, setData] = useState({})
  const [formData, setFormData] = useState({
    country: null,
    state: '',
    city: '',
    street: '',
    houseno: '',
    zipcode: '',
    phone: ''
  });
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  useEffect(()=>{
    const fetchData = async()=> {
      const response = await axiosInstance.get(`/fetchadrress/?addressId=${addressId}`)
      setFormData(response.data.address)
      setData(response.data.user)
      setLoading(false)
    }
    fetchData()
  }, [addressId])

  const outerTheme = useTheme();
  const soundError = useMemo(() => new Audio(soundFailUrl), []);

  const validateForm = () => {
    const errors = {};
    let hasErrors = false;

    if (!formData.country || formData.country.trim() === '') {
      errors.country = 'Country is required';
      hasErrors = true;
    }
    if (!formData.state || formData.state.trim() === '') {
      errors.state = 'State is required';
      hasErrors = true;
    }
    if (!formData.city || formData.city.trim() === '') {
      errors.city = 'City is required';
      hasErrors = true;
    }
    if (!formData.street || formData.street.trim() === '') {
      errors.street = 'Street Name is required';
      hasErrors = true;
    }
    if (!formData.houseno || formData.houseno.trim() === '') {
      errors.houseno = 'House No is required';
      hasErrors = true;
    }
    if (!formData.zipcode || formData.zipcode.trim() === '') {
      errors.zipcode = 'Zip Code is required';
      hasErrors = true;
    }
    if (!formData.phone || formData.phone.trim() === '') {
      errors.phone = 'Phone is required';
      hasErrors = true;
    }

    setErrors(errors);
    return hasErrors;
  };


  const handleInputChange = (event, newValue, fieldName) => {
    const { name, value } = event.target;
  
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
    if (fieldName === 'country') {
      const selectedCountry = newValue ? newValue.label : '';
  
      setFormData((prevState) => ({
        ...prevState,
        country: selectedCountry,
      }));
    }
    
  };
  

  const handleSubmitEdit = async() =>{
   
    const hasErrors = validateForm();

    if (hasErrors) {
      soundError.play()
      toast.error('Please fill out all required fields');
      return;
    }


    const formDataObject = new FormData()
    formDataObject.append('country', formData.country)
    formDataObject.append('state', formData.state)
    formDataObject.append('city', formData.city)
    formDataObject.append('street', formData.street)
    formDataObject.append('houseno', formData.houseno)
    formDataObject.append('zipcode', formData.zipcode)
    formDataObject.append('phone', formData.phone)

    try{
      setSubmiting(true)
      await axiosInstance.post(`/editaddress/?addressId=${addressId}`, formDataObject)
      setSubmiting(false)
      navigate('/profile/address')
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
              <h1 className="text-white text-xl md:text-4xl">Edit Address</h1>
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
          <h2 className=' text-black text-xl md:text-2xl font-semibold  mb-2'>New Address</h2>
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
                <TextField label="NAME" disabled={true} name='name' value={data.firstname + ' ' + data.lastname}  onChange={handleInputChange} fullWidth />
                <Autocomplete
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  value={countries.find((option) => option.label === formData.country) || null}
                  onChange={(event, newValue) => handleInputChange(event, newValue, 'country')}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="COUNTRY"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                      }}
                      name='country'
                      error={!!errors.country}
                      helperText={errors.country}
                    />
                  )}
                />

                <TextField 
                name='state' 
                value={formData.state}
                onChange={handleInputChange}  
                label="STATE" 
                error={!!errors.state}
                helperText={errors.state}
                fullWidth />
                <TextField 
                name='city' 
                value={formData.city}
                onChange={handleInputChange}  
                label="CITY" 
                error={!!errors.city}
                helperText={errors.city}
                fullWidth />
                </div>
                <div className=' space-y-3 md:space-y-5 w-full'>
                <TextField 
                name='street' 
                value={formData.street}
                onChange={handleInputChange}  
                label="STREET NAME"
                error={!!errors.state}
                helperText={errors.state} 
                fullWidth />
                <TextField 
                name='houseno' 
                value={formData.houseno}
                onChange={handleInputChange} 
                 label="HOUSE NO"
                error={!!errors.houseno}
                helperText={errors.houseno} 
                 fullWidth />
                <TextField 
                name='zipcode' 
                value={formData.zipcode}
                onChange={handleInputChange}  
                label="ZIP CODE"
                error={!!errors.zipcode}
                helperText={errors.zipcode} 
                fullWidth />
                <TextField 
                name='phone' 
                value={formData.phone}
                onChange={handleInputChange} 
                type='phone' 
                label="PHONE"
                error={!!errors.phone}
                helperText={errors.phone} 
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
                {submiting ? <CircularIndeterminate/> : <span>EDIT ADDRESS</span>}
              </button>
              </div>
            </div>
          </div>
          <ToastContainer/>
        </div>
    </>
  );
}

export default EditAddress;
