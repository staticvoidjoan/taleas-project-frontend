import React, { useState, useEffect } from "react";
import Text from "../../components/text/text";
import "./Navbar2.css";
import NavIcon from "../../assets/images/Group 1.png";
import MenuWhite from "../../assets/images/png menu white.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";

const Navbar2 = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

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

  const isWhiteText = () => {
    const whiteTextRoutes = ["/signup", "/signin"];
    return whiteTextRoutes.includes(location.pathname);
  };

  const isSignInSignUpRoute = () => {
    return location.pathname === "/signup" || location.pathname === "/signin";
  };

  const navbarStyle = {
    backgroundColor: isWhiteText() ? "#222 " : "white ",
    color: isWhiteText() ? "white " : "black ",
  };

  return (
    <>
      <div className="navbar-container" style={navbarStyle}>
        <div className="navbar">
          <div className="app-name" onClick={handleTurnBack}>
            {" "}
            <Text
              label={"CAREER"}
              weight={"medium800"}
              lineheight={"l24"}
              size={"s20"}
              color={isWhiteText() ? "white" : "black"}
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
            {authenticated ? (
              <>
                <Link to={"/userInfo"}>
                  {givenName} {lastName} {}
                </Link>
              </>
            ) : (
              <img
                src={isSignInSignUpRoute() ? MenuWhite : NavIcon}
                alt="Menu"
                onClick={handleMenu}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar2;
