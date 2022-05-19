import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import Layout from '../Components/Layout';
import MortgageProfessionals from '../Components/MortgageProfessionals';
import SearchBar from '../Components/SearchBar';

import bannerBackgroundImage from '../images/banner_1.png';

function OurLoanOfficers() {

  const [professionals, setProfessionals] = useState([])
  const [searchKey, setsearchKey] = useState('')
  const [allData, setallData] = useState([])
  const [emptyData, setemptyData] = useState(false)


  useEffect(()=>{    
      getData();
     
  },[])

  const getData = async () => {
    setProfessionals([])
    var api_url_1 = '';
    var api_url_2 = '';
    if(process.env.NODE_ENV === "development"){
        api_url_1 = `/user/?role=1,2`;
       // api_url_2 = `/user/?role=2`;
    }else{
        api_url_1 = `${process.env.REACT_APP_API_ROOT}/user/?role=1,2`;    
       // api_url_2 = `${process.env.REACT_APP_API_ROOT}/user/?role=2`;    
    }

    const urls = [api_url_1];
  
  const [result1] = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
 );
 setProfessionals([...result1]);
 setallData([...result1]);
 setemptyData(false)
};

useEffect(()=>{

if(searchKey == ''){
  getData()
}
 
},[searchKey])

const searchFormSubmit = async()=>{  
  setProfessionals([])
    let api_url = '';
    if(process.env.NODE_ENV === "development"){
        api_url = `/user/?role=1,2&filter=${searchKey}`;
    }else{
        api_url = `${process.env.REACT_APP_API_ROOT}/user/?role=1,2&filter=${searchKey}`;    
    }

  let result = await fetch(api_url,{
      method:'GET',
      headers:{ 
          'Accept': '*/*'
      }        
  });
  result = await result.json(); 
  if(result.length > 0){

    setProfessionals(result);
    setemptyData(false)
  }else{
    setProfessionals(result);
    setemptyData(true)
  }
  
}

  return (    
      <Layout>
        <Banner backgroundImage={bannerBackgroundImage} title="Our Loan Officers" />
        <SearchBar searchFormSubmit={searchFormSubmit} setsearchKey={setsearchKey}/>
        
        {professionals && <MortgageProfessionals emptyData={emptyData} professionals={professionals}/>}
      </Layout> 
  );
}

export default OurLoanOfficers;
