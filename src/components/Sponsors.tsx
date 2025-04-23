import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Sponsors = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15, // Slightly lower threshold for earlier trigger
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
    eventPartner: [
      {
        name: 'Rider',
        logo: 'https://github.com/harvind-here/asset_repo/blob/main/public/images/rider-logo.png?raw=true',
        url: 'https://www.werider.app/',
      }
    ],
    marketingPartner: [
      {
        name: 'NEXUSHIVE',
        logo: 'https://github.com/harvind-here/asset_repo/blob/main/public/images/NEXUSHIVE-LOGO.png?raw=true',
        url: '', // Assuming no URL for now, can be added if available
      }
    ],
    mentalhealthPartner: [
      {
        name: 'Neurowell',
        logo: 'https://github.com/harvind-here/asset_repo/blob/main/public/images/neurowell_logo.png?raw=true',
        url: '', // Assuming no URL for now, can be added if available
      }
    ],
    /* silver: [], */
    /* bronze: [], */
    /* partners: [] */
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

  // Define styles consistent with Platinum for all sponsors/partners for visual consistency
  const sponsorLogoContainerClasses = "mx-4 my-4 flex h-32 w-72 items-center justify-center rounded-lg p-4 md:h-36 md:w-80"; // Adjusted width slightly

  // Calculate base index offsets for animation staggering
  const platinumCount = sponsors.platinum?.length || 0;
  const eventPartnerCount = sponsors.eventPartner?.length || 0;
  const marketingPartnerCount = sponsors.marketingPartner?.length || 0;
  // No need for mental health count separately for index calculation if rendered together with marketing

  return (
    <section id="Sponsors" className="relative bg-[#1b2131] py-24">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref} // Attach ref for intersection observer
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'} // Animate when in view
          className="mx-auto max-w-6xl" // Limit content width
        >
          {/* --- Main Sponsors Section Title --- */}
          <h2 className="section-title mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
            SPONSORS
          </h2>

          {/* Platinum sponsors */}
          {sponsors.platinum && sponsors.platinum.length > 0 && (
            <div className="mb-12"> {/* Reduced bottom margin */}
              {/* Center platinum sponsors */}
              <div className="mx-auto flex flex-wrap justify-center">
                {sponsors.platinum.map((sponsor, index) => (
                  <motion.a
                    key={sponsor.name}
                    href={sponsor.url || '#'} // Use '#' if URL is empty
                    target={sponsor.url ? "_blank" : "_self"} // Open in new tab only if URL exists
                    rel="noreferrer"
                    custom={index} // Pass index for staggered animation (starts at 0)
                    variants={sponsorVariants}
                    initial="hidden"
                    animate={inView ? 'visible' : 'hidden'}
                    whileHover="hover"
                    className={sponsorLogoContainerClasses} // Apply consistent styles
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

          {/* --- Event Partner Section --- */}
          {sponsors.eventPartner && sponsors.eventPartner.length > 0 && (
            <>
              <h3 className="section-title mb-8 text-center text-2xl font-bold uppercase tracking-wide md:text-3xl continuous-rainbow"> {/* Smaller heading */}
                EVENT PARTNER
              </h3>
              <div className="mb-12"> {/* Reduced bottom margin */}
                 {/* Center event partner(s) */}
                <div className="mx-auto flex flex-wrap justify-center">
                  {sponsors.eventPartner.map((sponsor, index) => (
                    <motion.a
                      key={sponsor.name}
                      href={sponsor.url || '#'}
                      target={sponsor.url ? "_blank" : "_self"}
                      rel="noreferrer"
                      custom={platinumCount + index} // Animation index continues from platinum
                      variants={sponsorVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      whileHover="hover"
                      className={sponsorLogoContainerClasses} // Apply consistent styles
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
            </>
          )}

          {/* --- Combined Marketing & Mental Health Partners Section --- */}
          {(sponsors.marketingPartner?.length > 0 || sponsors.mentalhealthPartner?.length > 0) && (
             <div className="mb-12"> {/* Add margin below this combined section */}
               {/* Titles Section - Render titles above the logos */}
                <div className="mb-8 flex flex-col items-center md:flex-row md:justify-center md:gap-x-16"> {/* Center titles */}
                    {sponsors.marketingPartner?.length > 0 && (
                         <h3 className="section-title text-center text-xl font-bold uppercase tracking-wide md:text-2xl continuous-rainbow mb-4 md:mb-0"> {/* Reduced size title */}
                            MARKETING PARTNER
                         </h3>
                    )}
                    {sponsors.mentalhealthPartner?.length > 0 && (
                         <h3 className="section-title text-center text-xl font-bold uppercase tracking-wide md:text-2xl continuous-rainbow"> {/* Reduced size title */}
                            MENTAL-HEALTH PARTNER
                         </h3>
                    )}
                </div>

                 {/* Logos Section - Render logos side-by-side in one centered flex container */}
                <div className="mx-auto flex flex-wrap justify-center">
                  {/* Marketing Partners */}
                  {sponsors.marketingPartner?.map((sponsor, index) => (
                    <motion.a
                      key={sponsor.name}
                      href={sponsor.url || '#'}
                      target={sponsor.url ? "_blank" : "_self"}
                      rel="noreferrer"
                      // Animation index continues from platinum and event partners
                      custom={platinumCount + eventPartnerCount + index}
                      variants={sponsorVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      whileHover="hover"
                      className={sponsorLogoContainerClasses} // Apply consistent styles
                    >
                      <img
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        className="max-h-full max-w-full object-contain"
                      />
                    </motion.a>
                  ))}
                  {/* Mental Health Partners */}
                  {sponsors.mentalhealthPartner?.map((sponsor, index) => (
                    <motion.a
                      key={sponsor.name}
                      href={sponsor.url || '#'}
                      target={sponsor.url ? "_blank" : "_self"}
                      rel="noreferrer"
                      // Animation index continues from previous partners
                      custom={platinumCount + eventPartnerCount + marketingPartnerCount + index}
                      variants={sponsorVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                      whileHover="hover"
                      className={sponsorLogoContainerClasses} // Apply consistent styles
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
          )}

          {/* --- Commented out sections for potential future use --- */}
          {/* (Keep commented sections as they were) */}

        </motion.div>
      </div>
    </section>
  );
};

export default Sponsors;