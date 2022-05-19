import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import Layout from '../Components/Layout';
import Overview from '../Components/Overview';
import ProfileInfo from '../Components/ProfileInfo';


import bannerBackgroundImage from '../images/banner_1.png';

import {    
  useParams, 
 

} from "react-router-dom";
import Loading from '../Components/Loading';
import ReviewsForDetailsPage from '../Components/ReviewsForDetailsPage';

function LoanOfficersDetails() {

  const {id} = useParams();
  const [userData, setUserData] = useState({})

  useEffect(()=>{  
    
    if(id !== undefined){
      getUserData(id);
    }

},[])


  const getUserData = async (id) => {


    let api_url = '';
    if(process.env.NODE_ENV === "development"){
        api_url = `/user/${id}`;
    }else{
        api_url = `${process.env.REACT_APP_API_ROOT}/user/${id}`;    
    }


    let result = await fetch(api_url,{
        method:'GET',
        headers:{ 
            'Accept': '*/*'
        }        
    });
    result = await result.json(); 
    setUserData(result)
  }

  return (
    <Layout>
        
        {Object.keys(userData).length > 0 ?
          <>
           <Banner backgroundImage={bannerBackgroundImage} title={userData.first_name+' '+userData.last_name} link="/signup/3"/>
            <ProfileInfo  data={userData}/> 
            <div className="container">
            <Overview  data={userData}/> 
              <ReviewsForDetailsPage user={userData.id} onlyPublished={true}/>
            </div>  
          </>  
          : <Loading/> 
        }          
    </Layout>
  );
}

export default LoanOfficersDetails;
