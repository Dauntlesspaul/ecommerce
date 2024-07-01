import React, { useState, useRef } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useGoogleLogin } from '@react-oauth/google';
import googleIcon from '../assets/images/google.png';
import { Eye, EyeOff, Padlock } from '../components/Svg';
import { useOutletContext, useParams } from 'react-router-dom';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import createAxiosInstance from '../components/axiosInstance';
import CircularIndeterminate from '../components/Loader';

library.add(faUser, faUser);

const axiosInstance = createAxiosInstance();

function ChangePassword() {
    const navigate = useNavigate();
    const passwordRef = useRef(null);
    const {toast, soundSuccess, soundError} = useOutletContext()
    const confirmPasswordRef = useRef(null);
    const [checkedPassword, setCheckedPassword] = useState(false);
    const [checkedConfirmPassword, setCheckedConfirmPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    });
    const { email, token, id } = useParams();


    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`
                    }
                })
                .then(async (res) => {
                    await axiosInstance.post('/signin-with-google', res.data);
                   navigate('/profile');
                })
                .catch(err => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }
    });

    const validateForm = () => {
        const passwordRegex = /^[a-zA-Z0-9!@#$%*]{6,}$/;
        let errors = {};
        let hasErrors = false;

        if (!formData.password || formData.password.trim() === '') {
            errors.password = 'Password is required';
            hasErrors = true;
        } else if (!passwordRegex.test(formData.password.trim())) {
            errors.password = 'The password must be a minimum of six characters long and can only contain the following special characters: !@#$%*';
            hasErrors = true;
        }

        if (!formData.confirmPassword || formData.confirmPassword.trim() === '') {
            errors.confirmPassword = 'Confirm password is required';
            hasErrors = true;
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match. Please re-enter';
            hasErrors = true;
        }

        setErrors(errors);
        return hasErrors;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePasswordVisibility = () => {
        setCheckedPassword(prevChecked => {
            const updatedChecked = !prevChecked;
            passwordRef.current.type = updatedChecked ? 'text' : 'password';
            return updatedChecked;
        });
    };

    const toggleConfirmPasswordVisibility = () => {
        setCheckedConfirmPassword(prevChecked => {
            const updatedChecked = !prevChecked;
            confirmPasswordRef.current.type = updatedChecked ? 'text' : 'password';
            return updatedChecked;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const hasErrors = validateForm();

        if (hasErrors) {
            return;
        }

        try {
            const formDataObject = new FormData();
            formDataObject.append('email', email);
            formDataObject.append('token', token)
            formDataObject.append('id', id)
            formDataObject.append('password', formData.password)
            setLoading(true);
           const response = await axiosInstance.post('/reset-link-change-password', formDataObject);
            setLoading(false);
            toast.success(response.data.message)
            soundSuccess()
            setTimeout(() => {
             return   navigate('/login')
            }, 3000);
        } catch (error) {
            setLoading(false);
            soundError();
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className='grid place-items-center h-full'>
            <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center'> 
                <div className="relative z-1 flex items-center justify-center h-full">
                    <h1 className="text-white text-xl md:text-4xl">Password Reset</h1>
                </div>
            </div>
            <div className='w-11/12 md:w-[560px] md:my-6'>
                <div className='w-full relative mt-16 pb-7 bg-layer-img bg-cover login-overlay grid justify-items-center box-border'>
                    <div className='relative z-10 w-full grid place-items-center'>
                        <div className='w-20 h-20 rounded-full bg-stone-900 flex justify-center items-center absolute -top-10'>
                            <FontAwesomeIcon icon="fa-regular fa-user" className="text-white text-4xl" />
                        </div>
                        <form className='w-11/12 mt-14' onSubmit={handleSubmit}>
                            <div className='md:h-12 bg-stone-900 flex w-full md:mt-10 mt-5 h-9'>
                                <span className='w-12 flex justify-center items-center'>
                                    <FontAwesomeIcon icon="fa-solid fa-user" className="text-white text-md" />
                                </span>
                                <input
                                    type='email'
                                    name='email'
                                    value={email}
                                    id='email'
                                    readOnly
                                    placeholder='EMAIL ID'
                                    className='focus:outline outline-black outline-[1px] h-full md:h-12 w-full rounded-none md:text-lg px-2'
                                />
                            </div>
                            <div className='md:h-12 bg-stone-900 flex w-full mt-5 h-9'>
                                <span className='w-12 flex justify-center items-center'>
                                    <Padlock fillColor="white" widthSize="w-3 ml-1"/>
                                </span>
                                <input
                                    type='password'
                                    name='password'
                                    required
                                    ref={passwordRef}
                                    onChange={handleChange}
                                    placeholder='NEW PASSWORD'
                                    className='focus:outline outline-black outline-[1px] md:h-12 h-full w-full rounded-none md:text-lg px-2 ml-1'
                                />
                                <label htmlFor='view'>
                                    <input
                                        type='checkbox'
                                        name='view'
                                        id='view'
                                        checked={checkedPassword}
                                        onChange={togglePasswordVisibility}
                                        className='hidden'
                                    />
                                    {!checkedPassword ? (
                                        <span className='-ml-12 w-12 md:h-12 h-full bg-white flex justify-center items-center'>
                                            <Eye fillColor="gray" />
                                        </span>
                                    ) : (
                                        <span className='-ml-12 w-12 h-full md:h-12 bg-white flex justify-center items-center'>
                                            <EyeOff fillColor="gray" widthSize="cursor-pointer" />
                                        </span>
                                    )}
                                </label>
                            </div>
                            <span className='text-red-500 text-sm'>{errors.password}</span>
                            <div className='md:h-12 bg-stone-900 flex w-full mt-5 h-9'>
                                <span className='w-12 flex justify-center items-center'>
                                    <Padlock fillColor="white" widthSize="w-3 ml-1"/>
                                </span>
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    required
                                    ref={confirmPasswordRef}
                                    onChange={handleChange}
                                    placeholder='CONFIRM PASSWORD'
                                    className='focus:outline outline-black outline-[1px] md:h-12 h-full w-full rounded-none md:text-lg px-2 ml-1'
                                />
                                <label htmlFor='viewConfirm'>
                                    <input
                                        type='checkbox'
                                        name='view'
                                        id='viewConfirm'
                                        checked={checkedConfirmPassword}
                                        onChange={toggleConfirmPasswordVisibility}
                                        className='hidden'
                                    />
                                    {!checkedConfirmPassword ? (
                                        <span className='-ml-12 w-12 md:h-12 h-full bg-white flex justify-center items-center'>
                                            <Eye fillColor="gray" />
                                        </span>
                                    ) : (
                                        <span className='-ml-12 w-12 h-full md:h-12 bg-white flex justify-center items-center'>
                                            <EyeOff fillColor="gray" widthSize="cursor-pointer" />
                                        </span>
                                    )}
                                </label>
                            </div>
                            <span className='text-red-500 text-sm'>{errors.confirmPassword}</span>
                            <button 
                                type='submit' 
                                disabled={isLoading}
                                className='w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-base lg:text-lg my-3 h-10 md:h-12 md:mt-5 rounded-sm shadow-sm flex justify-center items-center'
                            >
                                {isLoading ? <CircularIndeterminate /> : <>RESET PASSWORD</>}  
                            </button>
                        </form>
                    </div>
                </div>
                <div className="text-center">
                    <div className="relative my-3 mx-auto max-w-xs">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-lg font-semibold text-gray-900">Or</span>
                        </div>
                    </div>
                </div>
                <button
                    className='flex justify-center items-center w-full border-[1px] border-stone-600 md:h-12 text-black font-medium text-base lg:text-lg my-1 h-10'
                    onClick={() => login()}
                >
                    <span className='mr-2'>
                        <img className='w-5' src={googleIcon} alt="google icon" />
                    </span>
                    Sign in with Google
                </button>
                <div className='flex justify-center w-full text-md mb-5'>
                    <span className='md:text-lg text-black font-normal mr-3'>Don't have an account ?</span>
                    <span className='md:text-lg text-black font-semibold'><Link to='/signup'>Sign up</Link></span>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default ChangePassword;
