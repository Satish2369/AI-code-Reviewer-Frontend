import React from 'react';

import '../Home.css';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';

const Home = () => {


  return (
    <div className="app-container">
     
        <Header/>
         <Main/>
        <Footer/>


    </div>
  );
};

export default Home;