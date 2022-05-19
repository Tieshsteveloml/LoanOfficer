import React from 'react';
import Banner from '../Components/Banner';
import Layout from '../Components/Layout';

import bannerBackgroundImage from '../images/banner_1.png';

function PageNotFound() {
  return (
    <Layout>
        <Banner backgroundImage={bannerBackgroundImage} title="Page not found!" />
          <div className="container PAGENOTFOUND">
            <div className="sectionHead">
                  <h2>404</h2>
                  <p>PAGE NOT FOUND</p>
              </div>
          </div>
    </Layout>
  );
}

export default PageNotFound;
