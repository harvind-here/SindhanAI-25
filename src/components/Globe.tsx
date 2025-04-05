import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Globe: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<THREE.Mesh>();
  const isAnimatingToTarget = useRef(false);
  const hasScrolled = useRef(false);
  // Target longitude for India (approx. 80 degrees East) converted to radians
  const targetRotationY = (180 * Math.PI) / 180; // This line sets the target rotation for India

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 2.5; // Adjust camera distance

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // Enable transparency and antialiasing
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Adjust for high DPI screens
    currentMount.appendChild(renderer.domElement);

    // Simplified lighting - just basic illumination
    const ambientLight = new THREE.AmbientLight(0x111111, 0.2);
    scene.add(ambientLight);

    // Main sunlight
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(5, 0, 5);
    scene.add(sunLight);

    // Globe geometry and material
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/earth_map.jpg');
    const bumpMap = textureLoader.load('/images/earth_bump.jpg');

    // Custom shader material for Earth with terminator effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: texture },
        bumpTexture: { value: bumpMap },
        sunDirection: { value: new THREE.Vector3(5, 0, 5).normalize() },
        bumpScale: { value: 0.02 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D dayTexture;
        uniform sampler2D bumpTexture;
        uniform vec3 sunDirection;
        uniform float bumpScale;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec3 normal = normalize(vNormal);
          float cosTheta = dot(normal, sunDirection);
          
          // Create smooth terminator transition
          float twilightStart = -0.2;  // Adjust for wider/narrower twilight zone
          float twilightEnd = 0.2;
          
          // Calculate twilight intensity
          float twilightIntensity = smoothstep(twilightStart, twilightEnd, cosTheta);
          
          // Get texture color
          vec4 texColor = texture2D(dayTexture, vUv);
          
          // Add subtle blue tint to twilight zone
          vec3 twilightColor = mix(
            texColor.rgb * 0.1,  // Dark side
            texColor.rgb,        // Lit side
            twilightIntensity
          );
          
          // Add slight blue glow in twilight zone
          float glowIntensity = (1.0 - abs(cosTheta - 0.0)) * 0.3;  // Peak at terminator
          vec3 glowColor = vec3(0.1, 0.2, 0.4) * glowIntensity;
          
          // Combine everything
          vec3 finalColor = twilightColor + glowColor;
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const globe = new THREE.Mesh(geometry, material);
    globeRef.current = globe;
    scene.add(globe);

    // Animation loop with sun direction update
    const animate = () => {
      requestAnimationFrame(animate);
      if (globeRef.current) {
        if (isAnimatingToTarget.current) {
          // Smoothly rotate towards the target
          const currentRotationY = globeRef.current.rotation.y;
          // Normalize rotations to handle shortest path (e.g., crossing 0/2PI)
          const TWO_PI = Math.PI * 2;
          const normalizedCurrent = (currentRotationY % TWO_PI + TWO_PI) % TWO_PI;
          const normalizedTarget = (targetRotationY % TWO_PI + TWO_PI) % TWO_PI;

          let delta = normalizedTarget - normalizedCurrent;
          // Choose the shortest path
          if (Math.abs(delta) > Math.PI) {
            delta = delta > 0 ? delta - TWO_PI : delta + TWO_PI;
          }

          const step = delta * 0.05; // Easing factor

          // Stop animating if close enough
          if (Math.abs(step) < 0.001) {
            globeRef.current.rotation.y = targetRotationY; // Snap to final position
            isAnimatingToTarget.current = false;
          } else {
            globeRef.current.rotation.y += step;
          }
        } else {
          // Default slow rotation
          globe.rotation.y += 0.0009;
        }

        // Update sun direction in shader
        const sunDir = new THREE.Vector3(5, 0, 5).normalize();
        material.uniforms.sunDirection.value = sunDir;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle first scroll
    const handleFirstScroll = () => {
      if (!hasScrolled.current) {
        hasScrolled.current = true;
        isAnimatingToTarget.current = true;
        // Remove the listener after the first scroll
        window.removeEventListener('scroll', handleFirstScroll);
      }
    };
    window.addEventListener('scroll', handleFirstScroll, { once: false }); // Listen until triggered

    // Handle resize
    const handleResize = () => {
      if (currentMount) {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // Ensure scroll listener is removed if component unmounts before scroll
      window.removeEventListener('scroll', handleFirstScroll);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      // Dispose Three.js objects
      geometry.dispose();
      material.dispose();
      texture.dispose();
      bumpMap.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '150%', height: '150%' }} />;
};

export default Globe;
