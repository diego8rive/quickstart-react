// src/components/AssistantPage.jsx

import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Vapi from '@vapi-ai/web';
import { assistantsData } from '../assistantData';
import { FaArrowLeft } from 'react-icons/fa';
import Button from './base/Button';
import ParticlesBackground from './ParticlesBackground';

const AssistantPage = () => {
    const { assistantName } = useParams(); // Get the product name from the URL
    const navigate = useNavigate();

    const [connecting, setConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);

    const vapiRef = useRef(null);

    // Decode the assistant name from the URL
    const decodedAssistantName = decodeURIComponent(assistantName);

    // Find the assistant data for the product
    const assistantInfo = assistantsData.find(
        (item) => item.productName === decodedAssistantName
    );

    // Select an account index (logic to distribute calls)
    const [accountIndex] = useState(() => {
        return Math.floor(Math.random() * 2); // Assuming there are always 2 accounts
    });

    // Initialize accountId and assistantId
    let accountId = null;
    let assistantId = null;

    if (assistantInfo) {
        const assistantData = assistantInfo.assistants[accountIndex];
        accountId = assistantData.accountId;
        assistantId = assistantData.assistantId;
        console.log('accountId:', accountId);
    }

    useEffect(() => {
        if (!assistantInfo) {
            // Handle the case where the assistant is not found
            navigate('/');
            return;
        }

        if (!vapiRef.current && accountId) {
            vapiRef.current = new Vapi(accountId);
        }

        const vapi = vapiRef.current;

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
            if (vapiRef.current) {
                vapiRef.current.stop();
                vapiRef.current.removeAllListeners();
            }
        };
    }, [accountId, assistantInfo, navigate]);

    const startCallInline = () => {
        if (vapiRef.current && assistantId) {
            setConnecting(true);
            vapiRef.current.start(assistantId);
        }
    };

    const endCall = () => {
        if (vapiRef.current) {
            vapiRef.current.stop();
        }
    };

    const goBack = () => {
        if (vapiRef.current) {
            vapiRef.current.stop();
            vapiRef.current.removeAllListeners();
        }
        navigate('/');
    };

    // Label text based on state
    let labelText = '';
    if (connecting) {
        labelText = 'Conectando...';
    } else if (connected) {
        labelText = 'Pulse para terminar';
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

            {/* Back Button */}
            <button
                onClick={goBack}
                className="absolute top-4 left-4 flex items-center bg-neon-purple hover:bg-purple-700 text-white font-bold py-2 px-3 rounded-full button-glow z-10"
            >
                <FaArrowLeft className="mr-2" /> Volver
            </button>

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