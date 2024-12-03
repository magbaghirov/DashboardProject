import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    alert('Bu səhifəyə daxil olmaq üçün əvvəlcə qeydiyyatdan keçin və ya login olun.');
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;