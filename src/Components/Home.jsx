import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
 const navigate = useNavigate();
  return (
    <div className='home'>
      welcome to the home page
      <button onClick={()=>navigate("/review")}>review page</button>
    </div>
  )
}

export default Home
