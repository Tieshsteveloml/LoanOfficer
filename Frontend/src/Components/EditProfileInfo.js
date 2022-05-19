import React from "react";

import icon_email from "../images/icon_enveloup.png";
import icon_map_margker from "../images/icon_map_margker.png";
import icon_phone from "../images/icon_phone.png";
import company_indicator from "../images/icon_company_indicator.png";
import icon_nmls from "../images/icon_nmls.png";

function EditProfileInfo({ profileInfoData, setProfileInfoData }) {
   const { first_name, last_name, job, location, nmls, email, phone, company } = profileInfoData;

   const handleChange = (e) => {
      setProfileInfoData({ ...profileInfoData, [e.target.name]: e.target.value });
      // if(e.target.name === 'first_name')
      //     setProfileInfoData({...profileInfoData, first_name : e.target.value })
      // if(e.target.name === 'last_name')
      //     setProfileInfoData({...profileInfoData, last_name : e.target.value })
      // if(e.target.name === 'job')
      //     setProfileInfoData({...profileInfoData, job : e.target.value })
      // if(e.target.name === 'location')
      //     setProfileInfoData({...profileInfoData, location : e.target.value })
      // if(e.target.name === 'nmls')
      //     setProfileInfoData({...profileInfoData, nmls : e.target.value })
      // if(e.target.name === 'email')
      //     setProfileInfoData({...profileInfoData, email : e.target.value })
      // if(e.target.name === 'phone')
      //     setProfileInfoData({...profileInfoData, phone : e.target.value })
      // if(e.target.name === 'company')
      //     setProfileInfoData({...profileInfoData, company : e.target.value })
   };

   return (
      <div className="userDetails">
         <div className="inlineFormItems dflx">
            <div className="inputWrap">
               <label>
                  {" "}
                  First Name
                  <input
                     type="text"
                     name="first_name"
                     placeholder="First Name"
                     value={first_name}
                     onChange={handleChange}
                  />
               </label>
            </div>
            <div className="inputWrap">
               <label>
                  {" "}
                  Last Name
                  <input
                     type="text"
                     name="last_name"
                     placeholder="Last Name"
                     value={last_name}
                     onChange={handleChange}
                  />
               </label>
            </div>
         </div>
         <p className="designation ">
            <div className="inputWrap">
               <label>
                  {" "}
                  Job
                  <input type="text" name="job" placeholder="Job" value={job} onChange={handleChange} />
               </label>
            </div>
         </p>

         <div className="userMeta">
            <ul>
               <li className="dflx editItemLi">
                  <img src={icon_map_margker} alt="map_marker-icon" /> <span>Location:&nbsp;</span>
                  <div className="inputWrap">
                     <label>
                        <input
                           type="text"
                           name="location"
                           placeholder="location"
                           value={location}
                           onChange={handleChange}
                        />
                     </label>
                  </div>
               </li>
               <li className="dflx editItemLi">
                  <img src={company_indicator} alt="map_marker-icon" /> <span>Company:&nbsp;</span>
                  <div className="inputWrap">
                     <label>
                        <input
                           type="text"
                           name="company"
                           placeholder="company"
                           value={company}
                           onChange={handleChange}
                        />
                     </label>
                  </div>
               </li>
               <li className="dflx editItemLi">
                  <img src={icon_nmls} alt="map_marker-icon" /> <span>NMLS ID: &nbsp;</span>
                  <div className="inputWrap">
                     <label>
                        <input type="text" name="nmls" placeholder="nmls" value={nmls} onChange={handleChange} />
                     </label>
                  </div>
               </li>
               <li className="dflx editItemLi">
                  <img src={icon_email} alt="email-icon" /> <span>Email: &nbsp;</span>
                  <div className="inputWrap">
                     <label>
                        <input type="email" name="email" placeholder="email" value={email} onChange={handleChange} />
                     </label>
                  </div>
               </li>
               <li className="dflx editItemLi">
                  <img src={icon_phone} alt="phone-icon" /> <span>Phone: &nbsp;</span>
                  <div className="inputWrap">
                     <label>
                        <input type="number" name="phone" placeholder="phone" value={phone} onChange={handleChange} />
                     </label>
                  </div>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default EditProfileInfo;
