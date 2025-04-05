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
