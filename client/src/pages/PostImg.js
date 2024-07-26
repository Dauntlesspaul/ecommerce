import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularIndeterminate from '../components/Loader';

const axiosInstance = axios.create({
  baseURL: 'http://172.20.10.14:8000/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

const MyForms = () => {
  const [formData, setFormData] = useState({
    files: [], 
    productName: '', 
  });
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataObject = new FormData();
      
      formData.files.forEach(file => {
        formDataObject.append('files', file);
      });
    
      formDataObject.append('productName', formData.productName);

      setLoader(true); 

      await axiosInstance.post('/upload-imgs', formDataObject)
        .then((response) => {
          console.log('Form submitted successfully!', response.data);
          resetForm();
        })
        .catch((err) => {
          console.error('Error submitting form:', err);
        })
        .finally(() => {
          setLoader(false); 
        });
    } catch (error) {
      console.error('Form submission failed!', error);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); 
    setFormData({
      ...formData,
      files: files,
    });
  };

  const handleProductNameChange = (event) => {
    const { value } = event.target;
    setFormData({
      ...formData,
      productName: value,
    });
  };

  const resetForm = () => {
    setFormData({
      files: [], 
      productName: '',
    });
  };

  const handleLoader = () => {
    if (formData.files.length > 0 && formData.productName !== '') {
      setLoader(true);
    }
  };

  return (
    <div className='w-full grid justify-items-center'>
      <form className='overflow-x-hidden px-1 box-border w-9/12 mt-16' encType="multipart/form-data" onSubmit={handleSubmit}>
        <input
          type="file"
          name="files"
          onChange={handleFileChange}
          className='mb-2'
          multiple 
          required
          accept='image/*'
        />

        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleProductNameChange}
          placeholder="Enter product name"
          className='mb-2 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
          required
        />

        <button
          onClick={handleLoader}
          className='w-full rounded-lg h-9 text-white my-4 bg-stone-900 flex justify-center items-center'
          type='submit'
          style={{
            backgroundColor: formData.files.length > 0 && formData.productName !== '' && !loader ? 'black' : 'grey',
            cursor: formData.files.length > 0 && formData.productName !== '' && !loader ? 'pointer' : 'not-allowed'
          }}
        >
          {loader ? <CircularIndeterminate /> : <span>Submit</span>}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default MyForms;
