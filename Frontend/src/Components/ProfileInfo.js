import React, { useState } from "react";

import defaultAvatar from "../images/default-businessman.png";

import loading_gif from "../images/loading-gif.gif";
import icon_edit from "../images/icon_edit.png";

import icon_camera from "../images/icon_camera.png";
import ShowProfileInfo from "./ShowProfileInfo";
import EditProfileInfo from "./EditProfileInfo";
import { loadState } from "../localStorage";
import { Link } from "react-router-dom";

function ProfileInfo({ editable = false, data, setData }) {
   let { avatar, first_name, last_name, email, nmls, location, job, phone, company } = data;

   avatar = avatar === "" ? defaultAvatar : process.env.REACT_APP_API_ROOT + "/media/" + avatar;

   const [isEditing, setIsEditing] = useState(false);
   const [userAvatar, setuserAvatar] = useState(avatar);
   const [isEditingAvatar, setisEditingAvatar] = useState(false);
   const [profileInfoData, setProfileInfoData] = useState({
      first_name,
      last_name,
      job,
      location,
      nmls,
      email,
      phone,
      company,
   });

   const userData = loadState();

   const handleSave = async () => {
      let formData = new FormData();

      formData.append("first_name", profileInfoData.first_name);
      formData.append("last_name", profileInfoData.last_name);
      formData.append("job", profileInfoData.job);
      formData.append("location", profileInfoData.location);
      formData.append("nmls", profileInfoData.nmls);
      formData.append("email", profileInfoData.email);
      formData.append("phone", profileInfoData.phone);
      formData.append("company", profileInfoData.company);

      let api_url = "";
      if (process.env.NODE_ENV === "development") {
         api_url = `/user/${userData.id}/`;
      } else {
         api_url = `${process.env.REACT_APP_API_ROOT}/user/${userData.id}/`;
      }

      let result = await fetch(api_url, {
         method: "PUT",
         headers: {
            Accept: "*/*",
         },
         body: formData,
      });
      result = await result.json();
      setData({ ...Object.fromEntries(Object.entries(profileInfoData).map(([k, v]) => [k, result[k]])) });
      console.log(result);
      setIsEditing(false);
   };

   const handleImageChange = async (e) => {
      setisEditingAvatar(true);
      let api_url = "";
      if (process.env.NODE_ENV === "development") {
         api_url = `/user/${userData.id}/`;
      } else {
         api_url = `${process.env.REACT_APP_API_ROOT}/user/${userData.id}/`;
      }

      let formData = new FormData();

      formData.append("avatar", e.target.files[0]);
      let result = await fetch(api_url, {
         method: "PUT",
         headers: {
            Accept: "*/*",
         },
         body: formData,
      });
      result = await result.json();

      console.log(result);
      setuserAvatar(process.env.REACT_APP_API_ROOT + "/media/" + result.avatar);
      setisEditingAvatar(false);
   };

   const handleCancel = () => {
      setIsEditing(false);
      setProfileInfoData({ first_name, last_name, job, location, nmls, email, phone, company });
   };
   return (
      <section className="profile-info">
         <div className="container dflx">
            <div className="userAvatarWrap">
               <div className="userAvatar">
                  {!isEditingAvatar && <img src={userAvatar} alt="avatar" />}
                  {isEditingAvatar && <img src={loading_gif} className="loadingavatarimage" alt="Loading..." />}
               </div>
               {editable && (
                  <label className="btn-camera">
                     {" "}
                     <input onChange={handleImageChange} type="file" accept="image/png, image/gif, image/jpeg" />
                     <img src={icon_camera} alt="icon_camera" />{" "}
                  </label>
               )}
            </div>

            {!isEditing ? (
               <ShowProfileInfo profileInfoData={profileInfoData} />
            ) : (
               <EditProfileInfo profileInfoData={profileInfoData} setProfileInfoData={setProfileInfoData} />
            )}

            <div className="actions dflx">
               {editable && !isEditing && (
                  <button className="icon_btn" onClick={() => setIsEditing(true)}>
                     <img src={icon_edit} alt="icon_edit" /> Edit Profile
                  </button>
               )}
               {editable && isEditing && (
                  <>
                     <button onClick={handleCancel} className="icon_btn cancelbtn btnset">
                        Cancel{" "}
                     </button>
                     <button className="icon_btn savebtn btnset" onClick={handleSave}>
                        Save{" "}
                     </button>
                  </>
               )}
               {!editable && (
                  <Link to="/signup/3" className="icon_btn">
                     Apply
                  </Link>
               )}
            </div>
         </div>
      </section>
   );
}

export default ProfileInfo;
