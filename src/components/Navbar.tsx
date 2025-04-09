import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    const isMobile = window.innerWidth < 768; // Check if on mobile

    if (targetElement) {
      // Close menu before scrolling on mobile
      if (isMobile) {
        setMenuOpen(false);
      }

      // Calculate offset based on device type
      const navbarHeight = isMobile ? 80 : 100; // Adjust these values based on your navbar height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight; // Reverted: Only subtract navbar height

      // Use setTimeout to ensure menu close animation completes before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, isMobile ? 300 : 0); // Add small delay on mobile for menu animation
    }
  };

  const navLinks = [
    { name: 'Problem Statements', href: '#ProblemStatement' },
    { name: 'Downloadables', href: '#downloadables-section' }, // Updated href for Downloadables
    { name: 'About', href: '#About' },
    { name: 'Tracks', href: '#Tracks' },
    { name: 'ChiefGuest', href: '#Speakers' },  
    { name: 'FAQ', href: '#FAQ' },
    { name: 'Sponsors', href: '#Sponsors' },
    { name: 'Contact', href: '#contact-info' }, // Added Contact link
  ];

  return (
    <motion.nav
    className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? 'bg-gradient-to-b from-[#87CEEB]/70 to-[#ADD8E6]/30 backdrop-blur-sm' 
        : 'bg-gradient-to-b from-[#87CEEB]/70 to-[#ADD8E6]/30'
    }`}
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
  >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://trp.srmtrichy.edu.in/wp-content/uploads/2021/12/TRP-logo-copy.png"
              alt="TRP Logo"
              className="h-20 w-auto" // Adjust height as needed
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white hover:text-purple-300"
                onClick={(e) => handleNavClick(e, link.href)} // Added onClick handler for desktop
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfzpC7e3lvMC5CdoyBvI1sVhIYXJJqQmMGLXysB_JKctKqK9w/viewform?embedded=true"
              target="_blank"
              rel="noreferrer"
              className="register-button group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-white before:absolute before:left-[-100%] before:top-0 before:h-full before:w-[120%] before:animate-shine before:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.5)_30%,transparent_50%)] before:content-[''] after:absolute after:left-[-100%] after:top-0 after:h-full after:w-[120%] after:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.8)_30%,transparent_50%)] after:opacity-0 after:content-[''] hover:after:animate-hover-shine transition-all duration-300 ease-in-out"
            >
              <span className="relative z-10">Register</span>
              <span className="group-hover:border-rainbow absolute inset-0 rounded-full overflow-hidden">
                {/* Top border */}
                <span className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 -translate-x-full group-hover:animate-rainbow-border-top"></span>
                {/* Right border */}
                <span className="absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-green-500 via-blue-500 to-indigo-500 -translate-y-full group-hover:animate-rainbow-border-right"></span>
                {/* Bottom border */}
                <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 translate-x-full group-hover:animate-rainbow-border-bottom"></span>
                {/* Left border */}
                <span className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-500 via-pink-500 to-indigo-500 translate-y-full group-hover:animate-rainbow-border-left"></span>
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white md:hidden"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`h-6 w-6 ${menuOpen ? 'hidden' : 'block'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`h-6 w-6 ${menuOpen ? 'block' : 'hidden'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: menuOpen ? 1 : 0,
          height: menuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-1 bg-[#1b2131]/95 px-2 pb-3 pt-2 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfzpC7e3lvMC5CdoyBvI1sVhIYXJJqQmMGLXysB_JKctKqK9w/viewform?embedded=true"
            className="register-button group relative mt-4 block overflow-hidden rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-center text-white before:absolute before:left-[-100%] before:top-0 before:h-full before:w-[120%] before:animate-shine before:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.5)_30%,transparent_50%)] before:content-[''] after:absolute after:left-[-100%] after:top-0 after:h-full after:w-[120%] after:bg-[linear-gradient(120deg,transparent_10%,rgba(255,255,255,0.8)_30%,transparent_50%)] after:opacity-0 after:content-[''] hover:after:animate-hover-shine transition-all duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative z-10">Register</span>
            <span className="group-hover:border-rainbow absolute inset-0 rounded-md overflow-hidden">
              {/* Top border */}
              <span className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 -translate-x-full group-hover:animate-rainbow-border-top"></span>
              {/* Right border */}
              <span className="absolute top-0 right-0 w-[3px] h-full bg-gradient-to-b from-green-500 via-blue-500 to-indigo-500 -translate-y-full group-hover:animate-rainbow-border-right"></span>
              {/* Bottom border */}
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-red-500 translate-x-full group-hover:animate-rainbow-border-bottom"></span>
              {/* Left border */}
              <span className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-red-500 via-pink-500 to-indigo-500 translate-y-full group-hover:animate-rainbow-border-left"></span>
            </span>
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
