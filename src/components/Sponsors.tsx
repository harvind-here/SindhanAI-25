import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Sponsors = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25,
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

  // Sponsors data organized by tier
  const sponsors = {
    platinum: [
      {
        name: '',
        logo: '',
        url: '',
      },
    ],
    gold: [
      {
        name: 'BlackThunder',
        logo: 'images/blackth-logo.png',
        url: 'https://www.blackthunder.in/',
      },
      {
        name: 'GoActiveBadminton',
        logo: 'images/GAB.jpg',
        url: '',
      }
    ],
    silver: [
      {
        name: '',
        logo: '',
        url: '#',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
    ],
    bronze: [
      {
        name: '',
        logo: '',
        url: '',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
    ],
    partners: [
      {
        name: '',
        logo: '',
        url: '',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
      {
        name: '',
        logo: '',
        url: '',
      },
    ],
  };

  const sponsorVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section id="Sponsors" className="relative bg-[#1b2131] py-24">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl"
        >
          <h2 className="section-title mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
            SPONSORS
          </h2>

          {/* Platinum sponsors */}
          <div className="mb-16">
            <div className="mx-auto flex justify-center">
              {sponsors.platinum.map((sponsor, index) => (
                <motion.a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer"
                  custom={index}
                  variants={sponsorVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  whileHover="hover"
                  className="mx-4 flex h-24 w-64 items-center justify-center rounded-lg p-4 md:h-32"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Gold sponsors */}
          <div className="mb-16">
            <div className="mx-auto flex flex-wrap justify-center">
              {sponsors.gold.map((sponsor, index) => (
                <motion.a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer"
                  custom={index}
                  variants={sponsorVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  whileHover="hover"
                  className="m-4 flex h-20 w-48 items-center justify-center rounded-lg p-4 md:h-24 md:w-56"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Silver sponsors */}
          <div className="mb-16">
            <div className="mx-auto flex flex-wrap justify-center">
              {sponsors.silver.map((sponsor, index) => (
                <motion.a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer"
                  custom={index}
                  variants={sponsorVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  whileHover="hover"
                  className="m-3 flex h-16 w-40 items-center justify-center rounded-lg p-3 md:h-20 md:w-48"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bronze sponsors */}
          <div className="mb-16">
            <div className="mx-auto flex flex-wrap justify-center">
              {sponsors.bronze.map((sponsor, index) => (
                <motion.a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer"
                  custom={index}
                  variants={sponsorVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  whileHover="hover"
                  className="m-2 flex h-12 w-32 items-center justify-center rounded-lg p-2 md:h-16 md:w-40"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Partners */}
          <div>
            <div className="mx-auto flex flex-wrap justify-center">
              {sponsors.partners.map((sponsor, index) => (
                <motion.a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noreferrer"
                  custom={index}
                  variants={sponsorVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  whileHover="hover"
                  className="m-2 flex h-10 w-28 items-center justify-center rounded-lg p-2 md:h-12 md:w-36"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;
