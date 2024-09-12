import React from 'react';
import microphoneIcon from '../../assets/microphoneIcon.svg';  // Make sure to update the path to your icon

const Button = ({ label, onClick, isLoading, volume, connected }) => {
  // Apply the expanding ring class if volume is detected and connected
  const effectClass = connected && volume > 0.05 ? 'expanding-ring' : '';

  return (
    <div
      className={`custom-microphone-button ${effectClass}`} // Add expanding ring effect
      onClick={onClick}
      style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: '#1c1c1c',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {isLoading ? (
        <p style={{ color: '#fff' }}>Loading...</p>
      ) : !connected ? (
        <img
          src={microphoneIcon}
          alt="Microphone"
          style={{ width: '40px', height: '40px' }}  // Adjust size as needed
        />
      ) : (
        <p style={{ color: '#fff' }}>{label}</p>
      )}
    </div>
  );
};

export default Button;

// import { useState, useEffect } from "react";
// import microphoneIcon from "../../assets/microphoneIcon.svg"; // Make sure the path is correct

// const Button = ({ label, onClick, isLoading, disabled }) => {
//   const [isPressed, setIsPressed] = useState(false);

//   // Ensure the button stays in pressed state when loading or connected
//   useEffect(() => {
//     if (isLoading) {
//       setIsPressed(true); // Keep pressed/fog state when loading
//     } else {
//       setIsPressed(false); // Reset to default when not loading
//     }
//   }, [isLoading]);

//   const handleClick = () => {
//     onClick();
//   };

//   return (
//     <div
//       className={`custom-microphone-button ${isPressed ? "pressed" : ""}`}
//       onClick={handleClick}
//       style={{
//         opacity: disabled ? 0.75 : 1,
//         cursor: disabled ? "not-allowed" : "pointer",
//       }}
//     >
//       {isLoading ? (
//         <p style={{ margin: 0, padding: 0 }}>${label}</p> // Stay in loading/pressed state during the call
//       ) : (
//         <img src={microphoneIcon} alt="Microphone" style={{ width: "40px", height: "40px" }} />
//       )}
//     </div>
//   );
// };

// export default Button;