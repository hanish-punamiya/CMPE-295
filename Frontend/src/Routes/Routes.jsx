import React from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "../Components/Dashboard";
import { useEffect, useState } from "react";

import Login from "../Components/Login";
import SignUp from "../Components/SignUp";
import LandingPage from "../Components/LandingPage";

const Routes = () => {
  // const [auth, setAuth] = useState(false);

  return (
    <div>
      <Route exact path="/" component={LandingPage}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/login" component={Login}></Route>
    </div>
  );
};

export default Routes;
