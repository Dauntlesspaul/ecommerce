// SuccessPage.js
import React, { useState, useEffect } from 'react';
import ConfettiComponent from '../components/ConfettiComponent';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Success } from '../components/Svg';
import { Button } from '@mui/material';

function SuccessPage() {
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const { clearCart } = useOutletContext();
  const navigate = useNavigate()

  useEffect(() => {
    clearCart();
    setTriggerConfetti(true);
    setTimeout(() => setTriggerConfetti(false), 3000);
     // eslint-disable-next-line
  }, []);

  

  return (
    <div className=' z-40 w-full h-dvh grid place-items-center fixed top-0 bottom-0 bg-slate-50'>
      <div className='bg-white lg:w-[700px] grid place-items-center shadow-md w-11/12 h-[50%]'>
        <div className='h-fit w-fit grid place-items-center lg:px-5 px-2 text-sm md:text-base'>
        <Success w='90'styleProp='lg:my-8 my-5' fillColor='green'/>
        <h2 className='text-base md:text-2xl font-semibold'>Thank you for your order!</h2>
        <p className='mb-3 text-gray-700 text-center'>We appreciate your purchase and are excited to deliver your items soon.
        Thank you for choosing our store, and we hope you enjoy your new products</p>
        <div className='flex space-x-2 lg:my-7 my-4'> 
          <Button
            variant='outlined'
            sx={{
              color: 'black',
              borderColor: 'black' 
            }}
            onClick={()=> navigate('/profile/my-order')}
          >
            View Order
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={()=> navigate('/allproducts')}
          >
            Continue Shopping
          </Button>
        </div>
        </div>
          <ConfettiComponent trigger={triggerConfetti} />
      </div>
     </div>
  
  );
}

export default SuccessPage;
