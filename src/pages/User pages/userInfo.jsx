import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import unicorn from "../../assets/images/Unicorn.png";
import facebook from "../../assets/icons/facebook.svg";
import instagram from "../../assets/icons/ig.svg";
import experience from "../../assets/images/exp.jpg";
import educationpic from "../../assets/images/educ.png";
import certification from "../../assets/images/certf.png";
import emailpic from "../../assets/icons/email.svg";
import link from "../../assets/icons/link.svg";
import "./userInfo.css";
import axios from "axios";


const UserInfo = ({ id }) => {
  const [user, setUser] = useState({});
  const [experiences, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [links, setLinks] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [generalSkills, setGeneralSkills] = useState([]);

  const loadUser = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user/6510b71fb000416afaa63cc9`
      );
      setUser(response.data.user);
      setExperience(response.data.user.experience);
      setCertifications(response.data.user.certifications);
      setEducation(response.data.user.education);
      setLinks(response.data.user.links);
      setGeneralSkills(response.data.user.generalSkills);
      console.log(response.data.user);
      console.log(response.data.user.experience);
      console.log(response.data.user.profilePhoto);
    } catch (error) {
      console.error("something went wrong");
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const cardStyle = {
    backgroundImage: `url(${user.profilePhoto ?? unicorn})`,
    position: "relative",
  };
  return (
    <div className="userInfo-container">
      <div className="user-image">
        <div className="user-photo" style={cardStyle}>
          <div className="gradient-overlay"></div>
        </div>
      </div>
      <div className="header">
        <div className="fullname">
          <Text label={user.name} size={"s18"} weight={"medium700"} />
        </div>
        <div className="socials">
          <img alt="facebook" src={facebook} />
          <img alt="instagram" src={instagram} />
        </div>
      </div>
      <div className="position-info">
        <img alt="email" src={emailpic} />
        <div className="email-adress">
          <Text label={user.email} size={"s14"} />
        </div>
      </div>
      <div className="skills">
        <div className="skills-title">
          <Text label={"Skills"} size={"s18"} weight={"medium700"} />
        </div>
        <div className="skills-tabs">
          {generalSkills.map((skill, index) => (
            <div className="skill-tab-name">
              <Text key={index} label={skill} size={"s14"} />
            </div>
          ))}
        </div>
      </div>
      <div className="experiences">
        <div className="exp">
          <Text label={"Experiences"} size={"s18"} weight={"medium700"} />
        </div>

        {experiences.map((exp, index) => (
          <div className="exp-info">
            <div className="exp-pic">
              <img className="exp-pic" src={experience}></img>
            </div>
            <div className="exp-content">
              <div className="exp-position">
                <Text label={exp.position} size={"s16"} />
              </div>
              <div className="details">
                <div className="details-tabs">
                  <Text key={index} label={exp.employer} size={"s14"} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="experiences">
        <div className="exp">
          <Text label={"Education"} size={"s18"} weight={"medium700"} />
        </div>
        {education.map((edu, index) => (
          <div className="exp-info">
            <div className="exp-pic">
              <img className="exp-pic" src={educationpic}></img>
            </div>
            <div className="exp-content">
              <div className="exp-position">
                <Text label={edu.degree} size={"s16"} />
              </div>
              <div className="details">
                <Text
                  label={`${edu.startDate} - ${edu.endDate}`}
                  size={"s14"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="experiences">
        <div className="exp">
          <Text label={"Certifications"} size={"s18"} weight={"medium700"} />
        </div>
        {certifications.map((cert, index) => (
          <div className="exp-info">
            <div className="exp-pic">
              <img className="exp-pic" src={certification}></img>
            </div>

            <div className="exp-content">
              <div className="exp-position">
                <Text label={cert.title} size={"s16"} />
              </div>
              <div className="details">
                <Text
                  label={`${cert.issueDate} - ${cert.expirationDate}`}
                  size={"s14"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="projects">
        <Text label={"Link to projects"} size={"s18"} weight={"medium700"} />
        {links.map((links1, index) => (
          <div className="project-link">
            <img src={link} />
            <Text label={links1} size={"s16"} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInfo;