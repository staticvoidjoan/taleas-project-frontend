import React from 'react';
import heart from "../../assets/icons/heart.svg";
import x from "../../assets/icons/x.svg";
import star from "../../assets/icons/star.svg";
import "./dateButtons.css"
const DateButtons = () => {
    return (
        <div className="card-buttons">
        <div>
          <button className="cancel">
            {" "}
            <img src={x} alt="x" />
          </button>
        </div>
        <div>
          <button className="superlike">
            <img src={star} alt="star" />
          </button>
        </div>
        <div>
          <button className="like">
            <img src={heart} alt="heart" />
          </button>
        </div>
      </div>
    );
}

export default DateButtons;
