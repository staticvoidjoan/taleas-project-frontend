import React from 'react';
import Text from '../text/text';
import "./cards.css"
import locationImg from '../../assets/icons/location.svg';
import heart from "../../assets/icons/heart.svg"
import x from "../../assets/icons/x.svg"
import star from "../../assets/icons/star.svg"

const Card = ({ title, info, category, background }) => {
    const cardStyle = {
        backgroundImage: `linear-gradient(0deg, #222 0.07%, rgba(34, 34, 34, 0.65) 52.9%, rgba(34, 34, 34, 0.00) 99.93%), url('${background}')`,
        backgroundRepeat: 'no-repeat',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        flexShrink: 0,
      };
      

  return (
    <div className='card-container' style={cardStyle}>
      <div className='card-content'>
        <div className='card-info'>
          <div className='job-title'><Text label={title} weight={"medium700"} color={"white"} family={"open-sans"} size={"s18"} /></div>
          <div className='job-info'><Text label={info} color={"white"} family={"open-sans"} size={"s16"} weight={"thin"}/></div>
          <div className='job-location'>
            <img src={locationImg} alt="Location" />
            <Text label={category} color={"white"} family={"open-sans"} size={"s14"}  />
          </div>
        </div>
        <div className='card-buttons'>
          <div>
         <button className='cancel'> <img src={x} alt="x" /></button>
          </div>
          <div >
          <button className='superlike'><img src={star} alt="star" /></button>
          </div>
          <div >
          <button className='like'><img src={heart} alt="heart" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
