import React, { useState, useEffect } from "react";
import Text from "../../components/text/text";
import "./Navbar2.css";
import NavIcon from "../../assets/images/Group 1.png";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

const Navbar2 = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      const userAttributes = user.attributes || {};
      const userGivenName = userAttributes.given_name || "";
      setGivenName(userGivenName);
      const userLastName = userAttributes.family_name || "";
      setLastName(userLastName);

      // const userIsEmployee = userAttributes.isEmployee || false;
      // setIsEmployee(userIsEmployee); // Set the isEmployee state
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const handleTurnBack = () => {
    navigate("/");
  };
  const handleMenu = () => {
    navigate("/menu");
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
        {/* <div>
          <img src={NavIcon} alt="Menu" onClick={handleMenu} />
        </div> */}
        <div>
          {authenticated ? (
            <>
              <Link to={`${givenName}-profile`}>
                {givenName} {lastName}
              </Link>
            </>
          ) : (
            <img src={NavIcon} alt="Menu" onClick={handleMenu} />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar2;
