import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'   
import Home from './Home'
import Reviewer from './Reviewer'


const Body = () => {


  const router = createBrowserRouter([

   {
    path:"/",
    element:<Home/>
   },
   {
    path:"/review",
    element:<Reviewer/>
   }


  ])



  return (
    <div className='body'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default Body;
