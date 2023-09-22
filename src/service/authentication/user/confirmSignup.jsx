import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./userSignIn.css";
const ConfirmSignup = ({ username }) => {
  const [code, setCode] = useState("");
  const [confirmationError, setConfirmationError] = useState(null);

  async function confirmSignUp(e) {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
      console.log("Successfully confirmed sign up");
      // You can redirect the user or perform any other action upon successful confirmation.
    } catch (error) {
      console.error("Error confirming sign up", error);
      setConfirmationError(
        "Error confirming sign up. Please check the code and try again."
      );
    }
  }

  return (
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
          <label >Enter the code sent to your email</label>
        </div>
        {confirmationError && (
          <p className="error-message">{confirmationError}</p>
        )}
         <button className="">Confirm</button>
      </form>
    </div>
    </div>
  );
};

export default ConfirmSignup;
