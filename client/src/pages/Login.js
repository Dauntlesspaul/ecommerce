import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {ToastContainer, toast} from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { Eye, EyeOff, Padlock } from '../components/Svg'
import { useGoogleLogin } from '@react-oauth/google'
import googleIcon from '../assets/images/google.png'
import {useState, useEffect, useRef} from 'react'
import { useNavigate, useLocation, Link, useOutletContext} from 'react-router-dom'
import axios from 'axios'
import createAxiosInstance from '../components/axiosInstance'
import CircularIndeterminate from '../components/Loader'
library.add(faUser, faUser)
axios.defaults.baseURL = 'https://shoe-haven-api.vercel.app'; 
axios.defaults.withCredentials = true; 
axios.defaults.headers.common['Content-Type'] = 'application/json';


  
const axiosInstance = createAxiosInstance()
function Login() {
    const navigate = useNavigate();
    const hideShowRef = useRef(null);
    const [checked, setChecked] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [loading, setloading] = useState(true);
  const {soundError} = useOutletContext()
  const location = useLocation()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    useEffect(()=>{
       const verifyUserLogin = async() =>{
        try{
        await axiosInstance.get('/verify-user-login')
        setloading(false)
        navigate('/profile')
        }catch(error){
            console.log(error)
            setloading(false)
        }
       } 
       verifyUserLogin()
    }, [navigate])

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
                    const from = location.state?.from || '/profile'; 
                    navigate(from, { replace: true })
                })
                .catch(err => console.log(err));
            } catch (err) {
                console.log(err);
            }
        }
    });
    
    const handleChange = (event)=>{
        const {name, value} = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
          const response = await axios.post('/sign-in', {
            email: formData.email,
            password: formData.password,
          }, {
            withCredentials: true
          });
          setLoading(false);
          if (response.data.message === 'Sign-in successful') {
            const from = location.state?.from || '/profile';
            navigate(from, { replace: true });
          } else {
            setLoading(true);
            await axiosInstance.post('/new-email-verification', formData);
            setLoading(false);
            soundError();
            toast.info('This account has not been verified, a new verification link has been sent to your Email address', {autoClose: 12000});
          }
        } catch (error) {
          setLoading(false);
          soundError();
          console.log(error);
          toast.error(error.response.data.message);
        }
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
        <div className='grid place-items-center h-full'>
        <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64  place-content-center'> 
            <div className="relative z-1 flex items-center justify-center h-full">
            <h1 className="text-white text-xl md:text-4xl">User Login</h1>
            </div>
            </div>
        <div className=' w-11/12 md:w-[560px] md:my-6'>
            <div className='w-full relative mt-16 pb-7 bg-layer-img bg-cover login-overlay grid justify-items-center  box-border'>
                <div className='relative z-10 w-full grid place-items-center'>
                <div className='w-20 h-20 rounded-full bg-stone-900 flex justify-center items-center absolute -top-10'>
                    <FontAwesomeIcon icon="fa-regular fa-user" className="text-white text-4xl " />
                </div>
                <form className='w-11/12 mt-14' onSubmit={handleSubmit}>
                    <h2 className='md:text-2xl font-semibold text-lg text-center md:mt-2 md:mb-10 mb-6'>Welcome BacK!</h2>
                    
                    <div className='md:h-12 bg-stone-900  flex w-full h-9'>
                        <span className='w-12 flex justify-center  items-center'>
                            <FontAwesomeIcon icon="fa-solid fa-user" className="text-white text-md" />
                        </span>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            onChange={handleChange}
                            placeholder='EMAIL ID'
                            required
                            className='focus:outline outline-black outline-[1px] h-full md:h-12 w-full rounded-none  md:text-lg px-2'
                        />
                    </div>
                    <div className='md:h-12 bg-stone-900 flex w-full  mt-5 h-9'>
                        <span className='w-12 flex justify-center items-center'>
                            <Padlock fillColor="white" widthSize="w-3 ml-1"/>
                        </span>
                        <input
                            type='password'
                            name='password'
                            required
                            ref={hideShowRef}
                            onChange={handleChange}
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
                        <span className='float-right md:text-lg text-[15px] font-medium mb-3'><Link to='/forgot-password'>Forgot password?</Link></span>
                    </div>
                    <button 
                    type='submit' 
                    disabled={isLoading}
                    className='w-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-base lg:text-lg my-3 h-10 md:h-12 md:mt-5 rounded-sm shadow-sm flex justify-center items-center'
                    >
                      {isLoading ? <CircularIndeterminate/> : <>LOGIN</>}  
                    </button>
                </form>
                </div>
            </div>
            <div className="text-center">
                <div className="relative  my-3 mx-auto max-w-xs">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-4 bg-white text-lg font-semibold text-gray-900">Or</span>
                    </div>
                </div>
            </div>
            <button
             className='flex justify-center items-center w-full border-[1px] border-stone-600  md:h-12  text-black font-medium text-base lg:text-lg my-1 h-10 ' 
             onClick={() => login()}>
                <span className='mr-2'>
                    <img className='w-5' src={googleIcon} alt="google icon"/>
                </span>Sign in with Google 
                </button>
            <div className='flex justify-center w-full text-md mb-5'><span className='md:text-lg text-black font-normal mr-3'>Don't have an account ?</span><span className='md:text-lg text-black font-semibold'><Link to='/signup'>Sign up</Link></span></div>
        </div>
        <ToastContainer/>
    </div>
    );
}

export default Login;
