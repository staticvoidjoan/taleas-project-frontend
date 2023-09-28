import React from 'react';
import Text from '../text/text';
import "./cards.css"
import locationImg from '../../assets/icons/location.svg';
import unicorn from "../../assets/images/Unicorn.png"


const Card = ({title, info, category, background }) => {
    const cardStyle = {
        backgroundImage: `linear-gradient(0deg, #222 0.07%, rgba(34, 34, 34, 0.65) 52.9%, rgba(34, 34, 34, 0.00) 99.93%), url('${background ?? unicorn}')`,
        backgroundRepeat: 'no-repeat',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        flexShrink: 0,
      };
      

  return (
    <div className='card-container' style={cardStyle}>
      <div className='card-content'>
        <div className='card-info'>
          <div className='job-title'><Text label={title ?? "No more posts"} weight={"medium700"} color={"white"} family={"open-sans"} size={"s18"} /></div>
          <div className='job-info'><Text label={info ?? "--"} color={"white"} family={"open-sans"} size={"s16"} weight={"thin"}/></div>
          <div className='job-location'>
            <img src={locationImg} alt="Location" />
            <Text label={category ?? "--"} color={"white"} family={"open-sans"} size={"s14"}  />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
