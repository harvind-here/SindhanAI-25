import { useCallback, useState, useEffect, useRef } from "react";
import { Container, Engine, IParticle } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

interface ParticleData {
  id: string; // Unique ID for the particle
  x: number;
  y: number;
}

interface SignalPath {
  id: string; // Unique ID for the signal animation
  path: ParticleData[]; // Sequence of particles in the path
  startTime: number; // Timestamp when the signal started
  durationPerSegment: number; // Time in ms for the signal to traverse one segment
}

const StarBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const [particlesData, setParticlesData] = useState<ParticleData[]>([]);
  const [activeSignals, setActiveSignals] = useState<SignalPath[]>([]);
  const containerRef = useRef<Container | undefined>();
  const svgRef = useRef<SVGSVGElement>(null); // Ref for SVG dimensions

  const particlesLoaded = useCallback(async (container?: Container) => {
    if (!container) {
      return;
    }
    containerRef.current = container;
    // Ensure particles are fully initialized before accessing
    // Sometimes direct access might be too early, a small delay can help
    // Using requestAnimationFrame to wait for the next paint cycle
    requestAnimationFrame(() => {
        // Log the container and particles object to inspect structure
        console.log("tsparticles container:", container);
        console.log("tsparticles container.particles:", container?.particles);

        // Try accessing particles via container.particles.filter()
        const particlesCollection = container?.particles;
        let particles: ParticleData[] = [];

        if (particlesCollection && typeof particlesCollection.filter === 'function') {
            const filteredParticles = particlesCollection.filter(() => true); // Get all particles
            if (filteredParticles && filteredParticles.length > 0) {
                 particles = filteredParticles.map((p: IParticle) => ({
                    id: p.id.toString(),
                    x: p.position.x,
                    y: p.position.y,
                }));
                setParticlesData(particles);
                console.log(`Stored ${particles.length} particle positions via .filter().`);
            } else {
                 console.error("Failed to access particle collection via .filter() (returned empty/null).");
            }
        } else {
            console.error("Particles collection or .filter() method not available.");
            // If this fails, manual inspection of the logged container object is needed.
        }
    });
  }, []);

  // Helper function to calculate distance between two points
  const calculateDistance = (p1: ParticleData, p2: { x: number; y: number }) => {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  };

  // Helper function to find N nearest neighbors
  const findNearestNeighbors = (target: ParticleData, count: number, excludeIds: string[] = []): ParticleData[] => {
    if (particlesData.length === 0) return [];
    return particlesData
      .filter(p => p.id !== target.id && !excludeIds.includes(p.id)) // Exclude self and specified IDs
      .sort((a, b) => calculateDistance(a, target) - calculateDistance(b, target))
      .slice(0, count);
  };

  // Function to generate a random path
  const generateRandomPath = (startNode: ParticleData, length: number): ParticleData[] => {
    const path = [startNode];
    let currentNode = startNode;
    const excluded = [startNode.id]; // Keep track of nodes already in the path

    for (let i = 1; i < length; i++) {
      const neighbors = findNearestNeighbors(currentNode, 5, excluded); // Find potential next steps
      if (neighbors.length === 0) break; // Stop if no more valid neighbors

      // Simple strategy: pick the closest available neighbor
      const nextNode = neighbors[0];
      path.push(nextNode);
      excluded.push(nextNode.id);
      currentNode = nextNode;
    }
    return path;
  };


  // Effect for generating random signals
  useEffect(() => {
    const signalInterval = setInterval(() => {
      if (particlesData.length < 5) return; // Need enough particles

      // Randomly select a starting particle
      const startIndex = Math.floor(Math.random() * particlesData.length);
      const startNode = particlesData[startIndex];

      // Generate a path of 4-5 nodes
      const pathLength = Math.floor(Math.random() * 2) + 4; // 4 or 5
      const newPath = generateRandomPath(startNode, pathLength);

      if (newPath.length > 1) { // Only add if path has at least one segment
          const newSignal: SignalPath = {
            id: `signal-${Date.now()}-${Math.random()}`, // Unique ID
            path: newPath,
            startTime: Date.now(),
            durationPerSegment: 300, // ms per segment traversal
          };
          // Limit the number of concurrent signals for performance
          setActiveSignals(prev => [...prev.slice(-10), newSignal]); // Keep latest 10 + new one
       }

    }, 800); // Generate a new random signal every 0.8 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(signalInterval);
  }, [particlesData]); // Rerun effect if particlesData changes (though it shouldn't after load)


  // Click handler for the canvas/SVG area
  const handleCanvasClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (particlesData.length === 0 || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // Find the nearest particle to the click
    let nearestParticle: ParticleData | null = null;
    let minDistance = Infinity;

    for (const particle of particlesData) {
      const distance = calculateDistance(particle, { x: clickX, y: clickY });
      if (distance < minDistance) {
        minDistance = distance;
        nearestParticle = particle;
      }
    }

    // Trigger signal if click is close enough to a particle (e.g., within 15px)
    const clickThreshold = 15;
    if (nearestParticle && minDistance < clickThreshold) {
      console.log(`Clicked near particle: ${nearestParticle.id}`);
      // Generate a path starting from the clicked node
      const pathLength = Math.floor(Math.random() * 2) + 4; // 4 or 5 nodes
      const newPath = generateRandomPath(nearestParticle, pathLength);

       if (newPath.length > 1) {
          const newSignal: SignalPath = {
            id: `click-signal-${Date.now()}-${Math.random()}`,
            path: newPath,
            startTime: Date.now(),
            durationPerSegment: 250, // Slightly faster for click response
          };
          setActiveSignals(prev => [...prev.slice(-10), newSignal]);
       }
    }
  };

   // Effect to clean up finished signals
   useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setActiveSignals(prevSignals =>
        prevSignals.filter(signal => {
          const totalDuration = (signal.path.length - 1) * signal.durationPerSegment;
          return now < signal.startTime + totalDuration + 500; // Keep signal for 500ms after it finishes
        })
      );
    }, 1000); // Check every second

    return () => clearInterval(cleanupInterval);
  }, []);


  // SVG Rendering Logic
  const renderSignals = () => {
    const now = Date.now();
    return activeSignals.map(signal => {
      const elapsedTime = now - signal.startTime;
      const segments = [];

      for (let i = 0; i < signal.path.length - 1; i++) {
        const p1 = signal.path[i];
        const p2 = signal.path[i + 1];
        const segmentStartTime = i * signal.durationPerSegment;
        const segmentEndTime = (i + 1) * signal.durationPerSegment;
        const segmentDuration = signal.durationPerSegment;

        // Calculate progress within this specific segment
        let progress = 0;
        if (elapsedTime >= segmentStartTime) {
          progress = Math.min(1, (elapsedTime - segmentStartTime) / segmentDuration);
        }

        // Only render if the signal has reached or is traversing this segment
        if (progress > 0) {
            const length = calculateDistance(p1, p2);
            const style: React.CSSProperties = {
                strokeDasharray: length,
                strokeDashoffset: length * (1 - progress),
                transition: progress < 1 ? `stroke-dashoffset ${segmentDuration * 0.9}ms linear` : 'none', // Smooth animation
                stroke: 'rgba(255, 255, 255, 0.6)', // Signal color
                strokeWidth: 1, // Signal thickness
            };

            segments.push(
                <line
                    key={`${signal.id}-seg-${i}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    style={style}
                />
            );
        }
         // Stop rendering segments for this signal if progress is 1 (segment complete)
         // and we don't want lingering lines after animation.
         // However, the cleanup effect handles removal, so we let it draw fully.
      }
      return segments;
    }).flat(); // Flatten the array of segment arrays
  };


  return (
    <div className="absolute inset-0" onClick={handleCanvasClick}> {/* Attach click handler */}
      <Particles
        id="tsparticles"
        className="absolute inset-0 -z-10" // Ensure particles are behind SVG
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
              enable: true, // Keep listening for clicks for our custom handler
              mode: "push", // Use a non-interfering mode or remove entirely
            },
            onHover: {
              enable: false, // Keep hover disabled
            },
            resize: true,
          },
          modes: { // Remove trail mode entirely
            push: { // Keep push mode definition if needed, or remove if unused
              quantity: 1
            }
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff", // Keep color def if needed for custom links later
            distance: 150,
            enable: false, // Disable default links
            opacity: 0.4,
            width: 0.2,
          },
          collisions: {
            enable: false,
          },
          move: {
            enable: false, // Ensure particles are fixed
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
     {/* SVG Overlay for Signals */}
     <svg
        ref={svgRef}
        className="absolute inset-0 pointer-events-none" // Position over particles, ignore clicks
        style={{ width: '100%', height: '100%' }}
      >
        <g>{renderSignals()}</g>
      </svg>
    </div> // Close the wrapper div
  );
};

export default StarBackground; // Restore default export
