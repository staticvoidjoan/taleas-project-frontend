import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import "./postJob.css";
import X from "../../assets/icons/closeX.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
const PostJob = () => {
  const {id} = useParams();

  const [jobPost, setJobPost] = useState({
    category: "",
    creatorId: id,
    position: "",
    requirements: [],
    description: "",

  })
  
  const [categories, setCategories] = useState({
    name: "",
  })
  const {category,creatorId,position,requirements,description} = jobPost;


  useEffect(()=>{
    getCategoryNames();
  },[])

  const onInputChange = (e) => {
    setJobPost({
      ...jobPost,[e.target.name]: e.target.value
    });
  }



  const getCategoryNames = async(e) => {
    try {
      const response  = await axios.get("https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/category")
      setCategories(response.data)

    } catch (error) {
      
    }
  } 

  const onSubmit = async (e) => {{
    e.preventDefault();
    const requirementsArray = requirements.split('\n').map(requirement => requirement.trim());
    if (!category || !position || requirementsArray.length === 0 || !description) {
      alert("Please fill in all required fields.");
      return;
    }
    console.log("Submitting the form...");
    try {
      console.log("Adding new job post...")
      await axios.post("https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/posts", jobPost)
      console.log("Job Succesfullt posted")
    } catch (error) {
      
    }
  }

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
          <select
              name="category"
              value={jobPost.category}
              onChange={onInputChange}
              className="register-input"
              required
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
            <input
              name="requirements"
              placeholder="Requirements (One requirement per line)"
              className="register-input"
              value={requirements}
              onChange={onInputChange}
              required
            />
          </div>
        <button className="job-btn"><Text label={"Save"} size={"s16"} weight={"regular"}/></button>
        </form>
        
      </div>
    </div>
  );
};
}

export default PostJob;
