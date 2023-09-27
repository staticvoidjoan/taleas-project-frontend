import React, { useState, useEffect } from "react";
import unicorn from "../../assets/images/Unicorn.png";
import Text from "../text/text";
import axios from "axios";
import locationico from "../../assets/icons/whitelocation.svg";
import "./jobCard.css";
import heart from "../../assets/icons/redHeart.svg"
import { useNavigate } from "react-router-dom";
const JobCard = ({ id, index }) => {
  const [post, setPost] = useState({});
  const [category, setCategory] = useState({});
  const [company, setCompany] = useState({});
  const [likes, setLikes] = useState("");
  const [postId, setPostId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("THIS IS THE ID", id);
    console.log("THIS IS THE Index", index);
    loadPost();
  }, []);

  const navigateToView= () =>{
    navigate(`/jobview/${postId}`);
  }


  const loadPost = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/creator/${id}`
      );

      setPost(response.data.posts[index]);
      setCategory(response.data.posts[index].category);
      setCompany(response.data.posts[index].creatorId);
      console.log("ADDRESS IS ", company.address);
      setLikes(response.data.posts[index].likedBy.length);
      setPostId(response.data.posts[index]._id);
    } catch (error) {
      console.log(error);
    }
  };

  const cardStyle = {
    backgroundImage: `url(${company.profilePhoto ?? unicorn} )`,
    position: "relative",
  };
  
  return (
    <div className="job-card-container" onClick={navigateToView}>
      <div className="card-photo-container">
        <div className="post-card-photo" style={cardStyle}>
        <div className="gradient-overlay"></div>
        </div>
        </div>
        <div className="post-card-info">
          <Text
            label={post.position ?? "Loading..."}
            color={"white"}
            size={"s18"}
            weight={"medium"}
          />
          <Text
            label={category.name}
            color={"white"}
            size={"s16"}
            weight={"regular"}
          />
          <div className="post-info-bubble">
            <img src={locationico} className="location-icon" />
            <div style={{ marginRight: "10px" }}>
              <Text
                label={company.address ?? "Loading..."}
                weight={"regular"}
                color={"white"}
                size={"s14"}
              />
            </div>
          </div>
          <div className="job-card-likes">
            <img src={heart} alt="" />
            <div style={{ marginLeft: "10px" }}>
              <Text
                label={likes ?? "Loading..."}
                weight={"regular"}
                color={"white"}
                size={"s16"}
              />
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default JobCard;
