import React from "react";

const Button = ({ color, label }) => {
  return (
    <>
      <div>
        <button className={`${color}`}>{label}</button>
      </div>
    </>
  );
};
export default Button;
