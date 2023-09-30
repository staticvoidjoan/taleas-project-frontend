import React, { useState, useEffect } from "react";
import Text from "../../components/text/text";
import "./Navbar2.css";
import MenuBlack from "../../assets/images/pngblack.png";
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

  const goHome = () => {
    navigate("/");
  };
  const handleMenu = () => {
    navigate("/menu");
  };

  const whiteTextRoutes = ["/signup", "/signin"];
  whiteTextRoutes.includes(location.pathname);

  const isCenteredTextRoute =
    location.pathname.startsWith("/viewjobpost") ||
    location.pathname.startsWith("/viewuser");

  const navbarStyle = {
    backgroundColor: whiteTextRoutes.includes(location.pathname)
      ? "#222"
      : "white",
    color: whiteTextRoutes.includes(location.pathname) ? "white" : "black",
  };

  const isWhiteTextRoute = whiteTextRoutes.includes(location.pathname);

  return (
    <div className="navbar-container" style={navbarStyle}>
      <div className="navbar">
        <div className="app-name" onClick={goHome}>
          <Text
            label={"Career"}
            weight={"medium800"}
            lineheight={"l24"}
            size={"s20"}
            color={isWhiteTextRoute ? "white" : "black"}
          />
          <Text
            label={"Crush"}
            weight={"medium800"}
            lineheight={"l24"}
            size={"s20"}
            color={"purple"}
          />
        </div>
        <div>
          {authenticated ? (
            <>
              <Link to={`${givenName}-profile`}>
                {givenName} {lastName}
              </Link>
            </>
          ) : (
            <img
              src={isWhiteTextRoute ? MenuWhite : MenuBlack}
              alt="Menu"
              onClick={handleMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
