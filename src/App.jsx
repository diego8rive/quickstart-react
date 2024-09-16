import { useEffect, useState } from "react";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import { isPublicKeyMissingError } from "./utils";

// Put your Vapi Public Key below.
const vapi = new Vapi("ad66965e-8208-4404-8b1c-ac4f81d2a107");

const App = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);

  // Hook into Vapi events
  useEffect(() => {
    vapi.on("call-start", () => {
      setConnecting(false);
      setConnected(true);
    });

    vapi.on("call-end", () => {
      setConnecting(false);
      setConnected(false);
    });

    vapi.on("volume-level", (level) => {
      console.log("Volume Level:", level);
      setVolumeLevel(level); // Capture the volume level here
    });

    vapi.on("error", (error) => {
      console.error(error);
      setConnecting(false);
    });

    // Cleanup Vapi listeners on unmount
    return () => {
      vapi.removeAllListeners();
    };
  }, []);

  // Start call handler
  const startCallInline = () => {
    setConnecting(true);
    vapi.start("f6e9cb18-7967-429f-8735-b13098e3bccc");
  };

  // End call handler
  const endCall = () => {
    vapi.stop();
  };
  
  return (
    <div 
      className="App"
      style={{ 
        textAlign: 'center', 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingBottom: '60px', // Add space for the footer
      }}
    >
      {/* Button in the center */}
      {!connected ? (
        <Button
          onClick={startCallInline}
          isLoading={connecting}
          connected={false} // Not connected, no glow
        />
      ) : (
        <Button
          onClick={endCall}
          isLoading={false}
          volume={volumeLevel} // Pass volume to control glow intensity
          connected={true} // Connected, enable glow effect
        />
      )}

      {/* Persistent Footer */}
      <footer 
        style={{ 
          position: 'absolute', 
          bottom: '20px', 
          width: '100%', 
          textAlign: 'center', 
          color: '#fff', 
          fontSize: '12px'
        }}
      >
        Developed by CoffeeUpCode
      </footer>
    </div>
  );
};

export default App;