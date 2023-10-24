import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./user.css";
import "./forgotPassword.css";
import awsExports from "../../../aws-exports";
import { Amplify } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import Text from "../../../components/text/text";
import ForgotPsw from "../../../assets/icons/Forgot Password.svg";
const ForgotPassword = () => {
  Amplify.configure(awsExports);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpass, setRepeatPass] = useState("");
  const [username, setUsername] = useState("");
  const [emailsent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  async function getEmail(e) {
    e.preventDefault();
    console.log(username);
    try {
      await Auth.forgotPassword(username);
      setEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function forgotPasswordSubmit(e) {
    e.preventDefault();
    if (password === repeatpass) {
      try {
        setIsResettingPassword(true); // Disable the button on click
        const data = await Auth.forgotPasswordSubmit(username, code, password);
        setSuccess(true);
        navigate("/signin");
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsResettingPassword(false); // Clear the flag after the password reset attempt
      }
    } else {
      throw new Error("Passwords do not match");
    }
  }

  return (
    <div className="user-register-page-forgot">
      <div>
        {window.innerWidth > 901 && (
          <img src={ForgotPsw} alt="Contact" className="login-photo-page" />
        )}
      </div>
      <div className="users-forms">
      <div className="user-register-title-forgot">
          <div style={{ marginBottom: "16px" }}>
            <Text
              label={"Reset your password"}
              size={"s20"}
              weight={"medium700"}
              color={"white"}
            />
          </div>
          <Text
            label={"Lost your password? No worries set a new one"}
            size={"s14"}
            weight={"regular"}
            color={"white"}
          />
        </div>
        {" "}
        {emailsent ? (
          <div className="form-box-register">
            <form
              onSubmit={forgotPasswordSubmit}
              id="loginform"
              className="form-value"
            >
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Text
                  label={"Enter code and set new password "}
                  size={"s18"}
                  weight={"medium"}
                />
              </div>
              <div className="inputbox-register">
                <input
                  className="register-input"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  placeholder="Code"
                />
              </div>
              <div class="inputbox-register">
                <input
                  placeholder="Password"
                  type="password"
                  className="register-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div class="inputbox-register">
                <input
                  className="register-input"
                  placeholder="Repeat password"
                  type="password"
                  value={repeatpass}
                  onChange={(e) => setRepeatPass(e.target.value)}
                  required
                />
              </div>

              <button
                className="register-btn"
                disabled={isResettingPassword}
                style={{ background: isResettingPassword ?? "gray" }}
              >
                <Text
                  label={"Change Password"}
                  weight={"regular"}
                  color={"white"}
                  size={"s16"}
                />
              </button>
            </form>
          </div>
        ) : (
          <div className="form-box-register-forgot">
            <form onSubmit={getEmail} id="loginform1" className="form-value">
              <div
                style={{
                  marginTop: "30px",
                  marginBottom: "30px",
                  marginLeft: "20px",
                }}
              >
                <Text
                  label={"Enter your email address"}
                  size={"s20"}
                  weight={"medium"}
                />
              </div>
              <div className="register-form-second">
                <div className="inputbox-register">
                  <input
                    type="email"
                    className="register-input"
                    value={username}
                    placeholder="johndoe@gmail.com"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <button className="register-btn-2">
                  {" "}
                  <Text
                    label={"Send Email"}
                    weight={"regular"}
                    color={"white"}
                    size={"s16"}
                  />
                </button>
              </div>
              <div className="backToLogin">
                <Link
                  to="/signin"
                  style={{ textDecoration: "none", color: "#6e46f5" }}
                >
                  <Text
                    label={"Back to Login"}
                    weight={"medium700"}
                    size={"s16"}
                  />
                </Link>
              </div>
            </form>
          </div>
        )}
        {/* TODO ADD ALERTS FOR SUCCES AND ERROR  */}
        
      </div>
    </div>
  );
};

export default ForgotPassword;
