import React, { useState } from "react";
import { Auth } from "aws-amplify";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import "./tempSignIn.css";
=======
import "./userSignIn.css";
>>>>>>> fd741f4abca449ec6fc325890ddc864fc33d40e1
import { Amplify } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import awsExports from "../../../aws-exports";

const LoginPage = () => {
  Amplify.configure(awsExports);
<<<<<<< HEAD
  const navigate = useNavigate();
=======
  
>>>>>>> fd741f4abca449ec6fc325890ddc864fc33d40e1
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(username);
      console.log(password);
      const user = await Auth.signIn(username, password);
      if (user.confirmedStatus === "CONFIRMED") {
        console.log("User is confirmed");
      } else if (user.confirmedStatus === "UNCONFIRMED") {
        console.log("User is not confirmed");
      } else {
        console.log("User status is unknown");
      }

      console.log("Logged in user:", user);
      if (!user) {
        throw new Error("Invalid user object or access token");
      }

      const idToken = user.signInUserSession.idToken.jwtToken;
      const accessToken = user.signInUserSession.accessToken.jwtToken;

      localStorage.setItem("idToken", idToken);
      localStorage.setItem("accessToken", accessToken);
      console.log(username);

      setSuccess(true);
      setError(null);
      window.location.reload();
    } catch (err) {
      setError("An error occurred while logging in.");
      setSuccess(false);
    }
  };

  const handleForgotPassword = async (event) => {
<<<<<<< HEAD
    
      event.preventDefault();
      if (!username) {
        setError("Please enter your username first.");
        return;
      }
      await Auth.forgotPassword(username);
      navigate(`/forgotPassword?username=${username}`);
    };

=======
    event.preventDefault();
    try {
    
      navigate("/passwordreset")
    } catch (err) {
      console.log(err);
    }
  };
  // <form onSubmit={handleSubmit} id="loginform">
>>>>>>> fd741f4abca449ec6fc325890ddc864fc33d40e1
  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit} id="loginform">
            <h2>Login</h2>
            <div className="inputbox">
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label for="">Email</label>
            </div>
            <div class="inputbox">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label for="">Password</label>
            </div>
            <div class="forget">
              <label for="">
                <Link onClick={handleForgotPassword}>Forgot Password?</Link>
              </label>
            </div>
            <button>Log in</button>
            <div class="register">
              <p>
                Don't have a account <Link>Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {error && <p>{error}</p>}
      {success && <p>Login successful!</p>}
    </section>
  );
};

export default LoginPage;
