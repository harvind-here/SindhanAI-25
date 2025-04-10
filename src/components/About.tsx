import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
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
          <h2 className="section-title mb-8 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
            ABOUT
          </h2>
          <div className="space-y-4 text-lg leading-relaxed">
            <p>
            SindhanAI is a 24 Hour National-level Hackathon event where participants from around the country work together to design and build innovative technology projects in three major tracks(AI | IoT | App Development) conducted in two rounds. Round-1 (online) and Round-2 (Final 24H). 
            <p>
            We welcome over top 250 talented techies to our campus for the final round of 24H Hackathon. To be one among them, register your team now and submit the Round-1 ideation before 27th April</p>
            </p>
            <p>
            This year, SindhanAI will take place on the weekend of May 2nd and 3rd. Participants will have the opportunity to build, learn, and create technology projects.
            </p>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
