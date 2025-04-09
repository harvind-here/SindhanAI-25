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
    if (!isOpen) {
      // Restart hint cycle when item is closed
      setShowHint(true);
      const cycleTimer = setInterval(() => {
        setShowHint(prev => !prev);
      }, 4000); // 3s show + 1s hide

      return () => clearInterval(cycleTimer);
    } else {
      // Hide hint when item is open
      setShowHint(false);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-700 py-3">
      <button
        className="w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0 relative">
            <motion.h3 
              className={`text-base font-medium md:text-lg ${isOpen ? '' : 'truncate'}`}
              layout // Enable layout animation
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
            <AnimatePresence>
              {showHint && !isOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-sm text-gray-500 whitespace-nowrap overflow-hidden absolute left-full ml-2"
                >
                  click for more info
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="flex-shrink-0">
            <img
              src="https://ext.same-assets.com/3736531968/1762190197.svg+xml"
              alt="Toggle"
              className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </div>
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
  triggerOnce: true,
  threshold: 0.1, // Reduced threshold for earlier trigger
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
        title: "AI01: The PC Agent",
        description: "A personal AI assistant that automates computing tasks such as file organization, scheduling, and system maintenance. It optimizes workflow efficiency by integrating with various applications, streamlining repetitive tasks, and providing intelligent recommendations. The expected outcome is a seamless, AI-driven personal computing experience that enhances productivity and reduces manual effort."
      },
      {
        title: "AI02: Tax auditor Agent",
        description: "An AI-driven system that automates tax filing and auditing by gathering financial data, ensuring compliance, and generating accurate tax returns. It streamlines the entire tax preparation process by validating records, identifying deductions, and flagging inconsistencies. The outcome is a fully automated tax filing experience with reduced errors, improved compliance, and minimal manual intervention."
      },
      {
        title: "AI03: LLM based vocal support for the Disabled",
        description: "A language model-powered voice assistant designed to assist individuals with disabilities in communication and daily tasks. It converts speech to text, provides real-time transcription, and enables intelligent voice interactions. The expected outcome is improved accessibility, allowing users to navigate digital environments, compose messages, and interact with systems more effectively."
      },
      {
        title: "AI04: Real time AI Video Commentry",
        description: "An AI system that generates live commentary on video content in real time, providing insights, context, and analysis. It can be used in sports, entertainment, and educational contexts, delivering relevant information and enhancing the viewer experience. The outcome is an intelligent, context-aware commentary system that adapts dynamically to the content being streamed."
      },
      {
        title: "AI05: AI Meeting Summarizer",
        description: "An AI tool that automatically transcribes and summarizes meetings, highlighting key points, decisions, and action items. It ensures that participants can quickly review discussions without going through lengthy recordings or notes. The expected outcome is improved efficiency in meeting management, better follow-up on action points, and enhanced documentation."
      },
      {
        title: "AI06: Fake News Detection Plugin",
        description: "A browser or social media plugin that uses AI to detect misinformation and verify the credibility of news articles. It analyzes sources, cross-references data, and provides reliability scores to help users distinguish between factual and misleading content. The outcome is a more informed online audience, reduced spread of misinformation, and increased trust in news consumption."
      },
      {
        title: "AI07: Intelligent Email Management",
        description: "Prioritize, Summarize, Draft Replies, An AI-powered system that categorizes, prioritizes, and responds to emails based on urgency and context. It filters spam, extracts key information, and suggests automated responses, reducing inbox clutter. The expected outcome is a more organized, efficient email workflow that minimizes manual effort and improves response time."
      },
      {
        title: "AI08: AI Database Manager",
        description: "An intelligent database management system that automates query optimization, data indexing, and system maintenance. It ensures efficient data retrieval, detects inconsistencies, and provides predictive analytics. The outcome is improved database performance, reduced maintenance overhead, and enhanced data integrity."
      },
      {
        title: "AI09: Customer Review Analyzer",
        description: "Detailed analysis and report takeaways, An AI system that processes and analyzes customer reviews to extract sentiment, trends, and actionable insights. It categorizes feedback, detects common issues, and helps businesses understand customer sentiment. The expected outcome is improved decision-making for businesses, better customer engagement, and enhanced product or service improvements."
      },
      {
        title: "AI10: Spam Message Detector",
        description: "An AI-based tool that identifies and filters out spam messages in emails, social media, and messaging apps. It detects fraudulent patterns, phishing attempts, and unwanted advertisements, reducing security risks. The outcome is a cleaner, safer communication experience with minimized distractions and threats. Overcome the limitations of conventional spam filtering."
      }
    ],
    iot: [
      {
        title: "IOT01: IoT-Enabled Wearable for Blood Glucose Monitoring",
        description: "A continuous, non-invasive glucose monitoring system using optical sensors that transmit real-time readings to a mobile app for tracking and alerts."
      },
      {
        title: "IOT02: Adaptive IoT-Integrated Prosthetics",
        description: "Smart prosthetic limbs equipped with sensors to monitor pressure, movement, and comfort, providing real-time feedback for better usability."
      },
      {
        title: "IOT03: IoT-Based ICU Patient Monitoring System",
        description: "A centralized system for monitoring vitals like heart rate, oxygen levels, and temperature, sending real-time alerts to doctors via an app."
      },
      {
        title: "IOT04: Wearable Fall Detection System for Elderly",
        description: "A wearable device that detects falls and automatically notifies caregivers or emergency services via an app."
      },
      {
        title: "IOT05: IoT System for Medicine Quality Monitoring",
        description: "A system that ensures hospital pharmacy medicine quality by monitoring temperature, humidity, and expiry data in real-time."
      },
      {
        title: "IOT06: Wearable EEG Monitoring for Neurological Disorders",
        description: "A head-mounted device that tracks brain activity and provides early warnings for epilepsy or Parkinson’s disease."
      },
      {
        title: "IOT07: IoT-Based Neonatal Health Monitoring System",
        description: "A low-cost system for rural areas that continuously monitors neonatal vitals and sends data to healthcare centers."
      },
      {
        title: "IOT08: IoT-Integrated Rehabilitation Device",
        description: "A smart rehabilitation system that tracks patient progress using IoT sensors and provides data-driven recovery plans."
      },
      {
        title: "IOT09: Smart Pill Dispenser with IoT Integration",
        description: "An automated pill dispenser that reminds patients to take medication on time and tracks adherence."
      },
      {
        title: "IOT10: IoT-Based Voice-Controlled Agent System",
        description: " A voice-controlled automation system that enables seamless interaction with smart devices in a specified environment."
      },
      {
        title: "IOT11: Indoor Mapping using Wi-Fi and Communication Protocols",
        description: "A system that maps indoor environments using Wi-Fi and communication protocols for navigation and tracking."
      }
      
    ],
    dataAnalytics: [
      {
        title: "DA01: Traffic Management",
        description: "To use data analytics to analyze traffic patterns, identify congestion hotspots, and optimize traffic management strategies to reduce congestion, travel time, and environmental impact."
      },
      {
        title: "DA02: Healthcare analytics",
        description: "To apply data analytics for monitoring patient health records, predicting disease risks, and optimizing hospital resource allocation to enhance patient care and reduce operational costs."
      },
      {
        title: "DA03: Socialmedia Analytics",
        description: "To apply data analytics for analyzing social media trends, tracking brand sentiment, and optimizing engagement strategies to enhance online presence and customer satisfaction"
      },
      {
        title: "DA04: Environment Analytics",
        description: "To use data analytics for monitoring air quality, tracking climate change trends, and optimizing energy consumption to reduce environmental impact and promote sustainability."
      },
      {
        title: "DA05: Cyber security Analytics",
        description: "To use data analytics for detecting security threats, analyzing network vulnerabilities, and optimizing cybersecurity protocols to prevent data breaches and ensure digital safety."
      },
      {
        title: "DA06: Financial analytics",
        description: "To leverage data analytics for detecting fraudulent transactions, analyzing spending patterns, and optimizing investment strategies to enhance financial security and profitability."
      },
      {
        title: "DA07: Disaster Prediction",
        description: "Develop a predictive model using satellite imagery and environmental datasets to identify high-risk areas for landslides and floods."
      },
      {
        title: "DA08: Budget Analysis",
        description: "To develop a model that predicts a man's spending habits across different lifestyle changes and budget optimization which influence government tax revenues."
      },
      {
        title: "DA09: Business analytics",
        description: "To use data analytics for segmenting customers, analyzing purchasing behavior, and optimizing marketing strategies to improve customer engagement and maximize revenue."
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

          <div className="mb-12" id="data-track">
            <h3 className={`mb-4 text-xl font-semibold ${activeTrack === 'data-track' ? 'animate-rainbow' : ''}`}>
              Data Analytics
            </h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {problemStatements.dataAnalytics.map((item, index) => (
                <ProblemItem
                  key={`data-${index}`}
                  title={item.title}
                  description={item.description}
                />
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

          <div className="mb-12" id="open-track">
            <h3 className={`mb-4 text-xl font-semibold ${activeTrack === 'open-track' ? 'animate-rainbow' : ''}`}>
              Open Innovation
            </h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              <ProblemItem 
                title="Open Innovation Track" 
                description="Dont find any problem statements that excites you?!, Dont worry, we are open to innovative solutions that address real-world challenges. Your approach should come under atleast one among the mentioned domains( AI | IoT ). Projects will be judged on creativity, impact, and technical implementation." 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
