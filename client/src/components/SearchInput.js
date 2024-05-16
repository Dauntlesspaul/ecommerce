import React from 'react'
import {useState} from 'react'

function SearchInput({onSearch, formClass, inputClass, buttonStyle, content}) {
    
 const [searchInput, setSearchInput] = useState('')
 const handleSearchInput = (event) =>{
    const {value} = event.target
    setSearchInput(value)
 }
const  handleSubmit = (event)=>{
    event.preventDefault();
    onSearch(searchInput)
 }


  return (
    <div className="mt-1  box-border flex justify-center w-full">
        <form onSubmit={handleSubmit} className={formClass}>
          <fieldset className='flex'>
          <label htmlFor='search'/>
          <input 
          id='search'
          name='search'
          value={searchInput}
          onChange={handleSearchInput}
          className={inputClass}
          type='text'
          placeholder='Search by Category or by Brand'
          />
          <button className={buttonStyle} >
           {content}
          </button>
          </fieldset>
        </form>
      </div>
  )
}

export default SearchInput
