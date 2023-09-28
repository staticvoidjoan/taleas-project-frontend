import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import axios from "axios";
import JobCard from "../../components/jobCard/jobCard";
import "./employerHome.css";
import { useNavigate } from "react-router-dom";
const EmployerHome = () => {
  const navigate = useNavigate();
  const [userposts, setuserPosts] = useState([]);
  const [postCount, setPostCount] = useState("");
  const creatorId = localStorage.getItem("employerId");
  useEffect(() => {
    getAllPosts();
    console.log("HELLOOO",userposts[0])
  }, []);

  const getAllPosts = async () => {
    try {
      console.log(creatorId);
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/creator/${creatorId}?page=1&limit=5`
      );
      setuserPosts(response.data.posts);
      setPostCount(response.data.count);
      console.log(response.data);
    } catch (error) {}
  };

  const addNewPost = () =>{
    navigate(`/postJob/${creatorId}`)
  }

  return (
    <div>
      <div className="add-job-btn-container">
        <button className="register-btn" onClick={addNewPost}>
          {" "}
          <Text label={"Add Job"} size={"s16"} weight={"regular"} />
        </button>
      </div>
      <div>
        <div style={{ marginLeft: "20px" }}>
          <Text
            label={`My Jobs: (${postCount})`}
            size={"s16"}
            weight={"medium"}
          />
        </div>
        <div className="job-card-column">
          {userposts.map((post) => (
            <JobCard id={post._id} key={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerHome;
