import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Sponsors = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.25, // Trigger animation when 25% of the section is visible
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

  // Sponsors data organized by type/tier
  const sponsors = {
    platinum: [
      {
        name: 'BlackThunder',
        logo: 'https://github.com/harvind-here/asset_repo/blob/main/public/images/blackth-logo.png?raw=true',
        url: 'https://www.blackthunder.in/',
      },
      {
        name: 'GoActiveBadminton',
        logo: 'https://github.com/harvind-here/asset_repo/blob/main/public/images/GAB.jpg?raw=true',
        url: 'https://www.instagram.com/go_active_badminton_gab/',
      }
    ],
    marketingPartner: [ // Renamed 'gold' to 'marketingPartner' for clarity
      {
        name: 'NEXUSHIVE',
        logo: 'https://github.com/harvind-here/asset_repo/blob/main/public/images/NEXUSHIVE-LOGO.png?raw=true',
        url: '', // Assuming no URL for now, can be added if available
      }
    ],
    /* silver: [
      {
        name: '',
        logo: '',
        url: '',
      }
    ], */
    /* bronze: [
      {
        name: '',
        logo: '',
        url: '',
      }
    ], */
    /* partners: [
      {
        name: '',
        logo: '',
        url: '',
      }
    ] */
  };

  const sponsorVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1, // Stagger animation slightly for each logo
        duration: 0.5,
      },
    }),
    hover: {
      scale: 1.05, // Slight scale up on hover
      transition: {
        duration: 0.2,
      },
    },
  };

  // Define styles consistent with Platinum for Marketing Partner
  const platinumStyleClasses = "mx-4 flex h-32 w-80 items-center justify-center rounded-lg p-4 md:h-40";

  return (
    <section id="Sponsors" className="relative bg-[#1b2131] py-24">
      {/* Background elements can be added here if needed */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref} // Attach ref for intersection observer
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'} // Animate when in view
          className="mx-auto max-w-6xl" // Limit content width
        >
          {/* --- Main Sponsors Section --- */}
          <h2 className="section-title mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
            SPONSORS
          </h2>

          {/* Platinum sponsors */}
          {sponsors.platinum && sponsors.platinum.length > 0 && (
            <div className="mb-16">
              {/* Center platinum sponsors */}
              <div className="mx-auto flex flex-wrap justify-center">
                {sponsors.platinum.map((sponsor, index) => (
                  <motion.a
                    key={sponsor.name}
                    href={sponsor.url || '#'} // Use '#' if URL is empty
                    target={sponsor.url ? "_blank" : "_self"} // Open in new tab only if URL exists
                    rel="noreferrer"
                    custom={index} // Pass index for staggered animation
                    variants={sponsorVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    className={platinumStyleClasses} // Apply consistent platinum styles
                  >
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="max-h-full max-w-full object-contain" // Ensure logo fits within bounds
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          )}

          {/* --- Marketing Partner Section --- */}
          {sponsors.marketingPartner && sponsors.marketingPartner.length > 0 && (
            <>
              <h2 className="section-title mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
                MARKETING PARTNER
              </h2>
              <div className="mb-16">
                 {/* Center marketing partner(s) */}
                <div className="mx-auto flex flex-wrap justify-center">
                  {sponsors.marketingPartner.map((sponsor, index) => (
                    <motion.a
                      key={sponsor.name}
                      href={sponsor.url || '#'} // Use '#' if URL is empty
                      target={sponsor.url ? "_blank" : "_self"} // Open in new tab only if URL exists
                      rel="noreferrer"
                      // Use a different base index if needed for animation staggering relative to platinum
                      custom={sponsors.platinum.length + index}
                      variants={sponsorVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      whileHover="hover"
                      className={platinumStyleClasses} // Apply consistent platinum styles
                    >
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        className="max-h-full max-w-full object-contain" // Ensure logo fits within bounds
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* --- Commented out sections for potential future use --- */}

          {/* Silver sponsors */}
          {/* {sponsors.silver && sponsors.silver.length > 0 && (
            <div className="mb-16">
              <h3 className="text-center text-2xl font-semibold mb-8 text-gray-300 uppercase">Silver</h3>
              <div className="mx-auto flex flex-wrap justify-center">
                {sponsors.silver.map((sponsor, index) => (
                  <motion.a
                    key={sponsor.name}
                    href={sponsor.url || '#'}
                    target={sponsor.url ? "_blank" : "_self"}
                    rel="noreferrer"
                    custom={index} // Adjust custom index based on preceding tiers
                    variants={sponsorVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    className="m-3 flex h-20 w-52 items-center justify-center rounded-lg p-3 md:h-24 md:w-60 bg-gray-700 bg-opacity-50" // Example different styling
                  >
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          )} */}

          {/* Bronze sponsors */}
          {/* {sponsors.bronze && sponsors.bronze.length > 0 && (
            <div className="mb-16">
              <h3 className="text-center text-2xl font-semibold mb-8 text-gray-300 uppercase">Bronze</h3>
              <div className="mx-auto flex flex-wrap justify-center">
                {sponsors.bronze.map((sponsor, index) => (
                  <motion.a
                    key={sponsor.name}
                    href={sponsor.url || '#'}
                    target={sponsor.url ? "_blank" : "_self"}
                    rel="noreferrer"
                    custom={index} // Adjust custom index
                    variants={sponsorVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    className="m-2 flex h-16 w-40 items-center justify-center rounded-lg p-2 md:h-20 md:w-48 bg-gray-600 bg-opacity-50" // Example different styling
                  >
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          )} */}

          {/* Other Partners */}
          {/* {sponsors.partners && sponsors.partners.length > 0 && (
            <div>
              <h3 className="text-center text-2xl font-semibold mb-8 text-gray-300 uppercase">Partners</h3>
              <div className="mx-auto flex flex-wrap justify-center">
                {sponsors.partners.map((sponsor, index) => (
                  <motion.a
                    key={sponsor.name}
                    href={sponsor.url || '#'}
                    target={sponsor.url ? "_blank" : "_self"}
                    rel="noreferrer"
                    custom={index} // Adjust custom index
                    variants={sponsorVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    className="m-2 flex h-12 w-36 items-center justify-center rounded-lg p-2 md:h-16 md:w-44 bg-gray-500 bg-opacity-50" // Example different styling
                  >
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          )} */}

        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;