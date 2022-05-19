import React from 'react';
import { Link } from 'react-router-dom';



import footerBackgroundImage from '../images/footer_bg.png';
import email from '../images/icon_email.svg';


function Footer() {
    return (
        <footer
         style={{  
            backgroundImage: `url(${footerBackgroundImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        
        >
           <div className="topFooter">
            <div className="container dflx">
                    
                    <div className="footerCol">
                        <h4>Explore</h4>
                        <ul>                            
                            <li><Link to="/">Help</Link></li>
                            <li><Link to="/">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footerCol contactRow hasBg">
                        <h4>Contact Us</h4>
                        <ul className="">                            
                            <li className="dflx">
                                <img src={email} alt="email icon" />
                                <div className="icon_content">
                                    <p>Email: </p>
                                    <a href="mailto:info@mywebsite.com">info@mywebsite.com</a>
                                </div>
                            </li>
                           
                        </ul>
                    </div>
                </div>
           </div>
           <div className="bottomFooter">
               <div className="container">
                <p>This licensee is performing acts for which a real estate license is required. Shore Capital Corporation is licensed by the California Bureau of Real Estate, Broker # 01518537; NMLS # 275963. Loan approval is not guaranteed and is subject to lender review of information. All loan approvals are conditional and all conditions must be met by borrower. Loan is only approved when lender has issued approval in writing and is subject to the Lender conditions. Specified rates may not be available for all borrowers. Rate subject to change with market conditions. SCC is an Equal Opportunity Mortgage Broker/Lender. For state licensing information outside of California, click here. As a broker, Shore Capital Corporation is NOT individually approved by the FHA or HUD, but Shore Capital Corporation is allowed to originate FHA loans based on their relationships with FHA approved lenders. </p>
                
                <div className="FooterPrivacyContainer">
                    <Link to="/" className="footer-privacy">Privacy Policy</Link>
                    <p>© 2019 -2022 All rights reserved</p>
                </div>
               </div>
           </div>
        </footer>
      );
}

export default Footer;

