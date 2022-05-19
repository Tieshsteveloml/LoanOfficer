import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';

import CallWidget from './CallWidget';
import MobileHeader from './MobileHeader';
import TopHeader from './TopHeader';



function Header() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleClick = ()=>{
    document.body.classList.toggle('show-menu')
    setToggleMenu(!toggleMenu);
  }
  const setToggleMenuMobileBackdrop = ()=>{
    setToggleMenu(false);
  }

  

  return (
    <header>
      <TopHeader/>
      <div className="bottomHeader">
        <div className="container dflx">
          <Link className="logo" to="/"> Mortgage Company </Link>
          <nav className="nav dflx">
            <ul className="nav nav-lists dflx">
              <li><NavLink to='/' activeclassname="selected" >Get Ideas</NavLink></li>
              <li><NavLink to='/' activeclassname="selected" >Help</NavLink></li>             
            </ul>
            <CallWidget/>
            <button className="hamb-btn" onClick={handleClick}> { toggleMenu ? (<i className="fa fa-times"></i>) : (<i className="fa fa-bars"></i>) }  </button>
          </nav>
        </div>
      </div>
      <MobileHeader updateStat={setToggleMenuMobileBackdrop}/>
    </header>
  );
}

export default Header;
