import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cartsvg from '../components/Cartsvg';
import { Link } from 'react-router-dom';
import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Fourhalf, Fourstar, Fivestar, Threestar } from '../components/Svg';
import { useLocalStorage } from '../components/useLocalStorageHook'
import soundUrl from '../assets/sounds/90s-game-ui-6-185099.mp3';
import soundFailUrl from '../assets/sounds/error-2-126514.mp3';
import { ToastContainer, toast } from 'react-toastify';
import {useEffect, useState,} from 'react'
import axios from 'axios'
import CustomSkeleton from '../components/CustomSkeleton'
import { useLocation, useNavigate} from 'react-router-dom';
const axiosInstance = axios.create({
    baseURL: 'http://172.20.10.9:8000',
    timeout: 30000,
  });
  library.add(faChevronLeft, faChevronRight)
  

function Men() {
    const [cart, setCart] = useLocalStorage('cart', []);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const navigate = useNavigate()

    
    useEffect(() => {
        const fetchData = async () => {
            try {
              const page = new URLSearchParams(location.search).get('page') || 1;
                const response = await axiosInstance.get(`/men/?page=${page}`);
    
                setData(response.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    
    }, [location.search]);

    const handlePageChange = (page) => {
      const totalPages = data.totalPages
      if(page < totalPages){
      navigate(`/men/?page=${page}`);
      }
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
    };


        

    
    if(loading){
        return(
            <div className="w-full box-border flex md:mt-5 justify-center">
            <div className='flex flex-wrap w-fit md:w-[600px] lg:w-[800px] justify-center xl:w-[900px]'>
             <CustomSkeleton cards={6}/>
             </div>
             </div>
        )
    }else{
    

  return (
   <>
   <div className='bg-gray-100 shadow-md shadow-gray-300 text-blck text-xl font-bold w-full h-9 lg:h-14 lg:text-2xl grid place-content-center'> Men </div>
    <div className="w-full box-border flex md:mt-5 justify-center">
    <div className="flex flex-wrap w-fit md:w-[600px] lg:w-[800px] justify-center xl:w-[900px]">
      {data.data.map((selector, key) => {
        return (
          <div key={key} className="h-fit m-2">
            <div className="2xl:w-64 2xl:h-72 xl:w-56 xl:h-64 lg:w-48 lg:h-56 w-40 h-48 bg-neutral-100 p-1 relative hover:p-0 hover:border hover:border-neutral-300">
              <div className="w-7 h-5 xl:w-11 xl:h-9 bg-red-600 flex justify-center items-center absolute z-10">
                <h5 className="text-white xl:text-xs font-bold text-[0.55rem]">-{((selector.price-selector.discountprice)*100/selector.price).toFixed(0)}%</h5>
              </div>
              <Link to={`/men/products/${selector.brand.replace(/[\s]/, '-')}`}>
                <img className="2xl:h-64 xl:h-56 lg:h-48 w-full h-40 z-0" src={selector.imageurl} alt="" />
              </Link>
              <button className="bg-neutral-100 hover:bg-neutral-200 w-full h-8 flex justify-center items-center" onClick={() => addToCart({ brand: selector.brand, units: selector.units, rating: selector.rating, discountprice: selector.discountprice, imgurl: selector.imageurl, size: [38, 40, 41, 43, 44, 45, 46, 47], sizeIdex: 0 })}>
                <Cartsvg width="w-5" />
                <span className="text-md font-semibold text-red-600 ml-1">Add to cart</span>
              </button>
            </div>
            <h2 className="text-black lg:text-lg text-sm font-semibold">{selector.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</h2>
            {selector.rating === 'four' ? <Fourstar styleProp="flex" widthSize="13px" /> :
               selector.rating === 'fourhalf' ? <Fourhalf styleProp="flex" widthSize="13px" /> :
               selector.rating === 'five' ? <Fivestar styleProp='flex' widthSize="13px"/> : <Threestar styleProp="flex" widthSize='13px'/> }
            <span className="font-semibold line-through text-sm text-gray-500">${selector.price}.00</span>
            <span className="text-black font-semibold ml-1">${selector.discountprice}.00</span>
          </div>
        );
      })}
    
    </div>
 
    <ToastContainer/>
  </div>
     <div className='w-full grid place-items-center my-5'>
        <div className='w-fit px-7 flex items-center justify-between'>
       {data.page > 1 && <button
        onClick={()=>handlePageChange(data.beforePage)}
        ><FontAwesomeIcon className=' hover:text-gray-600' icon="fa-solid fa-chevron-left" />
        </button>
       }
        <div
        className='mx-4 bg-gray-200 md:font-semibold shadow shadow-gray-300 h-11 w-11 flex justify-center items-center'
        >
            { data.page || 1}
        </div>
        {data.page < data.totalPages - 1 && <button onClick={()=>handlePageChange(data.afterPage)}>
            <FontAwesomeIcon className=' hover:text-gray-600' icon="fa-solid fa-chevron-right" />
            </button>
         }
     </div>
   </div>
   </>
)}
}

export default Men
