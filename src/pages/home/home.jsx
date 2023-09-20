import React from "react";
import Text from "../../components/text/text";
import {useNavigate} from "react-router-dom"
import "./home.css"
const Index = () => {
  const navigate = useNavigate();

  function gotToSignUp(){
    navigate("/signup")
  }


  return (
    <div className="home-container">
      <div className="home-bio">
        <Text
          label={"Swipe your way to your dream career"}
          weight={"medium"}
          size={"s20"}
          color={"black"}
        />
        <div>
          <button className="myButton">
            <Text
              label={"I'm an employer"}
              weight={"regular"}
              size={"s14"}
            />
          </button>
          <button className="myButton" onClick={gotToSignUp}>
            <Text
              label={"I'm a talent"}
              weight={"regular"}
              size={"s14"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
