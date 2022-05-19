import React,{ useEffect, useState } from 'react';

import Banner from '../Components/Banner';
import Layout from '../Components/Layout';

import { useForm } from "react-hook-form";
import {    
    useParams, 
   
    useNavigate, 
    Link
  } from "react-router-dom";

import bannerBackgroundImage from '../images/banner_1.png';

import { saveState, loadState } from '../localStorage'



function SignUp() {

const {type} = useParams();


let navigate = useNavigate();

const { register, handleSubmit,  formState: { errors } } = useForm();
const [signupErrors, setsignupErrors] = useState({});

const onSubmit = async (data)=>{
    
   
    let formData = new FormData();
    
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('role', parseInt(data.role));
    formData.append('phone', parseInt(data.phone));

    if(type !== '3'){
        formData.append('company', data.company);
        formData.append('nmls', data.nmls);
    }


    let api_url = '';
    if(process.env.NODE_ENV === "development"){
        api_url = `/user/`;
    }else{
        api_url = `${process.env.REACT_APP_API_ROOT}/user/`;    
    }

    


    let result = await fetch(api_url,{
        method:'POST',
        headers:{ 
             'Accept': '*/*'
        },
        body: formData
    });
    result = await result.json();
    console.log(result);

    if(result.id){
        setsignupErrors({}) 
        saveState(result);
        navigate("/profile", { replace: true });  
        
    }else{
        setsignupErrors(result);
    }

     
   
}

useEffect(()=>{
    const loggedinuserdata = loadState();    
    if(loggedinuserdata !== undefined){
        navigate("/", { replace: true });    
    }
},[])


  return (
      <Layout>
           <Banner backgroundImage={bannerBackgroundImage} title="Sign up" />
           <section className="section">
               <div className="container">
                    <div className="sectionHead">
                        <h2>Create your account</h2>
                        <p>We know the best solution for the businesses are the one which is suited to their needs with <br/>dedicated technologies </p>
                    </div>

                    <div className="formWrap signup">
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="inlineFormItems dflx">
                          <div className="inputWrap">
                              <label>
                                  First Name
                                  <input type="text" name="first_name" placeholder="First Name" {...register("first_name")} />
                              </label>
                              {errors?.first_name && <p className="error">First Name is required</p>}
                          </div>
                          <div className="inputWrap">
                              <label>
                                  Last Name
                                  <input type="text" name="last_name" placeholder="Last Name" {...register("last_name")} />
                              </label>
                              {errors?.last_name && <p className="error">Last Name is required</p>}
                          </div>
                          
                        </div>

                        <div className="inlineFormItems dflx">
                            <div className="inputWrap">
                                <label>
                                    Email*
                                    <input type="email" name="email" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
                                </label>
                                {errors?.email?.type === 'required' && <p className="error">Email is required</p>}
                                {errors?.email?.type === 'pattern' && <p className="error">Not a valid email!</p>}
                            </div>
                            <div className={`inputWrap`}>
                                <label>
                                Mobile Number*
                                    <input type="number" name="phone" placeholder="Mobile Number" {...register("phone", { required: true})} />
                                </label>
                                {errors?.phone?.type === 'required' && <p className="error">Mobile Number is required</p>}
                            </div>
                        </div>
                        
                        { type !== '3' ? ( <div className="inlineFormItems dflx">
                            <div className={`inputWrap`}>
                                <label>
                               Company*
                                    <input type="text" name="company" placeholder="Company" {...register("company", { required: true})} />
                                </label>
                                {errors?.company?.type === 'required' && <p className="error">Company is required</p>}
                            </div>
                            
                            <div className="inputWrap">
                                <label>
                                NMLS*
                                    <input type="number" name="nmls" placeholder="NMLS ID" {...register("nmls", { required: true})} />
                                </label>
                                {errors?.nmls?.type === 'required' && <p className="error">NMLS ID is required</p>}
                            </div>                            
                            
                        </div> ) : '' }

                        <div className="inlineFormItems dflx">
                            <div className="inputWrap">
                                <label>
                                Password*
                                    <input type="password" name="password" placeholder="Password" {...register("password", { required: true})} />
                                </label>
                                {errors?.password?.type === 'required' && <p className="error">Password is required</p>}
                            </div>
                            <div className="inputWrap">
                                <label>
                                Repeat*
                                    <input type="password" name="repeatpassword" placeholder="Repeat" {...register("repeatpassword", { required: true})} />
                                </label>
                                {errors?.repeatpassword?.type === 'required' && <p className="error">Repeat Password is required</p>}
                            </div>
                        </div>
                        <input type="hidden" name="role"  {...register("role")} value={parseInt(type)} />
                        <div className="inputWrap">
                            <button className="form-btn">Sign Up</button>
                        </div>
                        </form>
                        {Object.keys(signupErrors).length !== 0 ? (<div className="signupErrors">
                            {
                                Object.keys(signupErrors).map((key)=>{
                                    return (
                                        <p key={key} className="error"><b>{key} :</b> {signupErrors[key][0]}</p>
                                    )
                                })
                            }
                        </div>):''}

                        <p className="alreadyhaveanaccount">Already have an account? Go to <Link to="/login">Sign in</Link></p>
                    </div>
                   

               </div>
           </section>
      </Layout>
  );
}

export default SignUp;
