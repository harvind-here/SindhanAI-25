import { useCallback } from "react";
import { Container, Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const StarBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "trail",
            },
            onHover: {
              enable: false,
            },
            resize: true,
          },
          modes: {
            trail: {
              delay: 0.005,
              quantity: 3,
              particles: {
                size: {
                  value: 1,
                },
                move: {
                  enable: true,
                  speed: 2,
                  direction: "none",
                  straight: false,
                },
              },
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.4,
            width: 0.2,
            triangles: {
              enable: false,
            },
            frequency: 1,
            consent: false,
            generators: ["nearest"],
            warp: true,
            blink: true,
            animation: {
              enable: true,
              speed: 20,
            },
          },
          collisions: {
            enable: false,
          },
          move: {
            enable: false,
            direction: "none",
          },
          number: {
            density: {
              enable: true,
              area: 1000,
            },
            value: 150,
          },
          opacity: {
            value: 0.2,
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false,
            },
          },
          shape: {
            type: "dot",
          },
          size: {
            value: 2,
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default StarBackground;
