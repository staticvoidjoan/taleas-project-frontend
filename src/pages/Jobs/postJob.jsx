import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import "./postJob.css";
import X from "../../assets/icons/closeX.svg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Animate from "../../animateTransition/AnimateY";
import Trash from "../../assets/icons/TrashCan.svg"

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
  const [newRequirement, setNewRequirement] = useState("");
  const [requirements, setRequirements] = useState([]);

  const { category, position, description } = jobPost;

  useEffect(() => {
    getCategoryNames();
  }, []);

  const onAddRequirement = () => {
    if (newRequirement.trim() !== "") {
      const uniqueId = Date.now(); // Generate a unique identifier
      setRequirements((prevRequirements) => [
        ...prevRequirements,
        { text: newRequirement, id: uniqueId },
      ]);
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


  const waitforSumbit = async(e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Do you want to post this job?',
      showDenyButton: true,
      confirmButtonText: 'Post',
      denyButtonText: `Not Yet`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        onSubmit();
      } else if (result.isDenied) {
        Swal.fire('Job no posted', '', 'info')
      }
    })
  }


  const onSubmit = async () => {
   
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

  const removeRequirement = (idToRemove) => {
    setRequirements((prevRequirements) =>
      prevRequirements.filter((req) => req.id !== idToRemove)
    );
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Animate>
      <div className="post-job-container">
        <div className="post-job-bar">
          <div className="post-job-bar-nav">
            <Text label={"Add Job"} size={"s16"} weight={"medium"} />
            <img src={X} alt="" onClick={goBack} />
          </div>
          <hr className="post-job-bar-div"></hr>
        </div>
        <div className="post-job-body">
          <form className="job-form" onSubmit={waitforSumbit}>
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
            <div className="inputbox-register">
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
            <div className="requirements-list">
              <ul>
                {requirements.map((requirement) => (
                  <li key={requirement.id}>
                    {requirement.text}
                    <button
                      className="remove-req-button"
                      onClick={() => removeRequirement(requirement.id)}
                    >
                      <img src={Trash} alt="" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button className="job-btn">
              <Text label={"Save"} size={"s16"} weight={"regular"} />
            </button>
          </form>
        </div>
      </div>
    </Animate>
  );
};

export default PostJob;
