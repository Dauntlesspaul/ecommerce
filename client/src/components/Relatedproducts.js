import React from 'react'
import Cartsvg from './Cartsvg'
import { Link } from 'react-router-dom'
import {Fourstar, Fourhalf, Fivestar, Threestar} from './Svg'

function Relatedproducts({data, addToCart}) {
  return (<>
      { data.related.map( (selector, key)=>{
      return (
        <div key={key} className='h-fit m-2'>
        <div className="2xl:w-64 2xl:h-72 xl:w-56 xl:h-64 lg:w-48 lg:h-56  w-40 h-48 bg-neutral-100 p-1 relative hover:p-0 hover:border hover:border-neutral-300">
            <div className='w-7 h-5 xl:w-11 xl:h-9 bg-red-600 flex justify-center items-center absolute z-10'><h5 className="text-white xl:text-xs font-bold text-[0.55rem]">-25%</h5></div>
            <Link to={`/products/${selector.brand.replace(/[\s]/g,'-')}`}> <img className="2xl:h-64 xl:h-56 lg:h-48 w-full h-40 z-0" src={selector.imageurl} alt=""/></Link>
            <button className=" bg-neutral-100 hover:bg-neutral-200 w-full h-8 flex justify-center items-center" onClick={() => addToCart({ brand: selector.brand, units:selector.units , rating: selector.rating, discountprice: selector.discountprice, imgurl: selector.imageurl, size: [6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13], sizeIdex: 0})} ><Cartsvg width="w-5"/>
            <span className='text-md font-semibold text-red-600 ml-1'>Add to cart</span></button>
        </div>
        <h2 className='text-black text-sm font-semibold'>{selector.brand}</h2>
        {selector.rating === 'four' ? <Fourstar styleProp="flex" widthSize="13px" /> :
               selector.rating === 'fourhalf' ? <Fourhalf styleProp="flex" widthSize="13px" /> :
               selector.rating === 'five' ? <Fivestar styleProp='flex' widthSize="13px"/> : <Threestar styleProp="flex" widthSize='13px'/> }
        <span className='font-semibold line-through text-sm text-gray-500'>${selector.price}.00</span><span className='text-black font-semibold ml-1'>${selector.discountprice}.00</span>
        </div>
      )
})}</>
  )
}

export default Relatedproducts
