import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('access-token');
  console.log(isAuthenticated,'from protected');

  if (isAuthenticated !== null) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
