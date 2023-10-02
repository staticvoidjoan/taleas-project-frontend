import React, { useEffect, useState } from "react";
import "./chatNavBar.css";
import unicorn from "../assets/images/Unicorn.png";

function ChatNavBar({ employer, employee,userRole,test }) {
  
  useEffect(() => {
    console.log("employee", userRole);
    console.log("employer", employer);
    console.log("what am in?", test);
  }, []);

  const displayName = userRole === "employee" ? employee.name : employer.companyName;

  useEffect(() => {
    console.log(displayName)
  },[displayName])

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
