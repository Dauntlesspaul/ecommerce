import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import googleIcon from '../assets/images/google.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Envelop } from '../components/Svg';
import CircularIndeterminate from '../components/Loader';
import { Eye, EyeOff } from '../components/Svg';

const axiosInstance = axios.create({
    baseURL: 'http://172.20.10.13:8000', 
    headers: {
        'Content-Type': 'application/json',
    }
});

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

    const [isLoading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);

    const formRef = useRef();
    const verifyRef = useRef();
    const hideShowRef = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);
    };
    const hidePassword = () => {
        setChecked(prevChecked => {
            const updatedChecked = !prevChecked;
            if (updatedChecked) {
                hideShowRef.current.type = 'text';
            } else {
                hideShowRef.current.type = 'password';
            }
            return updatedChecked;
        });
    };

    const validateField = (fieldName, value) => {
        const nameRegex = /^[a-zA-Z]{2,}\s*$/;
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

    const handleSubmit = async (event) => {
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
            setLoading(true);
            const formDataObject = new FormData();
            formDataObject.append('firstname', formData.firstname.replace(/\s/g, ''));
            formDataObject.append('lastname', formData.lastname.replace(/\s/g, ''));
            formDataObject.append('email', formData.email);
            formDataObject.append('password', formData.password);
            try {
                const response = await axiosInstance.post('/signup', formDataObject);
                setLoading(false);
                console.log(response.data.message);
                formRef.current.style.display = 'none';
                verifyRef.current.style.display = 'block';
            } catch (error) {
                console.error(error);
                setLoading(false);
                newErrors = { ...newErrors, email: error.response.data.message };
                setErrors(newErrors);
            }
        }
    };

    const handleResendLink = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.post('/resend-email-verification', { email: formData.email });
            setLoading(false);
            console.log(response.data.message);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

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
                            <label className='max-w-full flex items-center' htmlFor='password'>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={formData.password}
                                    ref={hideShowRef}
                                    onChange={handleChange}
                                    placeholder='PASSWORD'
                                    className='rounded-none focus:outline outline-black outline-[1px] md:h-11 md:text-lg px-2 h-9 w-full'
                                />
                                <label htmlFor='view'>
                                <input
                                    type='checkbox'
                                    name='view'
                                    id='view'
                                    checked={checked}
                                    onChange={hidePassword}
                                    className='hidden '
                                />
                                {!checked ? <span className='-ml-12 w-12 md:h-11 h-9 bg-white flex justify-center items-center'><Eye fillColor="gray"/></span> 
                                : <span className='-ml-12 w-12 h-9 md:h-11 bg-white flex justify-center items-center'><EyeOff fillColor="gray" widthSize="cursor-pointer" /></span>}
                            </label>
                            </label>
                            <span className='text-red-500 text-sm'>{errors.password}</span>
                            <button 
                                type='submit' 
                                className='w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-md my-3 h-10 md:h-12 md:mt-5 rounded-md shadow-sm shadow-gray-600 flex justify-center items-center'
                                disabled={isLoading}
                            >
                                {isLoading ? <CircularIndeterminate/> : <>SIGN UP</>}
                            </button>
                        </form>
                    </div>
                    <div ref={verifyRef} className='px-2 hidden'>
                        <div className='w-full flex justify-center mt-16'>
                            <Envelop w='50' h='35' fillColor='green'/>
                        </div>
                        <h2 className='text-center font-semibold text-lg'>Please verify your email</h2>
                        <p className='text-center md:text-lg'>You are almost there! We sent an email to</p>
                        <p className='text-center text-black font-semibold md:text-lg'>{formData.email}</p>
                        <p className='text-center md:text-lg'>Click on the link in that email to complete your signup. If you don't see it, you may need to <b>check your spam</b> folder</p>
                        <div className='w-full flex justify-center mt-4'>
                            <button 
                                onClick={handleResendLink} 
                                className='md:text-lg rounded-md w-8/12 h-10 flex items-center justify-center hover:bg-stone-800 bg-stone-900 text-white'
                                disabled={isLoading}
                            >
                                {isLoading ? <CircularIndeterminate/> : <>Resend Verification Email</>}
                            </button>
                        </div>
                    </div>
                </div>
                <div className='text-center py-5'>
                    <div className='relative mx-auto max-w-xs'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='relative flex justify-center'>
                            <span className='px-4 bg-white text-lg font-semibold text-gray-900'>Or</span>
                        </div>
                    </div>
                </div>
                <button className='flex justify-center items-center w-full shadow-md shadow-gray-400 hover:bg-gray-300 md:h-12 bg-gray-200 text-black font-medium text-md my-1 h-10 rounded-md'>
                    <span className='mr-2'><img className='w-5' src={googleIcon} alt='google icon' /></span>Sign in with Google 
                </button>
                <div className='flex justify-center w-full text-md mb-5'>
                    <span className='md:text-lg text-black font-normal mr-3'>Already have an account?</span>
                    <span className='md:text-lg text-black font-semibold'><Link to='/login'>Login</Link></span>
                </div>
            </div>
        </div>
    );
}

export default Signup;
