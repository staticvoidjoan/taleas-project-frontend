import React from 'react';
import logo from './logo-removebg-preview.png'

const OfflinePage = () => {
  return (
    <div className="offline-fallback">
      <img className = 'offline-logo' src={logo} alt='app logo' />
      <div className='description'>
      <h2>You are offline</h2>
      <p>Please check your internet connection and try again.</p>
      <button className='reload-button' onClick={() => window.location.reload()}>Retry</button>
    </div>
    </div>
  );
};

export default OfflinePage;