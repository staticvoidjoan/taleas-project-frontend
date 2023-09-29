import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import "./postJob.css";
import X from "../../assets/icons/closeX.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
const PostJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobPost, setJobPost] = useState({
    category: "",
    position: "",
    requirements: [],
    description: "",
  });

  const [categories, setCategories] = useState({});
  const { category, position, requirements, description } = jobPost;
  const [newRequirement, setNewRequirement] = useState([]);

  useEffect(() => {
    getCategoryNames();
  }, []);

  const onAddRequirement = () => {
    if (newRequirement.trim() !== "") {
      // Check if the new requirement is not empty
      setJobPost((prevJobPost) => ({
        ...prevJobPost,
        requirements: [...prevJobPost.requirements, newRequirement],
      }));
      setNewRequirement(""); // Clear the input field after adding
    }
  };

  const onInputChange = (e) => {
    setJobPost({
      ...jobPost,
      [e.target.name]: e.target.value,
    });
  };

  const getCategoryNames = async (e) => {
    try {
      const response = await axios.get(
        "https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/category"
      );
      setCategories(response.data.categories);
    } catch (error) {}
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!category || !position || !description) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Submitting the form...");
    try {
      console.log("Adding new job post...");
      console.log(category, id, position, requirements, description);
      console.log(jobPost);
      await axios.post(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts/creator/${id}`,
        jobPost
      );
      console.log("Job Successfully posted");
      let timerInterval;
      Swal.fire({
        title: "Job Posted!",
        icon: "success",
        timer: 1000,
        didOpen: () => {
          const b = Swal.getHtmlContainer()?.querySelector("b"); // Check if it exists
          if (b) {
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          }
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
        // Handle other actions as needed
        navigate(-1);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-job-container">
      <div className="post-job-bar">
        <div className="post-job-bar-nav">
          <Text label={"Add Job"} size={"s16"} weight={"medium"} />
          <img src={X} alt="" />
        </div>
        <hr className="post-job-bar-div"></hr>
      </div>
      <div className="post-job-body">
        <form className="job-form" onSubmit={onSubmit}>
          <div className="inputbox-register">
            {categories.length > 0 ? (
              <select
                name="category"
                value={jobPost.category}
                onChange={onInputChange}
                className="register-input"
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
          <div className="inputbox-register">
            <input
              type="text"
              name="position"
              value={position}
              onChange={(e) => onInputChange(e)}
              placeholder="Position"
              className="register-input"
              required
            />
          </div>
          <div className="inputbox-register-box">
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
              placeholder="Description..."
              className="register-input"
              required
            />
          </div>
          {/* <div className="inputbox-register">
            <input
              name="requirements"
              placeholder="Requirements (One requirement per line)"
              className="register-input"
              value={requirements}
              onChange={onInputChange}
            />
          </div> */}
          <div className="inputbox-register">
            {/* Input for new requirements */}
            <div className="requirement-input">
              <input
                type="text"
                placeholder="Add Requirement"
                className="register-input"
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
              />
              <button
                type="button"
                className="add-button"
                onClick={onAddRequirement}
              >
                <Text label={"Add"} size={"s14"} weight={"regular"} />
              </button>
            </div>
          </div>
          {/* Display the list of requirements */}
          <div className="requirements-list">
            <ul>
              {requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>
          <button className="job-btn">
            <Text label={"Save"} size={"s16"} weight={"regular"} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
