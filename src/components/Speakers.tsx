import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Speakers = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

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
    abheekPandoh: 'https://media.licdn.com/dms/image/v2/D5603AQHJaEaPQ0SS4A/profile-displayphoto-shrink_400_400/B56ZSIIQ3uGoAs-/0/1737450655651?e=1747872000&v=beta&t=erXZ1ktNjF89lLat6hUm92ZV9aR8ujVJm5osqoNUQ7w',
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
          <h2 className="mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
            CHIEF GUEST
          </h2>

          <div className="relative mx-auto max-w-3xl">
            {/* Shooting star decoration */}
            <motion.img
              src={speakerImages.shootingStar}
              alt="Shooting Star"
              className="absolute -right-16 -top-12 z-0 h-32 w-32 rotate-45 transform md:-right-24 md:-top-20 md:h-48 md:w-48"
              initial={{ opacity: 0, x: -50, y: 50 }}
              animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -50, y: 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />

            {/* Speaker profile */}
            <div className="relative z-10 rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-10">
              <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-8">
                <div className="mb-6 md:mb-0">
                  <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-purple-500 md:h-48 md:w-48">
                    <img
                      src={speakerImages.abheekPandoh}
                      alt="Dr. Ana Pantelic"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Balloon decoration */}
                  <motion.img
                    src={speakerImages.balloon}
                    alt="Balloon"
                    className="absolute -right-8 -top-12 h-20 w-20 md:h-24 md:w-24"
                    animate={{
                      y: [0, -10, 0],
                      transition: {
                        repeat: Infinity,
                        duration: 3,
                      },
                    }}
                  />

                  {/* White planet decoration */}
                  <motion.img
                    src={speakerImages.whitePlanet}
                    alt="White Planet"
                    className="absolute -left-8 bottom-0 h-24 w-24 md:-left-12 md:h-32 md:w-32"
                    animate={{
                      rotate: 360,
                      transition: {
                        repeat: Infinity,
                        duration: 20,
                        ease: 'linear',
                      },
                    }}
                  />
                </div>

                <div className="text-center md:text-left">
                  <h3 className="mb-1 text-2xl font-bold text-white md:text-3xl">Gamaliel Das</h3>
                  <p className="mb-4 text-purple-300">Web Dev Specialist | 8x Global Hackathon Winner | SIH 2022 🏆 | 2x TNSI Awardee | SIH 2023, SIH 2024 Evaluator</p>
                  <p className="text-sm leading-relaxed text-gray-200 md:text-base">
                  Gamaliel Das is a distinguished Web Development Specialist, currently serving at Spendflo. He is an 8-time Global Hackathon Winner, Smart India Hackathon (SIH) 2022 Champion, and 2-time Tamil Nadu Student Innovator (TNSI) Awardee. His commitment to fostering innovation is evident through his role as an Evaluator for SIH 2023 and SIH 2024. Beyond his professional achievements, Gamaliel has built a substantial digital presence, amassing over 170,000 followers. His journey reflects a dedication to elevating the importance of hackathons in Tamil Nadu and inspiring the next generation of tech enthusiasts.
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
