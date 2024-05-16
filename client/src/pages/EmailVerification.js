import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Error, Success } from '../components/Svg';

const axiosInstance = axios.create({
  baseURL: 'http://172.20.10.9:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

function EmailVerification() {
  const { id, token } = useParams();
  const [message, setMessage] = useState();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.get(`/${id}/very/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        console.error('Error:', error);
        setMessage(error.response.data.message);
      }
    };

    verifyEmail();
  }, [id, token]);

  return (
    <div className='bg-zinc-950 min-h-screen min-w-full grid place-items-center'>
      <div className='bg-gray-100 w-10/12 md:w-[550px] h-72 flex items-center justify-center'>
        <div className='space-y-7 grid place-items-center h-fit'>
          {message && message === 'Oops Invalid link! Token not found' ? (
            <>
              <Error w='70' h='75' fillColor='red' />
              <span>{message}</span>
            </>
          ) : (
            <>
              {message && <Success w='70' h='75' fillColor='green' />}
              <span>{message}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerification;
