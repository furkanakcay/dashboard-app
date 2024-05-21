import React from 'react';

const SearchBox = ({ placeholder, searchQuery, setSearchQuery }) => {
    return (
        <input
            type="text"
            className="search-input"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
};

export default SearchBox;
