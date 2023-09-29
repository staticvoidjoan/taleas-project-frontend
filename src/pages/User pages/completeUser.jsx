import { useState, useEffect } from "react";
import axios from "axios";
import "./complete.css"
import Text from "../../components/text/text"
import X from "../../assets/icons/closeX.svg";
import ImageUploader from "../../components/Convert/convertImage";
import { Link } from "react-router-dom";
const ProfileForm = (userId) => {
  const [formData, setFormData] = useState({
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
        company: "",
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
    languages: [""],
    generalSkills: [""],
    links: [""],
    image: null,
  });

  const loadUser = async () => {
    try {
      const response = await axios.get(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user/${userId}`
      );
      setFormData(response.data.user);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const handleInputChange = (e, index, section, field) => {
    const { value } = e.target;
    const list = [...formData[section]];
    list[index][field] = value;
    setFormData((prevState) => ({ ...prevState, [section]: list }));
  };
  const handleArrayChange = (e, index, section) => {
    const { value } = e.target;
    const list = [...formData[section]];
    list[index] = value;
    setFormData((prevState) => ({ ...prevState, [section]: list }));
  };

  const handleAddArrayField = (section) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: [...prevState[section], ""],
    }));
  };

  const handleRemoveArrayField = (index, section) => {
    const list = [...formData[section]];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, [section]: list }));
  };

  const handleAddLink = () => {
    setFormData((prevState) => ({
      ...prevState,
      links: [...prevState.links, ""],
    }));
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
    console.log(id)
    try{
    const response = await axios.delete(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/education/${id}`)
    const list = [...formData.education];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, education: list }));
    } catch(error) {
      console.log('Something went wrong');
    }
  };

  const handleAddExperience = () => {
    setFormData((prevState) => ({
      ...prevState,
      experiences: [
        ...prevState.experiences,
        { position: "", company: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handleRemoveExperience = async (index, id) => {
    try{
    await axios.delete(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/experience/${id}`)
    const list = [...formData.experience];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, experience: list }));
    } catch (error){ 
      console.log('Something went wrong')
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

  const handleRemoveCertification = async(index, id) => {
    try{
    await axios.delete(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/certifications/${id}`)
    const list = [...formData.certifications];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, certifications: list }));
    } catch (error){
      console.log('Something went wrong')
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const edit = await axios.put(
        `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/${userId}`,
        formData
      );
      console.log("Form data to be sent:", formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="compete-profile-main">
      <div className="complete-profile-bar">
        <div className="complete-profile-bar-nav">
        <Text label={"Edit Profile"} size={"s16"} weight={"medium"} />
       <Link to='/profile'>
        <img src={X} alt="" />
        </Link>
        </div>
        <hr className="complete-profile-bar-div"></hr>
      </div>
      <div className="complete-profile-body">
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="education-form">
      <label> Educations: </label>
      {formData.education.map((edu, index) => (
        <div key={index} className="fields-form">
          <label> Degree: </label>
          <input
            name="degree"
            className="field-input"
            value={edu.degree}
            onChange={(e) => handleInputChange(e, index, "education", "degree")}
          />
          <label> Insitution </label>
          <input
            name="institution"
            className="field-input"
            value={edu.institution}
            onChange={(e) =>
              handleInputChange(e, index, "education", "institution")
            }
          />
          <label> Start date </label>
          <input
            name="startDate"
            type="date"
            className="field-input"
            value={edu.startDate}
            onChange={(e) =>
              handleInputChange(e, index, "education", "startDate")
            }
          />
          <label> End date </label>
          <input
            name="endDate"
            type="date"
            className="field-input"
            value={edu.endDate}
            onChange={(e) =>
              handleInputChange(e, index, "education", "endDate")
            }
          />
          <button type="button" className="remove-button" onClick={() => handleRemoveEducation(index, edu._id)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={handleAddEducation}>
        Add Education
      </button>
      <br />
      </div>
      <div className="experience-form">
      <label>Experiences</label>
      {formData.experience.map((exp, index) => (
        <div key={index} className="fields-form">
          <label> Position </label>
          <input
            name="position"
            className="field-input"
            value={exp.position}
            onChange={(e) =>
              handleInputChange(e, index, "experience", "position")
            }
          />
          <label> Employer </label>
          <input
            name="employer"
            className="field-input"
            value={exp.employer}
            onChange={(e) =>
              handleInputChange(e, index, "experience", "employer")
            }
          />
          <label> Start date </label>
          <input
            name="startDate"
            className="field-input"
            type="date"
            value={exp.startDate}
            onChange={(e) =>
              handleInputChange(e, index, "experience", "startDate")
            }
          />
          <label> End date </label>
          <input
            name="endDate"
            className="field-input"
            type="date"
            value={exp.endDate}
            onChange={(e) =>
              handleInputChange(e, index, "experience", "endDate")
            }
          />
          <button type="button" className="remove-button" onClick={() => handleRemoveExperience(index, exp._id)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={handleAddExperience}>
        Add Experience
      </button>
      </div>
      <div className="certifications-form">
      <label> Certifications </label>
      {formData.certifications.map((cert, index) => (
        <div key={index} className="fields-form">
          <label> Title </label>
          <input
            name="title"
            className="field-input"
            value={cert.title}
            onChange={(e) =>
              handleInputChange(e, index, "certifications", "title")
            }
          />
          <label> Organization </label>
          <input
            name="organization"
            className="field-input"
            value={cert.organization}
            onChange={(e) =>
              handleInputChange(e, index, "certifications", "organization")
            }
          />
          <label> Issue date </label>
          <input
            name="issueDate"
            type="date"
            className="field-input"
            value={cert.issueDate}
            onChange={(e) =>
              handleInputChange(e, index, "certifications", "issueDate")
            }
          />
          <label> Expiration date </label>
          <input
            name="expirationDate"
            type="date"
            className="field-input"
            value={cert.expirationDate}
            onChange={(e) =>
              handleInputChange(e, index, "certifications", "expirationDate")
            }
          />
          <button
            type="button"
            className="remove-button"
            onClick={() => handleRemoveCertification(index, cert._id)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={handleAddCertification}>
        Add Certification
      </button>
      </div>
      <div className="languages">
        <label> Languages </label>
      {formData.languages.map((lang, index) => (
        <div key={index}>
          
          <input
            name="language"
            value={lang}
            onChange={(e) => handleArrayChange(e, index, "languages")}
          />
          <button
            type="button"
            className="remove-button"
            onClick={() => handleRemoveArrayField(index, "languages")}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={() => handleAddArrayField("languages")}>
        Add Language
      </button>
      </div>
      <div className="skills-complete">
        <label> General Skills </label>
      {formData.generalSkills.map((skill, index) => (
        <div key={index}>
          <input
            name="generalSkill"
            className="fields-input"
            value={skill}
            onChange={(e) => handleArrayChange(e, index, "generalSkills")}
          />
          <button
            type="button"
            className="remove-button"
            onClick={() => handleRemoveArrayField(index, "generalSkills")}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="add-button"
        onClick={() => handleAddArrayField("generalSkills")}
      >
        Add Skills
      </button>
      </div>
      <div className="link">
        <label> Links </label>
      {formData.links.map((link, index) => (
        <div key={index}>
          <input
            name="links"
            className="fields-input"
            value={link}
            onChange={(e) => handleArrayChange(e, index, "links")}
          />
          <button
            type="button"
            className="remove-button"
            onClick={() => handleRemoveArrayField(index, "links")}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="add-button" onClick={() => handleAddArrayField("links")}>
        Add Link
      </button>
      </div>
      <br />
      <div className="profilePhoto">
      <label> Profile photo </label>
      <ImageUploader
        currentImage={formData.profilePhoto}
        setImage={(base64String) =>
          setFormData({ ...formData, profilePhoto: base64String })
        }
      />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
    </div>
    </div>
  );
};

export default ProfileForm;
