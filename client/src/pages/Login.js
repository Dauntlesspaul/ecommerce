import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Eye, EyeOff, Padlock } from '../components/Svg'
import { useGoogleLogin } from '@react-oauth/google'
import googleIcon from '../assets/images/google.png'
import {useState, useRef} from 'react'
import axios from 'axios'
import { useNavigate, Link} from 'react-router-dom'
library.add(faUser, faUser)

const axiosInstance = axios.create({
    baseURL: 'http://172.20.10.9:8000', 
})

function Login() {
    const navigate = useNavigate();
    const hideShowRef = useRef(null);
    const [checked, setChecked] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${response.access_token}`
                    }
                })
                .then(async (res) => {
                    await axiosInstance.post('/signin-with-google', res.data)
                    .then((res) => {
                        if (res.data.message === 'user created') {
                            navigate('/profile');
                        } else {
                            navigate('/');
                        }
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }
    });

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
    const handleSubmit = (event) =>{
        event.preventDefault()
    }

    return (
        <div className='grid place-items-center h-full'>
            <div className='bg-gray-100 shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-9 lg:h-14 lg:text-2xl grid place-content-center mb-5'>User Login</div>
            <div className='w-10/12 md:w-[550px] md:my-6'>
                <div className='w-full relative mt-16 pb-7 shadow-md shadow-gray-400 bg-gray-200 grid justify-items-center rounded-xl box-border'>
                    <div className='w-20 h-20 rounded-full bg-stone-900 flex justify-center items-center absolute -top-10'>
                        <FontAwesomeIcon icon="fa-regular fa-user" className="text-white text-4xl " />
                    </div>
                    <form className='w-11/12 mt-14' onSubmit={handleSubmit}>
                        <h2 className='md:text-2xl font-semibold text-lg text-center md:my-3 my-2'>Welcome bacK! &#128075;</h2>
                        <div className='md:h-12 bg-stone-900 rounded-l-md flex w-full h-9'>
                            <span className='w-12 flex justify-center  items-center'>
                                <FontAwesomeIcon icon="fa-solid fa-user" className="text-white text-md" />
                            </span>
                            <input
                                type='text'
                                name='username'
                                id='name'
                                placeholder='EMAIL ID'
                                className='focus:outline outline-black outline-[1px] h-full md:h-12 w-full rounded-none  md:text-lg px-2'
                            />
                        </div>
                        <div className='md:h-12 bg-stone-900 flex w-full rounded-l-md mt-5 h-9'>
                            <span className='w-12 flex justify-center items-center'>
                                <Padlock fillColor="white" widthSize="w-3 ml-1"/>
                            </span>
                            <input
                                type='password'
                                name='pasword'
                                ref={hideShowRef}
                                placeholder='PASSWORD'
                                className='focus:outline outline-black outline-[1px] md:h-12 h-full w-full rounded-none  md:text-lg px-2 ml-1'
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
                                {!checked ? <span className='-ml-12 w-12 md:h-12 h-full bg-white flex justify-center items-center'><Eye fillColor="gray"/></span> 
                                : <span className='-ml-12 w-12 h-full md:h-12 bg-white flex justify-center items-center'><EyeOff fillColor="gray" widthSize="cursor-pointer" /></span>}
                            </label>
                        </div>
                        <div className='md:my-6 w-full my-4'>
                            <span className='float-right md:text-lg text-sm font-medium'>Forget password?</span>
                        </div>
                        <button type='submit' className='w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-md my-3 h-10 md:h-12 md:mt-5 rounded-md shadow-sm shadow-gray-600'>LOGIN</button>
                    </form>
                </div>
                <div className="text-center">
                    <div className="relative  my-5 mx-auto max-w-xs">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-white text-lg font-semibold text-gray-900">Or</span>
                        </div>
                    </div>
                </div>
                <button className='flex justify-center items-center w-full shadow-md shadow-gray-400 hover:bg-gray-300 md:h-12 bg-gray-200 text-black font-medium text-md my-1 h-10 rounded-md' onClick={() => login()}><span className='mr-2'><img className='w-5' src={googleIcon} alt="google icon"/></span>Sign in with Google </button>
                <div className='flex justify-center w-full text-md mb-5'><span className='md:text-lg text-black font-normal mr-3'>Don't have an account ?</span><span className='md:text-lg text-black font-semibold'><Link to='/signup'>Sign up</Link></span></div>
            </div>
        </div>
    );
}

export default Login;