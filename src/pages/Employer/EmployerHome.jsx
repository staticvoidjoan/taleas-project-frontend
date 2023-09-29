import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import axios from "axios";
import JobCard from "../../components/jobCard/jobCard";
import "./employerHome.css";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Animate from "../../animateTransition/Animate";
import back from "../../assets/icons/back.svg";
import debounce from "lodash.debounce"; // Import lodash debounce function

const EmployerHome = ({ creatorId }) => {
  const navigate = useNavigate();
  const [userposts, setuserPosts] = useState([]);
  const [postCount, setPostCount] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [loading, setLoading] = useState(false); // Track loading state

  // Define the getAllPosts function
  const getAllPosts = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/creator/${creatorId}?page=${page}&limit=3`
      );
      setuserPosts(response.data.posts);
      setPostCount(response.data.count);
      setTotalPages(response.data.pageCount);
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [page]); // Fetch data when page changes

  // Debounce the getAllPosts function to avoid rapid API requests
  const debouncedGetAllPosts = debounce(getAllPosts, 300);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    } else {
      setPage(1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(totalPages);
    }
  };

  const addNewPost = () => {
    navigate(`/postjob/${creatorId}`);
  };

  return (
    <Animate>
      <div className="add-job-btn-container">
        <button className="register-btn" onClick={addNewPost}>
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
          {userposts.map((post, index) => (
            <JobCard
              postId={userposts[index]._id}
              profilePhoto={post.creatorId.profilePhoto}
              position={post.position}
              category={post.category.name}
              address={post.creatorId.address}
              likes={post.likedBy}
              key={post._id}
            />
          ))}
        </div>
        <div className="navigate-bubble-row">
          <button className="left-button" onClick={previousPage}>
            <img src={back} alt="Previous" />
          </button>
          <Text label={page} weight={"bold"} size={"s22"} />
          <button className="right-button" onClick={nextPage}>
            <img src={back} alt="Next" className="right" />
          </button>
        </div>
        {loading && <Loader />} {/* Show a loading indicator */}
      </div>
    </Animate>
  );
};

export default EmployerHome;
