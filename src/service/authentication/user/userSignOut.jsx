import React from 'react';
import {Auth} from "aws-amplify"
import { useNavigate } from 'react-router-dom';
import "./user.css"
const UserSignOut = () => {
    const navigate = useNavigate();

    async function signOut() {
        try {
            await Auth.signOut();
            console.log("Signing out")
            localStorage.clear();
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log("error signing out:", error);
        }
    }


    return (
        <div>
        <button onClick={signOut} className='logout-btn'>Sign Out</button>    
        </div>
    );
}

export default UserSignOut;
