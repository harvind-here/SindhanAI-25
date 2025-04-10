import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaGlobe, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6"; // Using FaXTwitter for the X icon

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
            <span className="mr-2"></span>
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
            </motion.span>
            <span className="ml-2">
              {' '}
              <a
                href="_about"
                target="_blank"
                rel="noreferrer"
                className="text-purple-400 hover:text-purple-300"
              >
              </a>
            </span>
          </div>

          {/* Contact Information */}
          {/* Added background, blur, padding, and rounded corners */}
          <div id="contact-info" className="mb-6 mt-8 grid grid-cols-1 gap-8 rounded-lg bg-black/30 p-6 text-sm backdrop-blur-sm md:grid-cols-[auto_auto_1fr]">
            {/* Left Column: Image on left, Details on right */}
            {/* Use items-start for vertical alignment on md+ screens */}
            <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-10"> {/* Kept items-start, increased space */}
              {/* Title Image (Larger) */}
              <img
                src="https://github.com/harvind-here/asset_repo/blob/main/public/images/title_.png?raw=true"
                alt="SindhanAI Title"
                className="mb-4 h-36 w-auto flex-shrink-0 md:mb-0 md:h-44" // Made image larger, added flex-shrink-0
              />

              {/* Details Section (Socials, Address, Website) */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                {/* Social Media (Moved to top) */}
                <div className="mb-4"> {/* Added margin-bottom */}
                  <h4 className="mb-2 font-semibold">Follow Us</h4>
                  <div className="flex justify-center space-x-4 md:justify-start">
                    <a href="https://x.com/SindhanAI_25" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="text-white hover:text-purple-300">
                      <FaXTwitter size={24} />
                    </a>
                    <a href="https://www.instagram.com/sindhanai_25/" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-white hover:text-purple-300">
                      <FaInstagram size={24} />
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-4 flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-purple-400" />
                <div>
                  <h4 className="mb-1 font-semibold">Address</h4>
                  <p>NH 45, Mannachanallur, Taluk,</p>
                  <p>Irungalur, Tamil Nadu 621105</p>
                </div>
              </div>

              {/* Website */}
              <div className="mb-4 flex items-center">
                <FaGlobe className="mr-3 h-4 w-4 flex-shrink-0 text-purple-400" />
                <div>
                  <h4 className="mb-1 font-semibold">Website</h4>
                  <p><a href="https://trp.srmtrichy.edu.in/" target="_blank" rel="noreferrer" className="hover:text-purple-300">https://trp.srmtrichy.edu.in/</a></p>
                </div>
              </div>
              </div> {/* End Details Section */}
            </div>

            {/* Vertical Separator */}
            <div className="hidden w-px bg-gray-600 md:block"></div>

             {/* Right Column: Help Desk & Domains */}
             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-semibold">Help Desk</h4>
                <p>Coordinator 1: <a href="tel:8608436242" className="hover:text-purple-300">86084 36242</a></p>
                <p>Coordinator 2: <a href="tel:6385335417" className="hover:text-purple-300">63853 35417</a></p>
                <p>Official Mail ID: <a href="mailto:info@sindhanai.in" className="hover:text-purple-300">info@sindhanai.in</a></p>
              </div>
              <div>
                <h4 className="mb-2 font-semibold">Domain Contacts</h4>
                <p>AI Domain: <a href="tel:8778814940" className="hover:text-purple-300">87788 14940</a></p>
                <p>IoT: <a href="tel:6381479202" className="hover:text-purple-300">63814 79202</a></p>
                <p>App Development: <a href="tel:9488774819" className="hover:text-purple-300">94887 74819</a></p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Done by Harvind and Esshwar.
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
