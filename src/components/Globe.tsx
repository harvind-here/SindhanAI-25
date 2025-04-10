import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface GlobeProps {
  isAnimationComplete: boolean;
}

const Globe: React.FC<GlobeProps> = ({ isAnimationComplete }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<THREE.Mesh>();
  const markerRef = useRef<THREE.Mesh>(); // Ref for the location marker
  // const isAnimatingToTarget = useRef(false); // No longer needed
  const hasScrolled = useRef(false);
  const raycaster = useRef(new THREE.Raycaster()); // For click detection
  const mouse = useRef(new THREE.Vector2()); // For mouse coordinates
  const currentRotationTargetRef = useRef<number>(0); // Target rotation for smooth interpolation
  const targetRotationY = (200 * Math.PI) / 180; // Updated target rotation

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
    const bumpMap = textureLoader.load('/images/earth_bump.jpg'); // Assuming you have a bump map

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

    // --- Add Location Marker ---
    const markerGeometry = new THREE.SphereGeometry(0.018, 16, 16); // Reduced base size
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xf5df53, transparent: true, opacity: 0.8, side: THREE.DoubleSide }); // Ensure both sides are checked
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    markerRef.current = marker;

    // Convert Lat/Lon to Cartesian coordinates (Y-up)
    const lat = 10.7905; // Latitude in degrees
    const lon = 78.7047; // Longitude in degrees
    const radius = 1; // Globe radius

    const phi = (90 - lat) * (Math.PI / 180); // Angle from Y-axis (North Pole)
    const theta = (lon + 180) * (Math.PI / 180); // Angle around Y-axis (adjusting for texture map alignment if needed, +180 seems common)

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    marker.position.set(x, y, z);
    globe.add(marker); // Add marker as a child of the globe to rotate with it
    // --- End Location Marker ---

    // Set initial rotation
    const initialRotationY = 0; // Or adjust if needed
    if (globeRef.current) {
        globeRef.current.rotation.y = initialRotationY;
    }
    currentRotationTargetRef.current = initialRotationY;


    // Animation loop using smooth interpolation towards a dynamic target
    const animate = () => {
      requestAnimationFrame(animate);

      // Marker Animation (Pulsating)
      if (markerRef.current) {
        const time = Date.now() * 0.005; // Slow down pulsation
        const scale = 1.0 + 0.15 * Math.sin(time); // Reduced pulsation amplitude
        markerRef.current.scale.set(scale, scale, scale);
      }

      if (globeRef.current) {
        const baseSpeed = 0.001; // Keep speed
        const easingFactor = 0.12; // Increase factor slightly for smoother interpolation
        const TWO_PI = Math.PI * 2;

        // Determine the target rotation for this frame
        let frameTarget: number;
        if (hasScrolled.current) {
          // After scroll, the target is fixed
          frameTarget = targetRotationY;
        } else {
          // Before scroll, the target continuously advances
          currentRotationTargetRef.current += baseSpeed;
          frameTarget = currentRotationTargetRef.current;
        }

        // Smoothly interpolate the globe's actual rotation towards the frameTarget
        const currentRotationY = globeRef.current.rotation.y;
        const normalizedCurrent = (currentRotationY % TWO_PI + TWO_PI) % TWO_PI;
        const normalizedFrameTarget = (frameTarget % TWO_PI + TWO_PI) % TWO_PI;

        let delta: number;

        if (hasScrolled.current) {
          // After scroll, calculate CLOCKWISE delta to the fixed target
          delta = normalizedFrameTarget - normalizedCurrent;
          if (delta < 0) {
            delta += TWO_PI; // Ensure delta represents the clockwise path
          }
        } else {
          // Before scroll, calculate SHORTEST delta to the advancing target
          delta = normalizedFrameTarget - normalizedCurrent;
          if (delta > Math.PI) {
            delta -= TWO_PI; // Go counter-clockwise (shorter path)
          } else if (delta < -Math.PI) {
            delta += TWO_PI; // Go clockwise (shorter path)
          }
        }

        // Apply the easing step based on the calculated delta
        const step = delta * easingFactor;
        // Apply step unconditionally for continuous interpolation
        globeRef.current.rotation.y += step;

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
        // isAnimatingToTarget.current = true; // No longer needed
        // Remove the listener after the first scroll
        window.removeEventListener('scroll', handleFirstScroll);
      }
    };
    window.addEventListener('scroll', handleFirstScroll, { once: false }); // Listen until triggered

    // --- Handle Click on Marker ---
    const handleClick = (event: MouseEvent) => {
      if (!mountRef.current || !markerRef.current) return;

      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.current.setFromCamera(mouse.current, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.current.intersectObject(markerRef.current);

      if (intersects.length > 0) {
        // Marker was clicked
        console.log('Marker clicked!'); // Minimal log for confirmation
        window.open('https://maps.app.goo.gl/RWua39aFsXvaGmG38', '_blank');
      }
    };
    renderer.domElement.addEventListener('click', handleClick);
    // --- End Handle Click ---


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
      // Remove click listener
      renderer.domElement.removeEventListener('click', handleClick);
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      // Dispose Three.js objects
      geometry.dispose();
      material.dispose();
      texture.dispose();
      bumpMap.dispose(); // Dispose bump map
      renderer.dispose();

      // Dispose marker resources
      if (markerRef.current) {
        markerRef.current.geometry.dispose();
        if (markerRef.current.material instanceof THREE.Material) { // Type check for safety
           markerRef.current.material.dispose();
        }
      }
    };
  }, []);

  // Revert container size and styles to original
  return <div ref={mountRef} style={{ width: '150%', height: '150%' }} />;
};

export default Globe;
