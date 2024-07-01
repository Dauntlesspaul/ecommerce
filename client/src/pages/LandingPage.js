import React, { useEffect, useState, useMemo } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link , useOutletContext} from 'react-router-dom';
import soundFailUrl from '../assets/sounds/error-2-126514.mp3';
import createAxiosInstance from '../components/axiosInstance';
import SearchInput from '../components/SearchInput';
import '../styles/index.css';
import NewCollection from '../components/NewCollection';
import MensCollection from '../components/MensCollection';
import WomensCollection from '../components/WomensCollection';
import Topsellers from '../components/Topsellers';
import CustomSkeleton from '../components/CustomSkeleton';
import Testimonies from '../components/Testimonies';
import Sponsor from '../components/Sponsor';
import DraggableCartButton from '../components/DraggableCartButton';
import { ToastContainer} from 'react-toastify';
import ImageSlider from '../components/imageSLider';
import men from '../assets/images/men.jpg'
import women from '../assets/images/women.jpg'

const axiosInstance = createAxiosInstance();
library.add(faUser, faMagnifyingGlass);

function LandingPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const soundError = useMemo(() => new Audio(soundFailUrl), []);
  const { cart, toast, updateCart, wishList, wishlist} = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/landingpage');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const emptyInputRegex = /^\s*$/;

  const handleSearch = async (query) => {
    try {
      if (!emptyInputRegex.test(query) && query.length > 2) {
        const response = await axiosInstance.get(`/search?q=${query}`);
        navigate(`/search-results?q=${query}`, { state: { results: response.data, searchInput: query } });
      } else {
        if (query.length < 3) {
          toast.info('Please enter at least three characters to search.');
        } else {
          toast.info('Please enter a valid search query.');
        }
        soundError.play();
      }
    } catch (err) {
      console.log(err);
      toast.error('An error occurred while searching. Please try again later.');
    }
  };
  if (loading) {
    return (
      
      <div className="preloader z-50">
        <div>
      <svg className="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
          <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
            <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
            <circle cx="43" cy="111" r="13" />
            <circle cx="102" cy="111" r="13" />
          </g>
          <g className="cart__lines" stroke="currentColor">
            <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" strokeDasharray="338 338" strokeDashoffset="-338" />
            <g className="cart__wheel1" transform="rotate(-90,43,111)">
              <circle className="cart__wheel-stroke" cx="43" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
            </g>
            <g className="cart__wheel2" transform="rotate(90,102,111)">
              <circle className="cart__wheel-stroke" cx="102" cy="111" r="13" strokeDasharray="81.68 81.68" strokeDashoffset="81.68" />
            </g>
          </g>
        </g>
      </svg>
        <p className='text-black font-medium text-lg'>Bringing you the goods…</p>
    </div>
    </div>
    );
  }




  return (
    <div className='w-full mb-6'>
      <ToastContainer/>
      <section>
        <div className="bg-intro-img bg-cover bg-center lg:h-[600px] h-72 w-full grid place-items-center">
          <div className="container mx-auto text-center">
            <p className="lg:text-2xl font-bold text-base text-white">Welcome to SHOE HAVEN</p>
            <p className="lg:text-2xl font-bold text-base text-white">Discover the perfect pair of shoes for every occasion.</p>
            <p className="lg:text-2xl font-bold text-base text-white">From casual sneakers to elegant heels, we have something for everyone.</p>
            <Link to="/allproducts" className="md:mt-6 mt-2 inline-block bg-zinc-900 text-white md:py-3 py-2 md:px-6 px-4 rounded-lg font-semibold hover:bg-zinc-800">Shop Now</Link>
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center">
      <SearchInput
        onSearch={handleSearch}
        formClass="lg:-mt-44 w-10/12 mt-6 md:w-7/12 lg:w-5/12 xl:w-5/12 2xl:w-4/12 grid grid-cols-[1fr_auto] gap-2"
        inputClass="outline-none rounded-l-md md:h-12 h-10 p-1 pl-3 bg-neutral-200 w-full"
        buttonStyle="w-24 md:h-12 h-auto rounded-r-md bg-zinc-900 font-semibold text-white hover:bg-zinc-800"
        content={"Search"}
      />
    </div>
      <Sponsor />
      <div className="text-center md:mt-2">
        <div className="relative mx-auto md:max-w-lg max-w-xs">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full md:border-t-[2.5px] border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-black md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-baba">What's new? Check out our new arrivals</span>
          </div>
        </div>
      </div>
      {loading && <div className="w-full box-border flex justify-center">
        <div className='flex flex-wrap w-fit self-center justify-evenly'>
          <CustomSkeleton cards={4} />
        </div>
      </div>}
      {!loading && <NewCollection data={data} updateCart={updateCart} wishList={wishList} wishlist={wishlist}/>}
      <div className="text-center my-4">
        <div className="relative mx-auto md:max-w-[320px] max-w-[210px]">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full md:border-t-[2.5px] border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-black md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-baba">Men's collection</span>
          </div>
        </div>
      </div>
      {loading && <div className="w-full box-border flex justify-center">
        <div className='flex flex-wrap w-fit self-center justify-evenly'>
          <CustomSkeleton cards={4} />
        </div>
      </div>}
      {!loading && <MensCollection data={data} updateCart={updateCart} wishList={wishList} wishlist={wishlist} />}
      <div className="text-center my-4">
        <div className="relative mx-auto md:max-w-[320px] max-w-[210px]">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full md:border-t-[2.5px] border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-black md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-baba">Women's collection</span>
          </div>
        </div>
      </div>
      {loading && <div className="w-full box-border flex justify-center">
        <div className='flex flex-wrap w-fit self-center justify-evenly'>
          <CustomSkeleton cards={4} />
        </div>
      </div>}
      {!loading && <WomensCollection data={data} updateCart={updateCart} wishList={wishList} wishlist={wishlist} />}
      <div className="text-center my-4">
        <div className="relative mx-auto md:max-w-[320px] max-w-[210px]">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full md:border-t-[2.5px] border-t border-gray-500"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-white text-black md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-baba">The top sellers</span>
          </div>
        </div>
      </div>
      {loading && <div className="w-full box-border flex justify-center">
        <div className='flex flex-wrap w-fit self-center justify-evenly'>
          <CustomSkeleton cards={4} />
        </div>
      </div>}
      {!loading && <Topsellers data={data} updateCart={updateCart} wishList={wishList} wishlist={wishlist}/>}
      <Testimonies />
      <div className='w-full bg-gray-100 flex justify-center md:relative'>
        <div className='hidden md:flex'>
          <img src={men} alt=''/>
        </div>
      <div className='lg:h-[500px] lg:w-[500px] md:absolute md:top-0 md:bottom-0 md:m-auto  w-full relative h-[400px] overflow-hidden' >
        <ImageSlider/>
      </div>
      <div className='hidden md:flex'>
          <img src={women} alt=''/>
        </div>
      </div>
      <DraggableCartButton cart={cart}/>
    </div>
  );
}

export default LandingPage;
