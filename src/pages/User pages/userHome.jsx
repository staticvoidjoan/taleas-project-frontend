import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Card from '../../components/cards/cards';
import Tabs from '../../components/button/tabs';
import unicorn from "../../assets/images/Unicorn.png";
import "./userHome.css";
import Footer from '../../layout/footer/footer';

const cardData = [
  {
    title: "Job title",
    info: "Front-end developer",
    location: "Tirana",
    background: unicorn
  },
];

const UserHome = () => {
  const [selectedButton, setSelectedButton] = useState('All');
  const [buttonsData, setButtonsData] = useState([]);

  const loadTabs = async () => {
    try {
      const response = await axios.get("https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/category")
      console.log(response)
      setButtonsData(response.data)
    } catch (error) {
      console.error("Error fetching categories.")
    }
  }
  useEffect(() => {
    loadTabs()
    console.log("selectedButton:", selectedButton);
  }, [selectedButton]);

  return (
    <div>
       <div className="button-row">
          {buttonsData.map((buttonName, index) => (
            <Tabs
              buttonName={buttonName.name}
              key={index}
              selected={selectedButton === buttonName}
              onClick={() => setSelectedButton(buttonName)}
            />
          ))}
        </div>
        <div className="event-component">
          {cardData.map((card, index) => (
            <Card
              key={index}
              location={card.location}
              title={card.title}
              info={card.info}
              background={card.background}
            />
          ))}
        </div>
        <Footer />
    </div>
  );
};

export default UserHome;
