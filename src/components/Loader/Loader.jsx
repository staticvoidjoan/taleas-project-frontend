import React from 'react';
import DotLoader from "react-spinners/DotLoader"
import "./Loader.css"
const Loader = () => {
    return (
        <div className='loader-container'>
            <DotLoader color="#6E46F5" />
        </div>
    );
}

export default Loader;
