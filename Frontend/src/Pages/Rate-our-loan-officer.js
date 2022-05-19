import React from 'react';
import Banner from '../Components/Banner';
import Layout from '../Components/Layout';
import Rating from '../Components/Rating';

import bannerBackgroundImage from '../images/banner_1.png';

function RateOurLoanOfficer() {
    
  return (
      
    <Layout>
        <Banner backgroundImage={bannerBackgroundImage} title="Rate Our Loan Officer" />
        <section className="section">
               <div className="container">
                    <Rating/>
               </div>
        </section>
    </Layout>
    );
}

export default RateOurLoanOfficer;
