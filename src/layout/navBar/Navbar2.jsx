import React from "react";
import Text from "../../components/text/text";
import "./Navbar2.css";
import NavIcon from "../../assets/images/Group 1.png";
import { useNavigate } from "react-router-dom";

const Navbar2 = (props) => {
  const navigate = useNavigate();
  const handleTurnBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="navbar">
        <div className="app-name" onClick={handleTurnBack}>
          {" "}
          <Text
            label={"CAREER"}
            weight={"medium800"}
            lineheight={"l24"}
            size={"s20"}
            color={"black "}
          />
          <Text
            label={"CRUSH"}
            weight={"medium800"}
            lineheight={"l24"}
            size={"s20"}
            color={"purple"}
          />
        </div>
        <div>
          <img src={NavIcon} alt="" />
        </div>
      </div>
    </>
  );
};

export default Navbar2;
