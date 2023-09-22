import React, { useState } from 'react';
import './complete.css';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    education: {
      degree: '',
      institution: '',
      startDate: '',
      endDate: '',
    },
    experiences: {
      position: '',
      company: '',
      startDate: '',
      endDate: '',
    },
    languages: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const [section, field] = name.split('.');

      if (section === 'languages') {
        const newLanguages = [...prevData.languages];
        newLanguages.push(value);
        return { ...prevData, languages: newLanguages };
      } else {
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [field]: value,
          },
        };
      }
    });
  };

  const handleSubmit = () => {
    try {
      // Make the API call with formData
      console.log('Form data to be sent:', formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='form-container'>
      <div className='form'>
        <form onSubmit={handleSubmit}>

       
        <h2>Complete Your Profile</h2>

        <div className='form-section'>
          <p>Add education</p>
          <div className='degree'>
            <label htmlFor='degree'>Degree:</label>
            <input
              type='text'
              id='degree'
              name='education.degree'
              value={formData.education.degree}
              onChange={handleInputChange}
            />
          </div>
          <div className='institution'>
            <label htmlFor='institution'>Institution:</label>
            <input
              type='text'
              id='institution'
              name='education.institution'
              value={formData.education.institution}
              onChange={handleInputChange}
            />
          </div>
          <div className='start-date'>
            <label htmlFor='start-date'>Start Date:</label>
            <input
              type='date'
              id='start-date'
              name='education.startDate'
              value={formData.education.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className='end-date'>
            <label htmlFor='end-date'>End Date:</label>
            <input
              type='date'
              id='end-date'
              name='education.endDate'
              value={formData.education.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='form-section'>
          <p>Add experience</p>
          <div className='position'>
            <label htmlFor='position'>Position:</label>
            <input
              type='text'
              id='position'
              name='experiences.position'
              value={formData.experiences.position}
              onChange={handleInputChange}
            />
          </div>
          <div className='company'>
            <label htmlFor='company'>Company:</label>
            <input
              type='text'
              id='company'
              name='experiences.company'
              value={formData.experiences.company}
              onChange={handleInputChange}
            />
          </div>
          <div className='start-date'>
            <label htmlFor='start-date'>Start Date:</label>
            <input
              type='date'
              id='start-date'
              name='experiences.startDate'
              value={formData.experiences.startDate}
              onChange={handleInputChange}
            />
          </div>
          <div className='end-date'>
            <label htmlFor='end-date'>End Date:</label>
            <input
              type='date'
              id='end-date'
              name='experiences.endDate'
              value={formData.experiences.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className='form-section'>
          <p>Add languages</p>
          <div className='languages'>
            <label htmlFor='languages'>Languages:</label>
            <input
              type='text'
              id='languages'
              name='languages'
              value={formData.languages}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button className='submit' >
          Submit
        </button> 
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
