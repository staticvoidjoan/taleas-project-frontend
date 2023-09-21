import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import "./tempSignIn.css";
import { Amplify } from "aws-amplify";

import awsExports from "../../../aws-exports";

const LoginPage = () => {
  Amplify.configure(awsExports);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(username);
      console.log(password);
      const user = await Auth.signIn(username, password);
      if (user.confirmedStatus === 'CONFIRMED') {
        console.log('User is confirmed');
      } else if (user.confirmedStatus === 'UNCONFIRMED') {
        console.log('User is not confirmed');
      } else {
        console.log('User status is unknown');
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
    
      event.preventDefault();
      if (!username) {
        setError("Please enter your username first.");
        return;
      }
      await Auth.forgotPassword(username);
      navigate(`/forgotPassword?username=${username}`);
    };

  return (
    <section>
      <div className="formvalue">
        <h2 className="h2">Login</h2>
        <form onSubmit={handleSubmit} id="loginform">
          <div className="loginform">
            <label>Username:</label>
            <input
              id="username-field"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <br />
          </div>
          <div className="loginform">
            <label>Password:</label>
            <input
              id="password-field"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <br />
          </div>
          <input
            className="btn"
            id="login-submit"
            type="submit"
            value="Login"
          />
          <button onClick={handleForgotPassword}>Forgot Password</button>
          <div class="register">
            <p>
              Don't have a account <a href="/signin">Register now!</a>{" "}
            </p>
          </div>
        </form>
        {error && <p>{error}</p>}
        {success && <p>Login successful!</p>}
      </div>
    </section>
  );
};

export default LoginPage;