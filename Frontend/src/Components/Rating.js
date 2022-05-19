import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useSearchParams } from 'react-router-dom';

import Loading from './Loading'

function Rating() {
    const TOTAL_RATING = 10;
    const [ rating, setRating] = useState(null)

    const [ fromUserData, setfromUserData] = useState({})
    const [ toUserData, setToUserData] = useState({})
    const [ descriptionText, setdescriptionText] = useState(null)
    const [ isSubmitRating, setisSubmitRating] = useState(false)

    const [ isLoading, setIsLoading] = useState(false)
   
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [searchParams, setSearchParams] = useSearchParams();

    const fromUser = searchParams.get("from");
    const toUser = searchParams.get("to");
    const paramScore = searchParams.get("score");




    const getDescription = async(r)=>{
        var api_url = ''
        if(process.env.NODE_ENV === "development"){           
                api_url = `/tell-us/?score=${r}`; 
        }else{
                api_url = `${process.env.REACT_APP_API_ROOT}/tell-us/?score=${r}`; 
        }
        
        let result = await fetch(api_url,{
            method:'GET',
            headers:{ 
                'Accept': '*/*'
            }        
        });
        result = await result.json(); 
        setdescriptionText(result[0])
        console.log(result)
    }

    useEffect(() => {

        if(paramScore){
           // alert()
            setRating(paramScore)
            getDescription(paramScore)
        }

        getUserData()
    },[])

    const getUserData = async ()=>{
        setIsLoading(true);
        var api_url_1 = '';
        var api_url_2 = '';
        if(process.env.NODE_ENV === "development"){
            api_url_1 = `/user/${fromUser}`;
            api_url_2 = `/user/${toUser}`;
        }else{
            api_url_1 = `${process.env.REACT_APP_API_ROOT}/user/${fromUser}`;    
            api_url_2 = `${process.env.REACT_APP_API_ROOT}/user/${toUser}`;    
        }
        const urls = [api_url_1, api_url_2];      
        const [result1, result2] = await Promise.all(
            urls.map((url) => fetch(url).then((res) => res.json()))
        );
        setIsLoading(false);
        setfromUserData(result1);
        setToUserData(result2);




    }

    const handlesetRating = (i)=>{
        setRating(i)
        getDescription(i)
        
    }
    

    const onSubmit = async (data)=>{
        console.log(data)

        var api_url = ''
        if(process.env.NODE_ENV === "development"){           
                api_url = `/nps/`; 
        }else{
                api_url = `${process.env.REACT_APP_API_ROOT}/nps/`; 
        }
        

        let formData = new FormData();
    
        formData.append('user_id', toUser);
        formData.append('score', parseInt(data.r));
        formData.append('description', data.msg);
        formData.append('sender_id', fromUser);

        let result = await fetch(api_url,{
            method:'POST',
            headers:{ 
                'Accept': '*/*'
            },
            body: formData        
        });
        result = await result.json(); 
        
        setisSubmitRating(true);
        
    }
  return (
      <>
      { isLoading ? <Loading/>  :

        (   <>
                 
                <div className="formWrap rating">                    
                    <h3 className="rating_title">{toUserData.first_name +' '+toUserData.last_name} </h3>
                    { isSubmitRating ? <p>Rating submitted!</p> : 
                        <form onSubmit={handleSubmit(onSubmit)}>
                            
                            <div className="inputWrap">
                                <label className="larger">
                                    How likely are you recommend {toUserData.first_name +' '+toUserData.last_name} to a friend or a Colleague?
                                    <ul className="dflx ratingPoint">
                                        {Array.from(Array(TOTAL_RATING + 1), (e, i) => {
                                            return <li key={i}><label><input onClick={()=>handlesetRating(i) } defaultChecked={paramScore == i? true: false}  type="radio" name="r" {...register("r", { required: true})} value={i} /><span>{i}</span></label></li>
                                        })}                                    
                                    </ul> 
                                </label>
                                {errors?.r && <p className="error">Rating is required!</p>}
                            </div>
                                
                            
                            {descriptionText && <div className="inputWrap">
                                <label className="large">
                                    {descriptionText?.description}
                                    <textarea {...register("msg", { required: true})}></textarea>
                                </label>
                                {errors?.msg && <p className="error">Message is required!</p>}
                            </div>}
                            {descriptionText && <div className="inputWrap">
                                <button className="form-btn small-btn">Submit</button>
                            </div>}
                        </form>
                    }
                </div>
            </>
        )
        
        }
     
    </>
  );
}

export default Rating;
