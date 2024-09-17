// Button.jsx

import React from 'react';
import microphoneIcon from '../../assets/microphoneIcon.svg';  // Ensure the icon path is correct

const Button = ({ label, onClick, isLoading, volume, connected }) => {
  // Determine the classes to apply
  let buttonClasses = 'custom-microphone-button neon-button';

  if (isLoading) {
    buttonClasses += ' connecting-effect';
  } else if (connected && volume > 0.05) {
    buttonClasses += ' in-progress-effect';
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        className={buttonClasses}
        onClick={onClick}
        style={{
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          cursor: 'pointer',
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'auto',
        }}
      >
        {isLoading ? (
          <p style={{ color: '#fff' }}></p>
        ) : !connected ? (
          <img
            src={microphoneIcon}
            alt="Microphone"
            style={{ width: '40px', height: '40px' }}
          />
        ) : (
          <p style={{ color: '#fff' }}></p>
        )}
      </div>
    </div>
  );
};

export default Button;