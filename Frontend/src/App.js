import React, { useLayoutEffect } from 'react';
import { Routes, Route , Navigate, useLocation} from "react-router-dom";





import PageNotFound from "./Pages/404";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import OurLoanOfficers from './Pages/Our-loan-officers';

import './App.scss';
import RateOurLoanOfficer from './Pages/Rate-our-loan-officer';
import Profile from './Pages/Profile';
import LoanOfficersDetails from './Pages/Loan-officers-details';

function App() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.remove('show-menu')
  }, [pathname]);

  return (
    <div className="__React">
      <Routes>
          <Route exact path="/" element={<OurLoanOfficers />} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="signup/:type" element={<SignUp />} />
          <Route exact path="profile" element={<Profile />} />
          <Route path="rateus" element={<RateOurLoanOfficer />} />
          <Route path="loanofficers/:id" element={<LoanOfficersDetails />} />
          <Route path="404" element={<PageNotFound />} />            
          <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>    
       
    </div>
  );
}

export default App;
