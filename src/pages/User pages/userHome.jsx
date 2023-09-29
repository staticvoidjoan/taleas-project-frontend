import axios from 'axios';
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Text from '../../components/text/text';
import Card from '../../components/cards/cards';
import Tabs from '../../components/button/tabs';
import heart from "../../assets/icons/heart.svg";
import back from "../../assets/icons/back.svg"
import x from "../../assets/icons/x.svg"
import "./userHome.css";
import Animate from '../../animateTransition/Animate';

const UserHome = ({userId}) => {
  const [posts, setPosts] = useState([])
  const [currentPost, setCurrentPost] = useState({});
  const [selectedButton, setSelectedButton] = useState('All');
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)
  const [postlength, setPostLength] = useState(0);
  const [postDate,setPostDate] = useState("");
  console.log(userId)
  const navigate = useNavigate();
  useEffect(() => {
    loadPosts();
    loadTabs();
    // console.log("selectedButton:", selectedButton);
    console.log("THESE ARE THE POSTS",posts)
  }, []);
  const handleJobCardClick = (id) => {
    navigate(`/viewjobpost/${id}`);
  };

  const handleDislikeClick = async (postId) => {
    try{
      await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/dislike/${userId}?id=${postId}`)
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
    console.log(userId)
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
  
  const like = async () => {
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
  const next = async () => {
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
  const dislike = async () => {
    await handleDislikeClick(currentPost._id);
    console.log("We just DISLIKED this POST> ", currentPost._id);
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
    <div className='abc'>
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
        <div className='post-alert'><Text label={"No more posts. Check back soon!"}/></div>
      ) : (
        <div>
          <Animate>
          <div className='card-component' onClick={() => handleJobCardClick(currentPost._id)}>
            <Card
              id={currentPost._id}
              category={currentPost.category.name}
              title={currentPost.position}
              info={currentPost.creatorId.companyName}
              background={currentPost.creatorId.profilePhoto}
            />
          </div>
          </Animate>
          <div className='card-buttons'>
            <button className='left-button' onClick={next}>
              <img src={back}></img>
            </button>
              <button className="cancel" onClick={dislike}>
                {" "}
                <img src={x} alt="x" />
              </button>
              <button className="like" onClick={like}>
                <img src={heart} alt="heart" />
              </button>
              <button className='right-button' onClick={next}>
              <img src={back} className='right'></img>
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default UserHome;
