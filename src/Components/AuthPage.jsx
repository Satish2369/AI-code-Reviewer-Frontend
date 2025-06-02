import React, { useEffect } from 'react'
import { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/Constant';
const AuthPage = () => {

  const [isLoginForm,setIsLoginForm] = useState(true);

  const [emailId,setEmailId] = useState("");
    const [password,setPassword] = useState("");
      const [name,setName] = useState("");
const[error,setError] = useState("");

 const navigate = useNavigate();


 const dispatch = useDispatch();

 
  const handleSignUp = async ()=>{

     try{
   const data = await axios.post(BASE_URL+"/users/signup",{name,emailId,password},{
          withCredentials:true
   })


    const userDetail = await axios.get(BASE_URL+"/users/getProfile",{
      withCredentials:true,
   })
if(!userDetail.data?.data){
       console.error("No userDetail fetched");
       return;
    }

   const {name:userName,emailId : userEmail,photoUrl,history} = userDetail.data?.data;

 dispatch(addUser({ name:userName,emailId :userEmail,photoUrl,history}));


  navigate("/review");
     }
     catch(e){
          console.error("Error :",e);
     }

  }


  


  const handleLogIn = async ()=>{

     try{
   const data = await axios.post(BASE_URL+"/users/login",{emailId,password},{
    withCredentials:true
   })

   const userDetail = await axios.get(BASE_URL+"/users/getProfile",{
      withCredentials:true,
   })
       if(!userDetail.data?.data){
       console.error("No userDetail fetched");
       return;
    }

   const {name:userName,emailId : userEmail,photoUrl,history} = userDetail.data.data;


   dispatch(addUser({ name:userName,emailId :userEmail,photoUrl,history}));
   
   navigate("/review");
     }
     catch(e){
          console.error("Error :",e);
     }

  }








  return (
    <div className='AuthPage'>

        

           <div className="authContainer">


                       <div className="authBox">


                                       <div className='auth-title'>
                                          <h2>{isLoginForm ? "LogIn" : "SignUp"}</h2>
                                       </div>


                                        {!isLoginForm && (

                                           <div className='username-box'>
                                               <h3>Username</h3>
                                               <input type="text"
                                               
                                                onChange={(e)=> setName(e.target.value)}
                                               
                                               />
                                           </div>
                                        )}


                                           <div className='email-box'>
                                               <h3>EmailId</h3>
                                               <input type="email"
                                               
                                                onChange={(e)=> setEmailId(e.target.value)}
                                               
                                               />
                                           </div>

                                            <div className='password-box'>
                                               <h3>Password</h3>
                                               <input 
                                               type="password"
                                                 onChange={(e)=> setPassword(e.target.value)}
                                               
                                               />
                                           </div>

                                            <div className='last-line' onClick={()=> setIsLoginForm(!isLoginForm)}>
                                               {isLoginForm ? "New User ? SignUp Now" : "Old User ? Login "}
                                            </div>

                                             <div className='submit-button'    onClick={()=> {
                                              isLoginForm ? handleLogIn() : handleSignUp()
                                             }}>
                                                  
                                                   Submit
                                             </div>
                                    

                                           

                       </div>





           </div>








      
    </div>
  )
}

export default AuthPage;
