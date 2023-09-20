import './App.css';
import UserSignIn from "../src/service/authentication/user/UserSignIn"
import Home from "./pages/home/home"

function App() {
  return (
    <div className="App">
      {/* <UserSignIn/> */}
      <Home /> 
    </div>
  );
}

export default App;
