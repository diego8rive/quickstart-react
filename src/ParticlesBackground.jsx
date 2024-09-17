// ParticlesBackground.jsx
import React, { useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = React.memo(() => {
    // Initialize particles engine
    React.useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        });
    }, []);

    // Memoize particle options
    const particlesOptions = useMemo(() => ({
        fpsLimit: 60,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            color: {
                value: "#ffffff",
            },
            opacity: {
                value: 0.5,
            },
            size: {
                value: { min: 1, max: 5 },
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                outModes: {
                    default: "bounce",
                },
            },
            links: {
                enable: false,
            },
        },
        interactivity: {
            events: {
                onClick: { enable: false },
                onHover: { enable: false },
            },
        },
        detectRetina: true,
    }), []);

    return (
        <Particles
            id="tsparticles"
            options={particlesOptions}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
        />
    );
});

export default ParticlesBackground;