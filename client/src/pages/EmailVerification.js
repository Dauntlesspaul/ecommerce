import React, { useState, useEffect } from 'react';
import createAxiosInstance from '../components/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { Error, Success } from '../components/Svg';
import { Button } from '@mui/material';

const axiosInstance = createAxiosInstance()

function EmailVerification() {
  const { id, token } = useParams();
  const [message, setMessage] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.get(`/${id}/verify/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error:', error);
        setMessage(error.response.data.message);
      }
    };

    verifyEmail();
  }, [id, token]);

  return (
    <div className=' z-40 w-full h-dvh grid place-items-center fixed top-0 bottom-0 bg-slate-50'>
      <div className='bg-white lg:w-[700px] grid place-items-center shadow-md w-11/12 h-[50%]'>
        <div className='h-fit w-fit grid place-items-center lg:px-5 px-2 text-sm md:text-base'>
          {message && message === 'Oops, invalid link! Token not found' ? (
            <>
             {message && <> <Error w='60' h='65' fillColor='red' />
              <span className='my-2'>{message}</span></>}
            
            </>
          ) : (
            <>
              {message && <> <Success w='60' h='65' fillColor='green' />
              <span className='my-2'>{message}</span>
              <div className='w-full flex justify-center mt-2'>
                <Button
                variant='contained'
                color='success'
                onClick={()=> navigate('/login')}
                >
                  Proceed to Login
                </Button>
               </div> 
               </>
}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerification;
