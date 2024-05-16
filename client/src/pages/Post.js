import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularIndeterminate from '../components/Loader';
const axiosInstance = axios.create({
  baseURL: 'http://172.20.10.9:8000', 
  headers: {
    'Content-Type': 'multipart/form-data', 
  }
});

const MyForm = () => {
  const [formData, setFormData] = useState({
    file: null,
    brand: '',
    price: '',
    discountprice: '',
    rating: '',
    category: '',
    description: ''
  });
const [loader, setLoader] = useState(false)
  const resetRef = useRef(null)
  const resetSelect = useRef(null)
  const resetSelect2 = useRef(null)
  const resetSelect3 = useRef(null)

 const resetForm = () => {
    resetRef.current.reset();
    toast.success('item added!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      setFormData({
        file: null,
        brand: '',
        price: '',
        discountprice: '',
        description: '',
        units:'',
        sections:''
      });
      resetSelect.current.selectedIndex=0
      resetSelect2.current.selectedIndex=0
      resetSelect3.current.selectedIndex=0
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataObject = new FormData();
      formDataObject.append('brand', formData.brand);
      formDataObject.append('price', formData.price);
      formDataObject.append('discountprice', formData.discountprice);
      formDataObject.append('rating', formData.rating);
      formDataObject.append('category', formData.category);
      formDataObject.append('section', formData.section);
      formDataObject.append('description', formData.description);
      formDataObject.append('file', formData.file);
      formDataObject.append('units', formData.units);

     await axiosInstance.post('/upload', formDataObject)
      .then((response)=>{
      console.log('Form submitted successfully!', response.data)
      resetForm()
      }).catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
        console.log('good to go!')
      setLoader(false)
      })
    } catch (error) {
      console.error('Form submission failed!', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setFormData({
      ...formData,
      file
    });
  };

 
const handleLoader = () => {

  if (formData.price !== '' && formData.brand !=='' && formData.discountprice !=='' && formData.file !==null && formData.description !=='' && formData.category !=='' && formData.units !=='' && formData.rating !=='' && formData.section !==''){
    setLoader(true)
  } 
};

  return (
    <div className='w-full grid justify-items-center'> 
      <form className=' overflow-x-hidden px-1 box-border w-9/12 mt-16' ref={resetRef} encType="multipart/form-data" onSubmit={handleSubmit}>
        <input 
          type="file" 
          name="file" 
          onChange={handleFileChange} 
          className='mb-2'
          required
          accept='image/*'
        />
        <input 
          type="text" 
          name="brand" 
          value={formData.brand} 
          onChange={handleChange} 
          placeholder="BRAND NAME" 
          className='w-full block border border-black mb-2 bg-slate-100 px-2'
          required
        />
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          placeholder="PRICE" 
          className='w-full block border border-black mb-2 bg-slate-100 px-2'
          required
        />
        <input 
          type="number" 
          name="discountprice" 
          value={formData.discountprice} 
          onChange={handleChange} 
          placeholder="DISCOUNT PRICE" 
          className='w-full block border border-black mb-2 bg-slate-100 px-2'
          required
        />
        <select ref={resetSelect2} className='w-full block border border-black mb-2 rounded-md h-9 bg-slate-100 px-2' onChange={handleChange}  name="rating" required>
          <option selected disabled value='' >RATING</option>
          <option value="five">5</option>
          <option value="fourhalf">4.5</option>
          <option value="four">4</option>
          <option value="three">3</option>
        </select>
        <select  ref={resetSelect} className='w-full block border border-black mb-2 rounded-md h-9 bg-slate-100 px-2' onChange={handleChange}  name="category" required>
          <option selected disabled value='' >CATEGORY</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
        <select  ref={resetSelect3} className='w-full block border border-black mb-2 rounded-md h-9 bg-slate-100 px-2' onChange={handleChange}  name="section" required>
          <option selected disabled value='' >SECTION</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="topsellers">Top sellers</option>
          <option value="newarrivals">New Arrivals</option>
        </select>
        <input 
          type="text" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="DESCRIPTION" 
          className='w-full block border border-black bg-slate-100 px-2'
          required
        />
         <input 
          type="number" 
          name="units" 
          value={formData.units} 
          onChange={handleChange} 
          placeholder="UNITS" 
          className='w-full block border border-black bg-slate-100 px-2'
          required
        />
        <button 
        onClick={handleLoader} 
        className=' w-full rounded-lg h-9 text-white my-4 bg-stone-900 flex justify-center items-center' 
        type='submit'
        style={{ backgroundColor: formData.brand && formData.price && formData.discountprice && formData.description && formData.section && formData.units && formData.category && formData.rating && !loader ? 'black' : 'grey', cursor: (formData.brand && formData.price && formData.discountprice && formData.description && formData.category && formData.rating && !loader) ? 'pointer' : 'not-allowed' }}
        disabled={!formData.brand || !formData.price || !formData.discountprice || !formData.units || !formData.section || !formData.description || !formData.category || !formData.rating}
      >
       {loader ? <CircularIndeterminate/> : <span>Submit</span>}
      </button>
      </form>
     <ToastContainer/> 
    </div>
    
  );
};

export default MyForm;
