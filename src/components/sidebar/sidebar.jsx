import React from "react";
import home from "../../assets/icons/home.svg";
import chat from "../../assets/icons/chat.svg";
import profile from "../../assets/icons/profile.svg";
import sidebar from "./sidebar.css"; // Create a new CSS file for your sidebar styles
import { useNavigate } from "react-router-dom";
import ChatApp from "../../chat/Chat";
import ListOfMatches from "../applicants/ListOfMatches";
import ListUserMessages from "../userMessages/userMessages";
const Sidebar = ({userId, userRole, employee, employer}) => {
  const navigate = useNavigate();

  const handleHomeNavigate = () => {
    navigate("/");
  };
  const handleProfileNavigate = () => {
    navigate("/profile");
  };
  const handleChatNavigate = () => {
    navigate("/messages");
  };

  return (
    <div className="sidebar-component">
        {userRole === "employee" ? (
      <ListUserMessages user={employee} />
        ) : userRole === "employer" ? (
        <ListOfMatches employer={employer} />
        ) : (
        <div>Invalid user role</div>
        )}
        {/* Add more sidebar items as needed */}
      </div>
  );
};

export default Sidebar;
