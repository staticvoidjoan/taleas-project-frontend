import React, { useEffect } from "react";
import "./chatNavBar.css";
import unicorn from "../assets/images/Unicorn.png";

function ChatNavBar({ employer, employee }) {
  useEffect(() => {
    console.log("employee", employee);
    console.log("employer", employer);
    console.log(displayName);
  }, []);

  const displayName = employee ? employee.name : employer.email;

  return (
    <div className="chatNavBar">
      <div
        className="chatNavBar-image"
        alt={`${employee.name} profile`}
        style={{
          backgroundImage: `url(${employee.profilePhoto ?? unicorn})`,
        }}
      />
      <span className="chatNavBar-name">{displayName}</span>
    </div>
  );
}

export default ChatNavBar;
