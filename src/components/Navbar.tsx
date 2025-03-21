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

  const navLinks = [
    { name: 'About', href: '#About' },
    { name: 'Speakers', href: '#Speakers' },
    { name: 'Tracks', href: '#Tracks' },
    { name: 'Problem Statement', href: '#ProblemStatement' },  
    { name: 'FAQ', href: '#FAQ' },
    { name: 'Sponsors', href: '#Sponsors' },
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
              src="src\TRP-logo-copy.png"
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
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfzpC7e3lvMC5CdoyBvI1sVhIYXJJqQmMGLXysB_JKctKqK9w/viewform?embedded=true"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white transition-all hover:opacity-90"
            >
              Apply
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
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfzpC7e3lvMC5CdoyBvI1sVhIYXJJqQmMGLXysB_JKctKqK9w/viewform?embedded=true"
            className="mt-4 block rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 text-center text-base font-medium text-white hover:opacity-90"
            onClick={() => setMenuOpen(false)}
          >
            Apply
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
