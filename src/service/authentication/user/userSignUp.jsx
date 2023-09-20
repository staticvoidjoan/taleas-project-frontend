import React, {useState} from 'react';
import {Auth} from "aws-amplify"
import {Amplify} from "aws-amplify"
import awsExports from '../../../aws-exports';
import "./userSignUp.css"
import ConfirmSignup from './confirmSignup';

function RegistrationForm() {

    
Amplify.configure(awsExports);
    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        birthday: '',
        password: '',
        email: "",
      });

    const [errors, setErrors] = useState({
    name: '',
    birthday: '',
    email: '',
    lastname: '',
    password: '',
    });

    const [registrationSuccess, setRegistrationSuccess] = useState(false);


    const {name, birthday, email, lastname, password} = formData;
    const validateForm = async () => {
      let formIsValid = true;
      const newErrors = {...errors};
      const nameRegEx = /^[a-zA-Z]{2,30}$/;
      const lastnameRegEx = /^[a-zA-Z]{2,30}$/;
      const birthdayValidation = /^\d{4}-\d{2}-\d{2}$/;
      const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex =/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

      if(!name) {
          formIsValid = false;
          newErrors.name = "Full name is required";
      } else if(!nameRegEx.test(name)){
          formIsValid = false;
          newErrors.name = 'Name expression is not correct';
      } else {
          newErrors.name = "";
      }

      if(!lastname) {
        formIsValid = false;
        newErrors.lastname = "Full name is required";
    } else if(!lastnameRegEx.test(lastname)){
        formIsValid = false;
        newErrors.lastname = 'Name expression is not correct';
    } else {
        newErrors.lastname = "";
    }
  
      if(!birthday) {
          formIsValid = false;
          newErrors.birthday = 'Birthday is required';
      } else if (!birthdayValidation.test(birthday)){
          formIsValid = false;
          newErrors.birthday = 'You must be more than 18 years to have a account';
      } else {
          newErrors.birthday = "";
      }
  
      if(!email) {
          formIsValid = false;
          newErrors.email = 'Email is required';
      } else if(!emailRegEx.test(email)){
          formIsValid = false;
          newErrors.email = 'Email provided is not correct expression';
      } else {
          newErrors.email = "";
      }
      
      if (!password) {
          formIsValid = false;
          newErrors.password = 'Password is required';
      } else if (!passwordRegex.test(password)){
          formIsValid = false;
          newErrors.password = "Invalid password format! Password must be at least 8 characters long and should contain at least one number, one letter and one symbol.";
      } else {
          newErrors.password = "";
      }
  
      setErrors(newErrors);
      return formIsValid;
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '', 
        }));
      };

    const  handleSubmit = async(e) => {
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
                    birthdate: formData.birthday
                  },
                });
                console.log('Registration successful');
                alert("Registration successful")
                setRegistrationSuccess(true);
              } catch (error) {
                alert(error)
                console.error('Error during signup:', error);
              }
        }
      };

    return (
        <>
        <div className='signUp-page-container'>

        <div className="signUp-form-container">
            <div className="form-body">
                <div className="username">
                    <label className="form__label" for="firstName">First Name </label>
                    <input className="form__input" name="name" type="text" value={formData.name} onChange = {handleInputChange} id="firstName" placeholder="First Name" required/>
                </div>
                <div className="lastname">
                    <label className="form__label" for="lastName">Last Name </label>
                    <input  type="text" name="lastname" id="lastName" value={formData.lastname}  className="form__input" onChange = { handleInputChange} placeholder="LastName" required/>
                </div>
                <div className="email">
                    <label className="form__label" for="email">Email </label>
                    <input  type="email" id="email" name="email" className="form__input" value={formData.email} onChange = {handleInputChange} placeholder="Email" required/>
                </div>
                <div className="birthday">
                    <label className="form__label" for="birthday">Birthday </label>
                    <input type="date" id="birthday" name="birthday" value={formData.birthday} onChange = {handleInputChange} placeholder="Birthday" required/>
                </div>
                <div className="password">
                    <label className="form__label" for="password">Password </label>
                    <input className="form__input" type="password" name="password" id="password" value={formData.password} onChange = {handleInputChange} placeholder="Password" required />
                </div>
            </div>
            <div class="footer">
                <button onClick={handleSubmit} type="submit" class="btn">Register</button>
            </div>
        </div>
        </div>
        {registrationSuccess ? (<ConfirmSignup username={formData.email}/>) : null}
        </>
    )       
}

export default RegistrationForm