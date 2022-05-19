import React, { useEffect, useState } from 'react';

import ProfessionalItem from './ProfessionalItem';
import Loading from './Loading';

function Professionals({professionals}) {


//  const [professionals, setProfessionals] = useState([])


// useEffect(()=>{    
//     getData();
// },[])



    // const getData = async () => {

    //     var api_url_1 = '';
    //     var api_url_2 = '';
    //     if(process.env.NODE_ENV === "development"){
    //         api_url_1 = `/user/?role=1`;
    //         api_url_2 = `/user/?role=2`;
    //     }else{
    //         api_url_1 = `${process.env.REACT_APP_API_ROOT}/user/?role=1`;    
    //         api_url_2 = `${process.env.REACT_APP_API_ROOT}/user/?role=2`;    
    //     }

    //     const urls = [api_url_1, api_url_2];
      
    //   const [result1, result2] = await Promise.all(
    //     urls.map((url) => fetch(url).then((res) => res.json()))
    //  );
    //  setProfessionals([...result1,...result2])
     
     

    // };



  return (
    <>
        { professionals.length > 0 ? 
        <div className="professionals">
            
            {
                
                professionals.map(({id, avatar,first_name, last_name, company, location})=>{
                    return(
                        <ProfessionalItem key={id} id={id} image={avatar} name={first_name +' '+last_name} companyName={company} location={location} />
                    )
                })
            } 
        </div>
        : <Loading />
        }
    </>
  );
}

export default Professionals;
