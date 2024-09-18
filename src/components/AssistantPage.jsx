// components/AssistantPage.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from './base/Button';
import Vapi from '@vapi-ai/web';
import ParticlesBackground from './ParticlesBackground';
import { FaArrowLeft } from 'react-icons/fa'; // Import Font Awesome icon

const AssistantPage = () => {
    const { assistantId } = useParams();
    const navigate = useNavigate();

    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);

    // Initialize Vapi with your public key using useRef
    const vapiRef = useRef(null);

    useEffect(() => {
        // Initialize Vapi only once
        if (!vapiRef.current) {
            vapiRef.current = new Vapi('ad66965e-8208-4404-8b1c-ac4f81d2a107');
        }

        const vapi = vapiRef.current;

        // Vapi event handlers
        vapi.on('call-start', () => {
            setConnecting(false);
            setConnected(true);
        });

        vapi.on('call-end', () => {
            setConnecting(false);
            setConnected(false);
        });

        vapi.on('volume-level', (level) => {
            setVolumeLevel(level);
        });

        vapi.on('error', (error) => {
            console.error(error);
            setConnecting(false);
        });

        // Cleanup on unmount
        return () => {
            if (connected || connecting) {
                vapi.stop();
            }
            vapi.removeAllListeners();
        };
    }, []); // We can safely omit dependencies here

    // Start call with dynamic assistant ID
    const startCallInline = () => {
        setConnecting(true);
        vapiRef.current.start(assistantId);
    };

    // End call handler
    const endCall = () => {
        console.log('End call function called');
        vapiRef.current.stop();
    };

    // Back button handler
    const goBack = () => {
        navigate('/');
    };

    // Label text based on state
    let labelText = '';
    if (connecting) {
        labelText = 'Conectando...';
    } else if (connected) {
        labelText = 'Pulse el botón para terminar';
    } else {
        labelText = 'Pulse el botón para asistencia';
    }

    return (
        <div
            className="App"
            style={{
                position: 'relative',
                overflow: 'hidden',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Particles Background */}
            <ParticlesBackground />

            {/* Main Content */}
            <div
                style={{
                    flex: 1,
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                }}
            >
                {/* Back Button */}
                <button
                    onClick={goBack}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        padding: '10px',
                        cursor: 'pointer',
                        zIndex: 2,
                    }}
                >
                    Volver
                </button>

                {/* Label */}
                <p
                    style={{
                        marginBottom: '40px',
                        color: '#e0b3ff',
                        fontSize: '32px',
                        textShadow: '0 0 5px #e0b3ff',
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
                    color: '#e0b3ff',
                    fontSize: '14px',
                    textShadow: '0 0 5px #e0b3ff',
                    textAlign: 'center',
                    padding: '10px',
                    zIndex: 1,
                }}
            >
                <a
                    href="https://coffeeupcode.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#e0b3ff', textDecoration: 'none' }}
                >
                    Desarrollado por CoffeeUpCode
                </a>
            </footer>
        </div>
    );
};

export default AssistantPage;