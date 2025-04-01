import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProblemItemProps {
  title: string;
  description: string;
}

// Add CSS keyframes for the rainbow animation
const rainbowAnimation = `
@keyframes rainbowText {
  0% { color: #ff0000; }
  16.6% { color: #ff69b4; }
  33.3% { color: #7b68ee; }
  50% { color: #00bfff; }
  66.6% { color: #00ff7f; }
  83.3% { color: #ffff00; }
  100% { color: #ff0000; }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 15px rgba(255, 255, 255, 0.1); }
  50% { text-shadow: 0 0 25px rgba(255, 255, 255, 0.2); }
}

@keyframes letterSpacing {
  0%, 100% { letter-spacing: 0.1em; }
  50% { letter-spacing: 0.15em; }
}

@keyframes subtle-scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.animate-rainbow {
  animation: rainbowText 3s linear;
}

.continuous-rainbow {
  animation: 
    rainbowText 8s linear infinite,
    glow 3s ease-in-out infinite,
    letterSpacing 8s ease-in-out infinite,
    subtle-scale 8s ease-in-out infinite;
}

.continuous-rainbow-2 {
  animation: rainbowText 8s linear infinite;
}

@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

.typing-container {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
}

.typing-text {
  display: inline-block;
  overflow: hidden;
  animation: typing 1s steps(20, end);
  white-space: nowrap;
}
`;

const ProblemItem = ({ title, description }: ProblemItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowHint(true);
      setTimeout(() => {
        setShowHint(false);
      }, 3000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-b border-gray-700 py-3">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium md:text-lg">{title}</h3>
          <AnimatePresence>
            {showHint && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-sm text-gray-500 typing-container"
              >
                <span className="typing-text">click for more info...</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <span>
          <img
            src="https://ext.same-assets.com/3736531968/1762190197.svg+xml"
            alt="Toggle"
            className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="pt-2 text-sm text-gray-300 md:text-base">{description}</div>
      </motion.div>
    </div>
  );
};

const ProblemStatement = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  // Add effect to handle URL hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveTrack(hash);
        // Reset animation after 3 seconds
        setTimeout(() => setActiveTrack(null), 5000);
      }
    };

    // Check hash on mount and add listener
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Add the keyframes to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = rainbowAnimation;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  const problemStatements = {
    ai: [
      {
        title: "The PC Agent",
        description: "Description"
      },
      {
        title: "Tax auditor Agent",
        description: "Description"
      },
      {
        title: "LLM based vocal support for the Disabled",
        description: "Description"
      },
      {
        title: "Real time AI Video Commentry",
        description: "Description"
      },
      {
        title: "AI Meeting Summarizer",
        description: "Description"
      },
      {
        title: "Fake News Detection Plugin",
        description: "Description"
      },
      {
        title: "Intelligent Email Management",
        description: "Prioritize, Summarize, Draft Replies"
      },
      {
        title: "AI Database Manager",
        description: "Description"
      },
      {
        title: "Customer Review Analyzer",
        description: "Detailed analysis and report takeaways"
      },
      {
        title: "Spam Message Detector",
        description: "Overcome the limitations of conventional spam filtering"
      }
    ],
    iot: [
      {
        title: "Smart Agriculture System",
        description: "Develop an IoT-based agricultural monitoring system that tracks soil health, moisture levels, and crop growth. The system should provide real-time alerts and recommendations to farmers."
      },
      {
        title: "Urban Traffic Management",
        description: "Create an intelligent traffic management system using IoT sensors to optimize traffic flow and reduce congestion in urban areas. Include features for emergency vehicle prioritization."
      }
    ],
    dataAnalysis: [
      {
        title: "Consumer Behavior Analytics",
        description: "Build a data analytics platform that analyzes consumer behavior patterns across multiple channels. The solution should provide actionable insights for businesses to improve their marketing strategies."
      },
      {
        title: "Environmental Impact Analysis",
        description: "Develop a data analysis tool that measures and visualizes environmental impact metrics. Include features for tracking carbon footprint and suggesting sustainability improvements."
      }
    ]
  };

  return (
    <section id="ProblemStatement" className="relative bg-[#1b2131] py-24">
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-4xl"
        >
          <h2 className="section-title mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
            PROBLEM STATEMENTS
          </h2>

          <div className="mb-12" id="ai-track">
            <h3 className={`mb-4 text-xl font-semibold ${activeTrack === 'ai-track' ? 'animate-rainbow' : ''}`}>
              Artificial Intelligence
            </h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {problemStatements.ai.map((item, index) => (
                <ProblemItem key={`ai-${index}`} title={item.title} description={item.description} />
              ))}
            </div>
          </div>

          <div className="mb-12" id="iot-track">
            <h3 className={`mb-4 text-xl font-semibold ${activeTrack === 'iot-track' ? 'animate-rainbow' : ''}`}>
              Internet of Things
            </h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {problemStatements.iot.map((item, index) => (
                <ProblemItem key={`iot-${index}`} title={item.title} description={item.description} />
              ))}
            </div>
          </div>

          <div className="mb-12" id="data-track">
            <h3 className={`mb-4 text-xl font-semibold ${activeTrack === 'data-track' ? 'animate-rainbow' : ''}`}>
              Data Analysis
            </h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {problemStatements.dataAnalysis.map((item, index) => (
                <ProblemItem
                  key={`data-${index}`}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
          
          <div className="mb-12" id="open-track">
            <h3 className={`mb-4 text-xl font-semibold ${activeTrack === 'open-track' ? 'animate-rainbow' : ''}`}>
              Open Innovation
            </h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              <ProblemItem 
                title="Open Innovation Track" 
                description="Create innovative solutions that address real-world challenges. This track is open to any technology or approach. Projects will be judged on creativity, impact, and technical implementation." 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;