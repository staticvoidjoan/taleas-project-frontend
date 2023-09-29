import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./user.css";
import { Amplify } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import awsExports from "../../../aws-exports";
import Text from "../../../components/text/text";
const LoginPage = () => {
  Amplify.configure(awsExports);
  const [selectedCategory, setSelectedCategory] = useState("employer");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirmationError, setConfirmationError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(username);

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
      goToHome();
    } catch (err) {
      setError("An error occurred while logging in.");
      setConfirmationError(true);
      setSuccess(false);
    }
  };

  const goToHome = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const userAttributes = user.attributes || {};
      window.location.reload();
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user-register-page">
      <div className="form-box-register">
        <div className="form-category">
          <div
            className={`employer-category ${
              selectedCategory === "employee" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("employee")}
          >
            <div style={{ marginBottom: "10px" }}>
              <Text label={"Employee"} />
            </div>
          </div>
          <div
            className={`employee-category ${
              selectedCategory === "employer" ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory("employer")}
          >
            <div style={{ marginBottom: "10px" }}>
              <Text label={"Employer"} />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-value" autoComplete="off">
          <div className="inputbox-register">
            <input
              type="text"
              name="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              required
              className="register-input"
            />
          </div>

          <div className="inputbox-register">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="register-input"
              required
            />
          </div>
          <button className="register-btn">
            <Text
              label={"Log In"}
              weight={"regular"}
              color={"white"}
              size={"s16"}
            />
          </button>

          {confirmationError ? (
            <div className="login-error">
              <Text
                label={
                  "Log in credentials are not correct, or the account is not verified."
                }
              />
              <Link to={"/resendSignUp"}>
                <Text label={"Click here"} />
              </Link>
            </div>
          ) : null}

          <div className="goto-login">
            <Text
              label={"Don't have an account yet?  &nbsp"}
              weight={"regular"}
              color={"black"}
              size={"s16"}
            />
            <Link style={{ textDecoration: "none" }} to={"/signup"}>
              <Text
                label={"Register"}
                weight={"medium700"}
                color={"purple"}
                size={"s16"}
              />
            </Link>
          </div>
          {/* <Button bgcolor={"primary"} label={"register"}/> */}
          <div className="forgot-password">
            <Link style={{ textDecoration: "none" }} to={"/passwordreset"}>
              <Text
                label={"Forgot Password?"}
                weight={"medium700"}
                color={"purple"}
                size={"s16"}
              />
            </Link>
          </div>
        </form>
      </div>
      <div className="user-register-title">
        <div style={{ marginBottom: "16px" }}>
          <Text
            label={"Login"}
            size={"s20"}
            weight={"medium700"}
            color={"white"}
          />
        </div>
        <Text
          label={
            selectedCategory === "employee"
              ? "Find your dream job?"
              : "Find the employees for your company!"
          }
          size={"s16"}
          weight={"regular"}
          color={"white"}
        />
      </div>
    </div>
  );
};

export default LoginPage;
