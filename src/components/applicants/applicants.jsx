import React, { useEffect, useState } from "react";
import "./applicants.css";
import unicorn from "../../assets/images/Unicorn.png";
import accept from "../../assets/icons/accept.svg"
import decline from "../../assets/icons/dislike.svg"
import Text from "../text/text";
import axios from "axios";
const Applicants = ({id}) => {
  const [user,setUser] = useState({});
  useEffect(()=>{
    console.log("MY ID IS " + id);
    getUser();
  },[]) 
  const getUser = async() => {
    try {
      const response = await axios.get(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user/${id}`);
      setUser(response.data.user)
      
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  return (
    <div className="applicants-container">
      <div className="applicants-desc">
        <div className="applicant-photo" style={{ backgroundImage: `url(${unicorn})`, lightgray:"50%" }}>
        </div>
        <div className="applicant-info">
          <Text label={`${user.name} ${user.lastname}`} size={"s16"} weight={"medium"} color={"black"}/>
          <Text label={`${user.generalSkills}`} size={"s14"} weight={"regular"} color={"black"}/>
        </div>
      </div>
      <div className="applicant-buttons">
        <div className="accept-btn"><img src={accept} alt="" /></div>
        <div className="decline-btn"><img src={decline} alt="" /></div>
      </div>
    </div>
  );
};

export default Applicants;
