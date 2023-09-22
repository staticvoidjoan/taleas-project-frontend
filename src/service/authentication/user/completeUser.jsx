import React, { useState } from 'react';
import './complete.css';

const ProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    try {
      console.log('Done!');
    } catch (error) {
      console.log(error);
    }
  };

  const EducationForm = () => {
    return (
      <div className='form-section'>
        <p>Add education</p>
        <div className='position'>
          <label htmlFor='position'>Position:</label>
          <input type='text' id='position' />
        </div>
        <div className='company'>
          <label htmlFor='company'>Company:</label>
          <input type='text' id='company' />
        </div>
        <div className='start-date'>
          <label htmlFor='start-date'>Start Date:</label>
          <input type='date' id='start-date' />
        </div>
        <div className='end-date'>
          <label htmlFor='end-date'>End Date:</label>
          <input type='date' id='end-date' />
        </div>
        <button className='next' onClick={handleNextStep}>
          Next
        </button>
      </div>
    );
  };

  const ExperienceForm = () => {
    return (
      <div className='form-section'>
        <p>Add experience</p>
        <div className='position'>
          <label htmlFor='position'>Position:</label>
          <input type='text' id='position' />
        </div>
        <div className='company'>
          <label htmlFor='company'>Company:</label>
          <input type='text' id='company' />
        </div>
        <div className='start-date'>
          <label htmlFor='start-date'>Start Date:</label>
          <input type='date' id='start-date' />
        </div>
        <div className='end-date'>
          <label htmlFor='end-date'>End Date:</label>
          <input type='date' id='end-date' />
        </div>
        <button className='previous' onClick={handlePreviousStep}>
          Previous
        </button>
        <button className='next' onClick={handleNextStep}>
          Next
        </button>
      </div>
    );
  };

  const LanguagesForm = () => {
    return (
      <div className='form-section'>
        <p>Add languages</p>
        <div className='languages'>
          <label htmlFor='languages'>Languages:</label>
          <input type='text' id='languages' />
        </div>
        <button className='previous' onClick={handlePreviousStep}>
          Previous
        </button>
        <button className='submit' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    );
  };

  let currentForm;
  switch (currentStep) {
    case 1:
      currentForm = <EducationForm />;
      break;
    case 2:
      currentForm = <ExperienceForm />;
      break;
    case 3:
      currentForm = <LanguagesForm />;
      break;
    default:
      currentForm = <div>Invalid step.</div>;
  }

  return (
    <div className='form'>
      <h2>Complete Your Profile</h2>
      {currentForm}
    </div>
  );
};

export default ProfileForm;
