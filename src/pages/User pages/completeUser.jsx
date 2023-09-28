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
    certifications: [{
      title: '',
      organization: '',
      issueDate: '',
      expitrationDate: '',
    }],
    experiences: [{
      position: '',
      company: '',
      startDate: '',
      endDate: '',
    }],
    languages: [''],
    generalSkills: [''],
    links: ['']
  });
  const handleInputChange = (e, index, section) => {
    const { name, value } = e.target;
    const list = [...formData[section]];
    list[index] = value;
    setFormData(prevState => ({ ...prevState, [section]: list }));
  };
  const handleAddLink = () => {
    setFormData(prevState => ({
      ...prevState,
      links: [...prevState.links, ''],
    }));
  };
  const handleRemoveLink = (index) => {
    const list = [...formData.links];
    list.splice(index, 1);
    setFormData(prevState => ({ ...prevState, links: list }));
  };
  const handleRemoveEducation = (index) => {
    const list = [...formData.education];
    list.splice(index, 1);
    setFormData(prevState => ({ ...prevState, education: list }));
  };
  const handleRemoveExperience = (index) => {
    const list = [...formData.experiences];
    list.splice(index, 1);
    setFormData(prevState => ({ ...prevState, experiences: list }));
  };
  const handleRemoveCertification = (index) => {
    const list = [...formData.links];
    list.splice(index, 1);
    setFormData(prevState => ({ ...prevState, certifications: list }));
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
  const handleAddEducation = () => {
    setFormData(prevState => ({
      ...prevState,
      education: [...prevState.education, { degree: '', institution: '', startDate: '', endDate: '' }],
    }));
  };
  const handleAddExperience = () => {
    setFormData(prevState => ({
      ...prevState,
      experiences: [...prevState.experiences, { position: '', company: '', startDate: '', endDate: '' }],
    }));
  };
  const handleAddCertification = () => {
    setFormData(prevState => ({
      ...prevState,
      experiences: [...prevState.certifications, {title: '', organization: '', issueDate: '', expitrationDate: '' }],
    }));
  };
  return (
    <form onSubmit={handleSubmit}>

      {formData.education.map((edu, index) => (
        <div key={index}>
          <input name="degree" value={edu.degree} onChange={e => handleInputChange(e, index, 'education')} />
          <input name="institution" value={edu.institution} onChange={e => handleInputChange(e, index, 'education')} />
          <input type="date" name="startDate" value={edu.startDate} onChange={e => handleInputChange(e, index, 'education')} />
          <input type="date" name="endDate" value={edu.endDate} onChange={e => handleInputChange(e, index, 'education')} />
          <button type="button" onClick={() => handleRemoveEducation(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddEducation}>Add Education</button>

      {formData.experiences.map((exp, index) => (
        <div key={index}>
          <input name="position" value={exp.position} onChange={e => handleInputChange(e, index, 'experiences')} />
          <input name="company" value={exp.company} onChange={e => handleInputChange(e, index, 'experiences')} />
          <input type="date" name="startDate" value={exp.startDate} onChange={e => handleInputChange(e, index, 'experiences')} />
          <input type="date" name="endDate" value={exp.endDate} onChange={e => handleInputChange(e, index, 'experiences')} />
          <button type="button" onClick={() => handleRemoveExperience(index)}>Remove</button>
        </div>
      ))}
       <button type="button" onClick={handleAddExperience}>Add Experience</button>

       {formData.certifications.map((cert, index) => (
        <div key={index}>
          <input name="title" value={cert.title} onChange={e => handleInputChange(e, index, 'certifications')} />
          <input name="organization" value={cert.organization} onChange={e => handleInputChange(e, index, 'certifications')} />
          <input type="date" name="issueDate" value={cert.issueDate} onChange={e => handleInputChange(e, index, 'certifications')} />
          <input type="date" name="expirationDate" value={cert.expitrationDate} onChange={e => handleInputChange(e, index, 'certifications')} />
          <button type="button" onClick={() => handleRemoveCertification(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddCertification}>Add Certificaton</button>

      {formData.languages.map((lang, index) => (
        <div key={index}>
          <input name="language" value={lang} onChange={e => handleInputChange(e, index, 'languages')} />
        </div>
      ))}

      {formData.generalSkills.map((skill, index) => (
        <div key={index}>
          <input name="skill" value={skill} onChange={e => handleInputChange(e, index, 'generalSkills')} />
        </div>
      ))}

      {formData.links.map((link, index) => (
        <div key={index}>
          <input name="link" value={link} onChange={e => handleInputChange(e, index, 'links')} />
          <button type="button" onClick={() => handleRemoveLink(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddLink}>Add Link</button>

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
