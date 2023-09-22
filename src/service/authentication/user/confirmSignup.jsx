import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import "./userSignUp.css"
const ConfirmSignup = ({ username }) => {
  const [code, setCode] = useState('');
  const [confirmationError, setConfirmationError] = useState(null);
  const navigate = useNavigate();
  async function confirmSignUp(e) {

    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
      console.log('Successfully confirmed sign up');
      navigate("/completeprofile")
    } catch (error) {
      console.error('Error confirming sign up', error);
      setConfirmationError('Error confirming sign up. Please check the code and try again.');
    }
  }

  return (
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
      </form>
    </div>
  );
};

export default ConfirmSignup;
