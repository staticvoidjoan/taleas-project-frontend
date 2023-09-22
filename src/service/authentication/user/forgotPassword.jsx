import React, { useState } from "react";
import { Auth } from "aws-amplify";
import "./user.css";
import awsExports from "../../../aws-exports";
import { Amplify } from "aws-amplify";
import { useNavigate } from "react-router-dom";
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
    e.preventDefault()
      console.log(username);
    try {
      await Auth.forgotPassword(username);
      setEmailSent(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function forgotPasswordSubmit(e) {
    e.preventDefault()
    if (password === repeatpass) {
      try {
        const data = await Auth.forgotPasswordSubmit(username, code, password);

        setSuccess(true);
        navigate("/signin")
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      throw new Error("Passwords do not match");
    }
  }

  return (
    <section>
      {emailsent ? (
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={forgotPasswordSubmit} id="loginform">
              <h2>Reset Password</h2>
              <div className="inputbox">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
                <label for="">Code</label>
              </div>
              <div class="inputbox">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label for="">Password</label>
              </div>
              <div class="inputbox">
                <input
                  type="password"
                  value={repeatpass}
                  onChange={(e) => setRepeatPass(e.target.value)}
                  required
                />
                <label for="">Repat Password</label>
              </div>

              <button>Change Password</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={getEmail} id="loginform">
              <h2>Reset Password</h2>
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