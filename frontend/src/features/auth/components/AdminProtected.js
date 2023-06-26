import React from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectSignedInUser } from "../authSlice";

export default function AdminProtected({ children }) {
  const user = useSelector(selectSignedInUser);

  if (!user) {
    return <Navigate to="/signin" replace={true}></Navigate>;
  }

  if (user && user.role !== 'admin') {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return children;
}
