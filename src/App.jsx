// App.js
import { useEffect, useState } from "react";
import Button from "./components/base/Button";
import Vapi from "@vapi-ai/web";
import ParticlesBackground from "./ParticlesBackground"; // Import the new component

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
      setVolumeLevel(level);
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
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Render the particles background */}
      <ParticlesBackground />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        {/* Button */}
        {!connected ? (
          <Button
            onClick={startCallInline}
            isLoading={connecting}
            connected={false}
          />
        ) : (
          <Button
            onClick={endCall}
            isLoading={false}
            volume={volumeLevel}
            connected={true}
          />
        )}

        {/* Footer */}
        <footer
          style={{
            marginTop: "20px",
            color: "#fff",
            fontSize: "12px",
          }}
        >
          Desarrollado por CoffeeUpCode
        </footer>
      </div>
    </div>
  );
};

export default App;