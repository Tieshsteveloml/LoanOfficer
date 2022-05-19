import React from 'react';
import { NavLink } from 'react-router-dom';

function MobileHeader({updateStat}) {
  const handleClick = ()=>{
    document.body.classList.remove('show-menu')
    updateStat()
  }
  return (
    <div className="mobile-header">
        <div className="backDrop" onClick={handleClick}></div>
       <div className="menuHolder">
        <ul className="">
                <li><NavLink to='/profile' activeclassname="selected" >Get Ideas</NavLink></li>
                <li><NavLink to='/' activeclassname="selected" >Help</NavLink></li>             
            </ul>
       </div>
    </div>
    );
}

export default MobileHeader;
