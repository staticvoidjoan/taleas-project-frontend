import React from "react";
import "./menu.css";
import { Link, useNavigate } from "react-router-dom";
import Text from "../../components/text/text";
import Animate from "../../animateTransition/AnimateY";
const Menu = (props) => {
  return (
    <Animate>
      <div style={{ clear: "both", height: "70px"  }}></div>
      <div className="menu">
        <hr className="line-menu" />
        <div className="menu-list">
          <ul>
            <Link to={"/"}>
              <li>
                <Text
                  label={"Home"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s18"}
                  color={"black"}
                />
              </li>
            </Link>

            <li>
              <Link to={"/aboutus"}>
                <Text
                  label={"About Us"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s18"}
                  color={"black"}
                />
              </Link>
            </li>
            {/* <li>
              {" "}
              <Text
                label={"Subscriptions"}
                weight={"thin"}
                lineheight={"lnormal"}
                size={"s18"}
                color={"black"}
              />
            </li> */}
            <Link to={"/contact"}>
              <li>
                {" "}
                <Text
                  label={"Contacts"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s18"}
                  color={"black"}
                />
              </li>
            </Link>

            <Link to={"/terms"}>
              <li>
                {" "}
                <Text
                  label={"Terms & Conditions"}
                  weight={"thin"}
                  lineheight={"lnormal"}
                  size={"s18"}
                  color={"black"}
                />
              </li>
            </Link>
          </ul>
        </div>
        <hr className="line" />
        <div className="footer">
          <Link to={"/signup"}>
            {" "}
            <button className="btn-register">
              <Text
                label={"Register"}
                weight={"thin"}
                lineheight={"lnormal"}
                size={"s16"}
                color={"white"}
              />
            </button>
          </Link>

          <div className="start-line">
            <hr className="line" />
            <Text
              label={"or"}
              weight={"thin"}
              lineheight={"lnormal"}
              size={"s16"}
              color={"lightgray"}
            />
            <hr className="line" />
          </div>
          <Link to={"/signin"}>
            {" "}
            <button className="btn-login">
              {" "}
              <Text
                label={"Login"}
                weight={"thin"}
                lineheight={"lnormal"}
                size={"s16"}
                color={"black"}
              />
            </button>
          </Link>
        </div>
      </div>
    </Animate>
  );
};

export default Menu;
