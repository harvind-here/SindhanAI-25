import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, useEffect } from 'react';

const Speakers = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
  });

  const [starRef, starInView] = useInView({
    triggerOnce: true,
    threshold: 0.6,
    rootMargin: '-100px 0px'
  });
  
  // Add state for image hover
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setMousePosition({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      });
    }
  };

  const [isGhibli, setIsGhibli] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // Add glitch animation variants
  const glitchVariants = {
    hidden: { 
      opacity: 0,
      filter: "none",
      transform: "translate(0, 0)"
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    glitch: {
      opacity: [1, 0.8, 1],
      filter: [
        "none",
        "grayscale(0.1) hue-rotate(2deg)",
        "none"
      ],
      x: [0, -2, 2, 0],
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  useEffect(() => {
    const cycleImages = () => {
      setIsGhibli(false);
      
      // Add glitch sequence
      setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGhibli(true);
          setIsGlitching(false);
        }, 200);
      }, 3800); // Start glitch slightly before transition
    };

    // Initial cycle
    cycleImages();

    // Set up interval for continuous cycling
    const interval = setInterval(() => {
      cycleImages();
    }, 6000); // Total cycle time (4s main + 2s ghibli)

    return () => clearInterval(interval);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  // Images for speaker section
  const speakerImages = {
    shootingStar: 'https://ext.same-assets.com/3043395600/3124093549.png',
    balloon: 'https://ext.same-assets.com/4133703346/493755053.png',
    whitePlanet: 'https://ext.same-assets.com/633887910/4018542477.svg+xml',
    abheekPandoh: 'images/guest_dp.jpeg',
    ghibliGuest: '/images/ghibli_guest.png',
  };

  return (
    <section id="Speakers" className="relative bg-[#1b2131] py-24">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl"
        >
          <h2 className="section-title mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
            CHIEF GUEST
          </h2>

          <div className="relative mx-auto max-w-3xl">
            {/* Shooting star decoration */}
            <motion.div
              ref={starRef}
              className="absolute -right-16 -top-12 z-0 md:-right-24 md:-top-20"
            >
              <motion.img
                src={speakerImages.shootingStar}
                alt="Shooting Star"
                className="h-32 w-32 rotate-45 transform md:h-48 md:w-48"
                initial={{ opacity: 0, x: -100, y: 100 }}
                animate={starInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -100, y: 100 }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </motion.div>

            {/* Speaker profile */}
            <div className="relative z-10 rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {/* White planet decoration */}
              <motion.img
                src={speakerImages.whitePlanet}
                alt="White Planet"
                className="absolute -left-8 -bottom-8 h-24 w-24 md:-left-12 md:-bottom-12 md:h-32 md:w-32"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="flex flex-col items-center gap-8 md:flex-row">
                <div 
                  ref={imageRef}
                  className="relative flex-shrink-0 overflow-hidden rounded-full h-48 w-48 md:h-64 md:w-64"
                >
                  <motion.div
                    variants={glitchVariants}
                    initial="hidden"
                    animate={isGlitching ? "glitch" : isGhibli ? "hidden" : "visible"}
                    className="absolute inset-0"
                  >
                    <img
                      src={speakerImages.abheekPandoh}
                      alt="Gamaliel Das"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                  
                  <motion.div
                    variants={glitchVariants}
                    initial="hidden"
                    animate={isGlitching ? "glitch" : isGhibli ? "visible" : "hidden"}
                    className="absolute inset-0"
                  >
                    <img
                      src={speakerImages.ghibliGuest}
                      alt="Ghibli Guest"
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="mb-1 text-2xl font-bold text-white md:text-3xl continuous-rainbow-2">Gamaliel Das</h3>
                  <p className="mb-4 text-purple-300">Web Dev Specialist | 8x Global Hackathon Winner | SIH 2022 🏆 | 2x TNSI Awardee | SIH 2023, SIH 2024 Evaluator</p>
                  <p className="text-sm leading-relaxed text-gray-200 md:text-base">
                  Gamaliel Das is a distinguished Web Development Specialist, currently serving at Spendflo. He is an 8-time Global Hackathon Winner, Smart India Hackathon (SIH) 2022 Champion, and 2-time Tamil Nadu Student Innovator (TNSI) Awardee. His commitment to fostering innovation is evident through his role as an Evaluator for SIH 2023 and SIH 2024. Beyond his professional achievements, Gamaliel has built a substantial digital presence, amassing over 170K+ followers. His journey reflects a dedication to elevating the importance of hackathons in Tamil Nadu and inspiring the next generation of tech enthusiasts. We are excited to have them as our chief guest for SindhanAI'25!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Speakers;
