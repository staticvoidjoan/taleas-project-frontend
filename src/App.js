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
import axios from "axios";
import React, { useState, useEffect } from "react";
//User Services
import LoginPage from "./service/authentication/user/userSignIn";
import UserSignUp from "./service/authentication/user/userSignUp";
import ForgotPassword from "./service/authentication/user/forgotPassword";
import ResendSignup from "./service/authentication/user/resendSignUp";

//Employee Imports (Normal User)
import ProfileForm from "./pages/User pages/completeUser";
import UserHome from "./pages/User pages/userHome";
import EmployeeJobView from "./pages/Jobs/employeejobview";
import UserInfo from "./pages/User pages/userInfo";

//Employer Imports (Recruiter/Company User)
import PostJob from "./pages/Jobs/postJob";
import EmployerHome from "./pages/Employer/EmployerHome";
import JobView from "./pages/Employer/jobView";
import EmployerProfile from "./pages/Employer/employerProfile";
//Layout
import NavBar from "./layout/navBar/Navbar2";
import Footer from "./layout/footer/footer";

//Mutual Pages
import Home from "./pages/home/home";
import LandingPage from "./pages/landingPage/StartingPage";

import ChatApp from "./ChatApp";
import ListOfApplicants from "./components/applicants/acceptedApplicants";

//Misc
import Loader from "./components/Loader/Loader";

function App() {
  // State variables
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkEmployee, setCheckEmployee] = useState(true);
  const [userRole, setUserRole] = useState("employer");
  const [employee, setEmployee] = useState({});
  const [employer, setEmployer] = useState({});
  const [useremail, setUserEmail] = useState("");
  const [isEmployeeLoaded, setIsEmployeeLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Configure Amplify
  Amplify.configure(awsExports);

  // Check authentication status on component mount
  useEffect(() => {
    checkAuthenticated();
  }, []);

  // Check if  user is authenticated
  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setAuthenticated(!!user);

      const userAttributes = user.attributes || {};
      const userGivenName = userAttributes.given_name || "";
      setGivenName(userGivenName);

      const userLastName = userAttributes.family_name || "";
      setLastName(userLastName);

      const isEmployee = userAttributes["custom:isEmployee"];
      if (isEmployee === "true") {
        setUserRole("employee");
      } else setUserRole("employer");
      setCheckEmployee(isEmployee);

      localStorage.setItem("companyname", userGivenName);

      const email = userAttributes.email || "";
      setUserEmail(email);

      setIsEmployeeLoaded(true); // Set isEmployeeLoaded to true when isEmployee is loaded
    } catch (error) {
      setAuthenticated(false);
      setIsEmployeeLoaded(true); // Set isEmployeeLoaded to true even in case of error
    }
  };

  // Check if user is employee and save id to storage
  useEffect(() => {
    const saveToStorage = async () => {
      console.log("Checking employee status:", checkEmployee);
      console.log("User email:", useremail);
      console.log(" User status", userRole);

      if (userRole === "employee") {
        console.log("Saving as employee");
        await saveEmployeeToStorage();
      } else {
        console.log("Saving as employer");
        await saveEmployerToStorage();
      }
      setTimeout(() => {
        setIsLoading(false); // Data fetching is complete
      }, 1879);
    };

    if (useremail) {
      saveToStorage();
    }
  }, [checkEmployee, useremail]);

  // Save employee data to local storage
  const saveEmployeeToStorage = async () => {
    console.log("Trying to get employee with ", useremail);
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/userByEmail/${useremail}`
      );
      localStorage.setItem("employeeId", response.data.user._id);
      console.log(localStorage.getItem("employeeId"));
      setEmployee(response.data.user);
      console.log(response.data.user);
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  // Save employer data to local storage
  const saveEmployerToStorage = async () => {
    console.log("Trying to get employer with", useremail);
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/employer-email/${useremail}`
      );
      localStorage.setItem("employerId", response.data.employer._id);
      setEmployer(response.data.employer);

      console.log(response.data.employer);
    } catch (error) {
      console.error("Error fetching employer data:", error);
    }
  };

  const hideNav = location.pathname.startsWith("/postJob/");
  const pathsToHideFooter = [
    "/signup",
    "/signin",
    "/userInfo",
    "/passwordreset",
    "/completeprofile",
    "/resendSignUp",
  ];
  const hideFooter = pathsToHideFooter.includes(location.pathname);

  if (!isEmployeeLoaded) {
    return <Loader />; // TODO CHANGE TO SPINNER
  }

  return (
    <div className="App">
      {!hideNav && <NavBar />}

      {/* ----------------------------------  Home routes ------------------------------------------------------- */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            authenticated ? (
              userRole === "employee" ? (
                isLoading ? (
                  <Loader />
                ) : (
                  <UserHome userId={employee._id} />
                )
              ) : isLoading ? (
                <Loader />
              ) : (
                <EmployerHome creatorId={employer._id} />
              )
            ) : (
              <Home />
            )
          }
        />

        <Route
          exact
          path={`/profile`}
          element={
            isLoading ? (
              <Loader />
            ) : userRole === "employer" ? (
              <EmployerProfile
                employeeData={employee}
                employerData={employer}
                employeeCheck={checkEmployee}
              />
            ) : (
              <UserInfo  userId={employee._id}/>
            )
          }
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

        {/* ------------------------------------------------------------------------------------------------------------------ */}

        {/* ----------------------------------  Employeee routes ------------------------------------------------------- */}
        <Route exact path="/completeprofile" element={<ProfileForm userId={employee._id} />} />
        <Route exact path="/userInfo/:id" element={<UserInfo />} />
        <Route exact path="/viewjobpost/:id" element={<EmployeeJobView />} />
        {/* --------------------------------------------------------------------------------------------------------------- */}

        {/* ----------------------------------  Employer routes ------------------------------------------------------- */}
        <Route exact path="/postjob/:id" element={<PostJob />} />
        <Route exact path="/jobview/:id" element={<JobView />} />
        {/* ---------------------------------------------------------------------------------------------------- */}
        {/* ----------------------------------  Other routes ------------------------------------------------------- */}
        <Route
          path="/chat/:chatId"
          element={
            isLoading ? (
              <div>Loading...</div>
            ) : (
              <ChatApp
                loggedInUser={userRole === "employee" ? employee : employer}
              />
            )
          }
        />
        <Route path="/matches/:id" element={<ListOfApplicants />} />
        <Route
          path="*"
          element={
            authenticated ? (
              userRole === "employee" ? (
                isLoading ? (
                  <Loader />
                ) : (
                  <UserHome userId={employee._id} />
                )
              ) : isLoading ? (
                <Loader />
              ) : (
                <EmployerHome creatorId={employer._id} />
              )
            ) : (
              <Home />
            )
          }
        />
      </Routes>
      {hideFooter ? null : <Footer userRole={userRole} />}
    </div>
  );
}

export default App;
