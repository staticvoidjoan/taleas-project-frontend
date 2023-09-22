import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import ConfirmSignup from "./confirmSignup";
import { Link } from "react-router-dom";
import "./user.css";
function RegistrationForm() {
  Amplify.configure(awsExports);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    birthday: "",
    password: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    birthday: "",
    email: "",
    lastname: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const { name, birthday, email, lastname, password } = formData;
  const validateForm = async () => {
    let formIsValid = true;
    const newErrors = { ...errors };
    const nameRegEx = /^[a-zA-Z]{2,30}$/;
    const lastnameRegEx = /^[a-zA-Z]{2,30}$/;
    const birthdayValidation = /^\d{4}-\d{2}-\d{2}$/;
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!name) {
      formIsValid = false;
      newErrors.name = "Full name is required";
    } else if (!nameRegEx.test(name)) {
      formIsValid = false;
      newErrors.name = "Name expression is not correct";
    } else {
      newErrors.name = "";
    }

    if (!lastname) {
      formIsValid = false;
      newErrors.lastname = "Full name is required";
    } else if (!lastnameRegEx.test(lastname)) {
      formIsValid = false;
      newErrors.lastname = "Name expression is not correct";
    } else {
      newErrors.lastname = "";
    }

    if (!birthday) {
      formIsValid = false;
      newErrors.birthday = "Birthday is required";
    } else if (!birthdayValidation.test(birthday)) {
      formIsValid = false;
      newErrors.birthday = "You must be more than 18 years to have a account";
    } else {
      newErrors.birthday = "";
    }

    if (!email) {
      formIsValid = false;
      newErrors.email = "Email is required";
    } else if (!emailRegEx.test(email)) {
      formIsValid = false;
      newErrors.email = "Email provided is not correct expression";
    } else {
      newErrors.email = "";
    }

    if (!password) {
      formIsValid = false;
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      formIsValid = false;
      newErrors.password =
        "Invalid password format! Password must be at least 8 characters long and should contain at least one number, one letter and one symbol.";
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await Auth.signUp({
          username: formData.email,
          password: formData.password,
          attributes: {
            email: formData.email,
            given_name: formData.name,
            family_name: formData.lastname,
            birthdate: formData.birthday,
          },
        });
        console.log("Registration successful");
        alert("Registration successful");
        setRegistrationSuccess(true);
      } catch (error) {
        alert(error);
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <>
      <section>
        {!registrationSuccess ? (
          <div className="form-box-register">
            <div className="form-value">
              <form onSubmit={handleSubmit}>
                <div className="register-title">
                  <Link to={"/"}>
                    <i
                      class="fa-solid fa-angles-left fa-2xl back-arrow"
                      style={{ marginRight: "30px" }}
                    ></i>
                  </Link>
                  <h2 style={{ marginLeft: "30px" }}>Register</h2>{" "}
                  {/*TODO CHANGE TO TEXT COMPONENT + CSS*/}
                </div>
                <div className="inputbox">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <label>First Name</label>
                </div>
                <div className="inputbox">
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Last Name</label>
                </div>
                <div className="inputbox">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Email</label>
                </div>
                <div className="inputbox">
                  <input
                    type="date"
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                    placeholder="Birthday"
                    required
                  />
                </div>
                <div className="inputbox">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Password</label>
                </div>

                <button className="">Register</button>
              </form>
            </div>
          </div>
        ) : (
          <ConfirmSignup username={formData.email} />
        )}
      </section>
    </>
  );
}

export default RegistrationForm;
