import React, { useEffect, useState, useRef } from 'react';

const VoiceCapture = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null); // Use useRef to store recognition instance

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Your browser does not support Speech Recognition.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.interimResults = false;
    recognitionRef.current.maxAlternatives = 1;

    recognitionRef.current.onstart = () => {
      setListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      console.log('Confidence:', event.results[0][0].confidence);
    };

    recognitionRef.current.onerror = (event) => {
      setError('Error occurred in recognition: ' + event.error);
      setListening(false);
    };

    recognitionRef.current.onend = () => {
      setListening(false);
    };

    // Cleanup function to stop recognition on component unmount
    return () => {
      if (recognitionRef.current && listening) {
        recognitionRef.current.stop();
      }
    };
  }, [listening]);

  const startListening = () => {
    setTranscript('');
    setError(null);
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.error('Recognition error:', e);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return (
    <div style={styles.container}>
      <h2>Voice Capture Test</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.buttonContainer}>
        <button
          onClick={startListening}
          disabled={listening}
          style={{
            ...styles.button,
            ...styles.startButton,
            backgroundColor: listening ? '#aaa' : '#4CAF50',
          }}
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          disabled={!listening}
          style={{
            ...styles.button,
            ...styles.stopButton,
            backgroundColor: listening ? '#f44336' : '#aaa',
          }}
        >
          Stop Listening
        </button>
      </div>
      <p style={styles.status}>
        {listening ? 'Listening...' : 'Click "Start Listening" to begin.'}
      </p>
      <p style={styles.transcript}>
        <strong>Transcript:</strong> {transcript}
      </p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '2rem',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: 'auto',
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  buttonContainer: {
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#f44336',
  },
  status: {
    fontSize: '18px',
    fontStyle: 'italic',
    marginTop: '1rem',
  },
  transcript: {
    fontSize: '16px',
    color: '#333',
    marginTop: '1rem',
  },
};

export default VoiceCapture;