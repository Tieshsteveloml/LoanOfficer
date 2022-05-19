import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { loadState } from '../localStorage'



import email from '../images/icon_email.svg';




function TopHeader() {

    const [ loggedinUser, setLoggedinUser ] = useState(undefined)

    useEffect(() => {
        setLoggedinUser(loadState())
    },[])
    
  return(
    <div className="top-header">
        <div className="container dflx">
            <div className="left dflx">
               
                <ul className="dflx topHeaderNavLink">
                    {loggedinUser === undefined ? (<li><Link to="/login">Login</Link></li>) : (
                    <>
                        <li><Link to="/profile">Profile</Link></li> 
                        <li><Link to="/login" onClick={()=> localStorage.clear('authState') }>Logout</Link></li>
                    </>
                    )}
                    
                    
                </ul>
            </div>
            <div className="right">
                <ul className="dflx">
                    <li> <a href="mailto:needhelp@company.com"> <img src={email} alt="email-icon" /> needhelp@company.com</a> </li>
                    {/* <li> <img src={time} alt="email-icon" />Mon- Sat 8:30 AM  -  6:00PM</li> */}
                </ul>
            </div>
        </div>
    </div>
  );
}

export default TopHeader;
