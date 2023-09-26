import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { Amplify } from "aws-amplify";
import awsExports from "../../../aws-exports";
import ConfirmSignup from "./confirmSignup";
import { Link, useNavigate } from "react-router-dom";
import Text from "../../../components/text/text";
import Button from "../../../components/button/button";
//Alerts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./user.css";
function RegistrationForm() {
  Amplify.configure(awsExports);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("employer");
  const [isEmployee, setisEmployee] = useState(true);
  const [fullName, setFullName] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    birthday: "",
    password: "",
    email: "",
    companyName: "",
    industry: "",
    address: "",
  }); //Create the user object

  const [errors, setErrors] = useState({
    name: "",
    birthday: "",
    email: "",
    lastname: "",
    password: "",
  });


  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { name, birthday, email, lastname, password, companyName,industry,address } = formData;

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };
    const nameRegEx = /^[a-zA-Z]{2,30}$/;
    const lastnameRegEx = /^[a-zA-Z]{2,30}$/;
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    // if (!name) {
    //   formIsValid = false;
    //   newErrors.name = "Full name is required";
    // } else if (!nameRegEx.test(name)) {
    //   formIsValid = false;
    //   newErrors.name = "Name expression is not correct";
    // } else {
    //   newErrors.name = "";
    // }

    // if (!lastname) {
    //   formIsValid = false;
    //   newErrors.lastname = "Full name is required";
    // } else if (!lastnameRegEx.test(lastname)) {
    //   formIsValid = false;
    //   newErrors.lastname = "Name expression is not correct";
    // } else {
    //   newErrors.lastname = "";
    // }


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
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };


  const handleFullName = (event) => {
    const { value } = event.target;
    setFullName(value);
    // Split the fullName into first and last names based on space
    const [first, ...rest] = value.split(" ");
    setFormData({
      ...formData,
      name: first,
      lastname: rest.join(" "),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (1+1 ===2) {
      console.log("The form results in", validateForm());
      if (selectedCategory === "employer") {
        setisEmployee(false)

      }
      try {
        await Auth.signUp({
          username: formData.email,
          password: formData.password,
          attributes: {
            email: formData.email,
            given_name: formData.name,
            family_name: formData.lastname,
            birthdate: formData.birthday,
            'custom:isEmployee': selectedCategory === "employee" ? 'true' : 'false',
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
    <div className="user-register-page">
      {!registrationSuccess ? (
        <div className="form-box-register">
          <div className="form-category">
            <div
              className={`employer-category ${
                selectedCategory === "employee" ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory("employee")}
            >
              <div style={{ marginBottom: "10px" }}>
                <Text label={"Employee"} />
              </div>
            </div>
            <div
              className={`employee-category ${
                selectedCategory === "employer" ? "selected" : ""
              }`}
              onClick={() => setSelectedCategory("employer")}
            >
              <div style={{ marginBottom: "10px" }}>
                <Text label={"Employer"} />
              </div>
            </div>
          </div>
          {selectedCategory === "employee" ? (
            <form
              onSubmit={handleSubmit}
              className="form-value"
              autoComplete="off"
            >
              <div className="inputbox-register">
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={handleFullName}
                  placeholder="Full Name"
                  className="register-input"
                  required
                />
              </div>

              <div className="inputbox-register">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="register-input"
                />
              </div>
              <div className="inputbox-register">
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleInputChange}
                  placeholder="Birthday"
                  className="register-input"
                  required
                />
              </div>
              <div className="inputbox-register">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="register-input"
                  required
                />
              </div>
              <div className="radio-terms">
                <input
                  type="radio"
                  name="agree-to-terms"
                  required
                  className="terms-button"
                  style={{ appearance: "none", borderRadius: "0" }}
                />
                <div className="terms-text">
                  <div style={{ marginRight: "5px" }}>
                    <Text label={"I accept"} weight={"thin"} />
                  </div>
                  <Text label={"Terms & Conditions"} weight={"bold"} />
                </div>
              </div>
              <button className="register-btn">
                <Text
                  label={"Register"}
                  weight={"regular"}
                  color={"white"}
                  size={"s16"}
                />
              </button>
              {/* <Button bgcolor={"primary"} label={"register"}/> */}
              <div className="goto-login">
                <Text
                  label={"Already have an account?"}
                  weight={"regular"}
                  color={"black"}
                  size={"s16"}
                />
                <Link style={{ textDecoration: "none" }} to={"/signin"}>
                  <Text
                    label={"Login"}
                    weight={"medium700"}
                    color={"purple"}
                    size={"s16"}
                  />
                </Link>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="form-value"
              autoComplete="off"
            >
              <div className="inputbox-register">
                <input
                  type="text"
                  name="companyName"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="register-input"
                  required
                />
              </div>

              <div className="inputbox-register">
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  placeholder="Industry"
                  className="register-input"
                  required
                />
              </div>
              <div className="inputbox-register">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                  className="register-input"
                  required
                />
              </div>
              <div className="inputbox-register">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="register-input"
                  required
                />
              </div>
              <div className="inputbox-register">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="register-input"
                  required
                />
              </div>
              <div className="radio-terms">
                <input
                  type="radio"
                  name="agree-to-terms"
                  required
                  className="terms-button"
                  style={{ appearance: "none", borderRadius: "0" }}
                />
                <div className="terms-text">
                  <div style={{ marginRight: "5px" }}>
                    <Text label={"I accept"} weight={"thin"} />
                  </div>
                  <Text label={"Terms & Conditions"} weight={"bold"} />
                </div>
              </div>
              <button className="register-btn">
                <Text
                  label={"Register"}
                  weight={"regular"}
                  color={"white"}
                  size={"s16"}
                />
              </button>
              {/* <Button bgcolor={"primary"} label={"register"}/> */}
              <div className="goto-login">
                <Text
                  label={"Already have an account?"}
                  weight={"regular"}
                  color={"black"}
                  size={"s16"}
                />
                <Link style={{ textDecoration: "none" }} to={"/signin"}>
                  <Text
                    label={"Login"}
                    weight={"medium700"}
                    color={"purple"}
                    size={"s16"}
                  />
                </Link>
              </div>
            </form>
          )}
        </div>
      ) : (
        <ConfirmSignup
          username={formData.email}
          password={formData.password}
          lastName={formData.lastname}
          name={formData.name}
          isEmployee={isEmployee}
          industry={formData.industry}
          address={formData.address}
        />
      )}
      <div className="user-register-title">
        <div style={{ marginBottom: "16px" }}>
          <Text
            label={"Register"}
            size={"s20"}
            weight={"medium700"}
            color={"white"}
          />
        </div>
        <Text
          label={
            selectedCategory === "employee"
              ? "Find your dream job?"
              : "Find the employees for your company!"
          }
          size={"s16"}
          weight={"regular"}
          color={"white"}
        />
      </div>
    </div>
  );
}

export default RegistrationForm;
