
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Cartsvg from '../components/Cartsvg';
import { Filter, Fourhalf, Fourstar, SearchGlass, Sort, Fivestar, Threestar } from '../components/Svg';
import { ToastContainer} from 'react-toastify';
import soundFailUrl from '../assets/sounds/error-2-126514.mp3';
import SearchInput from '../components/SearchInput';
import { ByCategory, ByPrice, ByRatings, BySort, ColorSlider } from '../components/Selectfilter';
import frameImg from '../assets/images/frame.jpg';
import createAxiosInstance from '../components/axiosInstance';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import CustomSkeleton from '../components/CustomSkeleton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DraggableCartButton from '../components/DraggableCartButton';
import { Button } from '@mui/material';
library.add(faChevronLeft, faChevronRight);

const axiosInstance = createAxiosInstance();
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function Store() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const [online, setOnline] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();
  const {cart,toast, updateCart, wishList, wishlist} = useOutletContext()

  const isItemInWishlist = (item) => {
    return wishlist.some((wishlistItem) => wishlistItem.brand === item.brand);
  };

  const handleUpdateWhislist = (event, newValue, item) => {
    wishList(item, newValue);
  };

  const handleAddToCart = (item) => {
    updateCart(item);
  };

  useEffect(() => {
    const checkOnlineUser = async () => {
      try {
         await axiosInstance.get('/online')
        setOnline(true)
      } catch (error) {
        console.log(error)
        setOnline(false)
      }
    }
    checkOnlineUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try{
      const page = new URLSearchParams(location.search).get('page') || 1;
      const rating = selectedRating ? selectedRating.value : '';
      const category = selectedCategory ? selectedCategory.value : '';
      const price = selectedPrice ? selectedPrice.value : '';
      const sort = selectedSort ? selectedSort.value : '';

      setLoading(true);
      const response = await axiosInstance.get(`/allproducts/?page=${page}&rating=${rating}&category=${category}&price=${price}&sort=${sort}`);
      setData(response.data);
      setLoading(false);
  }catch(error){
    console.error(error)
    navigate('/login', { state: { from: location.pathname } })
  }
}
fetchData();
// eslint-disable-next-line
  }, [location.search, selectedRating, selectedCategory, selectedPrice, selectedSort, navigate]);

  const handleSearch = async (query) => {
    try {

      
      if (query.trim().length > 2) {
        const response = await axiosInstance.get(`/search-store/?q=${query}`);
        setData(response.data);
      } else {
        toast.info('Please enter at least three characters to search.');
        new Audio(soundFailUrl).play();
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while searching. Please try again later.');
      new Audio(soundFailUrl).play();
    }
  };
  
  const handleSearchResultsChange = (results) => {
    setLoading(true);
    setData(results);
    setLoading(false);
  };

  const handlePageChange = (page) => {
    navigate(`/allproducts/?page=${page}`);
  };


  const handleRatingChange = (selectedOption) => {
    setSelectedRating(selectedOption);
    setSelectedCategory(null);
    setSelectedPrice(null);
    setSelectedSort(null);
    navigate(`/allproducts/?page=1`);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedRating(null);
    setSelectedCategory(selectedOption);
    setSelectedPrice(null);
    setSelectedSort(null);
    navigate(`/allproducts/?page=1`);
  };

  const handlePriceChange = (selectedOption) => {
    setSelectedRating(null);
    setSelectedCategory(null);
    setSelectedPrice(selectedOption);
    setSelectedSort(null);
    navigate(`/allproducts/?page=1`);
  };

  const handleSortChange = (selectedOption) => {
    setSelectedRating(null);
    setSelectedCategory(null);
    setSelectedPrice(null);
    setSelectedSort(selectedOption);
    navigate(`/allproducts/?page=1`);
  };


  if (loading && !online) {
    return (
      <div className="preloader z-50">
        <div>
          <svg
            className="cart"
            role="img"
            aria-label="Shopping cart line animation"
            viewBox="0 0 128 128"
            width="128px"
            height="128px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8">
              <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
                <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
                <circle cx="43" cy="111" r="13" />
                <circle cx="102" cy="111" r="13" />
              </g>
              <g className="cart__lines" stroke="currentColor">
                <polyline
                  className="cart__top"
                  points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80"
                  strokeDasharray="338 338"
                  strokeDashoffset="-338"
                />
                <g className="cart__wheel1" transform="rotate(-90,43,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx="43"
                    cy="111"
                    r="13"
                    strokeDasharray="81.68 81.68"
                    strokeDashoffset="81.68"
                  />
                </g>
                <g className="cart__wheel2" transform="rotate(90,102,111)">
                  <circle
                    className="cart__wheel-stroke"
                    cx="102"
                    cy="111"
                    r="13"
                    strokeDasharray="81.68 81.68"
                    strokeDashoffset="81.68"
                  />
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
    <>
      <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64  place-content-center'>
        <div className="relative z-1 flex items-center justify-center h-full">
          <h1 className="text-white text-xl md:text-4xl">Shoe Catalog</h1>
        </div>
      </div>
      <div className="w-full box-border md:flex mt-5 md:pl-5 justify-center px-2">
        <div className='w-full md:w-[380px] h-fit border-[3px] border-gray-100 px-5 py-4 mb-6'>
          <SearchInput 
          onSearch={handleSearch}
          formClass='w-full' 
          inputClass='w-full rounded-l-md p-1 pl-3 bg-neutral-200 outline-none h-[45px]' 
          buttonStyle="h-[45px] -ml-5 w-14 flex justify-center items-center rounded-r-md bg-gray-900 text-white hover:bg-gray-800"
           content={<SearchGlass fillColor='white' />} />
          <h2 className='flex items-center text-xl my-1'><span><Filter fillColor='black' /></span>&nbsp;Filters</h2>
          <ByRatings selectedRating={selectedRating} setSelectedRating={handleRatingChange} onSearchResultsChange={handleSearchResultsChange} />
          <ByCategory selectedCategory={selectedCategory} setSelectedCategory={handleCategoryChange} onSearchResultsChange={handleSearchResultsChange} />
          <ByPrice selectedPrice={selectedPrice} setSelectedPrice={handlePriceChange} onSearchResultsChange={handleSearchResultsChange} />
          <hr className='my-2' />
          <h2 className='flex items-center text-xl my-1'><span><Sort fillColor='black' /></span>&nbsp;Sort</h2>
          <BySort selectedSort={selectedSort} setSelectedSort={handleSortChange} onSearchResultsChange={handleSearchResultsChange} />
          <div className="hidden md:block">
            <hr className='my-2' />
            <h2 className='flex items-center text-xl my-1'>Price Filter</h2>
            <ColorSlider />
          </div>
          <hr className='my-2 hidden md:block' />
          <div className='w-full h-[350px] mt-3 hidden md:block'>
            <img src={frameImg} className='w-full h-full border-gray-200 border-[2px]' alt='frame' />
          </div>
        </div>
        <div className="md:mx-10 w-full md:w-[600px] lg:w-[800px] xl:w-[900px] border-[3px] border-gray-100 md:px-3 mb-4">
          <div className='text-black md:text-2xl text-xl font-semibold w-full h-9 lg:h-14 lg:text-2xl -mb-3 mt-3 pl-3'> Catalog</div>
          {loading ?
            <>
              <div className="w-full box-border flex md:mt-5 justify-start">
                <div className='flex flex-wrap w-fit md:w-[600px] lg:w-[800px] justify-center xl:w-[900px]'>
                  <CustomSkeleton cards={6} />
                </div>
              </div>
            </>
            :
            <>
              <div className='w-full flex flex-wrap justify-start'>
                {data.data.length > 0 ? data.data.map((results, key) => {
                      const itemData = {
                        brand: results.brand,
                        units: results.units,
                        price: results.price,
                        rating: results.rating,
                        discountprice: results.discountprice,
                        imgurl: results.imageurl,
                        size: [6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13],
                        sizeIdex: 0
                      };
              
                      const isInWishlist = isItemInWishlist(itemData);
                  return(
                    <div key={key} className="h-fit m-2">
                      <div className="2xl:w-64 xl:w-56 lg:w-48  w-40 h-fit bg-neutral-100 p-1 relative">
                        <div className='w-7 h-6 xl:w-11 xl:h-9 bg-red-600 flex justify-center items-center absolute z-10'>
                          <h5 className="text-white xl:text-xs font-bold text-[0.55rem]">-{((results.price-results.discountprice)*100/results.price).toFixed(0)}%</h5>
                        </div>
                        <div className='overflow-hidden'>
                        <Link to={`/men/products/${results.brand.replace(/[\s]/, '-')}`}>
                        <img className="2xl:h-64 xl:h-56 lg:h-48 w-full h-40 z-0 transition-transform duration-300 transform hover:scale-150" src={results.imageurl}  alt="" loading='lazy'/>
                        </Link>
                        </div>
                        <Button 
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: '#E8E7E5',
                          '&:hover':{
                          backgroundColor: '#EAE9E6'
                        },
                        '@media (min-width:1024px)': {
                          fontSize: '15px',
                        },
                        }}
                        variant='contained'
                        onClick={() => handleAddToCart(itemData)}>
                        <Cartsvg width="w-5" />
                        <span className=" text-red-600 ml-1">Add to cart</span>
                      </Button>
                      </div>
                      <h2 className='text-black lg:text-lg text-sm font-semibold'>{results.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</h2>
                      {results.rating === 4 ? <Fourstar styleProp="flex" widthSize="13px" /> :
                            results.rating === 4.5 ? <Fourhalf styleProp="flex" widthSize="13px" /> :
                            results.rating === 5 ? <Fivestar styleProp='flex' widthSize="13px"/> : <Threestar styleProp="flex" widthSize='13px'/> }
                      <span className='font-semibold line-through text-sm text-gray-500'>${results.price}.00</span>
                      <span className='text-black font-semibold ml-1'>${results.discountprice}.00</span>
                      <div>
                      <Box
                        sx={{
                          '& > legend': { mt: 2 },
                        }}
                      >
                        <StyledRating
                          name={`customized-color-${key}`}
                          value={isInWishlist ? 1 : 0}
                          onChange={(event, newValue) => handleUpdateWhislist(event, newValue, itemData)}
                          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                          precision={1}
                          max={1}
                          icon={<FavoriteIcon fontSize="inherit" />}
                          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                        />
                      </Box>
                    </div>
                  </div>
                  )   
                  })
                  : <span className='w-fit h-fit ml-3'>No Search Result Found</span>}
                <div className='w-full grid place-items-center my-5'>
                  <div className='w-fit px-7 flex items-center justify-between'>
                    {data.page > 1 && <button
                      onClick={() => handlePageChange(data.beforePage)}
                    ><FontAwesomeIcon className='hover:text-gray-600' icon="fa-solid fa-chevron-left" />
                    </button>
                    }
                    {data.totalPages > 1 &&
                    <div className='mx-4 text-white bg-zinc-900 md:font-semibold shadow shadow-zinc-950 h-11 w-11 flex justify-center items-center'>
                      {data.page || 1}
                    </div>
                    }
                    {data.page < data.totalPages && <button onClick={() => handlePageChange(data.afterPage)}>
                      <FontAwesomeIcon className='hover:text-gray-600' icon="fa-solid fa-chevron-right" />
                    </button>
                    }
                  </div>
                </div>
              </div>
            </>}
        </div>
        <ToastContainer />
      </div>
      <DraggableCartButton cart={cart}/>
    </>
  );
}

export default Store;
