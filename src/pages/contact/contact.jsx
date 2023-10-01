import React, { useState } from "react";
import Text from "../../components/text/text";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

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
              <label htmlFor="">
                <Text
                  label={" Name"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s16"}
                  color={"purple"}
                />{" "}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="">
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
                type="text"
                id="lasttName"
                name="lastName"
                value={formData.lasttName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="email">
                <Text
                  label={"Email"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s16"}
                  color={"purple"}
                />{" "}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="message">
                <Text
                  label={"Message"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s16"}
                  color={"purple"}
                />{" "}
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>
            <button className="btn-register" type="submit">
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
