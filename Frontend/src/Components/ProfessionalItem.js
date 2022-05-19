import React from 'react';
import { Link } from 'react-router-dom';

import icon_map_margker from '../images/icon_map_margker.png';
import company_indicator from '../images/icon_company_indicator.png';
import businessman_default from '../images/default-businessman.png';


function ProfessionalItem({id,image = businessman_default, name, companyName, location }) {
  
  location = location === '' ? 'No Location Set!' : location
  image = image === '' ? businessman_default : process.env.REACT_APP_API_ROOT +"/media/"+image

  return (
    <div className="professionals_item">
        <Link to={`/loanofficers/${id}`}>
            <img src={image} alt="businessman1" />
            <div className="content">
                <h3>{name}</h3>
                {companyName && <p className="locatiton dflx"><img src={company_indicator} alt="map_marker-icon" /> {companyName}</p>}
               <div className="locatiton dflx"><img src={icon_map_margker} alt="map_marker-icon" /> {location}</div>
            </div>
        </Link>
    </div>
  );
}

export default ProfessionalItem;
