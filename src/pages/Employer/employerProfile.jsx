import React, { useState } from "react";
import unicorn from "../../assets/images/Unicorn.png";
import SignOut from "../../service/authentication/user/userSignOut";
import Text from "../../components/text/text";
import "./employerProfile.css";
import ImageUploader from "../../components/Convert/convertImage";
import axios from "axios";

const EmployerProfile = ({ employerData, employeeCheck }) => {
  const [newEmployer, setNewEmployer] = useState({
    profilePhoto: "",
    address: employerData.address || "" ,
  });

  const editEmployer = async () => {
    try {
      await axios.put(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/update-profile/${employerData._id}`,
        newEmployer // You should pass the data you want to update in the request body
      );
    } catch (error) {
      console.error(error);
    }
  };

  const cardStyle = {
    backgroundImage: `url(${employerData.profilePhoto ?? unicorn})`,
    position: "relative",
  };

  return (
    <div className="profile-container">
      <div className="photo-container">
        <div className="profile-profile-pic" style={cardStyle}>
          <div className="gradient-overlay"></div>
        </div>
      </div>
      <form onSubmit={editEmployer}>
        <ImageUploader
          currentImage={employerData.profilePhoto}
          setImage={(base64String) =>
            setNewEmployer({ ...newEmployer, profilePhoto: base64String })
          } // Fixed the syntax error here
        />
        <button type="submit">Change</button> {/* Added type attribute */}
      </form>
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
