import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../../components/cards/cards';
import Tabs from '../../components/button/tabs';
import heart from "../../assets/icons/heart.svg";
import x from "../../assets/icons/x.svg"
import "./userHome.css";

const UserHome = () => {
  const [posts, setPosts] = useState([])
  const [selectedButton, setSelectedButton] = useState('All');
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState([])
  const [currentPostId, setCurrentPostId] = useState([])
  const userId = localStorage.getItem('employeeId')
  const navigate = useNavigate();
  const handleJobCardClick = (id) => {
        navigate(`/jobProfile/${id}`);
  };
  const handleCancelClick = async () => {
    try{
     await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/dislike/${userId}?id=${posts[0].id}`)
      console.log('Cancel API Response:');
    }
    catch {
      console.error('Cancel API Error:');
    };
};

const handleLikeClick = async () => {
  try{
    await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/like/${userId}?id=${posts[0].id}`)
     console.log('Cancel API Response:');
   }
   catch {
     console.error('Cancel API Error:');
   };
}
  const loadTabs = async () => {
    try {
      const response = await axios.get("https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/category")
      console.log(response)
      setCategories(response.data.categories)
      console.log(response)
    } catch (error) {
      console.error("Error fetching categories.")
    }
  }
  const loadPosts = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts`
      );
      setPosts(response.data.posts);
      console.log(response.data.posts)
      console.log(response.data.posts.profilePhoto);
    } catch (error) {
      console.error("something went wrong");
    }
  };
  

  useEffect(() => {
    loadTabs()
    loadPosts();
    console.log("selectedButton:", selectedButton);
    console.log(posts)
  }, [posts],[selectedButton]);
  

  return (
    <div>
       <div className="button-row">
          {categories.map((buttonName, index) => (
            <Tabs
              buttonName={buttonName.name}
              key={index}
              selected={selectedButton === buttonName}
              onClick={() => setSelectedButton(buttonName)}
              
            />
          ))}
        </div> 
        {posts.map((us, index) => (
        <div onClick={() => handleJobCardClick(us._id)}>
            <Card
              key={index}
              id={us._id}
              category={us.category.name}
              title={us.position}
              // info={us.creatorId.companyName}
              background={us.creatorId.profilePhoto}
            />
        </div>))}
{/* 
        <Card onClick={() => handleJobCardClick(posts[0].id)}
        id={posts[0].id}
        category={posts[0].category.name}
        title={posts[0].position}
        // info={posts[0].creatorId.companyName}
        background={posts[0].creatorId.profilePhoto}
        /> */}
        <div className='card-buttons'>
        <div>
          <button className="cancel" onClick={handleCancelClick}>
            {" "}
            <img src={x} alt="x" />
          </button>
        </div>
        <div>
          <button className="like" onClick={handleLikeClick}>
            <img src={heart} alt="heart" />
          </button>
        </div>
      </div>
        </div>
  );
};

export default UserHome;
