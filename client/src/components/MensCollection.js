import React from 'react'
import Cartsvg from './Cartsvg'
import { Link } from 'react-router-dom'
import {Fourhalf, Fourstar, Fivestar, Threestar} from './Svg'
import { useLocalStorage } from './useLocalStorageHook'
import soundUrl from '../assets/sounds/90s-game-ui-6-185099.mp3'
import soundFailUrl from '../assets/sounds/error-2-126514.mp3'

function MensCollection({data, toast}) {
  const [cart, setCart] = useLocalStorage('cart', [])


 const addToCart = (item) => {

  const soundSuccess = new Audio(soundUrl);
  const soundError = new Audio(soundFailUrl);
 
  const index = cart.findIndex((obj) => obj.brand === item.brand);

  if (index === -1) {

    const newItem = { ...item, selected: 1 };
    setCart([...cart, newItem]);
    toast.success('New item added to cart!');
    soundSuccess.play()
  } else {
   
    const updatedCart = cart.map((obj, i) =>
      i === index && obj.selected < obj.units
        ? { ...obj, selected: obj.selected + 1 }
        : obj
    );
    setCart(updatedCart);
     if (updatedCart[index].selected === updatedCart[index].units) {
      toast.warning('Item maximum quantity reached');
      soundError.play()
      
    } else {

      toast.info('Item quantity increased');
      soundSuccess.play()
      
    }
  }
};

  return (
    <div className="w-full box-border flex justify-center">
      <div className='flex flex-wrap w-fit self-center justify-evenly'>
    {data.mencollections.map((selector, key)=>{
   return (
        <div key={key}  className='h-fit m-2'>
        <div className="2xl:w-64 xl:w-56 lg:w-48  w-40 h-fit bg-neutral-100 p-1 relative hover:p-0 hover:border hover:border-neutral-300">
            <div className='w-7 h-5 xl:w-11 xl:h-9 bg-red-600 flex justify-center items-center absolute z-10'><h5 className="text-white xl:text-xs font-bold text-[0.55rem]">-{((selector.price-selector.discountprice)*100/selector.price).toFixed(0)}%</h5></div>
            <Link to={`products/${selector.brand.replace(/[\s]/,'-')}`}> <img className="2xl:h-64 xl:h-56 lg:h-48 w-full h-40 z-0" src={selector.imageurl}  alt=""/></Link>
            <button className=" bg-neutral-100 hover:bg-neutral-200 w-full h-8 flex justify-center items-center" onClick={() => addToCart({ brand: selector.brand, units:selector.units , rating: selector.rating, discountprice: selector.discountprice, imgurl: selector.imageurl, size: [6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13], sizeIdex: 0})} ><Cartsvg width="w-5"/>
            <span className='text-md font-semibold text-red-600 ml-1'>Add to cart</span></button>
        </div>
        <h2 className='text-black lg:text-lg text-sm font-semibold'>{selector.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</h2>
        {selector.rating === 'four' ? <Fourstar styleProp="flex" widthSize="13px" /> :
               selector.rating === 'fourhalf' ? <Fourhalf styleProp="flex" widthSize="13px" /> :
               selector.rating === 'five' ? <Fivestar styleProp='flex' widthSize="13px"/> : <Threestar styleProp="flex" widthSize='13px'/> }
        <span className='font-semibold line-through text-sm text-gray-500'>${selector.price}.00</span><span className='text-black font-semibold ml-1'>${selector.discountprice}.00</span>
    </div>
   )
  })}
  </div>
</div>
  )
}

export default MensCollection
