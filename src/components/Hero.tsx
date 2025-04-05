import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
  const texts = ["SindhanAI'25", "சிந்தனை'25", "సింధానై'25", "सिंधनै'25","സിന്ദനായി'25", "ಸಿಂಧನೈ'25"];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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


  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  // Animated elements
  const planetVariants = {
    hover: {
      y: -10,
      transition: {
        yoyo: Infinity,
        duration: 2,
      },
    },
  };

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
      {/* Background stars and elements */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://ext.same-assets.com/2447827226/793317872.png"
          alt="Space Background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Floating elements */}
      {/* <motion.img
        src="https://ext.same-assets.com/1533196759/449212754.png"
        alt="Cloud Stars"
        className="absolute right-[5%] top-[10%] w-16 md:w-32"
        variants={starVariants}
        animate="animate"
      /> */}

      <motion.img
        src="https://ext.same-assets.com/516636630/2480188535.png"
        alt="Planet Ring"
        className="absolute right-[20%] top-[30%] w-32 md:w-64"
        variants={planetVariants}
        whileHover="hover"
        initial={{ rotate: -10, scale: 2 }}
        animate={{
          rotate: 10,
          scale: 1,
          transition: {
            rotate: {
              repeat: Infinity,
              repeatType: "reverse",
              duration: 8
            },
            scale: {
              duration: 1.5,
              ease: "easeOut"
            }
          }
        }}
      />

      <motion.img
        src="https://ext.same-assets.com/3889506305/3594095780.png"
        alt="Flying Cat"
        className="absolute left-[10%] top-[15%] w-16 md:w-32"
        variants={catVariants}
        animate="animate"
      />

      {/* Main content */}
      <div className="container relative z-10 mx-auto px-4 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl"
        >
          <div className="relative mb-4 h-16 md:h-24 flex items-center justify-center min-w-[300px] md:min-w-[500px]"> {/* Added fixed height, flex centering, and min-width */}
            <h1 className="text-4xl font-bold text-gray-400 md:text-6xl relative overflow-hidden">
              {displayedText}
              <span className="absolute right-0 top-0 bottom-0 w-1 bg-gray-400 animate-pulse"></span> {/* Blinking cursor */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-diagonal-shine"></span>
            </h1>
          </div>
          <h2 className="mb-12 text-xl md:text-3xl">MAY 2nd & MAY 3rd</h2>

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
            <div className="relative">
              <div className="relative group hover:transform hover:scale-[1.3] transition-transform duration-300 cursor-pointer">
                <motion.img
                  src="https://ext.same-assets.com/61982440/2869253106.svg+xml"
                  alt="planet1"
                  className="mx-auto h-28 w-28 md:h-32 md:w-32 opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold md:text-3xl">₹60K</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-md font-bold">Prizepool</div>
              </div>
            </div>
            <div className="relative">
              <div className="relative group hover:transform hover:scale-[1.3] transition-transform duration-300 cursor-pointer">
                <motion.img
                  src="https://ext.same-assets.com/1645771940/811426858.svg+xml"
                  alt="planet2"
                  className="mx-auto h-28 w-28 md:h-32 md:w-32 opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold md:text-3xl">250+</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-md font-bold">Participants</div>
              </div>
            </div>
            <div className="relative">
              <div className="relative group hover:transform hover:scale-[1.3] transition-transform duration-300 cursor-pointer">
                <motion.img
                  src="https://ext.same-assets.com/1422808050/2836999932.svg+xml"
                  alt="planet3"
                  className="mx-auto h-28 w-28 md:h-32 md:w-32 opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold md:text-3xl">50+</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-md font-bold">Colleges</div>
              </div>
            </div>
            <div className="relative">
              <div className="relative group hover:transform hover:scale-[1.3] transition-transform duration-300 cursor-pointer">
                <motion.img
                  src="https://ext.same-assets.com/493208394/2510877119.svg+xml"
                  alt="planet4"
                  className="mx-auto h-28 w-28 md:h-32 md:w-32 opacity-90"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold md:text-3xl">24H</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-md font-bold">Time</div>
              </div>
            </div>
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
