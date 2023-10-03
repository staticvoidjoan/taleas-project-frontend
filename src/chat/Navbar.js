import React, { useEffect } from "react";
import "./chatNavBar.css";
import unicorn from "../assets/images/Unicorn.png";

function ChatNavBar({ employer, employee }) {
  useEffect(() => {
    console.log("employee", employee);
    console.log("employer", employer);
    console.log(displayName);
  }, []);

  const displayName = employee ? employee.name : employer.companyName;
  const profilePic = employee ? employee.profilePhoto : employer.profilePhoto;
  return (
    <div className="chatNavBar">
      <div
        className="chatNavBar-image"
        style={{ backgroundImage: `url(${profilePic ?? unicorn})` }}
        alt="unicorn"
      >
        {" "}
      </div>

      <span className="chatNavBar-name">{displayName}</span>
    </div>
  );
}

export default ChatNavBar;
