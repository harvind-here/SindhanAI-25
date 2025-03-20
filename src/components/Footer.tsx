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
            <span className="mr-2">Made with</span>
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
                href="https://archive.hackmit.org/"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
                HackMIT Team
              </a>
            </span>
          </div>
          <p className="text-sm text-gray-400">
            Copyright © {currentYear} HackMIT | Code Released under MIT license
          </p>

          {/* Hidden credit for clone - comment this out in real production */}
          <p className="mt-4 text-xs text-gray-600">
            This is a clone created for educational purposes only. All rights belong to the original creators.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
