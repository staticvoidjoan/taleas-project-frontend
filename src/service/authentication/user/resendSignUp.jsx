import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./user.css";
import awsExports from "../../../aws-exports";
import { Amplify } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Text from "../../../components/text/text";
const ForgotPassword = () => {
  Amplify.configure(awsExports);
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [emailsent, setEmailSent] = useState(false);
  const [confirmationError, setConfirmationError] = useState(null);
  const navigate = useNavigate();

  async function resendSignUp(e) {
    e.preventDefault();
    try {
      console.log("Sending new code")
      await Auth.resendSignUp(username);
      setEmailSent(true);
    } catch (error) {
      setConfirmationError("Error sending code. user does not exist.");
      console.log(error);
    }
  }

  async function confirmSignUp(e) {
    e.preventDefault();
    try {
      console.log(username);
      console.log(code);
      await Auth.confirmSignUp(username, code);
      console.log("Successfully confirmed sign up");
    } catch (error) {
      console.error("Error confirming sign up", error);
      setConfirmationError(
        "Error confirming sign up. Please check the code and try again."
      );
    }
  }

  return (
    <div className="user-register-page">
      {emailsent ? (
        <div className="form-box-register">
           <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Text
                label={"Enter the confirmation code "}
                size={"s20"}
                weight={"medium"}
              />
            </div>

          <form onSubmit={confirmSignUp} className="form-value">
            <div className="inputbox-register">
              <input
               
                className="register-input"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            {confirmationError && (
              <p className="error-message">{confirmationError}</p>
            )}
            <button className="register-btn">  <Text
              label={"Confirm"}
              weight={"regular"}
              color={"white"}
              size={"s16"}
            /></button>
          </form>
        </div>
      ) : (
        <div className="form-box-register">
          <form onSubmit={resendSignUp} id="loginform" className="form-value">
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Text
              
                label={"Enter your email "}
                size={"s20"}
                weight={"medium"}
              />
            </div>
            <div className="inputbox-register">
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="register-input"
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
      <div className="user-register-title">
        <div style={{ marginBottom: "16px" }}>
          <Text
            label={"Confirm your account"}
            size={"s20"}
            weight={"medium700"}
            color={"white"}
          />
        </div>
        <Text
          label={"Lost your code? No worries we will send a new one"}
          size={"s14"}
          weight={"regular"}
          color={"white"}
        />
      </div>
    </div>
  );
};
export default ForgotPassword;
