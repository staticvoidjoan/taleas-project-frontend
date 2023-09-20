import React from "react";
import "./text.css";
const Text = ({ label, family, weight, size, color, lineheight }) => {
  return (
    <div className={`${family} ${weight} ${size} ${color} ${lineheight}`}>
      {label}
    </div>
  );
};
export default Text;
