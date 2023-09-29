import React from "react";
import unicorn from "../../assets/images/Unicorn.png";
import SignOut from "../../service/authentication/user/userSignOut";
import Text from "../../components/text/text";
import "./employerProfile.css";

const EmployerProfile = ({ employerData, employeeCheck }) => {
  const cardStyle = {
    backgroundImage: `url(${employerData.profilePhoto ?? unicorn} )`,
    position: "relative",
  };
  return (
    <div className="profile-container">
      <div className="photo-container">
        <div className="profile-profile-pic" style={cardStyle}>
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
