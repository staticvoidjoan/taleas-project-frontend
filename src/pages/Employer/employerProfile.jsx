import React, { useState, useEffect } from "react";
import unicorn from "../../assets/images/Unicorn.png";
import SignOut from "../../service/authentication/user/userSignOut";
import Text from "../../components/text/text";
import "./employerProfile.css";
import ImageUploader from "../../components/Convert/convertImage";
import axios from "axios";
import emailpic from "../../assets/icons/email.svg";
import locationico from "../../assets/icons/location.svg";
import Animate from "../../animateTransition/Animate";
import CenterNavbar from "../../components/centerNavbar/centerNavbar";
const EmployerProfile = ({ employerData, employeeCheck }) => {
  const [newPhoto, setNewPhoto] = useState({
    profilePhoto: "",
  });
  useEffect(() => {
    console.log("newPhoto:", newPhoto);
    if (newPhoto.profilePhoto) {
      // Automatically submit the form when a new image is selected
      console.log("Submitting form...");
      editEmployer();
    }
  }, [newPhoto]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the selected file as a data URL (base64)
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setNewPhoto({
          ...newPhoto,
          profilePhoto: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const editEmployer = async (e) => {
    let theAdd = employerData.address;
    if (theAdd){
        
    
    try {
     
      await axios.put(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/update-profile/${employerData._id}`,
        {
          profilePhoto: newPhoto.profilePhoto,
          address: theAdd
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  };

  const cardStyle = {
    backgroundImage: `url(${employerData.profilePhoto || unicorn})`,
    position: "relative",
  };

  return (
    <>
      <Animate>
        <div className="profile-container">
          <div className="photo-container-employer-profile">
            <div className="profile-profile-pic" style={cardStyle}>
              <form className="change-photo-form">
                <input
                  type="file"
                  accept="image/*"
                  className="custom-file-input"
                  onChange={handleImageChange}
                />
              </form>
            </div>
          </div>
          <div className="employer-profile-info">
            <Text
              label={employerData.companyName}
              size={"s18"}
              color={"#333"}
              weight={"bold"}
            />
            <Text
              label={employerData.industry}
              size={"s16"}
              weight={"regular"}
              color={"black"}
            />
            <div className="job-title-info">
              <div className="info-bubble">
                <img
                  alt="email"
                  src={emailpic}
                  style={{ marginLeft: "8px", marginRight: "8px" }}
                />

                <Text
                  label={employerData.email}
                  size={"s14"}
                  color={"black"}
                  style={{ marginRight: "8px" }}
                />
              </div>
            </div>
            <div className="job-title-info">
              <div className="info-bubble">
                <img src={locationico} className="location-icon" />
                <div style={{ marginRight: "10px" }}>
                  <Text
                    label={employerData.address}
                    weight={"regular"}
                    color={"lightgray"}
                    size={"s14"}
                  />
                </div>
              </div>
            </div>
          </div>
          <SignOut />
        </div>
      </Animate>
    </>
  );
};

export default EmployerProfile;
