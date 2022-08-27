import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, Route, useNavigate } from 'react-router-dom'


//check if  user is loggin

const PrivateProtectRoute = () => {
const user=useSelector(state=>state?.users.userAuth)
const navigate=useNavigate()
useEffect(()=>{
  if(!user){
navigate('/login')
  }
},[user,navigate])
  return (

  user.isAdmin ? <Outlet /> :  <Navigate to='/login' /> 
  
  )
}

export default PrivateProtectRoute