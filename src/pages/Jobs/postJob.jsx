import React from "react";
import Text from "../../components/text/text";
import "./postJob.css";
import X from "../../assets/icons/closeX.svg";
const PostJob = () => {
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
        <form className="job-form">
          <div className="inputbox-register">
            <input
              type="text"
              name="fullName"
              placeholder="Category"
              className="register-input"
              required
            />
          </div>
          <div className="inputbox-register">
            <input
              type="text"
              name="fullName"
              placeholder="Position"
              className="register-input"
              required
            />
          </div>
          <div className="inputbox-register-box">
            <input
              type="text"
              name="Description"
              placeholder="Description..."
              className="register-input"
              required
            />
          </div>
          <div className="inputbox-register">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="register-input"
              required
            />
          </div>
        <button className="job-btn"><Text label={"Save"} size={"s16"} weight={"regular"}/></button>
        </form>
        
      </div>
    </div>
  );
};

export default PostJob;
