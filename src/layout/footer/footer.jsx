import React from 'react'
import home from "../../assets/icons/home.svg"
import chat from "../../assets/icons/chat.svg"
import profile from "../../assets/icons/profile.svg"
import footer from "./footer.css"
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  const handleNavigate = () => {
    navigate("/")
  }
  return (
    <div className='footer-container'>
        <div className='home'>
            <img src={home}></img>
        </div>
        <div className='chat'>
        <img src={chat}></img>
        </div>
        <div className='profile'>
        <img src={profile}></img>
        </div>
    </div>
  )
}

export default Footer