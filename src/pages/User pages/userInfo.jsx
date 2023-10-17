import React, { useEffect, useState } from "react";
import Text from "../../components/text/text";
import unicorn from "../../assets/images/Unicorn.png";
import facebook from "../../assets/icons/facebook.svg";
import instagram from "../../assets/icons/ig.svg";
import experience from "../../assets/images/exp.png";
import educationpic from "../../assets/images/educ.png";
import certification from "../../assets/images/certf.png";
import emailpic from "../../assets/icons/email.svg";
import edit from "../../assets/icons/edit.svg";
import link from "../../assets/icons/link.svg";
import { format } from "date-fns";
import "./userInfo.css";
import axios from "axios";
import UserSignOut from "../../service/authentication/user/userSignOut";
import Animate from "../../animateTransition/AnimateY";
import CenterNavbar from "../../components/centerNavbar/centerNavbar";
import { useNavigate } from "react-router-dom";
import UserInfoLoader from "../../components/Loader/UserInfoLoader";

const UserInfo = ({ userId }) => {
  const [user, setUser] = useState({});
  const [experiences, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [links, setLinks] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [generalSkills, setGeneralSkills] = useState([]);
  const [languages, setLanguages] = useState([])
  const [loading, setLoading] = useState();

  const navigate = useNavigate();
  const editNav = () => {
    navigate("/completeprofile");
  };

  const loadUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user/${userId}`
      );
      setUser(response.data.user);
      setExperience(response.data.user.experience);
      setCertifications(response.data.user.certifications);
      setEducation(response.data.user.education);
      setLinks(response.data.user.links);
      setGeneralSkills(response.data.user.generalSkills);
      setLanguages(response.data.user.languages)
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
    <>
      {loading ? (
        <UserInfoLoader />
      ) : (
        <Animate>
          <div className="userInfo-container">
            <div className="user-image">
              <div className="user-photo" style={cardStyle}>
                <div className="gradient-overlay"></div>
              </div>
            </div>
{/* {HEADER} */}
            <div className="header">
              
              <div className="fullname" onClick={editNav}>
                <Text
                  label={`${user.name} ${user.lastname} `}
                  size={"s18"}
                  weight={"medium700"}
                />
                <div className="edit-profile">
                  <img src={edit}></img>
                </div>
              </div>
              <div className="socials">
                <a href="https://www.instagram.com" target="_blank">
                  <img alt="facebook" src={facebook} />
                </a>
                <a href="https://www.facebook.com" target="_blank">
                  <img alt="instagram" src={instagram} />
                </a>
              </div>
            </div>
            <div className="position-info">
              <img alt="email" src={emailpic} />
              <div className="email-adress">
                <Text label={user.email} size={"s14"} />
              </div>
            </div>
{/* SKILLS */}
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
{/* EXPERIENCES */}
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
                      <div className="exp-date" >
                      <Text
                        label={`${exp.startDate} / ${exp.endDate}`}
                        size={"s14"}
                      />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
{/* EDUCATION */}
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
                    <div className="details-tabs">
                        <Text key={index} label={edu.institution} size={"s14"} />
                      </div>
                      <div className="exp-date">
                      <Text
                        label={`${edu.startDate} / ${edu.endDate}`}
                        size={"s14"}
                      />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
{/* CERTIFICATIONS  */}
            <div className="experiences">
              <div className="exp">
                <Text
                  label={"Certifications"}
                  size={"s18"}
                  weight={"medium700"}
                />
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
                    <div className="details-tabs">
                        <Text key={index} label={cert.organization} size={"s14"} />
                      </div>
                      <div className="exp-date">
                      <Text
                        label={`${cert.issueDate} / ${cert.expirationDate}`}
                        size={"s14"}
                      />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lang">
              <Text
                label={"Languages"}
                size={"s18"}
                weight={"medium700"}
              />
              <div className="lang-div">
              {languages.map((lang, index) => (
                <div className="lang-tabs">
                  <Text label={lang} size={"s14"} />
                </div>
              ))}
              </div>
            </div>
{/* links */}
            <div className="projects">
              <Text
                label={"Link to projects"}
                size={"s18"}
                weight={"medium700"}
              />
              {links.map((links1, index) => (
                <div className="project-link">
                  <img src={link} />
                  <a href={links1} className="link-tab"><Text label={links1} size={"s16"} /></a>
                </div>
              ))}
            </div>
            <div className="signout">
              <UserSignOut />
            </div>
          </div>
        </Animate>
      )}
    </>
  );
};

export default UserInfo;
