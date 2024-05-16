import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import '../styles/index.css'
import { useEffect, useState } from 'react'
import NewCollection from '../components/NewCollection'
import MensCollection from '../components/MensCollection'
import WomensCollection from '../components/WomensCollection'
import Topsellers from '../components/Topsellers'
import axios from 'axios'
import CustomSkeleton from '../components/CustomSkeleton'
import { ToastContainer, toast } from 'react-toastify';
import SearchInput from '../components/SearchInput'
import { useNavigate } from 'react-router-dom'
import Testimonies from '../components/Testimonies'
import Sponsor from '../components/Sponsor'
library.add(faUser,faMagnifyingGlass)
const axiosInstance = axios.create({
  baseURL: 'http://172.20.10.9:8000',
  timeout: 30000,
});

function LandingPage() {
 const [data, setData] = useState([])
 const [loading, setLoading] = useState(true);
 const navigate = useNavigate()



  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/landingpage');

            setData(response.data);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();

}, []);

 const handleSearch = async(query)=>{
  try{
    await axiosInstance.get(`/search?q=${query}`)
   
   .then((response)=>{
    navigate(`/search-results?q=${query}`, { state: { results: response.data } })
   }) 
  
  
  } catch(err){
    console.log(err)
  }
 

 }





  return (
    <div className='w-full'>
      <section className=" bg-gray-100 md:py-6 py-5 mb-4">
        <div className="container mx-auto text-center">
            <h2 className="md:text-4xl text-3xl font-bold mb-1 md:mb-4">Welcome to Shoe Haven</h2>
            <p className="text-lg text-gray-700">Discover the perfect pair of shoes for every occasion.</p>
            <p className="text-lg text-gray-700">From casual sneakers to elegant heels, we have something for everyone.</p>
            <a href="#shop" className="md:mt-6 mt-2 inline-block bg-gray-900 text-white md:py-3 py-2 md:px-6 px-4 rounded-lg hover:bg-gray-800">Shop Now</a>
        </div>
      </section>
      <SearchInput onSearch={handleSearch} formClass='w-10/12 md:w-7/12 lg:w-5/12 xl:w-5/12 2xl:w-4/12' inputClass=' outline-none w-full rounded-l-md md:h-12 h-10 p-1 pl-3 bg-neutral-200' buttonStyle="w-20 md:h-12 h-10 rounded-r-md bg-gray-900 -ml-12 text-white hover:bg-gray-800 " content='Search'/>
      <Sponsor/>
      <div className="text-center md:mt-2 ">
        <div className="relative mx-auto md:max-w-lg max-w-xs">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full md:border-t-[2.5px] border-t border-gray-500"></div>
        </div>
            <div className="relative flex justify-center">
            <span className="px-4 bg-white text-black md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-medium font-baba">What's new ? check out our new arrivals</span>
            </div>
        </div>
      </div>
      {loading && <div className="w-full box-border flex justify-center">
     <div className='flex flex-wrap w-fit self-center justify-evenly'>
      <CustomSkeleton cards={4}/>
      </div>
      </div>}
      {!loading && <NewCollection data={data} toast={toast} />}
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
      <CustomSkeleton cards={4}/>
      </div>
      </div>}
      {!loading && <MensCollection data={data} toast={toast} />}
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
      <CustomSkeleton cards={4}/>
      </div>
      </div>}
      {!loading && <WomensCollection data={data} toast={toast} />}
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
      <CustomSkeleton cards={4}/>
      </div>
      </div>}
      {!loading && <Topsellers data={data} toast={toast} />}
      <ToastContainer/>
      <Testimonies/>
      <Sponsor/>
    </div>
  )
}

export default LandingPage
