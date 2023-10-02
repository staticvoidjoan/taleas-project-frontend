import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./complete.css";
import Text from "../../components/text/text";
import X from "../../assets/icons/closeX.svg";
import down from "../../assets/icons/down-arrow.svg";
import profilePic from "../../assets/images/profilePic.png";
import { Link } from "react-router-dom";
import linkPic from "../../assets/icons/link.svg";

const ProfileForm = ({ userId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    headline: "",
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    experience: [
      {
        position: "",
        employer: "",
        startDate: "",
        endDate: "",
      },
    ],
    certifications: [
      {
        title: "",
        organization: "",
        issueDate: "",
        expirationDate: "",
      },
    ],
    languages: [],
    generalSkills: [],
    links: [],
  });
  const [fullName, setFullName] = useState("");
  const [isEducationCollapsed, setIsEducationCollapsed] = useState(true);
  const [isExperienceCollapsed, setIsExperienceCollapsed] = useState(true);
  const [isCertificationCollapsed, setIsCertificationCollapsed] = useState(true);
  const [isLanguageCollapsed, setIsLanguageCollapsed] = useState(true);
  const [isSkillsCollapsed, setIsSkillsCollapsed] = useState(true);
  const [isLinkCollapsed, setIsLinkCollapsed] = useState(true);
  const [isGeneralCollapsed, setIsGeneralCollapsed] = useState(false);

  const loadUser = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user/${userId}`,
      );
      setFormData(response.data.user);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (formData.education.length === 0) {
      handleAddEducation();
    }
    if (formData.experience.length === 0) {
      handleAddExperience();
    }
    if (formData.certifications.length === 0) {
      handleAddCertification();
    }
  }, [formData.education, formData.experience, formData.certifications]);

  const [newPhoto, setNewPhoto] = useState({
    profilePhoto: '',
  });
  useEffect(() => {
    console.log("newPhoto:", newPhoto);
    if (newPhoto.profilePhoto) {
      // Automatically submit the form when a new image is selected
      console.log("Submitting form...");
      editUser();
    }
  }, [newPhoto]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Read the selected file as a data URL (base64)
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64String = event.target.result;
        setNewPhoto({
          ...newPhoto,
          profilePhoto: base64String,
        });
      };
      reader.readAsDataURL(file);
    }
  };
 
  const editUser = async (e) => { 
    const imageUrlWithoutQuotes = newPhoto.profilePhoto.replace(/"/g, '')
    try {
      await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/${userId}`, {
        ...formData, profilePhoto: imageUrlWithoutQuotes,
      });
      loadUser();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e, index, section, field) => {
    const { value } = e.target;
    const list = [...formData[section]];
    list[index][field] = value;
    setFormData((prevState) => ({ ...prevState, [section]: list }));
  };
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [newLanguage, setNewLanguage] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newLink, setNewLink] = useState("");

  const onAddItem = (arrayName, newItem) => {
    if (newItem.trim() !== "") {
      setFormData((formData) => ({
        ...formData,
        [arrayName]: [...formData[arrayName], newItem],
      }));
    }
  };

  const handleRemoveArrayField = (index, section) => {
    const list = [...formData[section]];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, [section]: list }));
  };

  const handleAddEducation = (id) => {
    setFormData((prevState) => ({
      ...prevState,
      education: [
        ...prevState.education,
        { degree: "", institution: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handleRemoveEducation = async (index, id) => {
    console.log(id);
    try {
      if (id) {
        const response = await axios.delete(
          `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/education/${id}`,
        );
      }
      const list = [...formData.education];
      list.splice(index, 1);
      setFormData((prevState) => ({ ...prevState, education: list }));
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleAddExperience = () => {
    setFormData((prevState) => ({
      ...prevState,
      experience: [
        ...prevState.experience,
        { position: "", company: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handleRemoveExperience = async (index, id) => {
    try {
      if (id) {
        await axios.delete(
          `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/experience/${id}`,
        );
      }
      const list = [...formData.experience];
      list.splice(index, 1);
      setFormData((prevState) => ({ ...prevState, experience: list }));
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleAddCertification = () => {
    setFormData((prevState) => ({
      ...prevState,
      certifications: [
        ...prevState.certifications,
        { title: "", organization: "", issueDate: "", expirationDate: "" },
      ],
    }));
  };

  const handleRemoveCertification = async (index, id) => {
    try {
      if (id) {
        await axios.delete(
          `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/certifications/${id}`,
        );
      }
      const list = [...formData.certifications];
      list.splice(index, 1);
      setFormData((prevState) => ({ ...prevState, certifications: list }));
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const edit = await axios.put(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/${userId}`,
        formData,
      );
      console.log("Form data to be sent:", formData);
      navigate('/profile')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="compete-profile-main">
      <div className="complete-profile-bar">
        <div className="complete-profile-bar-nav">
          <Text label={"Edit Profile"} size={"s16"} weight={"medium"} />
          <Link to="/profile">
            <img src={X} alt="" />
          </Link>
        </div>
        <hr className="complete-profile-bar-div"></hr>
      </div>
      <div className="complete-profile-body">
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="generalData">
            <div className="main-label" onClick={() => setIsGeneralCollapsed(!isGeneralCollapsed)}>
              <label className="labels">
                <Text
                  label={"General Information"}
                  size={"s16"}
                  weight={"bold"}
                  lineheight={"l22"}
                />
              </label>
              <img
                src={down}
                className="img"
                alt="down-icon"
                style={isGeneralCollapsed ? { rotate: "0deg" } : { rotate: "180deg" }}
              />
            </div>
            <hr />
            {!isGeneralCollapsed && (
              <>
                <div className="profilePhoto">
                  <div className="profile-photo">
                    {!formData.profilePhoto ? (
                      <img src={profilePic} className="profile-image" />
                    ) : (
                      <img
                        src={formData.profilePhoto.replace(/"/g, '')}
                        alt="profile-photo"
                        className="profile-image"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="custom-photo"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div class="general-data">
                  <label htmlFor="name" className="label-for-fields">
                    <Text label={"First name"} size={"s12"} weight={"regular"} lineheight={"l16"} />
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onInputChange}
                    className="update-input-fields"
                    readOnly
                  />
                </div>
                <div class="general-data">
                  <label className="label-for-fields" htmlFor="lastname">
                    <Text label={"Last name"} size={"s12"} weight={"regular"} lineheight={"l16"} />
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={onInputChange}
                    className="update-input-fields"
                    readOnly
                  />
                </div>
                <div class="general-data">
                  <label className="label-for-fields" htmlFor="headline">
                    <Text label={"Role"} size={"s12"} weight={"regular"} lineheight={"l16"} />
                  </label>
                  <input
                    type="text"
                    name="headline"
                    value={formData.headline}
                    onChange={onInputChange}
                    className="update-input-fields"
                    required
                  />
                </div>{" "}
                <hr />
              </>
            )}
          </div>
          <div className="education-form">
            <div
              className="main-label"
              onClick={() => setIsEducationCollapsed(!isEducationCollapsed)}
            >
              <label className="labels">
                <Text label={"Educations"} size={"s16"} weight={"bold"} />
              </label>
              <img
                src={down}
                className="img"
                alt="down-icon"
                style={isEducationCollapsed ? { rotate: "0deg" } : { rotate: "180deg" }}
              />
            </div>
            <hr />
            {!isEducationCollapsed && (
              <>
                {formData.education.map((edu, index) => (
                  <div key={index} className="fields-form">
                    <div className="education-data">
                      <label className="label-for-fields" htmlFor="degree">
                        <Text label={"Degree"} size={"s12"} weight={"regular"} lineheight={"l16"} />
                      </label>
                      <input
                        name="degree"
                        className="update-input-fields"
                        value={edu.degree}
                        onChange={(e) => handleInputChange(e, index, "education", "degree")}
                      />
                    </div>
                    <div className="education-data">
                      <label className="label-for-fields" htmlFor="institution">
                        <Text
                          label={"Institution"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />
                      </label>
                      <input
                        name="institution"
                        className="update-input-fields"
                        value={edu.institution}
                        onChange={(e) => handleInputChange(e, index, "education", "institution")}
                      />
                    </div>
                    <div className="education-data">
                      <label className="label-for-fields" htmlFor="startDate">
                        {" "}
                        <Text
                          label={"Start Date"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="startDate"
                        type="date"
                        className="update-input-fields"
                        value={edu.startDate}
                        onChange={(e) => handleInputChange(e, index, "education", "startDate")}
                      />
                    </div>
                    <div className="education-data">
                      <label className="label-for-fields" htmlFor="endDate">
                        {" "}
                        <Text
                          label={"End Date"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="endDate"
                        type="date"
                        className="update-input-fields"
                        value={edu.endDate}
                        onChange={(e) => handleInputChange(e, index, "education", "endDate")}
                      />
                    </div>
                    <div className="remove-fields-button">
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveEducation(index, edu._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-button-fields"
                  onClick={handleAddEducation}
                >
                  +
                </button>
              </>
            )}
          </div>
          <div className="experience-form">
            <div
              className="main-label"
              onClick={() => setIsExperienceCollapsed(!isExperienceCollapsed)}
            >
              <label className="labels">
                <Text label={"Experiences"} size={"s16"} weight={"bold"} />
              </label>
              <img
                src={down}
                className="img"
                alt="down-icon"
                style={isExperienceCollapsed ? { rotate: "0deg" } : { rotate: "180deg" }}
              />
            </div>
            <hr />
            {!isExperienceCollapsed && (
              <>
                {formData.experience.map((exp, index) => (
                  <div key={index} className="fields-form">
                    <div className="experience-data">
                      <label className="label-for-fields" htmlFor="position">
                        {" "}
                        <Text
                          label={"Position"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="position"
                        className="update-input-fields"
                        value={exp.position}
                        onChange={(e) => handleInputChange(e, index, "experience", "position")}
                      />
                    </div>
                    <div className="experience-data">
                      <label className="label-for-fields" htmlFor="employer">
                        {" "}
                        <Text
                          label={"Employer"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="employer"
                        className="update-input-fields"
                        value={exp.employer}
                        onChange={(e) => handleInputChange(e, index, "experience", "employer")}
                      />
                    </div>
                    <div className="experience-data">
                      <label className="label-for-fields" htmlFor="startDate">
                        {" "}
                        <Text
                          label={"Start Date"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="startDate"
                        className="update-input-fields"
                        type="date"
                        value={exp.startDate}
                        onChange={(e) => handleInputChange(e, index, "experience", "startDate")}
                      />
                    </div>
                    <div className="experience-data">
                      <label className="label-for-fields" htmlFor="endDate">
                        {" "}
                        <Text
                          label={"End Date"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="endDate"
                        className="update-input-fields"
                        type="date"
                        value={exp.endDate}
                        onChange={(e) => handleInputChange(e, index, "experience", "endDate")}
                      />
                    </div>
                    <div className="remove-fields-button">
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveExperience(index, exp._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button type="button" className="add-button-fields" onClick={handleAddExperience}>
                  +
                </button>
                <hr />
              </>
            )}
          </div>
          <div className="certifications-form">
            <div
              className="main-label"
              onClick={() => setIsCertificationCollapsed(!isCertificationCollapsed)}
            >
              <label className="labels">
                <Text label={"Certifications"} size={"s16"} weight={"bold"} />
              </label>
              <img
                src={down}
                className="img"
                alt="down-icon"
                style={isCertificationCollapsed ? { rotate: "0deg" } : { rotate: "180deg" }}
              />
            </div>
            <hr />
            {!isCertificationCollapsed && (
              <>
                {formData.certifications.map((cert, index) => (
                  <div key={index} className="fields-form">
                    <div className="certifications-data">
                      <label className="label-for-fields" htmlFor="title">
                        {" "}
                        <Text
                          label={"Title"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="title"
                        className="update-input-fields"
                        value={cert.title}
                        onChange={(e) => handleInputChange(e, index, "certifications", "title")}
                      />
                    </div>
                    <div className="certifications-data">
                      <label className="label-for-fields" htmlFor="organization">
                        {" "}
                        <Text
                          label={"Organization"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="organization"
                        className="update-input-fields"
                        value={cert.organization}
                        onChange={(e) =>
                          handleInputChange(e, index, "certifications", "organization")
                        }
                      />
                    </div>
                    <div className="certifications-data">
                      <label className="label-for-fields" htmlFor="issueDate">
                        {" "}
                        <Text
                          label={"Issue Date"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="issueDate"
                        type="date"
                        className="update-input-fields"
                        value={cert.issueDate}
                        onChange={(e) => handleInputChange(e, index, "certifications", "issueDate")}
                      />
                    </div>
                    <div className="certifications-data">
                      <label className="label-for-fields" htmlFor="expirationDate">
                        {" "}
                        <Text
                          label={"Expiration Date"}
                          size={"s12"}
                          weight={"regular"}
                          lineheight={"l16"}
                        />{" "}
                      </label>
                      <input
                        name="expirationDate"
                        type="date"
                        className="update-input-fields"
                        value={cert.expirationDate}
                        onChange={(e) =>
                          handleInputChange(e, index, "certifications", "expirationDate")
                        }
                      />
                    </div>
                    <div className="remove-fields-button">
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveCertification(index, cert._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-button-fields"
                  onClick={handleAddCertification}
                >
                  +
                </button>
                <hr />
              </>
            )}
          </div>
          <div className="languages">
            <div
              className="main-label"
              onClick={() => setIsLanguageCollapsed(!isLanguageCollapsed)}
            >
              <label className="labels">
                {" "}
                <Text label={"Languages"} size={"s16"} weight={"bold"} />{" "}
              </label>
              <img
                src={down}
                className="img"
                alt="down-icon"
                style={isLanguageCollapsed ? { rotate: "0deg" } : { rotate: "180deg" }}
              />
            </div>
            <hr />
            {!isLanguageCollapsed && (
              <>
                <div className="inputbox-update">
                  {/* Input for new requirements */}
                  <input
                    type="text"
                    placeholder="Add Language"
                    className="update-input"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-button-update"
                    onClick={() => {
                      onAddItem("languages", newLanguage);
                      setNewLanguage("");
                    }}
                  >
                    <Text label={"Add"} size={"s14"} weight={"regular"} />
                  </button>
                </div>
                <div className="tags-div">
                  {formData.languages.map((lang, index) => (
                    <div className="tags-list">
                      <div key={index}>
                        <Text label={lang} size={"s14"} weight={"regular"} color={"black"} />
                      </div>
                      <button
                        type="button"
                        className="remove-list-button"
                        onClick={() => handleRemoveArrayField(index, "languages")}
                      >
                        {" "}
                        <img className="remove-img" src={X} alt="Remove" />{" "}
                      </button>
                    </div>
                  ))}
                </div>
                <hr />
              </>
            )}
          </div>
          <div className="skills-complete">
            <div className="main-label" onClick={() => setIsSkillsCollapsed(!isSkillsCollapsed)}>
              <label className="labels">
                <Text label={"Skills"} size={"s16"} weight={"bold"} color={"black"} />
              </label>
              <img
                src={down}
                className="img"
                alt="down-icon"
                style={isSkillsCollapsed ? { rotate: "0deg" } : { rotate: "180deg" }}
              />
            </div>
            <hr />
            {!isSkillsCollapsed && (
              <>
                <div className="inputbox-update">
                  <input
                    type="text"
                    placeholder="Add Skill"
                    className="update-input"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-button-update"
                    onClick={(e) => {
                      onAddItem("generalSkills", newSkill);
                      setNewSkill("");
                    }}
                  >
                    <Text label={"Add"} size={"s14"} weight={"regular"} />
                  </button>
                </div>
                <div className="tags-div">
                  {formData.generalSkills.map((skills, index) => (
                    <div className="tags-list">
                      <div key={index}>
                        <Text label={skills} size={"s14"} weight={"regular"} />
                      </div>
                      <button
                        type="button"
                        className="remove-list-button"
                        onClick={() => handleRemoveArrayField(index, "generalSkills")}
                      >
                        <img className="remove-img" src={X} alt="Remove" />
                      </button>
                    </div>
                  ))}
                </div>
                <hr />
              </>
            )}
          </div>
          <div className="link">
            <div className="main-label" onClick={() => setIsLinkCollapsed(!isLinkCollapsed)}>
              <label className="labels">
                <Text label={"Links"} size={"s16"} weight={"bold"} color={"black"} />{" "}
              </label>
              <img
                src={down}
                className="img"
                alt="down-icon"
                style={isLinkCollapsed ? { rotate: "0deg" } : { rotate: "180deg" }}
              />
            </div>
            <hr />
            {!isLinkCollapsed && (
              <>
                <div className="inputbox-update">
                  <input
                    type="text"
                    placeholder="Add Link"
                    className="update-input"
                    value={newLink}
                    onChange={(e) => setNewLink(e.target.value)}
                  />
                  <button
                    type="button"
                    className="add-button-update"
                    onClick={() => {
                      onAddItem("links", newLink);
                      setNewLink("");
                    }}
                  >
                    <Text label={"Add"} size={"s14"} weight={"regular"} />
                  </button>
                </div>
                <div className="requirements-list">
                    {formData.links.map((link, index) => (
                      <ul >
                        <li className="link-list">
                          <img src={linkPic} alt="link" />
                        <div key={index}>
                          <Text label={link} size={"s14"} weight={"regular"} color={"black"} />
                        </div>
                        <button
                          type="button"
                          className="remove-list-button"
                          onClick={() => handleRemoveArrayField(index, "links")}
                        >
                          <img className="remove-img" src={X} alt="Remove" />
                        </button>
                        </li>
                      </ul>
                    ))}
                </div>
                <hr />
              </>
            )}
          </div>
          <br />
          <div className="submit-cancel">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button className="cancel-button">
              <Link className="cancel-link" to="/profile">
                Cancel
              </Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;