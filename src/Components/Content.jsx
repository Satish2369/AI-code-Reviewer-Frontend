import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { BASE_URL } from '../utils/Constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Content = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();
const currentPath = location.pathname;

const fetchUser = async()=>{

     try {
        const res = await axios.get(`${BASE_URL}/users/getProfile`, {
          withCredentials: true,
        });

        const { name, emailId, photoUrl, history } = res.data?.data;

        console.log("profile fetched samjha chube")
        dispatch(addUser({ name, emailId, photoUrl, history }));
          
     


      } catch (e) {
        console.error("Error fetching profile:", e);
          if(currentPath !== "/"){
             navigate("login");
          }
           
      } 

}



useEffect(()=>{
  fetchUser();
},[]);



  return (
    <div>

       <Header/>
       <Outlet/>
       <Footer/>

    </div>
  )
}

export default Content;
