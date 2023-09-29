import React, { useEffect, useState } from "react";
import "./applicants.css";
import unicorn from "../../assets/images/Unicorn.png";
import accept from "../../assets/icons/accept.svg"
import decline from "../../assets/icons/dislike.svg"
import Text from "../text/text";
import axios from "axios";
const Applicants = ({userid, postId, name, lastname }) => {
  const [user,setUser] = useState({});

  const likeUser = async() => {
    console.log("Trying to like")
    try {
      await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/like-user/${postId}?id=${userid}`)
      console.log("error")
    } catch (error) {
      console.log(error)
    }
    console.log("Like successfull")
  }

  const dislikeUser = async() => {
    console.log("Trying to dislike")
    try {
      await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/employer-dislike/${postId}?id=${userid}`)

    } catch (error) {
      console.log(error);
    }
    console.log("Successfully disliked")
  }
  return (
    <div className="applicants-container">
      <div className="applicants-desc">
        <div className="applicant-photo" style={{ backgroundImage: `url(${unicorn})`, lightgray:"50%" }}>
        </div>
        <div className="applicant-info">
          <Text label={`${name} ${lastname}`} size={"s16"} weight={"medium"} color={"black"}/>
          <Text label={"Developer"} size={"s14"} weight={"regular"} color={"black"}/>
        </div>
      </div>
      <div className="applicant-buttons">
        <div className="accept-btn" onClick={likeUser}><img src={accept} alt="" /></div>
        <div className="decline-btn" onClick={dislikeUser}><img src={decline} alt="" /></div>
      </div>
    </div>
  );
};

export default Applicants;