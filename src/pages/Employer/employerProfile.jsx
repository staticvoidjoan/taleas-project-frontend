import React, { useState, useEffect } from "react";
import unicorn from "../../assets/images/Unicorn.png";
import SignOut from "../../service/authentication/user/userSignOut";
import Text from "../../components/text/text";
import "./employerProfile.css";
import ImageUploader from "../../components/Convert/convertImage";
import axios from "axios";
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
    try {
      await axios.put(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/update-profile/${employerData._id}`,
        {
          profilePhoto: newPhoto.profilePhoto,
        }
      );
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const cardStyle = {
    backgroundImage: `url(${employerData.profilePhoto || unicorn})`,
    position: "relative",
  };

  return (
    <div className="profile-container">
      <div className="photo-container">
        <div className="profile-profile-pic" style={cardStyle}>
          <form className="change-photo-form">
          <i class="fa-solid fa-plus" style={{color: "#00ff88"}}>
            <input type="file" accept="image/*" className="custom-file-input" onChange={handleImageChange} />
          </i>
            
          </form>
          <div className="gradient-overlay"></div>
        </div>
      </div>

      <div className="profile-info-box">
        <Text
          label={employerData.companyName}
          size={"s22"}
          color={"#333"}
          weight={"bold"}
        />
        <Text label={employerData.email} size={"s18"} color={"#666"} />
        <Text
          label={`<strong>Total posts made:</strong> ${employerData.postsMade}`}
          size={"s18"}
          color={"#666"}
        />
        <Text
          label={`<strong>Address:</strong> ${employerData.address}`}
          size={"s18"}
          color={"#666"}
        />
      </div>
      <SignOut />
    </div>
  );
};

export default EmployerProfile;
