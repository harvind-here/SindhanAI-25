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
    abheekPandoh: 'https://ext.same-assets.com/1204467722/4291056903.png',
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
            SPEAKERS
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
                  <h3 className="mb-1 text-2xl font-bold text-white md:text-3xl">Dr. Ana Pantelic</h3>
                  <p className="mb-4 text-purple-300">Director of MIT D-Lab</p>
                  <p className="text-sm leading-relaxed text-gray-200 md:text-base">
                    Dr. Ana Pantelic is the Executive Director of MIT D-Lab, which works with people around the world to develop and advance collaborative approaches and practical solutions to global poverty challenges. Prior to joining MIT, she spent over a decade working at the confluence of systems change, inclusive innovation, and economic opportunity. She is also the founder of LISTA, an award-winning digital solution proven to improve the financial health of nearly a million low-income people across a dozen countries. Dr. Pantelic has previously worked with UNICEF (in Uganda), Fundación Capital (an international social enterprise, in Colombia), and USAID (in Serbia), among others, and holds a PhD in Political Science from the University of Belgrade in her native Serbia.
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
