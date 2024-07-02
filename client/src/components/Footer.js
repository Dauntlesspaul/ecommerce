import React, {useState} from 'react'
import {Paymentsys, Follow} from './FooterComp'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import apple from '../assets/images/apple.png'
import google from '../assets/images/gogle.png'
import { Button } from '@mui/material'
import createAxiosInstance from './axiosInstance'
import Newsletter from './Newsletter'
import CircularIndeterminate from './Loader'
library.add( faCopyright)

const axiosInstance = createAxiosInstance()
function Footer({toast, soundSuccess}) {
 const [email, setEmail] = useState('')
 const [loading, setLoading] = useState(false)

 const handleChange = (event) =>{
  const {value} = event.target
  setEmail(value)
 }

  const handleSubmit = async(event) =>{
    const text = Newsletter()
    event.preventDefault()
    setLoading(true)
    try{
      await axiosInstance.post('/news-letter', {email: email, text: text})
      toast.success('Subscribed')
      setEmail('')
      setLoading(false)
      soundSuccess()

    }catch(error){
      console.log(error)
    }

  }
  return (<>
  <div className='bg-gray-100 p-4 md:flex justify-center py-5'>
    <div className='md:flex md:justify-between md:w-10/12 xl:w-[1000px]'>
    <div className='w-fit'>
    <h2 className='w-60  -mb-2 text-black font-baba lg:text-4xl  text-3xl font-medium '> Shoe haven </h2>
    <span className='font-satisfy md:font-semibold text-black text-md lg:text-lg'>buy classy, wear classy, be classy</span>
  </div>
  <div className='w-full xl:flex xl:justify-between'>
    <div className='xl:mr-5'>
    <h2 className='font-semibold text-lg lg:text-xl'>NEW TO SHOE HAVEN?</h2>
    <p className='text-black md:text-base text-sm  '>Subscribe to our newsletter to get updates on our latest offers!</p>
    
    <div className='w-full flex justify-start'>
      <form className='flex box-border max-w-[600px] mt-2 w-full' onSubmit={handleSubmit}>
        <input
         type="email"
         value={email}
         onChange={handleChange}
         required
         placeholder='Enter E-mail Address'
         name="subscribe" 
         id='subscribe'
         className='px-2 border outline outline-none  border-neutral-400 lg:h-12 h-9 w-10/12 rounded-sm bg-neutral-100 mr-3'
         />
        <Button
        type='submit'
        variant='contained'
        sx={{ zIndex: 0,
          color: "white",
          fontWeight: '700',
          backgroundColor: '#EF1F22',
          '&:hover':{
              backgroundColor: '#ED5D52 '
          }
        }}
        >
         {loading ? <CircularIndeterminate/>: <>SUBSCRIBE</> }
        </Button>
      </form>
      </div>
    </div>
    <div className=''>
      <h2 className='text-black font-semibold mt-3 lg:text-lg'>DOWNLOAD SHOE HAVEN FREE APP</h2>
      <p className='text-black md:text-base text-sm '>Get access to exclusive offers!</p>
      <div className='flex'>
        <img src={apple} className='w-28 h-8 md:w-40 md:h-12 -ml-2' alt='logo'/>
        <img src={google} className='w-28 h-8 md:w-40 md:h-12'  alt='logo'/>
      </div>
      </div>
      </div>

    </div>
  </div>
  <div className='w-full h-max px-4 bg-black box-border py-3 '>
    <div className='lg:w-full lg:flex lg:justify-center'>
   <div className='w-full flex justify-between max-w-[500px] lg:max-w-full xl:w-[1000px] lg:w-[800px]'>
     <div className='lg:flex lg:w-[350px] xl:w-[410px] lg:justify-between '>
    <div className='h-max w-max'>
      <h2 className='text-white  md:text-base text-sm '>Information</h2>
      <ul className='text-[gray] md:text-base text-sm space-y-2'>
        <li>My Account</li>
        <li className='hover:text-white'>About Us</li>
        <li className='hover:text-white'>Store Locations</li>
        <li className='hover:text-white'>Catalogue</li>
        <li className='hover:text-white'>Size Guide</li>
        <li className='hover:text-white'>Blog</li>
        <li className='hover:text-white'>Refer to get Discount</li>
      </ul>
    </div>
    <div className='h-max w-max mt-2'>
      <h2 className='text-white md:text-base text-sm  '>Popular Products</h2>
        <ul className='text-[gray] space-y-2 md:text-base text-sm '>
          <li className='hover:text-white'>Giuseppe Zanotti</li>
          <li className='hover:text-white'>Versace</li>
          <li className='hover:text-white'>Prada</li>
          <li className='hover:text-white'>Brogue</li>
      </ul>
    </div>
    </div>
    <div className='lg:flex lg:w-[350px] xl:w-[410px] lg:justify-between'>
    <div className=' h-max w-max'>
      <h2 className='text-white md:text-base text-sm '>Categories</h2>
      <ul className=' text-[gray] space-y-2 md:text-base text-sm '>
        <li className='hover:text-white'>Men</li>
        <li className='hover:text-white'>Women</li>
        <li className='hover:text-white'>Top-sellers</li>
      </ul>
      </div>
    <div className='h-max w-max'>
      <h2 className='text-white md:text-base text-sm mt-2 '>Customer Services</h2>
        <ul className='text-[gray] md:text-base text-sm space-y-2 '>
          <li className='hover:text-white'>Help Center</li>
          <li className='hover:text-white'>Chat With Us</li>
          <li className='hover:text-white'>Contact us</li>
      </ul>
    </div>
    </div>
    </div>
    </div>
    <div className='lg:w-full lg:flex lg:justify-center'>
    <div className='lg:max-w-full xl:w-[1000px] lg:w-[800px] md:flex justify-between max-w-[500px]'>
    <div className='mt-3'>
      <h2 className='text-white mb-1 md:text-base text-sm '>Follow Us</h2>
      <Follow/>
    </div>
    <div className='mt-3'>
      <h2 className='text-white mb-1 md:text-base text-sm '>Payment Methods</h2>
      <Paymentsys/>
    </div>
    </div>
    </div>
      <hr className='mt-4'/>
      <div className='flex justify-center items-center'>
      <span><FontAwesomeIcon className='text-white lg:text-md mt-2 text-sm' icon="fa-regular fa-copyright" /></span><h2 className='ml-2 text-sm text-white font-medium mt-1'> 2024 Shoe Haven All rights reserved.</h2>
      </div>
      </div>
      </>
  )
}

export default Footer
