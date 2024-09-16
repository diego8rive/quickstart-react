import React from 'react';
import microphoneIcon from '../../assets/microphoneIcon.svg';  // Make sure the path to the icon is correct

const Button = ({ label, onClick, isLoading, volume, connected }) => {
  // Apply the expanding-dots class if volume is detected and connected
  const effectClass = connected && volume > 0.05 ? 'expanding-dots' : '';

  return (
    <div
      className={`custom-microphone-button ${effectClass}`} // Add expanding dots effect
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
        background: 'radial-gradient(circle at 50% 50%, #ff6ec7, #9b51e0, #4d9fe1, #23d5ab)', // Multicolor gradient
      }}
    >
      {isLoading ? (
        <p style={{ color: '#fff' }}>Loading...</p>
      ) : !connected ? (
        <img
          src={microphoneIcon}
          alt="Microphone"
          style={{ width: '40px', height: '40px' }}
        />
      ) : (
        <p style={{ color: '#fff' }}>{label}</p>
      )}
    </div>
  );
};

export default Button;