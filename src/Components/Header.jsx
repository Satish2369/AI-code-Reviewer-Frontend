import React from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/Constant';
import { removeUser } from '../utils/userSlice';
import { useDispatch, useSelector } from 'react-redux';





const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const image = useSelector((store)=>store?.user?.photoUrl);
  const userName = useSelector((store)=>store?.user?.name);
  
  const currentPath = location.pathname;

  
  const showLoginButton = currentPath !== '/login';
  const buttonLabel = currentPath !== '/' ? 'logOut' : 'logIn';

   
  const handleButtonClick = () => {
    if (buttonLabel === 'logOut') {

  const logOut =  axios.post(BASE_URL+"/users/logout",{},{
     withCredentials:true
  })
   
  

     dispatch(removeUser());

      navigate('/login',{ replace: true });
    } else {
      navigate('/login',{ replace: true });
    }
  };

  return (
    <div>
      <header className="app-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 16L12 12L8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 16L16 12L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="logo-text"  onClick={()=> navigate("/",{ replace: true })}   style={{"cursor":"pointer"}}>Code<span className="logo-highlight">Craft</span> AI </h1>
        </div>


        <nav className="nav">
                 {currentPath=="/review" && image && userName && (
                          <div className="profile-image">
                               <img src={image}  style={{height:"28px",width:"28px",marginTop:"10px"}} alt="user-image" />
                               <div className='user-name'>welcome,{userName}</div>
                          </div>

                 )}




          {showLoginButton && (
            <button className="cta-button" onClick={handleButtonClick}>
              {buttonLabel}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.93945 13.3337L10.6061 8.00033L5.93945 2.66699" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
