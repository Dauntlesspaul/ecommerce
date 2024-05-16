import React from 'react'
import {Paymentsys, Follow} from './FooterComp'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons'
import apple from '../assets/images/apple.png'
import google from '../assets/images/gogle.png'
library.add( faCopyright)

function Footer() {
  return (<>
  <div className='bg-gray-100 p-4 md:flex justify-center py-5'>
    <div className='md:flex md:justify-between md:w-10/12 xl:w-[1000px]'>
    <div className='w-fit'>
    <h2 className='w-60 text-2xl -mb-2 text-black font-baba lg:text-4xl  md:text-3xl font-medium '> Shoe haven </h2>
    <span className='font-satisfy md:font-semibold text-black text-sm'>buy classy, wear classy, be classy</span>
  </div>
  <div className='w-full xl:flex xl:justify-between'>
    <div className=''>
    <h2 className='font-semibold'>NEW TO SHOE HAVEN?</h2>
    <p className='text-black text-sm'>Subscribe to our newsletter to get updates on our latest offers!</p>
    
    <div className='w-full flex justify-start'>
      <form className='flex box-border max-w-[600px] mt-2 w-full'>
        <input
         type="text" 
         placeholder='Enter E-mail Address'
         name="subscribe" 
         id='subscribe'
         className='px-2 border outline outline-none  border-neutral-400 lg:h-12 h-9 w-10/12 rounded-sm bg-neutral-100 mr-3'
         />
        <button 
        className=' bg-red-500 hover:bg-red-600  lg:h-12 h-9 text-sm rounded-sm font-semibold text-white w-24 border-none' 
        type='submit'
        >
          SUBSCRIBE
        </button>
      </form>
      </div>
    </div>
    <div className=''>
      <h2 className='text-black font-semibold mt-3'>DOWNLOAD SHOE HAVEN FREE APP</h2>
      <p className='text-black text-sm'>Get access to exclusive offers!</p>
      <div className='flex'>
        <img src={apple} className='w-28 h-8 md:w-40 md:h-12 -ml-2' alt='logo'/>
        <img src={google} className='w-28 h-8 md:w-40 md:h-12'  alt='logo'/>
      </div>
      </div>
      </div>

    </div>
  </div>
  <div className='w-full h-max px-4 bg-stone-900 box-border py-3 '>
    <div className='lg:w-full lg:flex lg:justify-center'>
   <div className='w-full flex justify-between max-w-[500px] lg:max-w-full xl:w-[1000px] lg:w-[800px]'>
     <div className='lg:flex lg:w-[350px] xl:w-[410px] lg:justify-between '>
    <div className='h-max w-max'>
      <h2 className='text-red-600'>Information</h2>
      <ul className='text-white '>
        <li>My Account</li>
        <li>About Us</li>
        <li>Store Locations</li>
        <li>Catalogue</li>
        <li>Size Guide</li>
        <li>Blog</li>
        <li>Refer to get Discount</li>
      </ul>
    </div>
    <div className='h-max w-max'>
      <h2 className='text-red-600'>Popular products</h2>
        <ul className='text-white '>
          <li>Giuseppe Zanotti</li>
          <li>Versace</li>
          <li>Prada</li>
          <li>Brougue</li>
      </ul>
    </div>
    </div>
    <div className='lg:flex lg:w-[350px] xl:w-[410px] lg:justify-between'>
    <div className=' h-max w-max'>
      <h2 className='text-red-600'>Categories</h2>
      <ul className='text-white '>
        <li>Men</li>
        <li>Women</li>
        <li>Top-sellers</li>
      </ul>
      </div>
    <div className='h-max w-max'>
      <h2 className='text-red-600'>Customer Services</h2>
        <ul className='text-white '>
          <li>Help Center</li>
          <li>Chat With Us</li>
          <li>Contact us</li>
      </ul>
    </div>
    </div>
    </div>
    </div>
    <div className='lg:w-full lg:flex lg:justify-center'>
    <div className='lg:max-w-full xl:w-[1000px] lg:w-[800px] md:flex justify-between max-w-[500px]'>
    <div className='mt-3'>
      <h2 className='text-red-600 mb-1'>Follow US</h2>
      <Follow/>
    </div>
    <div className='mt-3'>
      <h2 className='text-red-600 mb-1'>Payment Methods</h2>
      <Paymentsys/>
    </div>
    </div>
    </div>
      <hr className='mt-4'/>
      <div className='flex justify-center items-center'>
      <span><FontAwesomeIcon className='text-white lg:text-md mt-2 text-sm' icon="fa-regular fa-copyright" /></span><h2 className='ml-2 text-xs text-white font-medium mt-1'> 2024 Shoe Haven All rights reserved.</h2>
      </div>
      </div>
      </>
  )
}

export default Footer
