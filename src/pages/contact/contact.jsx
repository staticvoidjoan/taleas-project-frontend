import React, { useState } from "react";
import Text from "../../components/text/text";
import axios from "axios";
import "./contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Adding new  contact...");
      console.log("Form data submitted:", formData);
      const response = await axios.post(
        "https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/contact",
        formData
      );
      console.log("Server response:", response);
      console.log("Form data submitted:", formData);
      console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <div className="contact-container">
        <div className="contact-text">
          <Text
            label={"Get In Touch"}
            weight={"bold"}
            lineheight={"lnormal"}
            size={"s24"}
            color={"lightgray"}
          />
          <hr />
          <Text
            label={
              "We would like to stay in touch. Want to connect yet ? Reach out through the form below , and we will get back to you within a day"
            }
            weight={"thin"}
            lineheight={"lnormal"}
            size={"s16"}
            color={"lightgray"}
          />
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName" className="contact-label">
                <Text
                  label={" Name"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s16"}
                  color={"purple"}
                />{" "}
              </label>
              <input
                className="contact-input"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="contact-label">
                {" "}
                <Text
                  label={"Surname"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s16"}
                  color={"purple"}
                />{" "}
              </label>
              <input
                className="contact-input"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="contact-label">
                <Text
                  label={"Email"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s16"}
                  color={"purple"}
                />{" "}
              </label>
              <input
                className="contact-input"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="message" className="contact-label">
                <Text
                  label={"Message"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s16"}
                  color={"purple"}
                />{" "}
              </label>
              <textarea
                className="contact-input"
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn-register-contact" type="submit">
              <Text
                label={"Submit"}
                weight={"thin"}
                lineheight={"lnormal"}
                size={"s16"}
                color={"white"}
              />{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Contact;
