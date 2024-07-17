import React, { useEffect, useState, useRef } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import Cartsvg from './Cartsvg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import shlogo from '../assets/images/shlogo1.png';
import AnimatedSentences from './FramerMotion';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import createAxiosInstance from './axiosInstance'
const axiosInstance = createAxiosInstance()

library.add(faUser);

function Header({ cartCount, wishlistCount}) {
  const [value, setValue] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();
  const [online, setOnline] = useState(false)

  const validRoutes = ['/', '/men', '/women', '/about', '/contact'];

 

  useEffect(() => {
    if (validRoutes.includes(location.pathname)) {
      setValue(location.pathname);
    } else {
      setValue(false);  
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

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
  }, [location.pathname])

  const [checked, setChecked] = useState(false);
  const slideRef = useRef();
  const homeRef = useRef();

  const handleCurtain = () => {
    setChecked((prevState) => {
      if (!prevState) {
        slideRef.current.style.height = '50px';
      } else {
        slideRef.current.style.height = '0';
      }
      return !prevState;
    });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  const goHome = () => {
    homeRef.current.click();
  };

  return (
    <>
      <div className="w-full relative">
        <div>
          <AnimatedSentences />
        </div>
        <div className="w-full h-14 py-2 lg:px-40 px-4 box-border flex items-center bg-black">
          <div className="flex justify-between items-center w-full">
            <button onClick={goHome}>
              <img className="md:h-9 h-8" src={shlogo} alt="" />
            </button>
            <nav>
              <ul className="justify-evenly hidden md:flex text-white font-medium text-md lg:text-lg">
                <Box sx={{ width: '100%' }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="wrapped label tabs example"
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: 'white',
                      },
                    }}
                    sx={{
                      '& .MuiTab-root': {
                        color: 'gray',
                        '&:hover': {
                          color: 'white',
                        },
                        '&.Mui-selected': {
                          color: 'white',
                        },
                      },
                    }}
                  >
                    <Tab value="/" label="Home" wrapped ref={homeRef} />
                    <Tab value="/men" label="Men" />
                    <Tab value="/women" label="Women" />
                    <Tab label="About" />
                    <Tab label="Contact Us" />
                  </Tabs>
                </Box>
              </ul>
            </nav>
            <div className="flex justify-between items-center w-32 md:w-[94px] relative">
            <Link to="/cart">
                <Cartsvg fillColor="white" width="w-6" />
                  <span className="w-4 h-4 flex justify-center items-center rounded-full bg-red-600 text-white absolute text-xs left-3 md:-top-1 top-0">
                    {cartCount}
                  </span>
              </Link>
              <Link to="/wishlist">
                  <FavoriteBorderOutlinedIcon sx={{ color: 'white', fontSize: '26px'}} />
                  <span className="w-4 h-4 flex justify-center items-center rounded-full bg-red-600 text-white absolute text-xs left-12 md:-top-1 top-0">
                    {wishlistCount}
                  </span>
              </Link>
              <Link to="/login">
                <FontAwesomeIcon icon="fa-regular fa-user" className="text-white text-[21px] mt-1" />
                {online && <div className='h-2 w-2 bg-green-400 rounded-full top-[2px] right-10 absolute md:right-[1px] md:-top-[1px]'></div>}
              </Link>
              <div className="menu md:hidden md:w-0 md:h-0 mt-2">
                <label htmlFor="check">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleCurtain}
                    className="hidden"
                    id="check"
                  />
                  <span></span>
                  <span></span>
                  <span></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={slideRef}
          className="md:hidden w-full h-0 overflow-hidden grid place-items-center transition-height duration-500 ease-linear bg-gray-100 relative right-0"
        >
          <nav className="w-full">
          <Box className="container mx-auto max-w-screen-xl px-4">
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: 'black',
              },
            }}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                color: '#5F6060',
                fontWeight: '700',
                '&.Mui-selected': {
                  color: 'black',
                },
                padding: {
                  xs: '0 4px', 
                  sm: '0 8px', 
                  md: '0 12px', 
                  lg: '0 16px', 
                },
                margin: {
                  xs: '0 2px', 
                  sm: '0 4px', 
                  md: '0 6px', 
                  lg: '0 8px', 
                },
                minWidth: 0, 
              },
              '& .MuiTabs-scroller': {
                overflow: 'hidden',
              },
              '& .MuiTabs-flexContainer': {
                justifyContent: 'space-between', 
              },
            }}
          >
            <Tab value="/" label="Home" ref={homeRef} />
            <Tab value="/men" label="Men" />
            <Tab value="/women" label="Women" />
            <Tab  label="About" />
            <Tab  label="Contact Us" />
          </Tabs>
        </Box>
      </Box>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Header;
