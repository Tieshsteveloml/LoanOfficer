import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../Components/Banner';
import Layout from '../Components/Layout';

import { useForm } from "react-hook-form";

import bannerBackgroundImage from '../images/banner_1.png';

import { loadState, saveState } from '../localStorage'
import {      
   
    useNavigate 
  } from "react-router-dom";


function Login() {

let navigate = useNavigate();

const [roles ,setRoles] = useState(null);
const { register, handleSubmit, formState: { errors } } = useForm();
const [loginpErrors, setloginpErrors] = useState('');

useEffect(()=>{
    getRoles()
    const loggedinuserdata = loadState();    
    if(loggedinuserdata !== undefined){
        navigate("/", { replace: true });    
    }
},[])





let getRoles = async ()=>{
    let api_url = '';
    if(process.env.NODE_ENV === "development"){
        api_url = `/role`;
    }else{
        api_url = `${process.env.REACT_APP_API_ROOT}/role`;    
    }
    let result = await fetch(api_url,{
        method:'GET',
        headers:{ 
            'Content-Type': 'application/json'
        }
    });
    result = await result.json();    
    setRoles(result)
}

const onSubmit = async(data)=>{
    

    let formData = new FormData();   
    
    formData.append('email', data.email);
    formData.append('password', data.password);


    let api_url = '';
    if(process.env.NODE_ENV === "development"){
        api_url = `/user/?email=${data.email}&password=${data.password}`;
    }else{
        api_url = `${process.env.REACT_APP_API_ROOT}/user/?email=${data.email}&password=${data.password}`;    
    }

    let result = await fetch(api_url,{
        method:'GET',
        headers:{ 
             'Accept': '*/*'
        }        
    });
    result = await result.json();
    if(result.length > 0){
        saveState(result[0]);
        navigate("/profile", { replace: true });  
    }else{
        setloginpErrors('Error occurred while login or user not found!');
    }
}



  return (
      <Layout>
           <Banner backgroundImage={bannerBackgroundImage} title="Login" />

           <section className="section">
               <div className="container">
                    <div className="sectionHead">
                        <h2>Login into your account</h2>                        
                        <p>We know the best solution for the businesses are the one which is suited to their needs with<br/> dedicated technologies </p>
                    </div>

                    <div className="formWrap">       
                        {loginpErrors&&<p className="error center">{loginpErrors}</p>}                 
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="inputWrap">
                                <label>
                                    Email*
                                    <input type="email" name="email" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
                                </label>
                                {errors?.email?.type === 'required' && <p className="error">Email is required</p>}
                                {errors?.email?.type === 'pattern' && <p className="error">Not a valid email!</p>}
                            </div>
                            <div className="inputWrap">
                                <label>
                                    Password *
                                    <input type="password" name="password" placeholder="Password" {...register("password", { required: true})}/>
                                </label>
                                {errors?.password?.type === 'required' && <p className="error">Password is required</p>}
                            </div>
                            <div className="inputWrap">
                                <button className="form-btn">Login</button>
                            </div>
                        </form>
                    </div>

                    <div className="createWid">
                        { roles &&  <div className="hrw"><h2>Create Account</h2></div>}
                        <ul className="dflx">
                            {
                                roles && roles.map(item=>{
                                    return (
                                        <li key={item.id}><Link to={{ pathname : `/signup/${item.id}`, state: { signupType: item.id  } }}  >{item.name}</Link></li>
                                    )
                                })
                            }
                            {/* <li><Link to={{ pathname : "/signup/1", state: { signupType: "1"  } }}  >an individual</Link></li>
                            <li><Link to={{ pathname : "/signup/2", state: { signupType: "2"  } }} >a company</Link></li>
                            <li><Link to={{ pathname : "/signup/3", state: { signupType: "3"  } }}  >a borrower</Link></li> */}
                        </ul>
                    </div>

               </div>
           </section>
      </Layout>
  );
}

export default Login;
