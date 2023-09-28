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
  const [currentPost, setCurrentPost] = useState({});
  const [selectedButton, setSelectedButton] = useState('All');
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [postlength, setPostLength] = useState(0);
  const userId = localStorage.getItem('employeeId')
  console.log(userId)
  const navigate = useNavigate();
  useEffect(() => {
    loadPosts();
    loadTabs();
    // console.log("selectedButton:", selectedButton);
    console.log("THESE ARE THE POSTS",posts)
  }, []);
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

const handleLikeClick = async (postId) => {
  try{
    await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/like/${userId}?id=${postId}`)
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
      console.error(error)
    }
  }
  const loadPosts = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/user/${userId}`
      );
      setPosts(response.data);
      console.log(response.data)
      setCurrentPost(response.data[currentIndex])
      setPostLength(response.data.length)
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchNextEntry = async () => {
    await handleLikeClick(currentPost._id);
    console.log("We just LIKED this POST> ", currentPost._id);
    if (currentIndex < postlength - 1) {
      const nextIndex = currentIndex + 1;
      const nextPost = posts[nextIndex];
      setCurrentIndex(nextIndex);
      setCurrentPost(nextPost)
      console.log(nextIndex);
      console.log("next post is", nextPost);
     
    } else {
      setPostLength(0);
    }
  };
  


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
      {postlength === 0 ? (
        <div>No more posts</div>
      ) : (
        <div>
          <div onClick={() => handleJobCardClick(currentPost.id)}>
            <Card
              id={currentPost.id}
              category={currentPost.category.name}
              title={currentPost.position}
              info={currentPost.creatorId.companyName}
              background={currentPost.creatorId.profilePhoto}
            />
          </div>
          <div className='card-buttons'>
            <div>
              <button className="cancel" onClick={handleCancelClick}>
                {" "}
                <img src={x} alt="x" />
              </button>
            </div>
            <div>
              <button className="like" onClick={fetchNextEntry}>
                <img src={heart} alt="heart" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default UserHome;
