import React, { useState } from "react";
import { Auth } from "aws-amplify";

import "./user.css";
import { Amplify } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import awsExports from "../../../aws-exports";

const LoginPage = () => {
  Amplify.configure(awsExports);

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
    event.preventDefault();
    try {
      navigate("/passwordreset");
    } catch (err) {
      console.log(err);
    }
  };
  
  

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
          <div style={{color:"white", display:"flex", justifyContent:"center", textAlign:"center"}}>

      {error && <p>Login credentials do not match, or your account is unverified. <Link to={"/resendSignUp"}>Click Here</Link> to verify your account</p>}
      {success && <p>Login successful!</p>}
          </div>
      </div>

    </section>
  );
};

export default LoginPage;
