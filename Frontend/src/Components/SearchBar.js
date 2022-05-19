import React from 'react';
import icon_search from '../images/icon_search.svg';

function SearchBar({setsearchKey,searchFormSubmit}) {
  const handleChange = (e)=>{
    e.preventDefault();
  
   searchFormSubmit()
  }
  return (
    <div className="searchBar">
        <div className="container dflx">
            <form onSubmit={handleChange} >
                <div className="searchWrap">
                    <input type="search" placeholder="Search Here..." name="s" onChange={(e)=> setsearchKey(e.target.value)} />
                    <button className="seachButton"><img src={icon_search} alt="search"/></button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default SearchBar;
