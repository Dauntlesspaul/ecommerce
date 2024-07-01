import React, { useState, useEffect } from 'react';

const SearchInput = ({ onSearch, initialValue = '', formClass, inputClass, buttonStyle, content }) => {
  const [searchInput, setSearchInput] = useState(initialValue);

  useEffect(() => {
    setSearchInput(initialValue);
  }, [initialValue]);

  const handleSearchInput = (event) => {
    const { value } = event.target;
    setSearchInput(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchInput);
  };

  return (
    <div className="mt-1  box-border flex justify-center w-full">
    <form onSubmit={handleSubmit} className={formClass}>
    <fieldset className='flex'>
    <label htmlFor='search'/>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchInput}
        className={inputClass}
        required
        placeholder='Search by Category or by Brand'
      />
      <button type="submit" className={buttonStyle}>
        {content}
      </button>
      </fieldset>
    </form>
    </div>
  )
};

export default SearchInput;
