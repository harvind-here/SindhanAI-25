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

    // Main sunlight - moved further left
    const sunLight = new THREE.DirectionalLight(0xffffff, 1.0);
    sunLight.position.set(2, -1, 5);
    scene.add(sunLight);

    // Globe geometry and material
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/images/earth_map.jpg');
    const bumpMap = textureLoader.load('/images/earth_bump.jpg');

    // Custom shader material with adjusted terminator arc and gradient
    const material = new THREE.ShaderMaterial({
      uniforms: {
        dayTexture: { value: texture },
        bumpTexture: { value: bumpMap },
        sunDirection: { value: new THREE.Vector3(2, -1, 5).normalize() },
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
        uniform vec3 sunDirection;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vec4 texColor = texture2D(dayTexture, vUv);
          vec3 normal = normalize(vNormal);
          float cosTheta = dot(normal, sunDirection);
          
          // Terminator arc parameters - adjusted for leftward position
          float arcWidth = 0.4;
          float gradientWidth = 0.1;
          
          // Moved arc more to the left with adjusted offset
          float arcOffset = 0.05; // Increased offset for leftward movement
          float baseArc = smoothstep(-arcWidth, 0.0, cosTheta - arcOffset) * 
                         smoothstep(arcWidth, 0.0, cosTheta - arcOffset);
          
          // Adjusted day/night gradient to match new arc position
          float dayNight = smoothstep(-gradientWidth, gradientWidth, cosTheta - arcOffset * 0.8);
          
          // Enhanced glow with adjusted position
          float glowIntensity = smoothstep(-0.1, 0.0, cosTheta - arcOffset) * 
                               smoothstep(0.1, 0.0, cosTheta - arcOffset);
          
          // Combine effects
          float arcIntensity = baseArc * 1.0; // Brighter arc
          float glowFactor = glowIntensity * 0.2; // Subtle glow
          
          // Apply day/night transition
          vec3 nightColor = texColor.rgb * 0.2; // Darker night side
          vec3 dayColor = texColor.rgb;
          vec3 baseColor = mix(nightColor, dayColor, dayNight);
          
          // Add arc and glow
          vec3 arcColor = vec3(1.0, 0.98, 0.95); // Slightly warm white
          vec3 finalColor = baseColor + arcColor * arcIntensity + arcColor * glowFactor;
          
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
        const sunDir = new THREE.Vector3(2, -1, 5).normalize();
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
