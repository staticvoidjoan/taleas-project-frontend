<<<<<<< HEAD
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import "./userSignUp.css"
=======
import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./userSignIn.css";
>>>>>>> fd741f4abca449ec6fc325890ddc864fc33d40e1
const ConfirmSignup = ({ username }) => {
  const [code, setCode] = useState("");
  const [confirmationError, setConfirmationError] = useState(null);
  const navigate = useNavigate();
  async function confirmSignUp(e) {

    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
<<<<<<< HEAD
      console.log('Successfully confirmed sign up');
      navigate("/")
=======
      console.log("Successfully confirmed sign up");
      // You can redirect the user or perform any other action upon successful confirmation.
>>>>>>> fd741f4abca449ec6fc325890ddc864fc33d40e1
    } catch (error) {
      console.error("Error confirming sign up", error);
      setConfirmationError(
        "Error confirming sign up. Please check the code and try again."
      );
    }
  }

  return (
<<<<<<< HEAD
    <div className='signUp-form-container'>
      <form onSubmit={confirmSignUp} className='form-body'>
        <label className='form__label'>Enter the code sent to your email</label>
        <input
          className="form__input"
          type="text"
          placeholder="Confirmation code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        {confirmationError && <p className="error-message">{confirmationError}</p>}
        <button type='submit' className='btn'>Submit</button>
=======
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
>>>>>>> fd741f4abca449ec6fc325890ddc864fc33d40e1
      </form>
    </div>
    </div>
  );
};

export default ConfirmSignup;
