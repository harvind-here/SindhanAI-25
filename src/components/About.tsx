import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
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

  return (
    <section
      id="About"
      className="relative bg-[#1b2131] py-24"
    >
      {/* Meteor shower background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://ext.same-assets.com/37609048/3317278395.png"
          alt="Meteor Shower"
          className="h-full w-full object-cover opacity-30"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-8 text-3xl font-bold uppercase tracking-wide md:text-4xl">
            ABOUT
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
            SindhanAI is a 24 Hour event where students from around the country work together to design and build innovative technology projects. As one of the largest hackathons in the country, we welcome over 250 talented undergraduate students to our campus.
            </p>
            <p>
            This year, SindhanAI will take place on the weekend of April 19th and 20th. Participants will have the opportunity to build, learn, and create technology projects from scratch.
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
