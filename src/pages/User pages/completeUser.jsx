import React, { useState } from 'react';
import axios from 'axios';
import './complete.css';
import ImageUploader from '../../components/Convert/convertImage';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    education: [{
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
    }],
    experiences: [{
      position: '',
      company: '',
      startDate: '',
      endDate: '',
    }],
    certifications: [{
      title: '',
      organization: '',
      issueDate: '',
      expirationDate: '',
    }],
    languages: [''],
    generalSkills: [''],
    links: [''],
    image: null,
  });
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
      [section]: [...prevState[section], ''],
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
      links: [...prevState.links, ''],
    }));
  };
  const handleRemoveLink = (index) => {
    const list = [...formData.links];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, links: list }));
  };
  const handleAddEducation = () => {
    setFormData((prevState) => ({
      ...prevState,
      education: [
        ...prevState.education,
        { degree: '', institution: '', startDate: '', endDate: '' },
      ],
    }));
  };
  const handleRemoveEducation = (index) => {
    const list = [...formData.education];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, education: list }));
  };
  const handleAddExperience = () => {
    setFormData((prevState) => ({
      ...prevState,
      experiences: [
        ...prevState.experiences,
        { position: '', company: '', startDate: '', endDate: '' },
      ],
    }));
  };
  const handleRemoveExperience = (index) => {
    const list = [...formData.experiences];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, experiences: list }));
  };
  const handleAddCertification = () => {
    setFormData((prevState) => ({
      ...prevState,
      certifications: [
        ...prevState.certifications,
        { title: '', organization: '', issueDate: '', expirationDate: '' },
      ],
    }));
  };
  const handleRemoveCertification = (index) => {
    const list = [...formData.certifications];
    list.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, certifications: list }));
  };
  const handleImageUpload = (e) => {
    setFormData((prevState) => ({ ...prevState, image: e.target.files[0] }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formData)
      const edit = await axios.put(`https://fxb8z0anl0.execute-api.eu-west-3.amazonaws.com/prod/6512959bf6a4626fcd191c4d`,
        formData
      )
      console.log('Form data to be sent:', formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {formData.education.map((edu, index) => (
        <div key={index}>
          <input
            name="degree"
            value={edu.degree}
            onChange={(e) => handleInputChange(e, index, 'education', 'degree')}
          />
          <input
            name="institution"
            value={edu.institution}
            onChange={(e) => handleInputChange(e, index, 'education', 'institution')}
          />
          <input
            name="startDate"
            type="date"
            value={edu.startDate}
            onChange={(e) => handleInputChange(e, index, 'education', 'startDate')}
          />
          <input
            name="endDate"
            type="date"
            value={edu.endDate}
            onChange={(e) => handleInputChange(e, index, 'education', 'endDate')}
          />
          <button type="button" onClick={() => handleRemoveEducation(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddEducation}>
        Add Education
      </button>
      {formData.experiences.map((exp, index) => (
        <div key={index}>
          <input
            name="position"
            value={exp.position}
            onChange={(e) => handleInputChange(e, index, 'experiences', 'position')}
          />
          <input
            name="company"
            value={exp.company}
            onChange={(e) => handleInputChange(e, index, 'experiences', 'company')}
          />
          <input
            name="startDate"
            type="date"
            value={exp.startDate}
            onChange={(e) => handleInputChange(e, index, 'experiences', 'startDate')}
          />
          <input
            name="endDate"
            type="date"
            value={exp.endDate}
            onChange={(e) => handleInputChange(e, index, 'experiences', 'endDate')}
          />
          <button type="button" onClick={() => handleRemoveExperience(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddExperience}>
        Add Experience
      </button>
      {formData.certifications.map((cert, index) => (
        <div key={index}>
          <input
            name="title"
            value={cert.title}
            onChange={(e) => handleInputChange(e, index, 'certifications', 'title')}
          />
          <input
            name="organization"
            value={cert.organization}
            onChange={(e) => handleInputChange(e, index, 'certifications', 'organization')}
          />
          <input
            name="issueDate"
            type="date"
            value={cert.issueDate}
            onChange={(e) => handleInputChange(e, index, 'certifications', 'issueDate')}
          />
          <input
            name="expirationDate"
            type="date"
            value={cert.expirationDate}
            onChange={(e) => handleInputChange(e, index, 'certifications', 'expirationDate')}
          />
          <button type="button" onClick={() => handleRemoveCertification(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddCertification}>
        Add Certification
      </button>
      {formData.languages.map((lang, index) => (
  <div key={index}>
    <input
      name="language"
      value={lang}
      onChange={(e) => handleArrayChange(e, index, 'languages')}
    />
    <button type="button" onClick={() => handleRemoveArrayField(index, 'languages')}>
      Remove
    </button>
  </div>
))}
<button type="button" onClick={() => handleAddArrayField('languages')}>
  Add Language
</button>
      {formData.generalSkills.map((skill, index) => (
  <div key={index}>
    <input
      name="generalSkill"
      value={skill}
      onChange={(e) => handleArrayChange(e, index, 'generalSkills')}
    />
    <button type="button" onClick={() => handleRemoveArrayField(index, 'generalSkills')}>
      Remove
    </button>
  </div>
))}
<button type="button" onClick={() => handleAddArrayField('generalSkills')}>
  Add Skills
</button>
{formData.links.map((link, index) => (
  <div key={index}>
    <input
      name="links"
      value={link}
      onChange={(e) => handleArrayChange(e, index, 'links')}
    />
    <button type="button" onClick={() => handleRemoveArrayField(index, 'links')}>
      Remove
    </button>
  </div>
))}
<button type="button" onClick={() => handleAddArrayField('links')}>
  Add Link
</button>
<ImageUploader
              currentImage={formData.profilePhoto}
              setImage={(base64String) =>
                setFormData({ ...formData, profilePhoto: base64String })
              }
            />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;
