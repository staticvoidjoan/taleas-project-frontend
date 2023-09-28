import React from 'react';
import heart from "../../assets/icons/heart.svg";
import x from "../../assets/icons/x.svg";
import axios from "axios"
import "./dateButtons.css"

const DateButtons = ({postId}) => {

  const handleCancelClick = async (id) => {
      try{
       await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/dislike/${id}?id=${postId}`)
        console.log('Cancel API Response:');
      }
      catch {
        console.error('Cancel API Error:');
      };
  };

  const handleLikeClick = async (id) => {
    try{
      await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/like/${id}?id=${postId}`)
       console.log('Cancel API Response:');
     }
     catch {
       console.error('Cancel API Error:');
     };
  }
    return (
        <div className="card-buttons">
        <div>
          <button className="cancel" onClick={handleCancelClick}>
            {" "}
            <img src={x} alt="x" />
          </button>
        </div>
        <div>
          <button className="like" onClick={handleLikeClick}>
            <img src={heart} alt="heart" />
          </button>
        </div>
      </div>
    );
}

export default DateButtons;
