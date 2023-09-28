import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Card from '../../components/cards/cards';
import Tabs from '../../components/button/tabs';
import DateButtons from '../../components/button/dateButtons';
import "./userHome.css";

const UserHome = () => {
  const [posts, setPosts] = useState([])
  const [selectedButton, setSelectedButton] = useState('All');
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const handleJobCardClick = (id) => {
        navigate(`/jobProfile/${id}`);
  };

  const loadTabs = async () => {
    try {
      const response = await axios.get("https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/category")
      console.log(response)
      setCategories(response.data.categories)
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
      console.log(response.data.posts.profilePhoto);
    } catch (error) {
      console.error("something went wrong");
    }
  };

  useEffect(() => {
    loadPosts();
    loadTabs()
    console.log("selectedButton:", selectedButton);
  }, [],[selectedButton]);
  

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
        <div className='card-buttons'>
         <DateButtons/>
        </div>
    </div>
  );
};

export default UserHome;
