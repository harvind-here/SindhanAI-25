import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const Tracks = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
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

  const trackList = [
    {
      name: 'Artificial Intelligence',
      icon: '/images/ai-logo.png',
      id: 'ai-track'
    },
    {
      name: 'Data',
      icon: '/images/data-logo.png',
      id: 'data-track'
    },
    {
      name: 'Internet of Things',
      icon: '/images/iot-logo.png',
      id: 'iot-track'
    },
    {
      name: 'Open Innovation',
      icon: '/images/open-logo.png',
      id: 'open-track'
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

  const handleScrollToTrack = (id: string) => {
    const element = document.getElementById(id);
    const navbarHeight = 180;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: 'smooth'
      });
      // Set the URL hash after scrolling completes
      setTimeout(() => {
        window.location.hash = id;
      }, 100);
    }
  };

  return (
    <section id="Tracks" className="relative bg-[#1b2131] py-24">
      {/* Pink star wave background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 w-full overflow-hidden">
        {/* <img
          src="https://ext.same-assets.com/3357170121/31085671.png"
          alt="Star Wave"
          className="h-full w-full object-cover"
        /> */}
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-6xl"
        >
          <h2 className="section-title mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
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
                className="flex flex-col items-center text-center cursor-pointer hover:opacity-100 opacity-80 transition-opacity"
                onClick={() => handleScrollToTrack(track.id)}
              >
                <div className="relative">
                  <img
                    src={track.icon}
                    alt={track.name}
                    className="h-32 w-32 object-contain md:h-40 md:w-40"
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
