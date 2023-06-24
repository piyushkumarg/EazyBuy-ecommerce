import { useEffect } from "react";
import { selectSignedInUser, signOutAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Signout() {
  const dispatch = useDispatch();
  const user = useSelector(selectSignedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });

  // but useEffect runs after render, so we have to delay navigate part
  return <>{!user && <Navigate to="/signin" replace={true}></Navigate>}</>;
}

export default Signout;
