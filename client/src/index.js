import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'
import LandingPage from './pages/LandingPage';
import Layout from './components/Layout';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Post from './pages/Post'
import Cart from './pages/Cart';
import Store from './pages/Store'
import Men from './pages/Men'
import Profile from './pages/Profile'
import Products from './pages/Products';
import Women from './pages/Women'
import SearchResults from './pages/SearchResults';
import { GoogleOAuthProvider } from '@react-oauth/google';
import  { SkeletonTheme } from 'react-loading-skeleton';
import Signup from './pages/Signup';
import ScrollToTop from './components/ScrollToTop.js'
import EmailVerification from './pages/EmailVerification';
import Address from './pages/Address.js';
import NewAddress from './pages/NewAddress.js';
import EditAddress from './pages/EditAddress.js';
import PasswordManagement from './pages/PasswordManagement.js';
import Wishlist from './pages/Wishlist.js';
import Checkout from './pages/CheckOut.js';
import PersonalInfo from './pages/PersonalInfo.js';
import SuccessPage from './pages/SuccessPage.js';
import MyOrder from './pages/MyOrder.js';
import ForgotPassword from './pages/ForgotPassword.js';
import ChangePassword from './pages/ChangePassword.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="309719589701-kj23qdj87udopfa87o1dpojlntpucdj3.apps.googleusercontent.com">
    <SkeletonTheme baseColor='#dee5e8' highlightColor='#fcfdfd'>
    <BrowserRouter>
    <ScrollToTop />
   <Routes>
    <Route  path='/' element={<Layout/>}>
    <Route index element={<LandingPage/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgot-password' element={<ForgotPassword/>}/>
    <Route path="users/:id/:email/reset-link/:token" element={<ChangePassword/>} />
    <Route path='/post' element={<Post/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/success' element={<SuccessPage/>}/>
    <Route path='/wishlist' element={<Wishlist/>}/>
    <Route path='/cart/checkout' element={<Checkout/>}/>
    <Route path='/men' element={<Men/>}/>
    <Route path='/women' element={<Women/>}/>
    <Route path='/search-results' element={<SearchResults/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/profile/personal-info' element={<PersonalInfo/>}/>
    <Route path='/profile/address' element={<Address/>}/>
    <Route path='/profile/my-order' element={<MyOrder/>}/>
    <Route path='/profile/passwordmanagement' element={<PasswordManagement/>}/>
    <Route path="/profile/address/editaddress" element={<EditAddress/>} />
    <Route path='/profile/address/newaddress' element={<NewAddress/>}/>
    <Route path='/products/:name' element={<Products/>}/>
    <Route path="/:anypath/products/:name" element={<Products />} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/allproducts" element={<Store/>} />
    </Route>
    <Route path="users/:id/verify/:token" element={<EmailVerification/>} />
   </Routes>
  </BrowserRouter>
  </SkeletonTheme>
  </GoogleOAuthProvider>
);


reportWebVitals();
