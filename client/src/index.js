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
import Men from './pages/Men'
import Profile from './pages/Profile'
import Products from './pages/Products';
import Women from './pages/Women'
import SearchResults from './pages/SearchResults';
import { GoogleOAuthProvider } from '@react-oauth/google';
import  { SkeletonTheme } from 'react-loading-skeleton';
import Signup from './pages/Signup';
import EmailVerification from './pages/EmailVerification';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="309719589701-kj23qdj87udopfa87o1dpojlntpucdj3.apps.googleusercontent.com">
    <SkeletonTheme baseColor='#dee5e8' highlightColor='#fcfdfd'>
    <BrowserRouter>
   <Routes>
    <Route  path='/' element={<Layout/>}>
    <Route index element={<LandingPage/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/post' element={<Post/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/men' element={<Men/>}/>
    <Route path='/women' element={<Women/>}/>
    <Route path='/search-results' element={<SearchResults/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/products/:name' element={<Products/>}/>
    <Route path="/:anypath/products/:name" element={<Products />} />
    <Route path="/signup" element={<Signup/>} />
    </Route>
    <Route path="users/:id/verify/:token" element={<EmailVerification/>} />
   </Routes>
  </BrowserRouter>
  </SkeletonTheme>
  </GoogleOAuthProvider>
);


reportWebVitals();
