import { motion } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react'; // Added useCallback
import Globe from './Globe';

interface RippleState {
  isAnimating: boolean;
}

const Hero = () => {
  const texts = ["SindhanAI'25", "சிந்தனை'25", "సింధానై'25", "सिंधनै'25","സിന്ദനായി'25", "ಸಿಂಧನೈ'25"];
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [rippleStates, setRippleStates] = useState<RippleState[]>([
    { isAnimating: false },
    { isAnimating: false },
    { isAnimating: false },
    { isAnimating: false }
  ]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isGlobeAnimationComplete, setIsGlobeAnimationComplete] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-05-02T00:00:00');  // Changed to April 19th, 2025

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Effect for text transformation (typing/backspacing)
  useEffect(() => {
    const typingSpeed = 150; // Speed of typing
    const deletingSpeed = 150; // Speed of backspacing
    const pauseDuration = 1500; // Pause before switching text or starting delete

    const handleTyping = () => {
      const currentText = texts[textIndex];
      if (isDeleting) {
        // Handle deleting
        if (charIndex > 0) {
          setDisplayedText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          // Finished deleting
          setIsDeleting(false);
          setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
          // Pause before typing next text
          setTimeout(() => {}, pauseDuration / 2); // Short pause after deleting
        }
      } else {
        // Handle typing
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts]);

  // Effect to trigger ripple animation sequentially on initial load
  useEffect(() => {
    const delay = 700; // 0.7 seconds delay
    const timeouts: NodeJS.Timeout[] = [];

    rippleStates.forEach((_, index) => {
      const timeoutId = setTimeout(() => {
        handleRipple(index);
      }, index * delay);
      timeouts.push(timeoutId);
    });

    // Cleanup function to clear timeouts if the component unmounts
    return () => {
      timeouts.forEach(clearTimeout);
      // Also reset animation states if unmounting mid-animation
      setRippleStates(prev => prev.map(() => ({ isAnimating: false })));
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  const handleRipple = (index: number) => {
    setRippleStates(prev => {
      const newStates = [...prev];
      newStates[index].isAnimating = true;
      return newStates;
    });

    setTimeout(() => {
      setRippleStates(prev => {
        const newStates = [...prev];
        newStates[index].isAnimating = false;
        return newStates;
      });
    }, 1000);
  };

  // Animated elements
  const starVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  const catVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        repeat: Infinity,
        duration: 5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden pt-24" id="hero">
      {/* Background container - set z-index here */}
      {/* Removed StarBackground component usage */}
      <div className="fixed inset-0 bg-black z-[-20]"> {/* Changed to fixed, adjusted z-index */}
        {/* StarBackground removed */}
      </div>
      
      {/* Floating elements - ensure Globe is above background */}
      <div
        className="fixed z-[-10]" // Changed to fixed, adjusted z-index
        style={{
          width: '1500px',
          height: '1500px',
          top: '-40%',
          right: '15%',
        }}
      >
        <Globe isAnimationComplete={isGlobeAnimationComplete} />
      </div>

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative mb-4 h-16 md:h-24 flex items-center justify-center min-w-[300px] md:min-w-[500px]"> {/* Added fixed height, flex centering, and min-width */}
            <h1 className="text-4xl font-bold text-gray-400 md:text-6xl relative overflow-hidden">{displayedText}
              <span className="absolute right-0 top-0 bottom-0 w-1 bg-gray-400 animate-pulse"></span> {/* Blinking cursor */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-diagonal-shine"></span>
            </h1>
          </div>
          {/* Added tagline */}
          <p className="text-lg md:text-xl text-gray-300 mt-2 mb-8 font-bold">Innovate | Agitate | Organize</p>
          <h2 className="mb-12 text-xl md:text-3xl">2nd & 3rd MAY</h2>

          <div className="mb-16">
            <h3 className="mb-4 text-lg font-semibold md:text-xl">Blast Off In</h3>
            <div className="mx-auto flex max-w-md justify-center">
              <div className="mx-2 w-16 rounded-lg bg-purple-900/40 p-3 backdrop-blur-sm md:w-24">
                <div className="text-2xl font-bold md:text-4xl">{formatTime(days)}</div>
                <div className="text-xs md:text-sm">days</div>
              </div>
              <div className="mx-2 w-16 rounded-lg bg-purple-900/40 p-3 backdrop-blur-sm md:w-24">
                <div className="text-2xl font-bold md:text-4xl">{formatTime(hours)}</div>
                <div className="text-xs md:text-sm">hours</div>
              </div>
              <div className="mx-2 w-16 rounded-lg bg-purple-900/40 p-3 backdrop-blur-sm md:w-24">
                <div className="text-2xl font-bold md:text-4xl">{formatTime(minutes)}</div>
                <div className="text-xs md:text-sm">minutes</div>
              </div>
              <div className="mx-2 w-16 rounded-lg bg-purple-900/40 p-3 backdrop-blur-sm md:w-24">
                <div className="text-2xl font-bold md:text-4xl">{formatTime(seconds)}</div>
                <div className="text-xs md:text-sm">seconds</div>
              </div>
            </div>
          </div>

          {/* Stats section */}
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { img: "https://ext.same-assets.com/61982440/2869253106.svg+xml", value: "₹60K", label: "Prizepool" },
              { img: "https://ext.same-assets.com/1645771940/811426858.svg+xml", value: "3", label: "Tracks" },
              { img: "https://ext.same-assets.com/1422808050/2836999932.svg+xml", value: "50+", label: "Colleges" },
              { img: "https://ext.same-assets.com/493208394/2510877119.svg+xml", value: "24H", label: "Time" }
            ].map((stat, index) => (
              <div className="relative" key={index}>
                <div 
                  className="relative cursor-pointer w-32 h-32 mx-auto flex items-center justify-center"
                  onClick={() => handleRipple(index)}
                >
                  <motion.img
                    src={stat.img}
                    alt={`planet${index + 1}`}
                    className="h-28 w-28 md:h-32 md:w-32 opacity-90 absolute"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-2xl font-bold md:text-3xl">{stat.value}</div>
                  </div>
                  {rippleStates[index].isAnimating && (
                    <div
                      className="absolute rounded-full animate-ripple pointer-events-none"
                      style={{
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        width: '128px', // Match planet size
                        height: '128px', // Match planet size
                        transform: 'translate(-50%, -50%)',
                        left: '50%',
                        top: '50%'
                      }}
                    />
                  )}
                </div>
                <div className="mt-2">
                  <div className="text-md font-bold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Register button */}
          <div className="mt-16 flex justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfzpC7e3lvMC5CdoyBvI1sVhIYXJJqQmMGLXysB_JKctKqK9w/viewform?embedded=true"
              target="_blank"
              rel="noreferrer"
              className="register-button group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-12 py-4 text-xl font-semibold text-white before:absolute before:left-[-100%] before:top-0 before:h-full before:w-[120%] before:animate-shine before:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.5)_30%,transparent_50%)] before:content-[''] after:absolute after:left-[-100%] after:top-0 after:h-full after:w-[120%] after:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.8)_30%,transparent_50%)] after:opacity-0 after:content-[''] hover:after:animate-hover-shine hover:scale-105 transition-all duration-300 ease-in-out md:text-2xl md:px-16 md:py-5"
            >
              <span className="relative z-10">Register for Free</span>
              <span className="group-hover:border-rainbow absolute inset-0 rounded-full overflow-hidden">
                {/* Top border */}
                <span className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 -translate-x-full group-hover:animate-rainbow-border-top"></span>
                {/* Right border */}
                <span className="absolute top-0 right-0 w-[6px] h-full bg-gradient-to-b from-green-500 via-blue-500 to-indigo-500 -translate-y-full group-hover:animate-rainbow-border-right"></span>
                {/* Bottom border */}
                <span className="absolute bottom-0 left-0 w-full h-[6px] bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 translate-x-full group-hover:animate-rainbow-border-bottom"></span>
                {/* Left border */}
                <span className="absolute top-0 left-0 w-[6px] h-full bg-gradient-to-b from-red-500 via-pink-500 to-indigo-500 translate-y-full group-hover:animate-rainbow-border-left"></span>
              </span>
            </a>
          </div>
          <p className="mt-4 text-sm md:text-base text-yellow-300">*Last date to register and submit abstract is 28th April</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
