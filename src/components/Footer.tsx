import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#1b2131] py-8 text-center text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4 flex items-center justify-center">
            <span className="mr-2">MaDe WiTh</span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            >
              ❤️
            </motion.span>
            <span className="ml-2">
              by the{' '}
              <a
                href="_about"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
              Team SindhanAI'25
              </a>
            </span>
          </div>

          {/* Contact Information */}
          <div className="mb-6 mt-8 grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <h4 className="mb-2 font-semibold">Student Coordinators</h4>
              <p>Coordinator 1: <a href="tel:6383074075" className="hover:text-purple-300">63830 74075</a></p>
              <p>Coordinator 2: <a href="tel:6385335417" className="hover:text-purple-300">63853 35417</a></p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Domain Contacts</h4>
              <p>AI Domain: <a href="tel:8778814940" className="hover:text-purple-300">87788 14940</a></p>
              <p>IoT: <a href="tel:6381479202" className="hover:text-purple-300">63814 79202</a></p>
            </div>
            <div>
              {/* Placeholder for alignment - hidden on mobile */}
              <h4 className="mb-2 hidden font-semibold md:block">&nbsp;</h4>
              <p>App Development: <a href="tel:9488774819" className="hover:text-purple-300">94887 74819</a></p>
              <p>Open Innovation: <a href="tel:8608436242" className="hover:text-purple-300">86084 36242</a></p>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Copyright © {currentYear} SRMTRPEC. All rights reserved.
          </p>

          {/* Hidden credit for clone - comment this out in real production */}
          <p className="mt-4 text-xs text-gray-600">
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
