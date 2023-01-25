import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../useAuth/useAuth';

const ProtectedRoute = ({ children }) => {   
    let auth = localStorage.getItem('data')

    if(!auth){
       return <Navigate to="/" />
    }

  return (
   <>{children}</>
  )
}

export default ProtectedRoute;