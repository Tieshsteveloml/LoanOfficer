import React from 'react';
import { Link } from 'react-router-dom';



function Banner({ backgroundImage, title, link = '' }) {
  return (
    <section className="banner"
    style={{  
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
        <div className="container">
            <h1>{title}</h1>
            { link && <Link to={link} className="bannerLink" >Apply</Link> }
        </div>
    </section>
  );
}

export default Banner;
