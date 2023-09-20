import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import "./userSignUp.css"
const ConfirmSignup = ({ username }) => {
  const [code, setCode] = useState('');
  const [confirmationError, setConfirmationError] = useState(null);

  async function confirmSignUp(e) {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
      console.log('Successfully confirmed sign up');
      // You can redirect the user or perform any other action upon successful confirmation.
    } catch (error) {
      console.error('Error confirming sign up', error);
      setConfirmationError('Error confirming sign up. Please check the code and try again.');
    }
  }

  return (
    <div>
      <form onSubmit={confirmSignUp}>
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
        <input className="form__input" type="submit" value="Confirm" />
      </form>
    </div>
  );
};

export default ConfirmSignup;
