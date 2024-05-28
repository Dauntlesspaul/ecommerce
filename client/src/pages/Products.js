import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBan} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Fivestar, Fourhalf, Fourstar, Threestar } from '../components/Svg';
import Cartsvg from '../components/Cartsvg';
import Relatedproducts from '../components/Relatedproducts';
import {useLocalStorage} from '../components/useLocalStorageHook'
import soundUrl from '../assets/sounds/90s-game-ui-6-185099.mp3'
import soundFailUrl from '../assets/sounds/error-2-126514.mp3'
import { ToastContainer, toast } from 'react-toastify'
import removeUrl from '../assets/sounds/tap-notification-180637.mp3'
import ProductSkeleton from '../components/ProductSkeleton';
import CustomSkeleton from '../components/CustomSkeleton';
library.add(faArrowLeft, faPenToSquare, faBan)
const axiosInstance = axios.create({
    baseURL: 'http://172.20.10.13:8000',
    timeout: 30000,
});

const Products = () => {
    const [brandname, setBrandName] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { name } = useParams();
    const navigate = useNavigate()
    const [cart, setCart] = useLocalStorage('cart', [])
    const [include, setInclude] = useState(false)

   

 const addToCart = (item) => {

  const soundSuccess = new Audio(soundUrl);
  const soundError = new Audio(soundFailUrl);
 
  const index = cart.findIndex((obj) => obj.brand === item.brand);

  if (index === -1) {

    const newItem = { ...item, selected: 1 };
    setCart([...cart, newItem]);
    toast.success('New item added!');
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
const removeItem = (item) => {
    const removeSound = new Audio(removeUrl);
   
    const index = cart.findIndex((obj) => obj.brand === item.brand);
    const data = cart
    data.splice(index, 1)
    setCart([...data])
        toast.warning('Item removed');
        removeSound.play()
      const store = localStorage.getItem('cart')
      const storeValue = JSON.parse(store)
      if(storeValue.length===1){
        localStorage.setItem('coupon', JSON.stringify(false))
        localStorage.setItem('couponcode', JSON.stringify(''));
      }
  };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/products/${name}`);
                
                setData(response.data);
                setLoading(false)

                const brand = response.data.data[0].brand
                const index = cart.findIndex((obj) => obj.brand === brand);
                if(index === -1){
                    setInclude(false)
                }else{
                    setInclude(true)
                }

            } catch (error) {
                console.error(error);
            }
        };
    
        fetchData();
    
        setBrandName(() => {
            let removeHyphen = name.replace(/[-]/g, ' ');
            let nameArray = removeHyphen.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1));
            return nameArray.join(' ');
        });
    }, [name, cart]);


    return (
        <div className='mb-8 px-1 box-border '>
             <div className='bg-gray-100 shadow-md shadow-gray-300 text-blck text-xl font-bold w-full h-9 lg:h-14 lg:text-2xl grid place-content-center mb-5'>Product Preview</div>
              <div className='flex justify-center xl:px-32'>
                 <div className='w-fit'>
           
                <button onClick={()=> navigate(-1)} className=' md:my-7 shadow-md shadow-gray-200 h-8 w-20 border border-l hover:bg-gray-200 bg-slate-100 '><FontAwesomeIcon className='text-sm mr-1 text-slate-600 ' icon="fa-solid fa-arrow-left" />Back</button>
    
                <div className='md:flex max-w-5xl'>
                <div className="image-container flex justify-center md:w-fit md:mx-4 w-full my-4">
                        <div className=' w-80 h-96'>
                            {loading && <Skeleton className='w-full h-full'/>}
                            {!loading && <img className='w-full h-full' src={data.data[0].imageurl} alt=''/>}
                        </div>
                 </div>
                        <div className=' px-2 '>
                         <div className='w-10/12 h-6 md:mt-4 lg:mb-4 '>{ loading ? <Skeleton className='h-full'/> : <h2 className='text-xl lg:text-3xl font-medium'>{brandname}</h2>}</div>
                         {loading ? <ProductSkeleton/>
                         :
                           <> <hr className='my-1 border-t-2 border-gray-100'/>
                            <h2 className='text-md font-semibold'>Product Description</h2>
                            {!loading && <p>{data.data[0].description}</p>}
                            <hr className='my-1 border-t-2 border-gray-100'/>
                            <h2 className='text-md font-semibold'>Ratings</h2>
                            {!loading && data.data[0].rating === 'four' ? <Fourstar styleProp='flex h-5'/> 
                            :!loading && data.data[0].rating === 'five' ? <Fivestar styleProp='flex h-5'/>
                            :!loading && data.data[0].rating === 'fourhalf' ? <Fourhalf styleProp='flex h-5'/>
                            :!loading && data.data[0].rating === 'three' ? <Threestar styleProp='flex h-5'/>
                            :<Fivestar/>}
                            <hr className='my-1 border-t-2 border-gray-100'/>
                            <h2 className='text-md font-semibold'>Price</h2>
                            {!loading && <div className='flex items-center'><span className=' line-through text-sm text-gray-400 mr-2'>${data.data[0].price}.00</span><span className='mr-3'>${data.data[0].discountprice}.00</span><span className='w-fit  h-10 flex justify-center items-center text-xs px-1 text-white bg-red-600'>{((data.data[0].price-data.data[0].discountprice)*100/data.data[0].price).toFixed(0)}% OFF</span></div>}
                            <hr className='my-1 border-t-2 border-gray-100'/>
                            <h2 className='text-md font-semibold'>Availability</h2>
                            {!loading && <h2>{data.data[0].units} (units) </h2>}
                            <hr className='my-1 border-t-2 border-gray-100'/>
                           { !include ? <button
                            onClick={() => addToCart({ brand: data.data[0].brand, units:data.data[0].units , rating: data.data[0].rating, discountprice: data.data[0].discountprice, imgurl: data.data[0].imageurl, size: [6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13], sizeIdex: 0})}
                            className='flex justify-evenly items-center md:my-2 cursor-pointer border-none rounded-2xl bg-green-700 hover:bg-green-600 text-white lg:w-40 lg:h-11 lg:rounded-3xl lg:px-5 w-32 h-9'
                            >
                             <Cartsvg fillColor="white" width="w-4"/> Add to Cart  
                            </button> :
                                <button
                            onClick={() => removeItem({ brand: data.data[0].brand, units:data.data[0].units , rating: data.data[0].rating, discountprice: data.data[0].discountprice, imgurl: data.data[0].imageurl, size: [6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13], sizeIdex: 0})}
                            className='flex px-4 justify-evenly items-center md:my-2 cursor-pointer border-none rounded-2xl bg-red-600 hover:bg-red-500 text-white lg:w-40 lg:h-11 lg:rounded-3xl lg:px-8 w-32 h-9'
                            >
                             <FontAwesomeIcon icon="fa-solid fa-ban" /> Remove 
                            </button>
                            }
                            </>}
                            </div>
                        </div>
                        <div className='w-full'>
                            <h2 className=' md:my-3 text-xl font-medium mt-8'>Reviews</h2>
                            <div className='xl:w-8/12 grid '>
                            <hr className='my-1 border-t-2 border-gray-100'/>
                                <div className=' md:place-self-start place-self-center my-1 w-11/12 h-fit box-border p-3 border-gray-200 border-2'>
                                    <div className='flex items-center'>
                                        <div className='w-12 h-12 text-3xl rounded-full bg-purple-600 text-white flex justify-center items-center mr-3'> T</div>
                                        <h2 className='text-md font-medium ml-3'>Toshijuba</h2>
                                    </div>
                                 <p> i love this &#128525;!!. one on my favorites since i got it on delivery, it goes well with all of my pant trousers</p>
                                 <div className='flex justify-between mt-1'>
                                    <span className='w-20'> {!loading && data.data[0].rating === 'four' ? <Fourstar styleProp='flex h-3'/> 
                                            :!loading && data.data[0].rating === 'fourhalf' ? <Fourhalf styleProp='flex h-3'/>
                                            :!loading && data.data[0].rating === 'three' ? <Threestar styleProp='flex h-3'/>
                                            :<Fivestar styleProp='flex' widthSize="13px"/>}
                                    </span>
                                    <span className=' italic text-sm'>
                                        2wks ago
                                    </span>
                                 </div>
                                </div>
                            <hr className='my-1 border-t-2 border-gray-100'/>
                            </div>
                            <button
                             className=' md:my-3 font-medium text-md hover:text-slate-600' 
                             onClick={() => navigate("/login")}
                             >
                                 Add a review <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                            </button>
                            <h2 className=' md:my-3 text-xl font-medium mt-8 ml-2'>You may also like</h2>
                            </div>
                            {loading && <div className="w-full box-border flex justify-center">
                            <div className='flex flex-wrap w-fit self-center justify-evenly'>
                            <CustomSkeleton cards={4}/>
                            </div>
                            </div>}
                            <div className="w-fit box-border ">
                                <div className='flex flex-wrap w-fit self-center justify-evenly'>
                                    {!loading && <Relatedproducts data={data} addToCart={addToCart}/>}
                                </div>
                            </div>
                                <ToastContainer/>
                                </div>
                                </div>
                        </div>
    );
}

export default Products;
