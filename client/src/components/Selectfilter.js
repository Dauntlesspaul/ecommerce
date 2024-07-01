import React from 'react'
import Select from "react-select";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import createAxiosInstance from './axiosInstance';

const axiosInstance = createAxiosInstance()

const RatingsOptions = [
  { value: 5, label: "5 Star"},
  { value: 4.5, label: "4.5 Star"},
  { value: 4, label: "4 Star" },
  { value: 3, label: "3 Star" },
  { value: 2, label: "2 Star" },
  { value: 1, label: "1 Star" },
];
const CategoryOptions = [
  { value: "men", label: "Men"},
  { value: "women", label: "Women"},
];
const PriceOptions = [
  { value: "200less", label: "Less than $200"},
  { value: "below400", label: "Less than $400"},
  { value: "above400", label: "Greater than $400" },
];
const SortOptions = [
  { value: "newest", label: "Newest Products"},
  { value: "below400", label: "Oldest Products"},
  { value: "above400", label: "Most Purchased" },
];

const customStyles = {
  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? "black" : "black",
    backgroundColor: state.isSelected ? "#a0a0a0" : "#FDFEFE",
    '&:hover': {
      backgroundColor: "#e0e0e0", 
    },
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#F4F6F7",
    border: "1px solid #A6ACAF ",
    boxShadow: "none",
    height: "30px"
  }),
  singleValue: (defaultStyles) => ({ ...defaultStyles, color: "black" }),
};

export function ByRatings({ selectedRating, setSelectedRating, onSearchResultsChange }) {
  const handleSelectChange = async (selectedOption) => {
    setSelectedRating(selectedOption);
    try {
      const response = await axiosInstance.get('/filter', {
        params: {
          selectedOption: selectedOption.value,
          name: 'By Ratings'
        }
      });
      onSearchResultsChange(response.data);
    } catch(err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Select
        value={selectedRating}
        onChange={handleSelectChange}
        options={RatingsOptions}
        placeholder='By Ratings'
        className='h-10'
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
}

export function ByCategory({ selectedCategory, setSelectedCategory, onSearchResultsChange }) {
  const handleSelectChange = async (selectedOption) => {
    setSelectedCategory(selectedOption);
    try {
      const response = await axiosInstance.get('/filter', {
        params: {
          selectedOption: selectedOption.value,
          name: 'By Category'
        }
      });
      onSearchResultsChange(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='my-2'>
      <Select
        value={selectedCategory}
        onChange={handleSelectChange}
        options={CategoryOptions}
        placeholder='By Category'
        className='h-10'
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
}

export function ByPrice({ selectedPrice, setSelectedPrice, onSearchResultsChange }) {
  const handleSelectChange = async (selectedOption) => {
    setSelectedPrice(selectedOption);
    try {
      const response = await axiosInstance.get('/filter', {
        params: {
          selectedOption: selectedOption.value,
          name: 'By Price'
        }
      });
      onSearchResultsChange(response.data);
    } catch(err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Select
        value={selectedPrice}
        onChange={handleSelectChange}
        options={PriceOptions}
        placeholder='By Price'
        className='h-10'
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
}

export function BySort({ selectedSort, setSelectedSort, onSearchResultsChange }) {
  const handleSelectChange = async (selectedOption) => {
    setSelectedSort(selectedOption);
    try {
      const response = await axiosInstance.get('/filter', {
        params: {
          selectedOption: selectedOption.value,
          name: 'By Sort'
        }
      });
      onSearchResultsChange(response.data);
    } catch(err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Select
        value={selectedSort}
        onChange={handleSelectChange}
        options={SortOptions}
        placeholder='Sort Products'
        className='h-10'
        styles={customStyles}
        isSearchable={false}
      />
    </div>
  );
}



export function ColorSlider() {
    return (
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Temperature"
          defaultValue={50}
          value={97}
          sx={{
            color: '#CB4335 ',
            height: 8, 
            '& .MuiSlider-thumb': {
              width: 16,
              height: 16, 
              '&:hover, &.Mui-focusVisible': {
                boxShadow: '0px 0px 0px 8px rgba(229, 10, 30, 0.1)',
              },
            },
            '& .MuiSlider-track': {
              borderRadius: 4, 
            },
            '& .MuiSlider-rail': {
              height: 8, 
              borderRadius: 4, 
            },
          }}
        />
      </Box>
    );
  }

