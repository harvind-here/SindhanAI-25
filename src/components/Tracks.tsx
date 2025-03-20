import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Tracks = () => {
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

  const trackList = [
    {
      name: 'Artificial Intelligence',
      icon: 'https://ext.same-assets.com/1667693671/2787795076.svg+xml',
      stars: 'https://ext.same-assets.com/2920166731/2318510774.svg+xml',
    },
    {
      name: 'Data Science',
      icon: 'https://ext.same-assets.com/4098935608/3829011960.svg+xml',
      stars: 'https://ext.same-assets.com/2461657223/715312986.svg+xml',
    },
    {
      name: 'Internet of Things',
      icon: 'https://ext.same-assets.com/1105254230/3142986560.svg+xml',
      stars: 'https://ext.same-assets.com/3335828367/4272342451.svg+xml',
    },
    {
      name: 'Open Innovation',
      icon: 'https://ext.same-assets.com/1105254230/3142986560.svg+xml',
      stars: 'https://ext.same-assets.com/3335828367/4272342451.svg+xml',
    }
  ];

  const trackVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section id="Tracks" className="relative bg-[#1b2131] py-24">
      {/* Pink star wave background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 w-full overflow-hidden">
        <img
          src="https://ext.same-assets.com/3357170121/31085671.png"
          alt="Star Wave"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl"
        >
          <h2 className="mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
            TRACKS
          </h2>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {trackList.map((track, index) => (
              <motion.div
                key={track.name}
                custom={index}
                variants={trackVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover="hover"
                className="flex flex-col items-center text-center"
              >
                <div className="relative">
                  <img
                    src={track.icon}
                    alt={track.name}
                    className="h-32 w-32 object-contain md:h-40 md:w-40"
                  />
                  <img
                    src={track.stars}
                    alt="Stars"
                    className="absolute left-0 top-0 h-32 w-32 object-contain opacity-50 md:h-40 md:w-40"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium md:text-xl">{track.name}</h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Tracks;
