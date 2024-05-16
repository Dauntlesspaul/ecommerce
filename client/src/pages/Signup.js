import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import googleIcon from '../assets/images/google.png';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Envelop } from '../components/Svg';
const axiosInstance = axios.create({
    baseURL: 'http://172.20.10.9:8000', 
    headers: {
      'Content-Type': 'application/json', 
    }
  })
function Signup() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

   const formRef = useRef()
   const verifyRef = useRef()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        const nameRegex = /^[a-zA-Z]{2,}$/;
        const emailRegex = /^[a-zA-Z0-9_%-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
        const passwordRegex = /^[a-zA-Z0-9!@#$%*]{6,}$/;

        let errorMessage = '';

        switch (fieldName) {
            case 'firstname':
                errorMessage = nameRegex.test(value) ? '' : 'The first name must have a minimum of two letters and cannot contain any characters';
                setErrors({ ...errors, firstname: errorMessage });
                break;
            case 'lastname':
                errorMessage = nameRegex.test(value) ? '' : 'The last name must have a minimum of two letters and cannot contain any characters';
                setErrors({ ...errors, lastname: errorMessage });
                break;
            case 'email':
                errorMessage = emailRegex.test(value) ? '' : 'Please enter a valid email address';
                setErrors({ ...errors, email: errorMessage });
                break;
            case 'password':
                errorMessage = passwordRegex.test(value) ? '' : 'The password must be a minimum of six characters long and can only contain the following special characters: !@#$%*';
                setErrors({ ...errors, password: errorMessage });
                break;
            default:
                break;
        }
    };


    const handleSubmit = async(event) => {
        event.preventDefault();

        const nameRegex = /\S+/;
        const emailRegex = /\S+/;
        const passwordRegex = /\S+/;

        let newErrors = {};

        if (!nameRegex.test(formData.firstname)) {
            newErrors = { ...newErrors, firstname: 'This field is required' };
        } else {
            newErrors = { ...newErrors, firstname: '' };
        }

        if (!nameRegex.test(formData.lastname)) {
            newErrors = { ...newErrors, lastname: 'This field is required' };
        } else {
            newErrors = { ...newErrors, lastname: '' };
        }

        if (!emailRegex.test(formData.email)) {
            newErrors = { ...newErrors, email: 'This field is required' };
        } else {
            newErrors = { ...newErrors, email: '' };
        }

        if (!passwordRegex.test(formData.password)) {
            newErrors = { ...newErrors, password: 'This field is required' };
        } else {
            newErrors = { ...newErrors, password: '' };
        }

        setErrors(newErrors);

        const hasNoErrors = Object.values(newErrors).every(error => error === '');
        
        if (hasNoErrors) {
            const formDataObject = new FormData();
            formDataObject.append('firstname', formData.firstname)
            formDataObject.append('lastname', formData.lastname)
            formDataObject.append('email', formData.email)
            formDataObject.append('password', formData.password)
            try{
                const response = await axiosInstance.post('/signup', formDataObject)
                console.log(response.data.message)
                formRef.current.style.display ='none'
                verifyRef.current.style.display ='block'
                
            }catch(error){
               console.error(error)
               newErrors = {...newErrors, email: error.response.data.message}
               setErrors(newErrors)
            }
        }
    };

    return (
        <div className='grid place-items-center h-full'>
            <div className='bg-gray-100 shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-9 lg:h-14 lg:text-2xl grid place-content-center mb-5'>Sign Up</div>
            <div className='w-10/12 md:w-[550px] md:my-6'>
                <div className='w-full relative mt-16 pb-9 shadow-md shadow-gray-400 bg-gray-200 grid justify-items-center rounded-xl box-border'>
                    <div className='w-20 h-20 rounded-full bg-stone-900 flex justify-center items-center absolute -top-10'>
                        <FontAwesomeIcon icon={faUser} className='text-white text-4xl' />
                    </div>
                    <div ref={formRef} className='w-11/12 mt-10'>
                        <h2 className='md:text-2xl font-semibold text-lg text-center my-2'>Create an Account</h2>
                        <form className='flex flex-col h-fit space-y-3 justify-evenly' onSubmit={handleSubmit}>
                            <label className='block max-w-full' htmlFor='firstname'>
                                <input
                                    type='text'
                                    id='firstname'
                                    name='firstname'
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder='FIRST NAME'
                                    className='rounded-none focus:outline outline-black outline-[1px] md:h-11 md:text-lg px-2 h-9 w-full'
                                />
                            </label>
                            <span className='text-red-500 text-sm'>{errors.firstname}</span>
                            <label className='block max-w-full' htmlFor='lastname'>
                                <input
                                    type='text'
                                    id='lasttname'
                                    name='lastname'
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder='LAST NAME'
                                    className='rounded-none focus:outline outline-black outline-[1px] md:h-11 md:text-lg px-2 h-9 w-full'
                                />
                            </label>
                            <span className='text-red-500 text-sm'>{errors.lastname}</span>
                            <label className='block max-w-full' htmlFor='email'>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder='E-MAIL'
                                    className='rounded-none focus:outline outline-black outline-[1px] md:h-11 md:text-lg px-2 h-9 w-full'
                                />
                            </label>
                            <span className='text-red-500 text-sm'>{errors.email}</span>
                            <label className='block max-w-full' htmlFor='password'>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder='PASSWORD'
                                    className='rounded-none focus:outline outline-black outline-[1px] md:h-11 md:text-lg px-2 h-9 w-full'
                                />
                            </label>
                            <span className='text-red-500 text-sm'>{errors.password}</span>
                            <button type='submit' className='w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-md my-3 h-10 md:h-12 md:mt-5 rounded-md shadow-sm shadow-gray-600'>SIGN UP</button>
                        </form>
                    </div>
                    <div ref={verifyRef} className='hidden '>
                        <Envelop w='70' h='75' fillColor='green'/>
                        <h2 className='text-center'>Please verify your email</h2>
                        <p className='text-center'>You are almost there! we sent an email to</p>
                        <p className='text-center'>{formData.email}</p>
                    </div>
                </div>
                <div className='text-center py-10'>
                    <div className='relative my-5 mx-auto max-w-xs'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center'>
                            <span className='px-4 bg-white text-lg font-semibold text-gray-900'>Or</span>
                        </div>
                    </div>
                </div>
                <button className='flex justify-center items-center w-full shadow-md shadow-gray-400 hover:bg-gray-300 md:h-12 bg-gray-200 text-black font-medium text-md my-1 h-10 rounded-md'><span className='mr-2'><img className='w-5' src={googleIcon} alt='google icon' /></span>Sign in with Google </button>
                <div className='flex justify-center w-full text-md mb-5'><span className='md:text-lg text-black font-normal mr-3'>Already have an account ?</span><span className='md:text-lg text-black font-semibold'><Link to='/login'>Login</Link></span></div>
            </div>
        </div>
    );
}

export default Signup