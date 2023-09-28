import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import axios from "axios";
import "./employerProfile.css";
import unicorn from "../../assets/images/Unicorn.png";
import UserSignOut from "../../service/authentication/user/userSignOut";
import { Link } from "react-router-dom";
const EmployerProfile = () => {
  const creatorId = localStorage.getItem("employerId");
  const [employer, setEmployer] = useState({});
  useEffect(() => {
    getEmployer();
  }, []);
  const getEmployer = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/employer/${creatorId}`
      );

      setEmployer(response.data.employer);
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    backgroundImage: `url(${employer.profilePhoto ?? unicorn})`,
    position: "relative",
  };

  return (
    <div className="employer-profie-container">
      <div className="photo-container">
        <div className="company-photo" style={cardStyle}></div>
      </div>
      <div
        style={{ backgroundImage: `url(${employer.profilePhoto ?? unicorn})` }}
      ></div>
      <Text label={employer.companyName} weight={"bold"} color={"black"} />
      <div style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <Link to={`/${employer.companyName}`}>
            <Text label={"Go Home"} weight={"bold"} color={"black"} />
          </Link>
        </div>
        <Text
          label={"Edit profile (TO BE DONE)"}
          weight={"bold"}
          color={"black"}
        />
        <UserSignOut />
      </div>
    </div>
  );
};

export default EmployerProfile;
