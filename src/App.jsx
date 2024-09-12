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
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!connected ? (
        <Button
          onClick={startCallInline}
          isLoading={connecting}
          connected={false} // Not connected, no glow
        />
      ) : (
        <Button
          label="End Call"
          onClick={endCall}
          isLoading={false}
          volume={volumeLevel} // Pass volume to control glow intensity
          connected={true} // Connected, enable glow effect
        />
      )}
    </div>
  );
};

export default App;

// import { useEffect, useState } from "react";

// import ActiveCallDetail from "./components/ActiveCallDetail";
// import Button from "./components/base/Button";
// import Vapi from "@vapi-ai/web";
// import { isPublicKeyMissingError } from "./utils";

// // Put your Vapi Public Key below.
// const vapi = new Vapi("ad66965e-8208-4404-8b1c-ac4f81d2a107");

// const App = () => {
//   const [connecting, setConnecting] = useState(false);
//   const [connected, setConnected] = useState(false);

//   const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
//   const [volumeLevel, setVolumeLevel] = useState(0);

//   const { showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage } = usePublicKeyInvalid();

//   // hook into Vapi events
//   useEffect(() => {
//     vapi.on("call-start", () => {
//       setConnecting(false);
//       setConnected(true);

//       setShowPublicKeyInvalidMessage(false);
//     });

//     vapi.on("call-end", () => {
//       setConnecting(false);
//       setConnected(false);

//       setShowPublicKeyInvalidMessage(false);
//     });

//     vapi.on("speech-start", () => {
//       setAssistantIsSpeaking(true);
//     });

//     vapi.on("speech-end", () => {
//       setAssistantIsSpeaking(false);
//     });

//     vapi.on("volume-level", (level) => {
//       setVolumeLevel(level);
//     });

//     vapi.on("error", (error) => {
//       console.error(error);

//       setConnecting(false);
//       if (isPublicKeyMissingError({ vapiError: error })) {
//         setShowPublicKeyInvalidMessage(true);
//       }
//     });

//     // we only want this to fire on mount
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // call start handler
//   const startCallInline = () => {
//     setConnecting(true);
//     vapi.start('f6e9cb18-7967-429f-8735-b13098e3bccc');
//   };
//   const endCall = () => {
//     vapi.stop();
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         width: "100vw",
//         height: "100vh",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {!connected ? (
//         <Button
//           label="Start Call"
//           onClick={startCallInline}
//           isLoading={connecting}
//         />
//       ) : (
//         <Button
//           label="In Progress"
//           onClick={endCall}
//           isLoading={connected}
//         />
//       )
//       }

//       {showPublicKeyInvalidMessage ? <PleaseSetYourPublicKeyMessage /> : null}
//       {/* <ReturnToDocsLink /> */}
//     </div>
//   );
// };

// const usePublicKeyInvalid = () => {
//   const [showPublicKeyInvalidMessage, setShowPublicKeyInvalidMessage] = useState(false);

//   // close public key invalid message after delay
//   useEffect(() => {
//     if (showPublicKeyInvalidMessage) {
//       setTimeout(() => {
//         setShowPublicKeyInvalidMessage(false);
//       }, 3000);
//     }
//   }, [showPublicKeyInvalidMessage]);

//   return {
//     showPublicKeyInvalidMessage,
//     setShowPublicKeyInvalidMessage,
//   };
// };

// const PleaseSetYourPublicKeyMessage = () => {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         bottom: "25px",
//         left: "25px",
//         padding: "10px",
//         color: "#fff",
//         backgroundColor: "#f03e3e",
//         borderRadius: "5px",
//         boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
//       }}
//     >
//       Is your Vapi Public Key missing? (recheck your code)
//     </div>
//   );
// };

// // const ReturnToDocsLink = () => {
// //   return (
// //     <a
// //       href="https://docs.vapi.ai"
// //       target="_blank"
// //       rel="noopener noreferrer"
// //       style={{
// //         position: "fixed",
// //         top: "25px",
// //         right: "25px",
// //         padding: "5px 10px",
// //         color: "#fff",
// //         textDecoration: "none",
// //         borderRadius: "5px",
// //         boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
// //       }}
// //     >
// //       return to docs
// //     </a>
// //   );
// // };

// export default App;
