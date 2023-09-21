import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'; // Importing Routes instead of Switch
import UserSignUp from './service/authentication/user/userSignUp';
import LoginPage from './service/authentication/user/UserSignIn';
import Home from "./pages/home/home"
function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signin" element={< LoginPage/>} />
          <Route exact path="/signup" element={<UserSignUp />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
