import React, { useState} from "react";
import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import ConfirmSignup from "./confirmSignup";
import { Link, useNavigate } from "react-router-dom";
import Text from "../../../components/text/text";

//Alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";
function RegistrationForm() {
  Amplify.configure(awsExports);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    birthday: "",
    password: "",
    email: "",
  }); //Create the user object

  const [errors, setErrors] = useState({
    name: "",
    birthday: "",
    email: "",
    lastname: "",
    password: "",
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { name, birthday, email, lastname, password } = formData;

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };
    const nameRegEx = /^[a-zA-Z]{2,30}$/;
    const lastnameRegEx = /^[a-zA-Z]{2,30}$/;
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
    } else {
      const birthDate = new Date(birthday);
      console.log(birthDate);
      const today = new Date();
      console.log(today);
      const age = today.getFullYear() - birthDate.getFullYear();
      console.log(age);

      if (age < 16) {
        formIsValid = false;
        newErrors.birthday = "You must be at least 16 years old to register";
      } else {
        newErrors.birthday = "";
      }
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
      console.log("The form results in", validateForm());
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
        toast.success("Registration successful", { autoClose: 5000 });
        setRegistrationSuccess(true);
      } catch (error) {
        alert(error);
        toast.error(error);
        console.error("Error during signup:", error);
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="user-register-page">
        {!registrationSuccess ? (
          <div className="form-box-register">
            <div className="register-title">
              <Link to={"/"}>
                <i
                  className="fa-solid fa-angles-left fa-2xl back-arrow"
                  style={{ marginRight: "30px" }}
                ></i>
              </Link>
              <Text
                label={"Register"}
                size={"s22"}
                color={"white"}
                weight={"bold"}
              />
              <div style={{ flex: "1,1,1" }}></div>
            </div>
            <div className="form-value" >
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="inputbox-register">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <label>First Name</label>
                </div>
                <div className="inputbox-register">
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Last Name</label>
                </div>
                <div className="inputbox-register">
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Email</label>
                </div>
                <div className="inputbox-register">
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
                <div className="inputbox-register">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label>Password</label>
                </div>

                <Text
                  label={`
    <ul>
      <li>Your password must be at least 8 characters long.</li>
      <li>Include at least one uppercase letter (A-Z).</li>
      <li>Include at least one lowercase letter (a-z).</li>
      <li>Include at least one number (0-9).</li>
      <li>Include at least one special character (e.g., !, @, #, $, %, ^, &).</li>
    </ul>`}
                  color={"white"}
                  size={"s14"}
                />
                <button className="register-btn">Register</button>
              </form>
            </div>
          </div>
        ) : (
          <ConfirmSignup
            username={formData.email}
            password={formData.password}
            lastName={formData.lastname}
            name={formData.name}
          />
        )}
      </div>
    </>
  );
}

export default RegistrationForm;
