import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Sponsors = () => {
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

  // Sponsors data organized by tier
  const sponsors = {
    platinum: [
      {
        name: 'BlackThunder',
        logo: 'src/images/blackth-logo.png',
        url: 'https://www.blackthunder.in/',
      },
    ],
    gold: [
      {
        name: 'Sponsor2',
        logo: 'https://ext.same-assets.com/2721829259/1488946645.svg+xml',
        url: 'https://tunehq.ai/',
      },
      {
        name: 'Sponsor',
        logo: 'https://ext.same-assets.com/2274840344/4093854788.png',
        url: 'https://convex.dev/c/hackmit',
      },
    ],
    silver: [
      {
        name: 'Sponsor4',
        logo: 'https://ext.same-assets.com/2265253474/182316163.png',
        url: '#',
      },
      {
        name: 'Suno',
        logo: 'https://ext.same-assets.com/3041742367/579346042.svg+xml',
        url: 'https://suno.com/',
      },
      {
        name: 'Skylo',
        logo: 'https://ext.same-assets.com/3027889550/4189487049.png',
        url: '#',
      },
      {
        name: 'Clerk',
        logo: 'https://ext.same-assets.com/1362870903/4029874434.png',
        url: 'https://clerk.com/',
      },
    ],
    bronze: [
      {
        name: 'Akamai',
        logo: 'https://ext.same-assets.com/2568234573/1496731667.png',
        url: 'https://www.akamai.com/',
      },
      {
        name: 'CodeBase',
        logo: 'https://ext.same-assets.com/2349861716/326012423.png',
        url: 'https://codebase.avax.network/',
      },
      {
        name: 'Capital One',
        logo: 'https://ext.same-assets.com/1660194111/3394021898.png',
        url: 'https://www.capitalone.com/',
      },
      {
        name: 'Warp',
        logo: 'https://ext.same-assets.com/2614659476/2849579877.png',
        url: 'https://www.warp.dev/',
      },
      {
        name: 'Bun',
        logo: 'https://ext.same-assets.com/4148367859/2728220386.png',
        url: 'https://bun.sh/',
      },
    ],
    partners: [
      {
        name: 'Interaction',
        logo: 'https://ext.same-assets.com/1640127868/684166993.png',
        url: 'https://interaction.co/',
      },
      {
        name: 'OCA Ventures',
        logo: 'https://ext.same-assets.com/1881415750/903567313.png',
        url: 'https://www.ocaventures.com/',
      },
      {
        name: 'Taisu',
        logo: 'https://ext.same-assets.com/4059165431/2629771116.png',
        url: 'https://www.taisu.io/',
      },
      {
        name: 'Codedex',
        logo: 'https://ext.same-assets.com/4028541743/1420613026.png',
        url: 'https://www.codedex.io/',
      },
      {
        name: 'Mantle',
        logo: 'https://ext.same-assets.com/2818083617/3052906333.png',
        url: 'https://mantlebio.com/',
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
          <h2 className="mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
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
                  className="mx-4 flex h-24 w-64 items-center justify-center rounded-lg bg-white/5 p-4 backdrop-blur-sm md:h-32"
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
                  className="m-4 flex h-20 w-48 items-center justify-center rounded-lg bg-white/5 p-4 backdrop-blur-sm md:h-24 md:w-56"
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
                  className="m-3 flex h-16 w-40 items-center justify-center rounded-lg bg-white/5 p-3 backdrop-blur-sm md:h-20 md:w-48"
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
                  className="m-2 flex h-12 w-32 items-center justify-center rounded-lg bg-white/5 p-2 backdrop-blur-sm md:h-16 md:w-40"
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
                  className="m-2 flex h-10 w-28 items-center justify-center rounded-lg bg-white/5 p-2 backdrop-blur-sm md:h-12 md:w-36"
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
