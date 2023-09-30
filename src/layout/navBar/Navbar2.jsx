import React from "react";
import Text from "../../components/text/text";
import "./Navbar2.css";
import MenuBlack from "../../assets/images/pngblack.png";
import MenuWhite from "../../assets/images/png menu white.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import unicorn from "../../assets/images/Unicorn.png";
const Navbar2 = ({
  givenName,
  lastName,
  authenticated,
  employeeData,
  employerData,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
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
            <div className="nav-profile">
              <Link to={`${givenName}-profile`} style={{textDecoration:"none"}}>
  
                <Text label={`${givenName} ${lastName}`} size={"s16"} color={"black"}/>
              </Link>
              <img
                className="nav-profile-pic"
                src={
                  employeeData
                    ? employeeData.profilePhoto
                      ? employeeData.profilePhoto
                      : unicorn
                    : employerData.profilePhoto
                    ? employerData.profilePhoto
                    : unicorn
                }
                alt=""
              />
            </div>
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
