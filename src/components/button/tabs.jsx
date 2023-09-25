import React from 'react';
import "./tabs.css"

const Tabs = ({buttonName, selected, onClick }) => {
    const buttonClassName = `AllButton ${selected ? 'selected' : ''}`;
    return (
        <button className={buttonClassName} onClick={onClick}>{buttonName}</button>
    );
}

export default Tabs;