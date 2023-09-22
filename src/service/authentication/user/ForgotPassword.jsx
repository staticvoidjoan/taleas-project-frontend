import React, { useState} from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { Auth } from 'aws-amplify';

const ForgotPasswordPage = (props) => {
    const location = useLocation();
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search);
    const usernameFromQuery = searchParams.get("username");
    
    const [username, setUsername] = useState(usernameFromQuery || '');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    try {
        console.log(username)
      await Auth.forgotPasswordSubmit(username, code, newPassword);
        console.log("authendicated!")
      setSuccess(true);
      setError(null);
      navigate("/signin");
    } catch (err) {
      setError("An error occurred while resetting the password.");
      setSuccess(false);
    }
  };

  return (
    <section>
    <div >
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword} >
        <div>
        <input type="text" value={username} readOnly />
        <label style={{top: "-5px"}}>
          Username:
        </label>
        </div>
        <div >
        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
        <label>
          Verification Code:
        </label>
        </div>
        <div >
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <label>
          New Password:
        </label>
        </div>
        <input type="submit" className='btn' id='login-submit' value="Reset Password" />
      </form>
      {error && <p>{error}</p>}
      {success && <p>Password reset successful!</p>}
    </div>
    </section>
  );
};

export default ForgotPasswordPage;