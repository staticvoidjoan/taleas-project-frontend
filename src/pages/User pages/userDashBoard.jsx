import React, { useState, useEffect } from "react";
import Text from "../../components/text/text";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import UserSignOut from "../../service/authentication/user/userSignOut";
import "./userDashBoard.css"
const UserDashBoard = () => {
  const [authenticated, setAuthenticated] = useState("");
  const [givenName, setGivenName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    checkAuthenticated();
  });

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
      setGivenName(capitalizeFirstLetter(userGivenName));
      const userLastName = userAttributes.family_name || "";
      setLastName(capitalizeFirstLetter(userLastName));
    } catch (error) {
      setAuthenticated(false);
    }
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 return (
    <div className="user-dash-container">
        <div className="user-dash-box">
            <Text label={`Hello! Welcome ${givenName} ${lastName}`} color="white" weight={'bold'}/>
            <UserSignOut />
        </div>
    </div>
 )
};

export default UserDashBoard;
