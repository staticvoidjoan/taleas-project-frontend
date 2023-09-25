import React, { useState } from "react";
import { Auth , Hub} from "aws-amplify";
import "./user.css";
import { useNavigate } from "react-router-dom";
import axios  from "axios";
const ConfirmSignup = ({ username, password,name,lastName }) => {
  const [code, setCode] = useState("");
  const [confirmationError, setConfirmationError] = useState(null);
  const navigate = useNavigate();
  async function confirmSignUp(e) {
    e.preventDefault();
    try {
      await Auth.confirmSignUp(username, code);
      console.log('Successfully confirmed sign up');
     saveToDatabase();
    } catch (error) {
      console.error("Error confirming sign up", error);
      setConfirmationError(
        "Error confirming sign up. Please check the code and try again."
      );
    }
  }
  
  const saveToDatabase = async () => {
    
    try {
      await axios.post(
        'https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user',
        {
          name: name,
          lastname: lastName,
          email: username,
        },
        {
          headers: {
            'Content-Type': 'application/json', // Add this line
          },
        }
      );
      
      console.log("Axios POST request successful");
     logIn();
    } catch (error) {
      console.error("Error during POST request:", error);
    }
    console.log("After Axios POST request");
  }


  const logIn = async () => {
    try {
     
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

      navigate(`/${name}${lastName}`)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }  
  };  



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
