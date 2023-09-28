import "./App.css";

import {
  Link,
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"; // Importing Routes instead of Switch
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
import NavBar from "./layout/navBar/Navbar2";
import UserDashBoard from "./pages/User pages/userDashBoard";
import LandingPage from "./pages/landingPage/StartingPage";
import UserHome from "./pages/User pages/userHome";
import JobProfile from "./pages/Jobs/jobProfile";
import UserInfo from "./pages/User pages/userInfo";
import PostJob from "./pages/Jobs/postJob";
import Footer from "./layout/footer/footer";
import axios from "axios";
import EmployerHome from "./pages/Employer/EmployerHome";
import JobView from "./pages/Employer/jobView";
import EmployerProfile from "./pages/Employer/employerProfile";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkEmployee, setCheckEmployee] = useState(false);
  const location = useLocation();

  Amplify.configure(awsExports);
  useEffect(() => {
    checkAuthenticated();
  }, []);

  useEffect(() => {
    checkEmployee
  })

  //Check to see if a auser is authenticated and get the name and last name (only name if company)
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
      const isEmployee = userAttributes["custom:isEmployee"];

      const useremail = userAttributes.email || "";
      localStorage.setItem("companyname", userGivenName);
      setCheckEmployee(isEmployee);
      if (isEmployee === false) {
        console.log(checkEmployee);
        console.log("I AM HERE ON FALSE ")
        saveEmployerToStorage(useremail);
      }
      if (isEmployee === true) {
        
        console.log("I AM HERE ON TRUE ")
        console.log(checkEmployee);
        saveEmployeeToStorage(useremail);
      }
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const saveEmployeeToStorage = async (email) => {
    try {
      console.log("Trying to get employee with ", email);
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/userByEmail/${email}`
      );
      localStorage.setItem("employeeId", response.data.user._id);
      console.log(localStorage.getItem("employeeId"));
    } catch (error) {}
  };

  const saveEmployerToStorage = async (email) => {
    try {
      console.log("Trying to get employer with", email);
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/employer-email/${email}`
      );
      localStorage.setItem("employerId", response.data.employer._id);
      console.log(
        "This is the id i need on local storage",
        localStorage.getItem("employerId")
      );
    } catch (error) {
      // Handle errors here
      console.error("Error fetching employer data:", error);
    }
    console.log("The employer id is", localStorage.getItem("employerId"));
  };

  const hideNav = location.pathname.startsWith("/postJob/");
  const pathsToHideFooter = [
    "/",
    "/signup",
    "/signin",
    "/userInfo",
    "/passwordreset",
    "/completeprofile",
    "/resendSignUp",
  ];
  const hideFooter = pathsToHideFooter.includes(location.pathname);

  return (
    <div className="App">
      {!hideNav && <NavBar />}

      {/* ----------------------------------  Home routes ------------------------------------------------------- */}
      <Routes>
        <Route
          exact
          path="/"
          element={authenticated ? <UserDashBoard /> : <LandingPage />}
        />

        {/* -------------------------------------- HOME PAGE ------------------------- */}
        <Route
          exact
          path={`/${givenName}`}
          element={checkEmployee ? <UserHome /> : <EmployerHome />}
        />
        {/* ----------------------------------------------------------------------------------------------------------------- */}

        {/* ----------------------------------  Auhentication routes ------------------------------------------------------- */}
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
        <Route exact path="/resendSignUp" element={<ResendSignup />} />

        <Route path={`/${givenName}-${lastName}`} element={<UserDashBoard />} />
        {/* ------------------------------------------------------------------------------------------------------------------ */}

        {/* ----------------------------------  Employeee routes ------------------------------------------------------- */}
        <Route exact path="/completeprofile" element={<ProfileForm />} />
        <Route exact path="/userInfo/:id" element={<UserInfo />} />
        <Route exact path="/jobProfile/:id" element={<JobProfile />} />
        {/* --------------------------------------------------------------------------------------------------------------- */}

        {/* ----------------------------------  Employer routes ------------------------------------------------------- */}
        <Route exact path="/postJob/:id" element={<PostJob />} />
        <Route exact path="/jobview/:id" element={<JobView />} />
        {/* <Route exact path={`/${givenName}`} element={<EmployerHome />} /> */}
        <Route
          exact
          path={`/${givenName}-profile`}
          element={<EmployerProfile />}
        />
        {/* ---------------------------------------------------------------------------------------------------- */}
        {/* ----------------------------------  Other routes ------------------------------------------------------- */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
      {hideFooter ? null : <Footer />}
    </div>
  );
}

export default App;
