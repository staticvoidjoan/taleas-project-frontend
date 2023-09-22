import React from "react";
import "./buttton.css";
import Text from "../text/text";

const Button = ({ bgcolor, border, padding, decoration, cursor, label }) => {
  return (
    <>
      <div>
        <button
          className={`${bgcolor} ${border} ${padding} ${decoration} ${cursor}`}
        >
          <Text label={label} />
        </button>
      </div>
    </>
  );
};
export default Button;
