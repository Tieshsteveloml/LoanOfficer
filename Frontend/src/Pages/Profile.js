import React, { useEffect, useState } from "react";

import Layout from "../Components/Layout";
import Overview from "../Components/Overview";
import ProfileInfo from "../Components/ProfileInfo";
import Reviews from "../Components/Reviews";
import { loadState } from "../localStorage";

import { useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

function Profile() {
   const [userData, setUserData] = useState({});

   let navigate = useNavigate();

   useEffect(() => {
      const loggedinuserdata = loadState();
      if (loggedinuserdata === undefined) {
         navigate("/", { replace: true });
      } else {
         let user_id = loggedinuserdata.id;
         getUserData(user_id);
      }
      console.log("called again");
   }, []);

   const getUserData = async (id) => {
      let api_url = "";
      if (process.env.NODE_ENV === "development") {
         api_url = `/user/${id}`;
      } else {
         api_url = `${process.env.REACT_APP_API_ROOT}/user/${id}`;
      }

      let result = await fetch(api_url, {
         method: "GET",
         headers: {
            Accept: "*/*",
         },
      });
      result = await result.json();
      setUserData(result);
   };

   return (
      <Layout>
         {Object.keys(userData).length > 0 ? (
            <>
               <ProfileInfo editable data={userData} setData={setUserData} />
               <div className="container">
                  <Overview editable data={userData} setData={setUserData} />
                  <Reviews editable data={userData} user={userData.id} />
               </div>
            </>
         ) : (
            <Loading />
         )}
      </Layout>
   );
}

export default Profile;
