import React, { useEffect } from 'react'
import { createBrowserRouter,RouterProvider, useNavigate } from 'react-router-dom'   
import Home from './Home'
import Reviewer from './Reviewer'
import AuthPage from './AuthPage'
import Content from './Content'


const Body = () => {






  const router = createBrowserRouter([

   {
    path:"/",
    element:<Content/>,
    children:[
       {
     path:"/",
     element:<Home/>
   },
      {
     path:"/review",
     element:<Reviewer/>
   },
   {
       path:"/login",
       element:<AuthPage/>
   }

    ]
   },



  ])


  return (
    <div className='body'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default Body;
