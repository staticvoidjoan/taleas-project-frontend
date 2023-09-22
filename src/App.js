import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importing Routes instead of Switch

import LoginPage from "./service/authentication/user/userSignIn";
import UserSignUp from "./service/authentication/user/userSignUp";
import ProfileForm from "./service/authentication/user/completeUser";

import Home from "./pages/home/home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={<LoginPage />} />
          <Route exact path="/signup" element={<UserSignUp />} />
          <Route exact path="/completeprofile" element={<ProfileForm/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
