import React from "react";
import Text from "../../components/text/text";
import unicorn from "../../assets/images/Unicorn.png";
import "./jobProfile.css";
const JobProfile = () => {
  const cardStyle = {
    backgroundImage: `url(${unicorn})`,
    position: "relative",
  };
  return (
    <div className="job-post-container">
      <div className="photo-container">
        <div className="company-photo" style={cardStyle}>
          <div className="gradient-overlay"></div>
        </div>
      </div>
      <div className="job-title">
        <Text label={"Job Title"} weight={"bold"} color={"black"} />
        <Text label={"Company Name"} weight={"regular"} color={"black"} />
        <Text
          label={"It Services and consulting "}
          weight={"regular"}
          color={"black"}
        />
        <div className="job-title-info">
          <div className="info-bubbles">
            <Text label={"Tirana"} weight={"regular"} color={"lightgray"} />
          </div>
        </div>
      </div>
      <div className="job-describtion">
        <Text label={"Job Description"} weight={"bold"} color={"black"} />
        <Text label={"Location"} weight={"regular"} color={"black"} />
        <Text label={"Schedule"} weight={"regular"} color={"black"} />
        <Text
          label={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          }
          weight={"regular"}
          color={"lightgray"}
        />
        <Text
          label={"Posted on Sep 22"}
          weight={"regular"}
          color={"lightgray"}
        />
      </div>
      <div className="job-requirements">
        <Text label={"Requirements"} />
        <Text label={"5 skills match your profile"} />
      </div>
      <div className="about-company">
        <Text label={"About the company"} weight={"bold"} color={"black"} />
        <Text
          label={
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          }
          weight={"regular"}
          color={"lightgray"}
        />
      </div>
    </div>
  );
};

export default JobProfile;
