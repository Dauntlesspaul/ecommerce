import React from 'react'
import Cartsvg from './Cartsvg'
import { Link } from 'react-router-dom'
import {Fourhalf, Fourstar, Fivestar, Threestar} from './Svg'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Button } from '@mui/material';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function WomensCollection({ data, updateCart, wishList, wishlist }) {
  const isItemInWishlist = (item) => {
    return wishlist.some((wishlistItem) => wishlistItem.brand === item.brand);
  };

  const handleUpdateWhislist = (event, newValue, item) => {
    wishList(item, newValue);
  };


  const handleAddToCart = (item) => {
    updateCart(item)
    };

  return (
    <div className="w-full box-border flex justify-center">
      <div className='flex flex-wrap w-fit self-center justify-evenly'>
    {data.topsellers.map((selector, key)=>{

const itemData = {
  brand: selector.brand,
  units: selector.units,
  price: selector.price,
  rating: selector.rating,
  discountprice: selector.discountprice,
  imgurl: selector.imageurl,
  size: [6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13],
  sizeIdex: 0
};

const isInWishlist = isItemInWishlist(itemData);
   return (
        <div key={key}  className='h-fit m-2'>
        <div className="2xl:w-64 xl:w-56 lg:w-48  w-40 h-fit bg-neutral-100 p-1 relative">
            <div className='w-7 h-6 xl:w-11 xl:h-9 bg-red-600 flex justify-center items-center absolute z-10'><h5 className="text-white xl:text-xs font-bold text-[0.55rem]">-{((selector.price-selector.discountprice)*100/selector.price).toFixed(0)}%</h5></div>
            <div className=' overflow-hidden'>
            <Link to={`products/${selector.brand.replace(/[\s]/,'-')}`}> 
            <img className="2xl:h-64 xl:h-56 lg:h-48 w-full h-40 z-0 transition-transform duration-300 transform hover:scale-150" src={selector.imageurl}  alt="" loading="lazy"/>
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
        <h2 className='text-black lg:text-lg text-sm md:text-md  font-semibold'>{selector.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</h2>
        {selector.rating === 4 ? <Fourstar styleProp="flex" widthSize="13px" /> :
               selector.rating === 4.5 ? <Fourhalf styleProp="flex" widthSize="13px" /> :
               selector.rating === 5 ? <Fivestar styleProp='flex' widthSize="13px"/> : <Threestar styleProp="flex" widthSize='13px'/> }
        <span className='font-semibold line-through text-sm text-gray-500'>${selector.price}.00</span><span className='text-black font-semibold ml-1'>${selector.discountprice}.00</span>
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
  })}
  </div>
</div>
  )
}

export default WomensCollection
