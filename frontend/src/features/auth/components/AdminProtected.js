import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectSignedInUser } from "../authSlice";
import { selectUserInfo } from "../../user/userSlice";

export default function AdminProtected({ children }) {
  const user = useSelector(selectSignedInUser);
  const userInfo = useSelector(selectUserInfo);

  if (!user) {
    return <Navigate to="/signin" replace={true}></Navigate>;
  }

  if (user && userInfo?.role !== "admin") {
    return <Navigate to="/" replace={true}></Navigate>;
  }

  return children;
}
