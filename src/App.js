<<<<<<< HEAD
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <div className="App">
        <Routes>
          <Route />
        </Routes>
      </div>
      ;
    </BrowserRouter>
=======
import './App.css';
import UserSignIn from "../src/service/authentication/user/UserSignIn"

function App() {
  return (
    <div className="App">
      <UserSignIn/>
    </div>
>>>>>>> a724fcdba4e88ffb355e064a2e030db6149841ab
  );
}

export default App;
