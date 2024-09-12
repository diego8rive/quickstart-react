import { useState, useEffect } from "react";
import microphoneIcon from "../../utils/mic_icon.svg"; // Make sure the path is correct

const Button = ({ label, onClick, isLoading, disabled }) => {
  const [isPressed, setIsPressed] = useState(false);

  // Ensure the button stays in pressed state when loading or connected
  useEffect(() => {
    if (isLoading) {
      setIsPressed(true); // Keep pressed/fog state when loading
    } else {
      setIsPressed(false); // Reset to default when not loading
    }
  }, [isLoading]);

  const handleClick = () => {
    onClick();
  };

  return (
    <div
      className={`custom-microphone-button ${isPressed ? "pressed" : ""}`}
      onClick={handleClick}
      style={{
        opacity: disabled ? 0.75 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {isLoading ? (
        <p style={{ margin: 0, padding: 0 }}>....</p> // Stay in loading/pressed state during the call
      ) : (
        <img src={microphoneIcon} alt="Microphone" style={{ width: "40px", height: "40px" }} />
      )}
    </div>
  );
};

export default Button;