import "./App.css";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Routes instead of Switch

import LoginPage from "./service/authentication/user/userSignIn";
import UserSignUp from "./service/authentication/user/userSignUp";

import Home from "./pages/home/home";
=======
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Routes instead of Switch
import { Auth } from "aws-amplify";
import {Amplify} from 'aws-amplify'
import awsExports from "./aws-exports"
import React, { useState, useEffect } from "react";
//User Services
import LoginPage from "./service/authentication/user/userSignIn";
import UserSignUp from "./service/authentication/user/userSignUp";
import ForgotPassword from "./service/authentication/user/forgotPassword";

import Home from "./pages/home/home";
import NavBar from "./layout/navBar/navBar";
>>>>>>> fd741f4abca449ec6fc325890ddc864fc33d40e1
function App() {
  const [authenticated, setAuthenticated] = useState(false);
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
    } catch (error) {
      setAuthenticated(false);
    }
  };

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
<<<<<<< HEAD
          <Route exact path="/signin" element={<LoginPage />} />
          <Route exact path="/signup" element={<UserSignUp />} />
=======
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
          <Route
            path="*"
            element={<Home/>}
          />
>>>>>>> fd741f4abca449ec6fc325890ddc864fc33d40e1
        </Routes>
      </Router>
    </div>
  );
}

export default App;
