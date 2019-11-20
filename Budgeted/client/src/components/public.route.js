import { Redirect, Route } from "react-router-dom";
import React from 'react';
import auth from "./auth";
export const PublicRoute = ({
  ...props }) => {
  const isAllowed = auth.isAuthenticated();
  return isAllowed
        ? (<Redirect to="/dashboard" />)
        : (<Route {...props} />)
};
