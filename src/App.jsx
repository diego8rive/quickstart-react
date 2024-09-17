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

  // Determine the label text based on connection state
  let labelText = "";
  if (connecting) {
    labelText = "Conectando...";
  } else if (connected) {
    labelText = "Pulse para terminar la llamada";
  } else {
    labelText = "Pulse el botón para asistencia";
  }

  return (
    <div
      className="App"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Render the particles background */}
      <ParticlesBackground />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {/* Label at the top */}
        <p
          style={{
            marginBottom: "40px",
            color: "#e0b3ff",
            fontSize: "32px",
            textShadow: "0 0 5px #e0b3ff",
          }}
        >
          {labelText}
        </p>

        {/* Button */}
        <Button
          onClick={connected ? endCall : startCallInline}
          isLoading={connecting}
          connected={connected}
          volume={volumeLevel}
        />
      </div>

      {/* Footer */}
      <footer
        style={{
          color: "#e0b3ff",
          fontSize: "14px",
          textShadow: "0 0 5px #e0b3ff",
          textAlign: "center",
          padding: "10px",
          zIndex: 1,
        }}
      >
        Desarrollado por CoffeeUpCode
      </footer>
    </div>
  );
};

export default App;