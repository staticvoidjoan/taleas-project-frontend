import "./App.css";

import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Routes instead of Switch
import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import React, { useState, useEffect } from "react";
//User Services
import LoginPage from "./service/authentication/user/userSignIn";
import UserSignUp from "./service/authentication/user/userSignUp";
import ForgotPassword from "./service/authentication/user/forgotPassword";
import ProfileForm from "./pages/User pages/completeUser";
import ResendSignup from "./service/authentication/user/resendSignUp";
import Home from "./pages/home/home";
import NavBar from "./layout/navBar/navBar";
import UserDashBoard from "./pages/User pages/userDashBoard";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");
  Amplify.configure(awsExports);
  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      const userAttributes = user.attributes || {};
        const userGivenName = userAttributes.given_name || "";
        setGivenName(userGivenName);
        const userLastName = userAttributes.family_name || "";
        setLastName(userLastName);

    } catch (error) {
      setAuthenticated(false);
    }
  };

  return (
    <div className="App">
      <Router>
        {/* <NavBar /> */}
        <Routes>
          <Route exact path="/" element={authenticated ? (<UserDashBoard/>) :(<Home />)} />

          <Route
            exact
            path={authenticated ? "/" : "/signin"}
            element={<LoginPage />}
          />
          <Route
            exact
            path={authenticated ? "/" : "/signup"}
            element={<UserSignUp />}
          />
          <Route
            exact
            path={authenticated ? "/" : "/passwordreset"}
            element={<ForgotPassword />}
          />
          <Route path={`/${givenName}${lastName}`} element={<UserDashBoard/>}/>
          <Route path="*" element={<Home />} />
          <Route exact path="/completeprofile" element={<ProfileForm />} />
          <Route exact path="/resendSignUp" element={<ResendSignup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
