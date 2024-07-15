import React, { useEffect, useState} from 'react';
import { useParams, useNavigate, useOutletContext, Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBan} from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Cartsvg from '../components/Cartsvg';
import Relatedproducts from '../components/Relatedproducts';
import { ToastContainer} from 'react-toastify'
import ProductSkeleton from '../components/ProductSkeleton';
import CustomSkeleton from '../components/CustomSkeleton';
import createAxiosInstance from '../components/axiosInstance'
import { Button } from '@mui/material';
import profilepic3 from '../assets/images/martha cynthia.jpg';
import profilepic1 from '../assets/images/paul cregs.jpg';
import profilepic2 from '../assets/images/sarah deke.jpg';
import { RateMe } from '../components/FlowbiteRating';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import DraggableCartButton from '../components/DraggableCartButton';
import timeAgo from '../components/Time'
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import CircularIndeterminate from '../components/Loader'
import DeleteCommentPopover from '../components/DeleteComment';
import defaultimg from '../assets/images/default-user-img.png';

library.add(faArrowLeft, faPenToSquare, faBan)

const axiosInstance = createAxiosInstance()

const Products = () => {

  const {updateCart, cart, wishList, wishlist, deleteItem, toast} = useOutletContext()
  const [brandname, setBrandName] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { name } = useParams();
  const navigate = useNavigate()
  const [include, setInclude] = useState(false)
  const [value, setValue] = useState(1)
  const [verifiedBuyer, setVerifiedBuyer] = useState(false)
  const [text, setText] = useState('')
  const [comments, setComments] = useState([])
  const [commenting, setCommenting] = useState(false)
  const [online, setOnline] = useState(null)

  const handleRatingChange = (event, newValue) => {
    setValue(Math.max(newValue, 1));
  };

  const handleDeleteItem = (items) => {
    deleteItem(items)
    setInclude(false)
  }

  const handleAddToCart = (items) => {
    setInclude(true)
    updateCart(items)
  }

  const handleTextInput = (event) => {
    const { value } = event.target
    setText(value)
  }

  const handleSubmit = async () => {
    const formDataObject = new FormData()
    formDataObject.append('rating', value)
    formDataObject.append('comment', text)
    formDataObject.append('itemId', data.data[0]._id)

     if (text.trim() ===''){
       toast.info('Type in your review')
       return;
     }
    try {
      setCommenting(true)
      await axiosInstance.post('/addreview', formDataObject)
      setCommenting(false)
      setText('')
      setValue(1)
      fetchComments(data.data[0]._id)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = async (productId) => {
    try {
      const response = await axiosInstance.get(`/fetch-comments/?productId=${productId}`)
      setComments(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get(`/products/${name}`);
        setData(response.data);
        setLoading(false);

        const brand = response.data.data[0].brand;
        const index = cart.findIndex((obj) => obj.brand === brand);
        setInclude(index !== -1);

        fetchComments(response.data.data[0]._id);

      } catch (error) {
        console.error(error);
      }
    };

    fetchProductData();

    setBrandName(() => {
      let removeHyphen = name.replace(/[-]/g, ' ');
      let nameArray = removeHyphen.split(' ').map(capitalize => capitalize[0].toUpperCase() + capitalize.slice(1));
      return nameArray.join(' ');
    });
    // eslint-disable-next-line 
  }, [name]);
  
  useEffect(()=>{
  const verified = async()=>{
    try{
      await axiosInstance.get('/is-verified-buyer')
      setVerifiedBuyer(true)
    }catch(error){
      console.log(error)
      setVerifiedBuyer(false)
    }}
  verified()
  }, [])
 

  useEffect(() => {
    const checkOnlineUser = async () => {
      try {
        const response = await axiosInstance.get('/online')
        setOnline(response.data.user)
      } catch (error) {
        console.log(error)
        setOnline(null)
      }
    }
    checkOnlineUser()
  }, [])

  const handleDeleteComment = async(commentId) =>{
    try{

     await axiosInstance.post(`/delete-comment/?commentId=${commentId}`)  
     fetchComments(data.data[0]._id)
    }catch(error){
      console.log(error)
    }
  }

  return (<>
  
  <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64  place-content-center'> 
    <div className="relative z-1 flex items-center justify-center h-full">
      <h1 className="text-white text-xl md:text-4xl">Product Preview</h1>
    </div>
  </div>
    <div className='mb-8 px-1 box-border '>
      <div className='flex justify-center xl:px-32'>
        <div className='w-fit'>
          <div  className=' md:my-7 my-4 w-full px-[3%]'>
          <Button onClick={()=> navigate(-1)}
          sx={{
            backgroundColor: "#E5E6E7 ",
            color: '#2F2F2F',
            marginTop: '20px',
            '&:hover':{
            backgroundColor: '#E4E5E5'
          }
          }}
          
           >
            <FontAwesomeIcon className='text-sm mr-1 text-slate-600 ' icon="fa-solid fa-arrow-left" />Back
          </Button>
          </div>
          <div className='md:flex max-w-5xl'>
            <div className="image-container flex justify-center md:w-fit md:mx-4 w-full my-4">
              <div className='w-11/12 md:w-96 h-[378px] shadow-md shadow-slate-300'>
                {loading && <Skeleton className='w-full h-full'/>}
                {!loading && <img className='w-full h-full' src={data.data[0].imageurl} alt=''/>}
              </div>
            </div>
            <div className=' px-2 '>
              <div className='w-10/12 h-6 md:mt-4 lg:mb-6 '>{ loading ? <Skeleton className='h-full'/> 
              : <h2 className='text-xl lg:text-4xl font-medium'>{brandname}</h2>}
              </div>
              {loading ? <ProductSkeleton/> :
              <> <hr className='my-2 border-t-[1px]  border-[#d8d8d8]'/>
                <h2 className='text-md md:text-xl font-semibold'><DescriptionOutlinedIcon/> Product Description</h2>
                {!loading && <p className='md:text-lg text-[#808080]'>{data.data[0].description}</p>}
       
                <hr className='my-2 border-t-[1px]  border-[#d8d8d8]'/>
                <h2 className='text-md font-semibold md:text-xl'><AttachMoneyIcon/> Price</h2>
                {!loading && <div className='flex items-center'>
                  <span className=' line-through text-sm text-gray-400 mr-2 md:text-lg'>${data.data[0].price}.00</span>
                  <span className='mr-3 md:text-lg'>${data.data[0].discountprice}.00</span>
                  <span className='w-fit  h-10 flex justify-center items-center font-semibold text-xs px-1 text-white bg-red-600'>
                    {((data.data[0].price-data.data[0].discountprice)*100/data.data[0].price).toFixed(0)}% OFF
                  </span>
                </div>}
                <hr className='my-2 border-t-[1px]  border-[#d8d8d8]'/>
                <h2 className='text-md font-semibold md:text-xl'><StoreOutlinedIcon/> Availability</h2>
                {!loading && <h2 className='text-md md:text-lg text-[#808080]'>{data.data[0].units} (units) </h2>}
                <hr className='my-2 border-t-[1px]  border-[#d8d8d8]'/>
                { !include ? 
                  <button
                    onClick={() => handleAddToCart({ brand: data.data[0].brand, units:data.data[0].units , rating: data.data[0].rating, discountprice: data.data[0].discountprice, imgurl: data.data[0].imageurl, size: [6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13], sizeIdex: 0})}
                    className='flex justify-evenly items-center my-2 cursor-pointer border-none rounded-2xl font-semibold shadow-sm shadow-slate-300 bg-green-700 hover:bg-green-600 text-white lg:w-40 lg:h-11 lg:rounded-3xl lg:px-5 w-32 h-9'
                  >
                    <Cartsvg fillColor="white" width="w-4"/> Add to Cart  
                  </button> :
                  <button
                    onClick={() => handleDeleteItem({ brand: data.data[0].brand, units:data.data[0].units , rating: data.data[0].rating, discountprice: data.data[0].discountprice, imgurl: data.data[0].imageurl, size: [6, 6.5, 7, 7.5, 8, 9, 10, 11, 12, 13], sizeIdex: 0})}
                    className='flex px-4 justify-evenly items-center my-2 cursor-pointer border-none rounded-2xl bg-red-600 font-semibold hover:bg-red-500 text-white lg:w-40 lg:h-11 lg:rounded-3xl lg:px-8 w-32 h-9 shadow-sm shadow-slate-300'
                  >
                    <FontAwesomeIcon icon="fa-solid fa-ban" /> Remove 
                  </button>
                }
              </>
              }
            </div>
          </div>
          <div className='w-full px-2 max-w-5xl'>
           {!loading && <RateMe rate={data.data[0].rating} />}
            <h2 className=' md:my-3 text-xl md:text-2xl font-medium mt-8'>Reviews</h2>
            <div className=' '>
            <hr className='my-2 border-t-[1px]  border-[#d8d8d8]'/>

            <div className='space-y-8'>
            {!loading && <>
              {data.data[0].category === 'women' ? 
              <><div className='w-full'>
                <div className='flex items-center'>
                  <div className="overflow-hidden md:h-12 md:w-12 h-10 w-10 rounded-full">
                  <img src={profilepic3} alt="profile" className="object-cover h-full w-full" />
                </div>
                <div className='flex items-center ml-2'> 
                  <span className='text-md  font-semibold text-black'>Martha Cynthia</span>
                      <VerifiedIcon sx={{ color:"blue", fontSize: '16px', marginLeft: '3px'}} />
                  </div>
                </div>
                <div className=''>
                      <Rating name="read-only" precision={0.1} size='small'  sx={{ marginTop:"3px"}} value={5} readOnly />
                      <p>I was skeptical about buying shoes online, but after reading the positive reviews of Shoe Haven, I decided to give them a try. I'm so glad I did! The ordering process was seamless, and my shoes arrived quickly. They fit perfectly and exceeded my expectations in terms of quality. I'll definitely be a repeat customer.</p>
                      <span className=' float-right italic text-[#808080] text-sm'>2 weeks ago</span>
                </div>
            </div>

            <div className='w-full'>
                <div className='flex items-center'>
                  <div className="overflow-hidden md:h-12 md:w-12 h-10 w-10 rounded-full">
                  <img src={profilepic2} alt="profile" className="object-cover h-full w-full" />
                </div>
                <div className='flex items-center ml-2'> 
                  <span className='text-md  font-semibold text-black'>Sarah Duke</span>
                   <VerifiedIcon sx={{ color:"blue", fontSize: '16px', marginLeft: '3px'}} />
                  </div>
                </div>
                <div className=''>
                      <Rating name="read-only" precision={0.1} size='small'  sx={{ marginTop:"3px"}} value={5} readOnly />
                      <p> I recently purchased a pair of shoes from Shoe Haven, and I couldn't be happier with my decision. Not only do they look fantastic, but they're also incredibly comfortable. I've received so many compliments whenever I wear them. Definitely recommend!.</p>
                      <span className=' float-right italic text-[#808080] text-sm'>2 weeks ago</span>
                </div>
            </div>
            </> :
            <div className='w-full'>
                <div className='flex items-center'>
                  <div className="overflow-hidden md:h-12 md:w-12 h-10 w-10 rounded-full">
                  <img src={profilepic1} alt="profile" className="object-cover h-full w-full" />
                </div>
                <div className='flex items-center ml-2'> 
                  <span className='text-md  font-semibold text-black'>Paul Cregs</span>
                      <VerifiedIcon sx={{ color:"blue", fontSize: '16px', marginLeft: '3px'}} />
                  </div>
                </div>
                <div className=''>
                      <Rating name="read-only" precision={0.1} size='small'  sx={{ marginTop:"3px"}} value={5} readOnly />
                      <p> I've been a loyal customer of Shoe Haven for years, and I can confidently say that their quality is unmatched. Every pair I've owned has been durable, comfortable, and stylish. I wouldn't shop anywhere else for my footwear needs.</p>
                      <span className=' float-right italic text-[#808080] text-sm'>2 weeks ago</span>
                </div>
            </div>
            }</>}
              {
                comments.map((selector, i)=>{
                  return (
                    <div key={i} className='w-full'>
                    <div className='flex items-center'>
                      <div className="overflow-hidden md:h-12 md:w-12 h-10 w-10 rounded-full">
                        <img src={selector.user.profilePicture || defaultimg} alt="profile" className="object-cover h-full w-full" />
                      </div>
                      <div className='flex items-center ml-2 flex-1 justify-between'>
                        <div className='flex items-center '>
                          <h2 className='text-md font-semibold text-black whitespace-nowrap overflow-hidden text-ellipsis'>
                            {selector.user.firstname + ' ' + selector.user.lastname}
                          </h2>
                          {verifiedBuyer && <VerifiedIcon sx={{ color: "blue", fontSize: '16px', ml: 1 }} />}
                        </div>
                       {online === selector.user._id && <DeleteCommentPopover  commentId={selector._id} deleteComment={handleDeleteComment} className='ml-auto' />}
                      </div>
                    </div>
                    <div className='mt-2'>
                      <Rating name="read-only" precision={0.1} size='small' value={selector.rating} readOnly sx={{ marginTop: "3px" }} />
                      <p>{selector.text}</p>
                      <span className='float-right italic text-[#808080] text-sm'>{timeAgo(selector.createdAt)}</span>
                    </div>
                  </div>
                  )
                })
              }

              </div>

              <div className='my-6'>
              <h2 className=' md:my-3 text-lg md:text-2xl font-medium mt-8'><RateReviewOutlinedIcon sx={{ fontSize: '26px'}}/> Write a review</h2>
               {!online ? 
               <>
               <hr className='my-2 border-t-[1px]  border-[#d8d8d8]'/>
               <p className='md:text-lg'> You need to <span className='font-semibold underline'><Link to="/login">Log in</Link> </span> to write a review </p>
               </>
               : <>
                <div className='my-2'>
                  <textarea 
                  name='comment'
                  value={text}
                  onChange={handleTextInput}
                  className='w-full border p-2 focus:outline focus:outline-black  border-slate-300 h-56'/>
                  <span className='flex items-center md:my-3 my-2'>
                    <h2 className='font-semibold'>Rating:</h2>
                  <Rating
                    name="simple-controlled"
                    value={value}
                    precision={1}
                    onChange={handleRatingChange}
                  />
                  </span>
                  <Button 
                    sx={{
                      color: "white",
                      fontWeight: '700',
                      width: '120px',
                      backgroundColor: 'black ',
                      '&:hover':{
                          backgroundColor: '#2F2E2E'
                      }
                      }}
                      disabled={commenting}
                     onClick={handleSubmit}
                      >
                      {commenting ? <CircularIndeterminate/> : <span>Add Review</span>}
                  </Button>
                </div>
                </>
                  }
              </div>





            </div>
           
            <h2 className='md:my-3 text-xl md:text-2xl font-medium mt-8'>You may also like</h2>
          </div>
         
          <ToastContainer/>
        </div>
        <DraggableCartButton cart={cart}/>
      </div>
    </div>
    </>
   
  );
};

export default Products;
