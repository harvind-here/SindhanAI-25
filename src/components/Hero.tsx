import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Hero = () => {
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
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">SindhanAI'25</h1>
          <h2 className="mb-12 text-xl md:text-3xl">02.05 - 03.05</h2>

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
              <div className="relative">
                <motion.img
                  src="https://ext.same-assets.com/61982440/2869253106.svg+xml"
                  alt="planet1"
                  className="mx-auto h-28 w-28 md:h-32 md:w-32 opacity-90"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold md:text-3xl">₹60,000</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm">Prizepool</div>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <motion.img
                  src="https://ext.same-assets.com/1645771940/811426858.svg+xml"
                  alt="planet2"
                  className="mx-auto h-28 w-28 md:h-32 md:w-32 opacity-90"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold md:text-3xl">250+</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm">Participants</div>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <motion.img
                  src="https://ext.same-assets.com/1422808050/2836999932.svg+xml"
                  alt="planet3"
                  className="mx-auto h-28 w-28 md:h-32 md:w-32 opacity-90"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold md:text-3xl">50+</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm">Colleges</div>
              </div>
            </div>
            <div className="relative">
              <div className="relative">
                <motion.img
                  src="https://ext.same-assets.com/493208394/2510877119.svg+xml"
                  alt="planet4"
                  className="mx-auto h-28 w-28 md:h-32 md:w-32 opacity-90"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold md:text-3xl">24</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm">Hours</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
