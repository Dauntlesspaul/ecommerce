import React from 'react'
import { Abnb, Amazone, Apple, Cocacola, Google} from './Svg'

function Sponsor() {
  return (
    <div className='w-full flex justify-center my-4'>
    <div className='flex '>
      <Amazone/>
      <Google/>
      <Cocacola/>
      <Abnb/>
      <Apple/>
    </div>
    </div>
  )
}

export default Sponsor
