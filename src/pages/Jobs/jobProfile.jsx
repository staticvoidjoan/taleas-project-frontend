import React from "react";
import Text from "../../components/text/text";
import unicorn from "../../assets/images/Unicorn.png";
import "./jobProfile.css";
import locationico from "../../assets/icons/location.svg";
import DateButtons from "../../components/button/dateButtons";
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
      <div className="job-info">
        <div className="job-title">
          <Text label={"Job Title"} weight={"bold"} color={"black"} />
          <Text label={"Company Name"} weight={"regular"} color={"black"} />
          <Text
            label={"It Services and consulting "}
            weight={"regular"}
            color={"black"}
          />
          <div className="job-title-info">
            <div className="info-bubble">
              <img src={locationico} className="location-icon" />
              <div style={{ marginRight: "10px" }}>
                <Text label={"Tirana"} weight={"regular"} color={"lightgray"} />
              </div>
            </div>
            <div className="info-bubble">
              <img src={locationico} className="location-icon" />
              <div style={{ marginRight: "10px" }}>
                <Text
                  label={"shametijoan@gmail.com"}
                  weight={"regular"}
                  color={"lightgray"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="job-describtion">
          <div style={{ marginBottom: "12px" }}>
            <Text label={"Job Description"} weight={"bold"} color={"black"} />
          </div>
          <Text label={"Location"} weight={"regular"} color={"black"} />
          <Text label={"Schedule"} weight={"regular"} color={"black"} />
          <Text
            label={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
            weight={"regular"}
            color={"lightgray"}
          />
          <div style={{ marginTop: "16px" }}>
            <Text
              label={"Posted on Sep 22"}
              weight={"regular"}
              color={"lightgray"}
            />
          </div>
        </div>
        <div className="job-requirements">
          <div style={{ marginBottom: "12px" }}>
            <Text label={"Requirements"} weight={"bold"} />
          </div>
          <Text label={"5 skills match your profile"} />
        </div>
        <div className="about-company">
          <div style={{ marginBottom: "8px" }}>
          <Text label={"About the company"} weight={"bold"} color={"black"} />

          </div>
          <Text
            label={
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
            }
            weight={"regular"}
            color={"lightgray"}
          />
        </div>
            <DateButtons/>
      </div>
    </div>
  );
};

export default JobProfile;
