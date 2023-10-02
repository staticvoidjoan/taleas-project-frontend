import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Text from "../../components/text/text";
import Card from "../../components/cards/cards";
import Tabs from "../../components/button/tabs";
import heart from "../../assets/icons/heart.svg";
import back from "../../assets/icons/back.svg";
import x from "../../assets/icons/x.svg";
import "./userHome.css";
import Animate from "../../animateTransition/Animate";
import ContLoader from "../../components/Loader/ContLoader";
import axios from "axios";

const UserHome = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [selectedButton, setSelectedButton] = useState("All");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // State to keep track of the current card's index
  const [postlength, setPostLength] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState();
  console.log(userId);

  const navigate = useNavigate();
  const handleJobCardClick = (id) => {
    // Save the current index in the URL so that you can navigate back to it
    navigate(`/viewjobpost/${id}/${currentIndex}`);
  };
  const { index } = useParams(); 
  useEffect(() => {
    loadTabs();
    // Get the index parameter from the URL
    if (index) {
      loadPosts(parseInt(index, 10)); // Load the card at the specified index
    } else {
      loadPosts();
    }
    console.log("THESE ARE THE POSTS", posts);
  }, []);

  const loadTabs = async () => {
    try {
      const response = await axios.get(
        "https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/category"
      );
      console.log(response.data.categories);
      setCategories(response.data.categories);
      setCategoryId(response.data.categories.id);
    } catch (error) {
      console.error(error);
    }
  };

  const filter = async (categoryId) => {
    try {
      console.log(categoryId);
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/category/${categoryId}?id=${userId}`
      );
      setPosts(response.data.posts);
      setCurrentPost(response.data.posts[localStorage.getItem("localindex")]);
      setPostLength(response.data.posts.length);
    } catch (error) {
      console.error("Cancel API Error:");
    }
  };
  const loadPosts = async (index = 0) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/user/${userId}`
      );
      setPosts(response.data);
      console.log(response.data);
      setCurrentPost(response.data[localStorage.getItem("localindex")]);
      setPostLength(response.data.length);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };
  

  const next = async () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
    if (currentIndex < postlength - 1) {
      const nextIndex = currentIndex + 1;
      const nextPost = posts[nextIndex];
      setCurrentIndex(nextIndex);
      localStorage.setItem("localindex", nextIndex)
      setCurrentPost(nextPost);
      console.log(nextIndex);
      console.log("next post is", nextPost);
    } else {
      setPostLength(0);
    }
  };
  const previous = () => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      const previousPost = posts[previousIndex];
      setCurrentIndex(previousIndex);
      localStorage.setItem("localindex", previousIndex)
      setCurrentPost(previousPost);
      console.log(previousIndex);
      console.log("previous post is", previousPost);
    } else {
      // Optionally, you can loop back to the last card when reaching the first card.
      const lastIndex = postlength - 1;
      const lastPost = posts[lastIndex];
      setCurrentIndex(lastIndex);
      localStorage.setItem("localindex", lastIndex)
      setCurrentPost(lastPost);
      console.log(lastIndex);
      console.log("last post is", lastPost);
    }
  };


  const handleAction = async (action) => {
    if (!currentPost._id) return; // No post to interact with
    try {
      switch (action) {
        case "like":
          await axios.put(
            `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/like/${userId}?id=${currentPost._id}`
          );
          break;
        case "dislike":
          await axios.put(
            `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/dislike/${userId}?id=${currentPost._id}`
          );
          break;
        default:
          break;
      }

     

      if (currentIndex < postlength - 1) {
        const nextIndex = currentIndex + 1;
        const nextPost = posts[nextIndex];
        setCurrentIndex(nextIndex);
        localStorage.setItem("localindex", nextIndex)
        setCurrentPost(nextPost);
        setAnimate(true);
        setTimeout(() => {
          setAnimate(false);
        }, 500);
      } else {
        setPostLength(0);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="abc">
      <div className="button-row">
        {categories.map((buttonName, index) => (
          <Tabs
            buttonName={buttonName.name}
            key={index}
            selected={selectedButton === buttonName}
            onClick={() => filter(buttonName._id)}
          />
        ))}
      </div>
      {loading ? (
        <div>
          <ContLoader />
        </div>
      ) : postlength === 0 ? (
        <div className="post-alert">
          <Text label={"No more posts. Check back soon!"} />
        </div>
      ) : (
        <div>
          <Animate>
            <div
              className={`card-component ${animate ? "animate" : ""}`}
              onClick={() => handleJobCardClick(currentPost._id)}
            >
              <Card
                id={currentPost._id}
                category={currentPost.category.name}
                title={currentPost.position}
                info={currentPost.creatorId.companyName}
                background={currentPost.creatorId.profilePhoto}
              />
            </div>
          </Animate>
          <div className="card-buttons">
            <button className="left-button" onClick={previous}>
              <img src={back} alt="back" />
            </button>
            <button className="cancel" onClick={() => handleAction("dislike")}>
              <img src={x} alt="x" />
            </button>
            <button className="like" onClick={() => handleAction("like")}>
              <img src={heart} alt="heart" />
            </button>
            <button className="right-button" onClick={next}>
              <img src={back} className="right" alt="back" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
