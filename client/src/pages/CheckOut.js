import React, { useEffect, useState, useRef, useCallback } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import createAxiosInstance from '../components/axiosInstance';
import { date, dateFree, dateTwo } from '../components/DeliveryDate';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import VerticalStepper from '../components/VerticalStepper'; 
import HorizontalStepper from '../components/HorizontalStepper';
import { Tag } from '../components/Svg';
import { RotatingLines } from 'react-loader-spinner'; 
import Cod from '../assets/images/newcod.png';
import Stripe from '../assets/images/pay-with-stripe.png';
import Tooltip from '@mui/material/Tooltip';
import { ToastContainer } from 'react-toastify';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { IconButton } from '@mui/material';
import CheckOutSkeleton from '../components/CheckOutSkeleton';
import CircularIndeterminate from '../components/Loader'

const axiosInstance = createAxiosInstance();

const steps = [
    { label: 'PAYMENT', description: 'Choose payment method.' },
    { label: 'ADDRESS', description: 'Provide your shipping address.' },
    { label: 'SHIPPING', description: 'Select your shipping options.' },
    { label: 'DELIVERY', description: 'Review and confirm your order.' }
];

function Checkout() {
    const [total, setTotal] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [address, setAddress] = useState(null);
    const [details, setDetails] = useState(null);
    const [user, setUser] = useState('');
    const [shippingprice, setShippingPrice] = useState(0);
    const [paymentmethod, setPaymentMethod] = useState(null);
    const [nextButton, setNextButton] = useState(true);
    const [loading, setLoading] = useState(true)
    const [submiting, setSubmiting] = useState(false)
    const couponRef = useRef(null);
    const navigate = useNavigate()
    const location = useLocation()
    const { validating, coupon, setCoupon, handleValidate, couponCode, couponDisplay, cart } = useOutletContext();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('lg'));
    

    useEffect(() => {
        let totalAmount = 0;
        cart.forEach((item) => {
            totalAmount += item.discountprice * item.selected;
        });
        setTotal(totalAmount);
    }, [cart]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axiosInstance.get('/useraddress');
                setLoading(false)
                setAddress(response.data);
                setUser({ name: response.data.firstname + ' ' + response.data.lastname });
            } catch (error) {
                console.log(error);
                navigate('/login', { state: { from: location.pathname } });
            }
        };
        fetchAddresses();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        validateNextButton();
        // eslint-disable-next-line
    }, [details, shippingprice, paymentmethod, activeStep]);

    const validateNextButton = () => {
        if (activeStep === 0 && paymentmethod === 'cod') {
            setNextButton(!paymentmethod);
        }else if(activeStep === 0 && paymentmethod !== 'cod'){
            setNextButton(true);
        }else if (activeStep === 1) {
            setNextButton(!details);
        } else if (activeStep === 2) {
            setNextButton(shippingprice === '');
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleAddressChange = (selectedDetails) => {
        setDetails(selectedDetails);
    };

    const handleShipping = (event) => {
        const price = Number(event.target.value);
        setShippingPrice(price);
    };

    const handlePaymentMethod = (event) => {
        const paymentType = event.target.value;
        setPaymentMethod(paymentType);
    };

    const handleKeyPress = useCallback((event) => {
        if (event.key === 'Enter') {
            couponRef.current.click();
        }
    }, []);
    const handleMakePayment = async() =>{
        setSubmiting(true)
        if(paymentmethod === 'cod'){
            try{

                let phoneNumber = details.phone.replace(/\s+/g, '');
                const customerDetails = {
                    address: {
                        line1: `${details.houseno}, ${details.street}`,
                        city: details.city,
                        postal_code: details.zipcode,
                        state: details.state,
                        country: details.country,
                    },
                    email: address.email,
                    name: user.name,
                    phone: phoneNumber,
                }
                const amount_discount = ((total* 10) / 100) * 100
                const amount_shipping = shippingprice * 100
                const totalDetails = { amount_discount, amount_shipping }
                const amountTotal = (total + shippingprice - (total * 10 / 100)) * 100
                const amountSubtotal = total * 100
                const response = await axiosInstance.post('/create-checkout-cod', {
                'cart': cart,
                amountTotal,
                totalDetails,
                amountSubtotal,
                customerDetails,
                couponCode,
            })

            setSubmiting(false)
            window.location.href = response.data.url
            }catch(error){
                console.log(error)
            }
        }
        else{
            try{
                
                const response = await axiosInstance.post('/create-checkout-session', {
                'cart': cart,
                user: user.name,
                'couponCode': couponCode
            })
            setSubmiting(false)
            window.location.href = response.data.url
            }catch(error){
                console.log(error)
            }
        }
    }
    if(loading){
        return(
            <div className='w-full'>
            <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center'>
                <div className="relative z-1 flex items-center justify-center h-full">
                    <h1 className="text-white text-xl md:text-4xl">Payment</h1>
                </div>
            </div>
            <CheckOutSkeleton/>
            </div>
        )
    }

    return (
        <div className='w-full'>
            {/* Header Section */}
            <div className='relative bg-layer-img bg-cover bg-overlay bg-bottom shadow-md shadow-gray-300 text-black text-xl font-bold w-full h-36 grid md:h-64 place-content-center'>
                <div className="relative z-1 flex items-center justify-center h-full">
                    <h1 className="text-white text-xl md:text-4xl">Payment</h1>
                </div>
            </div>
            <div className='grid place-items-center my-7 px-3'>
                <div className='w-full  lg:w-11/12 md:flex'>
                    <div className='w-full grid place-items-center md:h-fit'>
                        {isSmallScreen ? (
                            <VerticalStepper steps={steps} activeStep={activeStep} />
                        ) : (
                            <HorizontalStepper steps={steps} activeStep={activeStep} />
                        )}

                        {/* Content for Each Step */}
                        <div className='w-full mt-3'>
                      
                            {activeStep === 0 && (
                           <div>
                           <Typography variant="h6">Select your payment method</Typography>
                           <div className='text-base my-2 md:text-lg'>
                               <FormControl>
                                   <RadioGroup
                                       aria-labelledby="demo-radio-buttons-group-label-payment-method"
                                       defaultValue=""
                                       name="payment-method-buttons-group"
                                       value={paymentmethod}
                                       onChange={handlePaymentMethod}
                                   >
                                       <FormControlLabel
                                           value={'cod'}
                                           control={<Radio />}
                                           label={<img src={Cod} className='h-10' alt='Cash on delivery' />}
                                           sx={{ marginBottom: '15px' }}
                                       />
                                       <FormControlLabel
                                           value={'stripe'}
                                           control={<Radio />}
                                           label={<img src={Stripe} className='w-40' alt='Stripe' />}
                                       />
                                   </RadioGroup>
                               </FormControl>
                           </div>
                       </div>
                            )}
                            {activeStep === 1 && (
                                 <span>
                                 <FormControl>
                                     <RadioGroup
                                         aria-labelledby="demo-radio-buttons-group-label"
                                         defaultValue=""
                                         name="radio-buttons-group"
                                         value={details ? `${details.houseno}, ${details.street}, ${details.city}, ${details.state} ${details.country}.` : ''}
                                         onChange={(event) => {
                                             const selectedAddress = address.addresses.find(addr => {
                                                 const deliveryAddress = `${addr.houseno}, ${addr.street}, ${addr.city}, ${addr.state} ${addr.country}.`;
                                                 return deliveryAddress === event.target.value;
                                             });
                                             handleAddressChange(selectedAddress);
                                         }}
                                     >
                                         {address &&
                                             address.addresses.map((shippingAddress, i) => {
                                                 const deliveryAddress = `${shippingAddress.houseno}, ${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.country}.`;

                                                 return (
                                                     <div className='text-base md:text-lg' key={i}>
                                                         <FormControlLabel
                                                             value={deliveryAddress}
                                                             control={<Radio />}
                                                             label={deliveryAddress}
                                                         />
                                                     </div>
                                                 );
                                             })
                                             
                                         }
                                     </RadioGroup>
                                 </FormControl>

                                         {address.addresses.length === 0 && <span className='text-black'>No address found, click on the add button bellow to add new address</span>}
                                 <div>
                                 <Tooltip title="Add" placement="right">
                                     <IconButton onClick={()=> navigate('/profile/address/newaddress')} sx={{marginLeft: '-10px'}}>
                                     <AddCircleOutlineOutlinedIcon/>
                                     </IconButton>
                                 </Tooltip>    
                                 </div>
                             </span>
                                
                            )}
                            {activeStep === 2 && (
                               <div className='text-base md:text-lg'>
                               <FormControl>
                                   <RadioGroup
                                       aria-labelledby="demo-radio-buttons-group-label-shipping"
                                       defaultValue=""
                                       name="shipping-buttons-group"
                                       value={shippingprice}
                                       onChange={handleShipping}
                                   >
                                       <FormControlLabel
                                           value={0}
                                           control={<Radio />}
                                           label='Free (5-7 business days)'
                                       />
                                       <FormControlLabel
                                           value={15}
                                           control={<Radio />}
                                           label='1 business day'
                                       />
                                       <FormControlLabel
                                           value={10}
                                           control={<Radio />}
                                           label='2 business days'
                                       />
                                   </RadioGroup>
                               </FormControl>
                           </div> 
                            )}
                            {activeStep === 3 && (
                                <div className='text-base md:text-lg'>
                                    <Typography sx={{ fontWeight: '500',fontSize: '16px', [theme.breakpoints.up('md')]: {fontSize: '18px', },}}>Reviews and Confirmation</Typography>
                                    <h2><span className='font-medium'>Name:</span> {user.name}</h2>
                                    <h2><span className='font-medium'>Shipping Address:</span> {details.houseno + ', ' + details.street + ', ' + details.city + ', ' + details.zipcode + ', ' + details.state + ', ' + details.country + '.'}</h2>
                                    <h2><span className='font-medium'>Phone:</span> {details.phone}</h2>
                                    <h2><span className='font-medium'>Method of Payment:</span> {paymentmethod === 'cod' ? <span>Cash on Delivery</span> : <span>Stripe</span>}</h2>
                                    <h2 className='font-medium'>Items & Quantity</h2>
                                    {cart.map((item, i) => {
                                        return (
                                            <h2 key={i}>
                                                {item.brand + ' X ' + item.selected + ' size(s): ' + item.sizeIndex.map(size=> ' ' + item.size[size])}
                                            </h2>
                                        );
                                    })}
                                </div>
                            )}

                          
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack}>
                                        Back
                                    </Button>
                                )}
                                {activeStep !== steps.length - 1 && (
                                    <Button disabled={nextButton} variant="contained" onClick={handleNext}>
                                        {activeStep === steps.length - 2 ? 'Review' : 'Next'}
                                    </Button>
                                )}
                            </Box>
                        </div>
                    </div>
                    
                 
                    <div className='w-full grid place-items-center h-fit lg:ml-4'>
                        <div className='md:px-8 px-6 md:max-w-[550px] mt-11 md:mt-0 md:w-[450px] border-2 shadow-sm shadow-gray-300 border-gray-200 w-full p-2 grid'>
                            <h2 className='text-black text-xl mt-3 md:text-2xl font-semibold'>Order Summary</h2>
                            <p className='flex justify-between my-2'><span className='md:text-lg'>Price</span><span className='md:text-lg'>${total}.00</span></p>
                            <p className='flex justify-between my-2'><span className='md:text-lg'>Shipping</span><span className='md:text-lg'>{shippingprice === 0 ? <span>Free</span> : <span>$ {shippingprice}.00</span>}</span></p>
                            <p className='flex justify-between my-2'><span className='md:text-lg'>Discount</span>{couponDisplay ? <span className='md:text-lg'>10% OFF</span> : <span className='md:text-lg'>N/A</span>}</p>
                            <p className='flex justify-between my-2'><span className='md:text-lg'>Coupon Code</span><span className='md:text-lg'>{couponCode}</span></p>
                            <hr />
                            <p className='flex justify-between my-2'><span className='md:text-lg'>TOTAL</span><span className='md:text-lg'>${(total + shippingprice - (couponDisplay ? ((total) * 10 / 100) : 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span></p>
                            <p className='flex justify-between my-2'><span className='md:text-lg'>Delivery Date</span><span>{shippingprice === 0 ? dateFree() : shippingprice === 15 ? date() : dateTwo()}</span></p>
                            {(
                            (paymentmethod === 'cod' && activeStep === 3) ||
                            (paymentmethod === 'stripe' && activeStep === 0)
                            ) && (
                            submiting ? (
                                <Button
                                variant='contained'
                                disabled={submiting}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                 >
                                <CircularIndeterminate />
                                </Button>
                            ) : (
                                <Button onClick={handleMakePayment} variant='contained'>
                                Make payment
                                </Button>
                            )
                            )}
                        </div>
                        {((activeStep === 3 && paymentmethod === 'cod') || (activeStep === 0 && paymentmethod === 'stripe')) && (
                            <div className='md:px-8 px-6 md:max-w-[550px] md:w-[450px] mt-3 border-2 shadow-sm shadow-gray-300 border-gray-200 w-full p-2 grid'>
                                <h2 className='text-black text-xl font-semibold'>Coupon</h2>
                                <p className='my-2 md:text-lg'>I have few coupon codes for you <span className='font-bold md:text-lg '>"DAUNTLESS", </span><span className='font-bold md:text-lg'>"DSS432",</span> <span className='font-bold md:text-lg'>"WIT21S",</span> <span className='font-bold md:text-lg'>"DWITS",</span> <span className='font-bold md:text-lg'>"DP25L"</span> - Enjoy</p>
                                <div className='flex items-center w-full'>
                                    <input
                                        onKeyDown={handleKeyPress}
                                        type="text"
                                        name="coupon"
                                        value={coupon}
                                        placeholder='Coupon Code'
                                        onChange={(event) => {
                                            const { value } = event.target;
                                            setCoupon(value);
                                        }}
                                        className=' w-full border-2 rounded-none border-slate-200 h-10 text-lg outline-none px-2'
                                    />
                                    <button
                                        ref={couponRef}
                                        onClick={() => handleValidate(coupon)}
                                        className='w-12 border-2 border-gray-200 grid place-content-center bg-white h-10'
                                    >
                                        {validating ? 
                                            <RotatingLines
                                                strokeColor="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                width="23"
                                            />
                                            :
                                            <Tag fillColor="grey" widthSize='w-6 h-full scale-x-[-1]' />
                                        }
                                    </button>
                                    <ToastContainer />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
