import React from 'react';

import icon_email from '../images/icon_enveloup.png';
import icon_map_margker from '../images/icon_map_margker.png';
import icon_phone from '../images/icon_phone.png';
import company_indicator from '../images/icon_company_indicator.png';
import icon_nmls from '../images/icon_nmls.png';

function ShowProfileInfo({profileInfoData}) {
  const {first_name, last_name, job, location,nmls,email,phone, company} = profileInfoData;
  return (
    <div className="userDetails">
      <h2>{first_name} {last_name}</h2>
      {job && <p className="designation">({job})</p>}
      
      <div className="userMeta">
        <ul>
            
            {location && <li> <img src={icon_map_margker} alt="map_marker-icon" /> {location}</li>}
            {company && <li> <img src={company_indicator} alt="map_marker-icon" /> {company}</li>}
            <li> <img src={icon_nmls} alt="map_marker-icon" /> NMLS ID: {nmls}</li>
            <li> <a href={`mailto:${email}`}> <img src={icon_email} alt="email-icon" /> {email}</a> </li>
            <li> <a href={`tel:${phone}`}> <img src={icon_phone} alt="phone-icon" /> {phone}</a> </li>                        
        </ul>
      </div>
    </div>
  );
}

export default ShowProfileInfo;
