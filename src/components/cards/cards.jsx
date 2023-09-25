import React from 'react';
import Text from '../text/text';
import location from '../../assets/icons/location.svg';

const Card = () => {
    return (
        <div className='card-container'>
           <div className='card-info'>
                <div className='job-title'><Text label={"Job title"} /></div>
                <div className='job-info'><Text label={"Front end developer"} /></div>
                <div className='job-location'>
                    <img src={location}></img>
                    <Text label={"Tirana"} />
                </div>
            </div> 
            <div className='card-buttons'>
                <div className='cancel'></div>
                <div className='superlike'></div>
                <div className='like'></div>
            </div>
        </div>
    );
}

export default Card;
