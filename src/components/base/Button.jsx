import React from 'react';
import microphoneIcon from '../../assets/microphoneIcon.svg';  // Ensure the icon path is correct

const Button = ({ label, onClick, isLoading, volume, connected }) => {
   // Apply the glow effect when connected and volume is present
  const effectClass = connected && volume > 0.05 ? 'neon-ring' : '';

     // Apply the glow effect when connected and volume is present
  const buttonClass = isLoading ? 'connecting-effect' : connected && volume > 0.05 ? 'button-3d dimmed-gradient' : 'dimmed-gradient';

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        className={`custom-microphone-button ${effectClass} ${buttonClass}`}
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
          <p style={{ color: '#fff' }}>{label}</p>
        )}
      </div>

      {/* Display this text only when the call is connected */}
      {connected && (
        <p style={{ marginTop: '10px', color: '#fff' }}>Click to end the call</p>
      )}
    </div>
  );
};

export default Button;