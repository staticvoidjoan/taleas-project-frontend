import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./user.css";
import awsExports from "../../../aws-exports";
import { Amplify } from "aws-amplify";
import { useNavigate } from "react-router-dom";
const ForgotPassword = () => {
    Amplify.configure(awsExports);
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [emailsent, setEmailSent] = useState(false);
  const [confirmationError, setConfirmationError] = useState(null);
  const navigate = useNavigate();

  async function resendSignUp(e) {
    e.preventDefault()
    try {
      await Auth.resendSignUp(username);
      setEmailSent(true);
    } catch (error) {
      setConfirmationError(
        "Error sending code. user does not exist."
      );
      console.log(error)
    }
  }

  async function confirmSignUp(e) {
    e.preventDefault();
    try {
      console.log(username);
      console.log(code);
      await Auth.confirmSignUp(username, code);
      console.log('Successfully confirmed sign up');
    } catch (error) {
      console.error("Error confirming sign up", error);
      setConfirmationError(
        "Error confirming sign up. Please check the code and try again."
      );
    }
  }

  return (
    <section>
      {emailsent ? (
        <div className="form-box">
        <div className="form-value">
          <h2>Confirm your account</h2>
          <form onSubmit={confirmSignUp}>
            <div className="inputbox">
              <input
                className="form__input"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            <label >Enter the code</label>
          </div>
          {confirmationError && (
            <p className="error-message">{confirmationError}</p>
          )}
           <button className="">Confirm</button>
        </form>
      </div>
      </div>
      ) : (
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={resendSignUp} id="loginform">
              <h2>Confirm Account</h2>
              <div className="inputbox">
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label for="">Enter your email</label>
              </div>
              <button>Send Email</button>
            </form>
          </div>
        </div>
      )}
      {/* TODO ADD ALERTS FOR SUCCES AND ERROR  */}
    </section>
  );
};

export default ForgotPassword;