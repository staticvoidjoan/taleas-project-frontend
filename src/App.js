import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'; // Importing Routes instead of Switch
import UserSignIn from '../src/service/authentication/user/UserSignIn';
import LoginPage from './service/authentication/user/LogIn';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/signin" element={<UserSignIn />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
