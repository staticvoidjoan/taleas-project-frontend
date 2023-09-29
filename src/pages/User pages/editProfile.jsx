import React, {useState, useEffect} from 'react'
import axios from "axios"

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: "",
        lastname: "",
        headline: "",
        education: [
          {
            degree: "",
            institution: "",
            startDate: "",
            endDate: ""
          }
        ],
        certifications: [
          {
            title: "",
            organization: "",
            issueDate: "",
            expirationDate: ""
          }
        ],
        experiences: [
          {
            position: "",
            company: "",
            startDate: "",
            endDate: ""
          }
        ],
        languages: [""],
        generalSkills: [""],
        links: [""]
      });
      const [loading, setLoading] = useState(true);
      const [editIndex, setEditIndex] = useState(-1);
      const loadUser = async () => {
        try {
          const response = await axios.get(
            "https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user/6510b71fb000416afaa63cc9"
          );
          console.log(response.data.user);
          setFormData(response.data.user);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setLoading(false);
        }
      };
      useEffect(() => {
        loadUser();
      }, []);
      if (loading) {
        return <div>Loading...</div>;
      }
      if (!formData) {
        return <div>Error loading data</div>;
      }
      const handleInputChange = (e, index, section) => {
        const { name, value } = e.target;
        const list = [...formData[section]];
        list[index][name] = value;
        setFormData((prevState) => ({ ...prevState, [section]: list }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data to be sent:", formData);
        try {
          const edit = await axios.put(
            `https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/user/6512959bf6a4626fcd191c4d`,
            formData
          );
         
        } catch (error) {
          console.log(error);
        }
      };
      const handleAddItem = (section, newItem) => {
        setFormData((prevState) => ({
          ...prevState,
          [section]: [...prevState[section], newItem]
        }));
      };
      const handleRemoveItem = (section, index) => {
        const list = [...formData[section]];
        list.splice(index, 1);
        setFormData((prevState) => ({ ...prevState, [section]: list }));
      };
      const handleEditItem = (index) => {
        setEditIndex(index);
      };
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={(e) => handleInputChange(e, 0, "name")}
            />
          </label>
          <label>
            Last Name:
            <input
              name="lastname"
              value={formData.lastname}
              onChange={(e) => handleInputChange(e, 0, "lastname")}
            />
          </label>
          <label>
            Headline:
            <input
              name="headline"
              value={formData.headline}
              onChange={(e) => handleInputChange(e, 0, "headline")}
            />
          </label>
          {formData &&
            formData.education &&
            formData.education.map((edu, index) => (
              <div key={index}>
                <div>
                  Degree: {edu.degree}
                  <button type="button" onClick={() => handleEditItem(index)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("education", index)}
                  >
                    Remove
                  </button>
                </div>
                <div>Institution: {edu.institution}</div>
                <div>Start Date: {edu.startDate}</div>
                <div>End Date: {edu.endDate}</div>
              </div>
            ))}
          <button
            type="button"
            onClick={() =>
              handleAddItem("education", {
                degree: "",
                institution: "",
                startDate: "",
                endDate: ""
              })
            }
          >
            Add Education
          </button>
          {formData &&
            formData.experience &&
            formData.experience.map((exp, index) => (
              <div key={index}>
                <div>
                  Position: {exp.position}
                  <button type="button" onClick={() => handleEditItem(index)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("experience", index)}
                  >
                    Remove
                  </button>
                </div>
                <div>Employer: {exp.employer}</div>
                <div>Start Date: {exp.startDate}</div>
                <div>End Date: {exp.endDate}</div>
              </div>
            ))}
          <button
            type="button"
            onClick={() =>
              handleAddItem("experience", {
                position: "",
                employer: "",
                startDate: "",
                endDate: ""
              })
            }
          >
            Add Experience
          </button>
          {formData &&
            formData.certifications &&
            formData.certifications.map((cert, index) => (
              <div key={index}>
                <div>
                  Title: {cert.title}
                  <button type="button" onClick={() => handleEditItem(index)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem("certifications", index)}
                  >
                    Remove
                  </button>
                </div>
                <div>Organization: {cert.organization}</div>
                <div>Start Date: {cert.issueDate}</div>
                <div>End Date: {cert.expirationDate}</div>
              </div>
            ))}
          <button
            type="button"
            onClick={() =>
              handleAddItem("certifications", {
                title: "",
                organization: "",
                issueDate: "",
                expirationDate: ""
              })
            }
          >
            Add Certifications
          </button>
          <div>
            General Skills:
            <input
              type="text"
              name="generalSkills"
              value={formData.generalSkills.join(", ")}
              onChange={(e) => handleInputChange(e, "generalSkilla")}
            />
          </div>
          <div>
            Languages:
            <input
              type="text"
              name="languages"
              value={formData.languages.join(", ")}
              onChange={(e) => handleInputChange(e, "languages")}
            />
          </div>
          <div>
            Links:
            <input
              type="text"
              name="links"
              value={formData.links.join(", ")}
              onChange={(e) => handleInputChange(e, "links")}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      );
}

export default EditProfile