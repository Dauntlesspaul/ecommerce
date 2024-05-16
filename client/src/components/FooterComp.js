import React from 'react'
import img1 from '../assets/images/visa.png'
import img2 from '../assets/images/mastercard.jpg'
import img3 from '../assets/images/american-express.png'
import img4 from '../assets/images/verve.jpg'
import img5 from '../assets/images/stripe.png'
import img6 from '../assets/images/discover.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRss } from '@fortawesome/free-solid-svg-icons'
import {faFacebookF, faLinkedinIn, faYoutube,faXTwitter} from "@fortawesome/free-brands-svg-icons"
library.add(faFacebookF, faXTwitter, faLinkedinIn, faYoutube, faRss)
export function Paymentsys() {
  return (
    <div className='flex justify-between w-64'>
      <img className='w-10 h-6' src={img1} alt=""/>
      <img className='w-10 h-6' src={img2} alt=""/>
      <img className='w-10 h-6' src={img3} alt=""/>
      <img className='w-10 h-6' src={img4} alt=""/>
      <img className='w-10 h-6' src={img5} alt=""/>
      <img className='w-10 h-6' src={img6} alt=""/>
    </div>
  )
}

export function Follow() {
  return (
    <div className='flex w-40 justify-between'>
      <div className=' bg-red-500 rounded-full w-6 h-6 flex justify-center items-center'>
       <FontAwesomeIcon className='text-white text-xs' icon="fa-brands fa-facebook-f" />
      </div>
       <div className='bg-red-500 rounded-full w-6 h-6 flex justify-center items-center'>
       <FontAwesomeIcon className='text-white text-xs' icon="fa-brands fa-x-twitter" />
      </div>
      <div className='bg-red-500 rounded-full w-6 h-6 flex justify-center items-center'>
      <FontAwesomeIcon className='text-white text-xs' icon="fa-brands fa-linkedin-in" />
      </div>
      <div className='bg-red-500 rounded-full w-6 h-6 flex justify-center items-center'>
       <FontAwesomeIcon className='text-white text-xs' icon="fa-brands fa-youtube" />
      </div>
      <div className='bg-red-500 rounded-full w-6 h-6 flex justify-center items-center'>
       <FontAwesomeIcon className='text-white text-xs' icon="fa-solid fa-rss" />
      </div>
    </div>
  )
}



