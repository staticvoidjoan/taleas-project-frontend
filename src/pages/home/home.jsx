import React from "react";
import Text from "../../components/text/text";
import "./home.css"
const Index = () => {
  return (
    <div className="home-container">
      <div className="home-bio">
        <Text
          label={"Swipe your way to your dreem career"}
          family={"open-sans"}
          weight={"medium"}
          size={"s20"}
          color={"white"}
        />
        <div>
          <button>
            <Text
              label={"I'm an employer"}
              family={"open-sans"}
              weight={"regular"}
              size={"s14"}
            />
          </button>
          <button>
            <Text
              label={"I'm a talent"}
              family={"open-sans"}
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
