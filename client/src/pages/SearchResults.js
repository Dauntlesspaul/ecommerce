import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {useState} from 'react'
import Cartsvg from '../components/Cartsvg'
import {Filter, Fourhalf, Fourstar, SearchGlass, Sort, Fivestar, Threestar} from '../components/Svg'
import soundUrl from '../assets/sounds/90s-game-ui-6-185099.mp3';
import {ToastContainer, toast} from 'react-toastify'
import {useLocalStorage} from '../components/useLocalStorageHook'
import soundFailUrl from '../assets/sounds/error-2-126514.mp3';
import SearchInput from '../components/SearchInput';
import { ByCategory, ByPrice, ByRatings, BySort, ColorSlider } from '../components/Selectfilter';
import frameImg from '../assets/images/frame.jpg'


function SearchResults() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(location.state.results);

  const [cart, setCart] = useLocalStorage('cart', []);

  const handleSearchResultsChange = (results) => {
    setSearchResults(results);
  };

  const addToCart = (item) => {
    const soundSuccess = new Audio(soundUrl);
    const soundError = new Audio(soundFailUrl);

    const index = cart.findIndex((obj) => obj.brand === item.brand);

    if (index === -1) {
      const newItem = { ...item, selected: 1 };
      setCart([...cart, newItem]);
      toast.success('New item added to cart!');
      soundSuccess.play();
    } else {
      const updatedCart = cart.map((obj, i) =>
        i === index && obj.selected < obj.units
          ? { ...obj, selected: obj.selected + 1 }
          : obj
      );
      setCart(updatedCart);
      if (updatedCart[index].selected === updatedCart[index].units) {
        toast.warning('Item maximum quantity reached');
        soundError.play();
      } else {
        toast.info('Item quantity increased');
        soundSuccess.play();
      }
    }
  }

  return (
    <>   <div className='bg-gray-100 shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-9 lg:h-14 lg:text-2xl grid place-content-center'> Search Results </div>
    <div className="w-full box-border md:flex mt-5 md:pl-5 justify-center px-2">
    <div className='w-full md:w-[380px] h-fit border-[3px] border-gray-100 px-5 py-4 mb-6'>
    <SearchInput formClass='w-full' inputClass='w-full rounded-l-md p-1 pl-3 bg-neutral-200 outline-none h-[45px]' buttonStyle="h-[45px] -ml-5 w-14 flex justify-center items-center  rounded-r-md bg-gray-900 text-white hover:bg-gray-800 " content={<SearchGlass fillColor='white'/>}/>
    <h2 className='flex items-center text-xl my-1'><span><Filter fillColor='black'/></span>&nbsp;Filters</h2>
    <ByRatings onSearchResultsChange={handleSearchResultsChange}/>
    <ByCategory onSearchResultsChange={handleSearchResultsChange}/>
    <ByPrice onSearchResultsChange={handleSearchResultsChange}/>
    <hr className='my-2'/>
    <h2 className='flex items-center text-xl my-1'><span><Sort fillColor='black'/></span>&nbsp;Sort</h2>
    <BySort/>
    <div className="hidden md:block">
    <hr className='my-2'/>
    <h2 className='flex items-center text-xl my-1'>Price Filter</h2>
    <ColorSlider/>
    </div>
    <hr className='my-2 hidden md:block'/>
    <div className='w-full h-[350px] mt-3 hidden md:block'>
      <img src={frameImg} className='w-full h-full border-gray-200 border-[2px]' alt='frame'/>
    </div>
    </div>
    <div className=" md:mx-10  w-full md:w-[600px] lg:w-[800px] xl:w-[900px] border-[3px] border-gray-100 md:px-3 mb-4">
    <div className='text-black  md:text-2xl text-xl   font-semibold w-full h-9 lg:h-14 lg:text-2xl -mb-3 mt-3 pl-3'> Search Results</div>
    <div className='w-full flex flex-wrap justify-start '>
      {searchResults.length > 0 ? searchResults.map((result, index) => (
         <div key={index} className=" h-fit m-2">
            <div className=" xl:w-56 xl:h-64 lg:w-48 lg:h-56 w-40 h-48 bg-neutral-100 p-1 relative hover:p-1.5">
              <div className="w-7 h-5 xl:w-11 xl:h-9 bg-red-600 flex justify-center items-center absolute">
                <h5 className="text-white xl:text-xs font-bold text-[0.55rem]">-{((result.price-result.discountprice)*100/result.price).toFixed(0)}%</h5>
              </div>
              <Link to={`/men/products/${result.brand.replace(/[\s]/, '-')}`}>
                <img className="xl:h-56 lg:h-48 w-full h-40 z-0" src={result.imageurl} alt="" />
              </Link>
              <button className="bg-neutral-100 hover:bg-neutral-200 w-full h-7 flex justify-center items-center" onClick={() => addToCart({ brand: result.brand, units: result.units, rating: result.rating, discountprice: result.discountprice, imgurl: result.imageurl, size: [38, 40, 41, 43, 44, 45, 46, 47], sizeIdex: 0 })}>
                <Cartsvg width="w-5" />
                <span className="text-sm font-semibold text-red-600 ml-1">Add to cart</span>
              </button>
            </div>
            <h2 className="text-black lg:text-lg text-sm font-semibold">{result.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</h2>
            {result.rating === 'four' ? <Fourstar styleProp="flex" widthSize="13px" /> :
               result.rating === 'fourhalf' ? <Fourhalf styleProp="flex" widthSize="13px" /> :
               result.rating === 'five' ? <Fivestar styleProp='flex' widthSize="13px"/> : <Threestar styleProp="flex" widthSize='13px'/> }
            <span className="font-semibold line-through text-sm text-gray-500">${result.price}</span>
            <span className="text-black font-semibold ml-1">${result.discountprice}</span>
          </div>
        ))
      : <span className='w-fit h-fit ml-3'>No Search Result Found</span>}
      </div>
    </div>
    <ToastContainer/>
  </div>
  </>);
}

export default SearchResults;
