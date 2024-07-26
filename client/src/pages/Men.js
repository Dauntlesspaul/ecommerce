import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cartsvg from '../components/Cartsvg';
import { Link,  useOutletContext  } from 'react-router-dom';
import { faChevronRight,faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Fourhalf, Fourstar, Fivestar, Threestar } from '../components/Svg';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ToastContainer} from 'react-toastify';
import {useEffect, useState} from 'react'
import CustomSkeleton from '../components/CustomSkeleton'
import { useLocation, useNavigate} from 'react-router-dom';
import createAxiosInstance from '../components/axiosInstance'
import DraggableCartButton from '../components/DraggableCartButton';
import { Button } from '@mui/material';
  library.add(faChevronLeft, faChevronRight)
  
const axiosInstance = createAxiosInstance()
const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

function Men() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const navigate = useNavigate()
    const {cart, updateCart, wishList, wishlist} = useOutletContext()

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
        const fetchData = async () => {
            try {
              const page = new URLSearchParams(location.search).get('page') || 1;
                setLoading(true)
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
      if(page <= totalPages){
      navigate(`/men/?page=${page}`);
      }
  };

    


  return (
   <>
    <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64  place-content-center'> 
                <div class="relative z-1 flex items-center justify-center h-full">
                <h1 class="text-white text-xl md:text-4xl">Men Category</h1>
                </div>
     </div>
     {loading ? 
     <>
      <div className="w-full box-border flex mt-5 justify-center">
        <div className='flex flex-wrap w-fit md:w-[600px] lg:w-[800px] justify-center xl:w-[900px]'>
             <CustomSkeleton cards={6}/>
        </div>
      </div>
     </>
    :  
    <>
    <div className="w-full box-border flex mt-5 justify-center">
    <div className="flex flex-wrap w-fit md:w-[600px] lg:w-[800px] justify-center xl:w-[900px]">
      {data.data.map((selector, key) => {
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
          <div key={key} className="h-fit m-2">
            <div className="2xl:w-64 xl:w-56 lg:w-48  w-40 h-fit bg-neutral-100 p-1 relative ">
              <div className='w-7 h-6 xl:w-11 xl:h-9 bg-red-600 flex justify-center items-center absolute z-10'>
                <h5 className="text-white xl:text-xs font-bold text-[0.55rem]">-{((selector.price-selector.discountprice)*100/selector.price).toFixed(0)}%</h5>
              </div>
              <div className='overflow-hidden'>
              <Link to={`/men/products/${selector.brand.replace(/[\s]/, '-')}`}>
              <img className="2xl:h-64 xl:h-56 lg:h-48 w-full h-40 z-0 transition-transform duration-300 transform hover:scale-150" src={selector.imageurl}  alt="" loading='lazy' />
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
            <h2 className='text-black lg:text-lg text-sm font-semibold'>{selector.brand.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1)).join(' ')}</h2>
            {selector.rating === 4 ? <Fourstar styleProp="flex" widthSize="13px" /> :
                  selector.rating === 4.5 ? <Fourhalf styleProp="flex" widthSize="13px" /> :
                  selector.rating === 5 ? <Fivestar styleProp='flex' widthSize="13px"/> : <Threestar styleProp="flex" widthSize='13px'/> }
            <span className='font-semibold line-through text-sm text-gray-500'>${selector.price}.00</span>
            <span className='text-black font-semibold ml-1'>${selector.discountprice}.00</span>
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
        <div className='mx-4 text-white bg-zinc-900 md:font-semibold shadow shadow-zinc-950 h-11 w-11 flex justify-center items-center'>
            { data.page || 1}
        </div>
        {data.page < data.totalPages && <button onClick={()=>handlePageChange(data.afterPage)}>
            <FontAwesomeIcon className=' hover:text-gray-600' icon="fa-solid fa-chevron-right" />
            </button>
         }
     </div>
   </div>
   <DraggableCartButton cart={cart}/>
   </>
    } 
</>)}

export default Men
