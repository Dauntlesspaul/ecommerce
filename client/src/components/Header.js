import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import Cartsvg from './Cartsvg';
import { Link } from 'react-router-dom';
library.add(faUser)

function Header() {
 

const [count, setCount] = useState(0) 
const [time, setTime] = useState(true) 
useEffect(()=>{
  
const store = localStorage.getItem('cart')
  const data = JSON.parse(store);
setCount(data ? data.length : 0)
},[time])

setInterval(()=>{
  return setTime(!time)
},1000)
const [checked, setChecked] = useState(false)
const slideRef = useRef()

const handleCurtain = () => {
  setChecked((prevState) => {

    if (!prevState) {
      slideRef.current.style.height = "50px";
    } else {
      slideRef.current.style.height = "0";
    }
    return !prevState;
  });
};

  return (<>
  <div className='w-full relative'>
    <div className="w-full h-14 lg:h-16  py-2 px-2 lg:px-40 box-border flex items-center  bg-stone-900">
        <div className="flex justify-between items-center w-full">
        <Link to="/"><h1 className="text-white font-bold lg:text-2xl text-xl">SHOE HAVEN</h1></Link>
         <nav>
         <ul className='justify-evenly hidden md:flex text-white font-medium text-md lg:text-lg '>
          <li className='mx-2 hover:text-gray-200  list-none'><Link to='/'>Home</Link></li>
          <li className='mx-2 hover:text-gray-200 list-none'><Link to='/men'>Men</Link></li>
          <li className='mx-2 hover:text-gray-200 list-none'><Link to='/women'>Women</Link></li>
          <li className='mx-2 list-none'>About</li>
          <li className='mx-2 list-none'>Contact us</li>
         </ul>
         </nav>
          <div className="flex justify-between w-24 md:w-12 relative">
            <Link to="/cart"><Cartsvg fillColor="white" width="w-6"/> 
            {count > 0 && <span className='w-4 h-4 flex justify-center items-center rounded-full bg-red-600 text-white absolute text-xs left-3 -top-1'>{count}</span>}
            </Link>
            <Link to="/login"><FontAwesomeIcon icon="fa-regular fa-user" className="text-white text-xl" /></Link>
            <div className="menu md:hidden md:w-0 md:h-0">
              <label htmlFor="check">
              <input 
              type="checkbox" 
              checked={checked}
              onChange={handleCurtain}
              id="check"/> 
              <span></span>
              <span></span>
              <span></span>
            </label>
            </div>
          </div>
        </div>
      </div>
      <div ref={slideRef} className='md:hidden w-full h-0 overflow-hidden grid place-items-center transition-height duration-500 ease-linear bg-gray-100 absolute right-0'>
            <nav className='w-full'>
              <ul className='flex w-11/12 font-semibold justify-evenly'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/men'>Men</Link></li>
                <li><Link to='/women'>Women</Link></li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </nav>
      </div>
      <div className="bg-[url('../assets/images/Theme4.jpg')] lg:bg-[url('../assets/images/newheaderbg.jpg')]  xl:bg-[url('../assets/images/newheaderbg.jpg')] bg-bottom  bg-no-repeat bg-cover h-36 md:h-56 w-full box-border flex justify-center items-end pb-1">
        <h2 className="text-gray  lg:text-2xl md:text-xl text-sm  font-satisfy font-semibold">Buy Classy, WearClassy, Be Classy</h2>
      </div>
      </div>
      </>
  )
}

export default Header
