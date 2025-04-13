import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, FileText, Rocket, Mail, CreditCard, Award } from "lucide-react";

export default function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 }); // Adjusted amount slightly from 0.2

  const timelineEvents = [
    {
      id: 1,
      date: "April 7-28, 2025",
      title: "Abstract Submission & Pitch Deck",
      description:
        "Submit your innovative ideas and finalize your pitch deck for SindhanAI'25. Our team will review all submissions for the next phase.",
      icon: <FileText className="h-6 w-6 text-white" />,
      color: "from-[#9d4edd] to-[#e76f51]",
    },
    {
      id: 2,
      date: "April 28, 2025",
      title: "Selection Notification",
      description:
        "Selected teams will receive an official email confirmation on or before 28th april. Only shortlisted teams will proceed to the final 24H Hackathon round.",
      icon: <Mail className="h-6 w-6 text-white" />,
      color: "from-[#e76f51] to-[#9d4edd]",
    },
    {
      id: 3,
      date: "April 24-May 1, 2025",
      title: "Payment and comfirmation",
      description:
        "Selected teams must complete registration and pay ₹500 per participant to confirm their spot in the hackathon.",
      icon: <CreditCard className="h-6 w-6 text-white" />,
      color: "from-[#9d4edd] to-[#e76f51]",
    },
    {
      id: 4,
      date: "May 2-3, 2025",
      title: "SindhanAI'25 Hackathon",
      description:
        "24-hour coding challenge across 3 tracks: AI, App Development, and IoT. Compete for prizes worth ₹60K and network with industry experts.",
      icon: <Rocket className="h-6 w-6 text-white" />,
      color: "from-[#e76f51] to-[#9d4edd]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineEvents.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [timelineEvents.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    // Added id="timeline" here from timeline-section.tsx
    <div id="timeline" className="w-full py-16 px-4 md:px-6 bg-[#050a18] bg-opacity-95 relative overflow-hidden" ref={containerRef}>
      {/* Background stars effect - CSS for .stars and .twinkling needed */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#9d4edd] to-[#e76f51]">
              Event Timeline
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Mark your calendars for SindhanAI'25. Join us on this exciting journey of innovation and creativity.
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#9d4edd] via-[#e76f51] to-[#9d4edd]"></div>

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <div className="bg-[#0a0f25] p-6 rounded-xl border border-[#1a1f35] hover:border-[#9d4edd] transition-all duration-300 shadow-lg hover:shadow-[#9d4edd]/20">
                    <div
                      className={`flex items-center mb-2 ${index % 2 === 0 ? "justify-end" : "justify-start"} gap-2`}
                    >
                      <Calendar className="h-5 w-5 text-[#e76f51]" />
                      <span className="text-[#e76f51] font-medium">{event.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <p className="text-gray-300">{event.description}</p>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center z-10 shadow-lg shadow-[#9d4edd]/30`}
                  >
                    {event.icon}
                  </div>
                </div>

                <div className={`w-1/2 ${index % 2 === 0 ? "pl-12" : "pr-12"}`}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-1 bg-gradient-to-b from-[#9d4edd] via-[#e76f51] to-[#9d4edd]"></div>

            <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
              {timelineEvents.map((event, index) => (
                <motion.div key={event.id} variants={itemVariants} className="flex mb-10">
                  <div className="relative">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-r ${event.color} flex items-center justify-center z-10 mt-1 shadow-lg shadow-[#9d4edd]/30`}
                    >
                      {event.icon}
                    </div>
                  </div>

                  <div className="ml-6">
                    <div className="bg-[#0a0f25] p-4 rounded-xl border border-[#1a1f35] hover:border-[#9d4edd] transition-all duration-300 shadow-lg">
                      <div className="flex items-center mb-2 gap-2">
                        <Calendar className="h-4 w-4 text-[#e76f51]" />
                        <span className="text-[#e76f51] text-sm font-medium">{event.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                      <p className="text-gray-300 text-sm">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Interactive Timeline Navigation */}
        <div className="mt-12 flex justify-center gap-3">
          {timelineEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-gradient-to-r from-[#9d4edd] to-[#e76f51] scale-125" : "bg-[#1a1f35]"
              }`}
              aria-label={`View timeline event ${index + 1}`}
            />
          ))}
        </div>

        {/* Registration Process Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e76f51] to-[#9d4edd]">
              Registration Process
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0a0f25] p-6 rounded-xl border border-[#1a1f35] hover:border-[#9d4edd] transition-all duration-300 shadow-lg hover:shadow-[#9d4edd]/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#e76f51] flex items-center justify-center mb-4 shadow-lg shadow-[#9d4edd]/30">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Submit & Get Selected</h4>
              <p className="text-gray-300">
                Submit your abstract and pitch deck by April 28th. Our panel will review and select the most promising
                teams.
              </p>
            </div>

            <div className="bg-[#0a0f25] p-6 rounded-xl border border-[#1a1f35] hover:border-[#9d4edd] transition-all duration-300 shadow-lg hover:shadow-[#9d4edd]/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#e76f51] to-[#9d4edd] flex items-center justify-center mb-4 shadow-lg shadow-[#9d4edd]/30">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Pay & Register</h4>
              <p className="text-gray-300">
                Selected teams will pay ₹500 per participant to confirm their spot. Registration closes on May 1st.
              </p>
            </div>

            <div className="bg-[#0a0f25] p-6 rounded-xl border border-[#1a1f35] hover:border-[#9d4edd] transition-all duration-300 shadow-lg hover:shadow-[#9d4edd]/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#e76f51] flex items-center justify-center mb-4 shadow-lg shadow-[#9d4edd]/30">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Compete & Win</h4>
              <p className="text-gray-300">
                Join us on May 2-3 for a 24-hour hackathon across 3 tracks. Compete for prizes worth ₹60K.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfzpC7e3lvMC5CdoyBvI1sVhIYXJJqQmMGLXysB_JKctKqK9w/viewform?embedded=true" // Updated link
            target="_blank" // Added target="_blank" to open in new tab
            rel="noreferrer" // Added rel="noreferrer" for security
            className="inline-block py-3 px-8 rounded-full bg-gradient-to-r from-[#9d4edd] to-[#e76f51] text-white font-medium shadow-lg shadow-[#9d4edd]/30 hover:shadow-[#9d4edd]/50 transition-all duration-300 hover:scale-105"
          >
            Register for SindhanAI'25
          </a>
        </motion.div>
      </div>
    </div>
  );
}
