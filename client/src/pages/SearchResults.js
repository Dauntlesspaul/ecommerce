import React, { useState } from 'react';
import { useLocation, Link, useOutletContext } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import Cartsvg from '../components/Cartsvg';
import { Filter, Fourhalf, Fourstar, SearchGlass, Sort, Fivestar, Threestar } from '../components/Svg';
import SearchInput from '../components/SearchInput';
import { ByCategory, ByPrice, ByRatings, BySort, ColorSlider } from '../components/Selectfilter';
import frameImg from '../assets/images/frame.jpg';
import createAxiosInstance from '../components/axiosInstance'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DraggableCartButton from '../components/DraggableCartButton';
import { Button } from '@mui/material';

const axiosInstance = createAxiosInstance()
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function SearchResults() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(location.state.results);
  const [searchInput, setSearchInput] = useState(location.state.searchInput || '');
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedSort, setSelectedSort] = useState(null);
  const {cart,toast,soundError, updateCart, wishList, wishlist} = useOutletContext()

  const isItemInWishlist = (item) => {
    return wishlist.some((wishlistItem) => wishlistItem.brand === item.brand);
  };

  const handleUpdateWhislist = (event, newValue, item) => {
    wishList(item, newValue);
  };

  const handleAddToCart = (item) => {
    updateCart(item);
  };

  const handleSearch = async (query) => {
    try {
      if (query.trim().length > 2) {
        const response = await axiosInstance.get(`/search?q=${query}`);
        setSearchResults(response.data);
        setSearchInput(query);
      } else {
        toast.info('Please enter at least three characters to search.');
        soundError();
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while searching. Please try again later.');
      soundError();
    }
  };

  const handleSearchResultsChange = (results) => {
    setSearchResults(results.data);
  };


  const handleRatingChange = (selectedOption) => {
    setSelectedRating(selectedOption);
    setSelectedCategory(null);
    setSelectedPrice(null);
    setSelectedSort(null);
    setSearchInput('');
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedRating(null);
    setSelectedCategory(selectedOption);
    setSelectedPrice(null);
    setSelectedSort(null);
    setSearchInput('');
  };

  const handlePriceChange = (selectedOption) => {
    setSelectedRating(null);
    setSelectedCategory(null);
    setSelectedPrice(selectedOption);
    setSelectedSort(null);
    setSearchInput('');
  };

  const handleSortChange = (selectedOption) => {
    setSelectedRating(null);
    setSelectedCategory(null);
    setSelectedPrice(null);
    setSelectedSort(selectedOption);
    setSearchInput('');
  };


  return (
    <>
      <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center'>
        <div className="relative z-1 flex items-center justify-center h-full">
          <h1 className="text-white text-xl md:text-4xl">Search Results</h1>
        </div>
      </div>
      <div className="w-full box-border md:flex mt-5 md:pl-5 justify-center px-2">
        <div className='w-full md:w-[380px] h-fit border-[3px] border-gray-100 px-5 py-4 mb-6'>
          <SearchInput
            onSearch={handleSearch}
            formClass='w-full'
            inputClass='w-full rounded-l-md p-1 pl-3 bg-neutral-200 outline-none h-[45px]'
            buttonStyle="h-[45px] -ml-5 w-14 flex justify-center items-center  rounded-r-md bg-gray-900 text-white hover:bg-gray-800 "
            content={<SearchGlass fillColor='white' />}
            initialValue={searchInput}
          />
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
          <div className='text-black md:text-2xl text-xl font-semibold w-full h-9 lg:h-14 lg:text-2xl -mb-3 mt-3 pl-3'>Search Results</div>
          <div className='w-full flex flex-wrap justify-start'>
            {searchResults.length > 0 ? searchResults.map((results, key) => {
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

              return (
                    <div key={key} className="h-fit m-2">
                      <div className="2xl:w-64 xl:w-56 lg:w-48  w-40 h-fit bg-neutral-100 p-1 relative ">
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
          </div>
        </div>
        <ToastContainer />
      </div>
      <DraggableCartButton cart={cart} />
    </>
  );
}

export default SearchResults;
