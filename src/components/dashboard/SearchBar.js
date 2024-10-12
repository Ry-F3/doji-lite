import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
<div className="d-flex justify-content-center align-items-center">
  <div className="input-group">
    {/* Magnifying Glass Icon */}
    <span
      className="input-group-text bg-transparent border-0 d-flex align-items-center"
      style={{ height: '38px' }} // Match the height of the input
    >
      <i className="fa fa-search"></i> {/* Font Awesome Magnifying Glass Icon */}
    </span>

    {/* Curved Search Bar (borderless) */}
    <input
      type="text"
      className="form-control border-0 text-muted"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleInputChange}
      style={{
        borderRadius: '10px',
        padding: '12px 15px',
        height: '38px',
        boxShadow: 'none',
      }}
    />
  </div>
</div>
    
  );
};

export default SearchBar;
