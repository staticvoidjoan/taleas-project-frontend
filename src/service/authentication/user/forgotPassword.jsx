import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./user.css";
import awsExports from "../../../aws-exports";
import { Amplify } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Text from "../../../components/text/text";
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
        const data = await Auth.forgotPasswordSubmit(username, code, password);

        setSuccess(true);
        navigate("/signin");
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      throw new Error("Passwords do not match");
    }
  }

  return (
    <div className="user-register-page">
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

            <button className="register-btn">  <Text
              label={"Change Password"}
              weight={"regular"}
              color={"white"}
              size={"s16"}
            /></button>
          </form>
        </div>
      ) : (
        <div className="form-box-register">
          <form onSubmit={getEmail} id="loginform" className="form-value">
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Text
                label={"Enter your email address"}
                size={"s20"}
                weight={"medium"}
              />
            </div>
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
            <button className="register-btn">  <Text
              label={"Send Email"}
              weight={"regular"}
              color={"white"}
              size={"s16"}
            /></button>
          </form>
        </div>
      )}
      {/* TODO ADD ALERTS FOR SUCCES AND ERROR  */}
      <div className="user-register-title">
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
    </div>
  );
};

export default ForgotPassword;
