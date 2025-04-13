import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
// Import the named export FAQItem
import { FAQItem } from './FAQ'; 

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
        description: "A language model-powered voice assistant designed to assist individuals with disabilities in communication. It converts incomplete speech to complete meaningful sentences, provides real-time transcription and better communication, and enables voice interactions. The expected outcome is improved accessibility, allowing interact with systems and other humans more effectively."
      },
      {
        title: "AI04: Real time AI Video Commentry",
        description: "An AI system that generates live commentary on video content in real time, providing insights, context, and analysis. It can be used in sports, entertainment, and educational contexts, delivering relevant information and enhancing the viewer experience. The outcome is an interesting, context-aware commentary system that adapts dynamically to the content being streamed."
      },
      {
        title: "AI05: AI Meeting Summarizer",
        description: "An AI tool that automatically transcribes and summarizes meetings, highlighting key points, decisions, and action items. It ensures that participants can quickly review discussions without going through lengthy recordings or notes. The expected outcome is improved efficiency in meeting management, better follow-up on action points, and better documentation."
      },
      {
        title: "AI06: Fake News Detection Plugin",
        description: "A browser or social media plugin that uses AI to detect misinformation and verify the credibility of news articles. It analyzes sources, cross-references data, and provides reliability scores to help users distinguish between factual and misleading content. The user outcome is to make them consume reliable online information and reduced spread of misinformation, and increased trust in news consumption."
      },
      {
        title: "AI07: Intelligent Email Management",
        description: "Prioritize, Summarize, Draft Replies, An AI-powered system that categorizes, prioritizes, and responds to emails based on urgency and context. It filters spam, extracts key information, and suggests automated responses, reducing inbox clutter. The expected outcome is a more organized, efficient email workflow that minimizes manual effort and improves response time."
      },
      {
        title: "AI08: AI Database Manager",
        description: "An intelligent database management system that automates query optimization, data indexing, and system maintenance. It should take care of data retrieval, detect inconsistencies, and provide analytics. The outcome is improved database performance, reduced maintenance overhead, and enhanced data integrity."
      },
      {
        title: "AI09: Customer Review Analyzer",
        description: "Detailed analysis and report takeaways, An AI system that processes and analyzes customer reviews to extract sentiment, trends, and actionable insights. It categorizes feedback, detects common issues, and helps businesses understand customer sentiment. The expected outcome is improved decision-making for businesses, better customer engagement, and suggesting product or service improvements."
      },
      {
        title: "AI10: Spam Message Detector",
        description: "An AI-based tool that identifies and filters out spam messages in emails, social media, and messaging apps. It detects fraudulent patterns, phishing attempts, and unwanted advertisements, reducing security risks. The outcome is a cleaner, safer communication experience with minimized distractions and threats. Overcome the limitations of conventional spam filtering."
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
        title: "AD01: Direct Market Access for Farmers",
        description: "A Direct Market Access platform empowers farmers by enabling them to sell their produce directly to consumers or markets, cutting out the middlemen and increasing their profits. Through a user-friendly digital platform, farmers can create profiles, list their products, and connect with potential buyers. This system also includes real-time updates on market trends, so farmers can adjust prices and strategies according to demand and supply dynamics. Additionally, farmers can easily access information about government schemes, subsidies, and agricultural practices through the platform, which supports them in making informed decisions and maximizing their earnings. Features may also include logistics support, payment processing, and even feedback systems for quality assurance."
      },
      {
        title: "AD02: Real-time Tracking of Air and Water Pollution",
        description: "This system provides continuous, real-time monitoring of air and water quality, helping individuals, governments, and organizations stay informed about pollution levels and take timely action. Sensors placed in different locations measure various pollutants such as particulate matter (PM), carbon dioxide (CO2), nitrogen dioxide (NO2), and waterborne contaminants. The data is then transmitted to a centralized platform, where it’s analyzed and presented in an easy-to-understand format. Users receive notifications or alerts when pollution levels exceed safe thresholds, prompting immediate action to mitigate environmental risks, such as advisories for vulnerable groups or local interventions by authorities. It serves as an essential tool for cities, industries, environmental organizations, and communities in their efforts to maintain sustainable living conditions."
      },
      {
        title: "AD03: Connecting Surplus Food Sources to NGOs",
        description: "This platform addresses the growing issue of food waste and hunger by connecting individuals, businesses, and farmers with NGOs that help distribute surplus food to those in need. It acts as a bridge between those who have excess food (restaurants, households, farms, etc.) and organizations that can redistribute it to impoverished communities. The app allows donors to list surplus food items, including details such as quantity, expiration dates, and packaging, and then connects them with local NGOs and food banks that can accept and distribute the items. The platform ensures safe and hygienic handling, tracks donations, and provides transparency on the impact of donations, thus creating a sustainable cycle of reducing food waste while addressing food insecurity."
      },
      {
        title: "AD04: Health Tracking System for Rural People",
        description: "Aimed at improving health outcomes in rural areas, this system allows individuals to easily track their health metrics (e.g., blood pressure, glucose levels, etc.) and maintain a comprehensive digital health history. The platform is designed to be simple and accessible, with a focus on overcoming infrastructure challenges in rural areas. It could include features like SMS-based alerts for health reminders or updates for those without reliable internet access. Users can connect remotely with healthcare professionals via telemedicine, allowing for timely advice, diagnosis, or follow-up care. The system could also integrate with local health centers and hospitals to maintain continuity of care, track vaccination schedules, and ensure rural populations have better access to healthcare resources."
      },
      {
        title: "AD05: Personalized Career Guidance for Students",
        description: "This app provides personalized career advice based on a student’s interests, skills, and academic background. The platform collects data on the student’s strengths, preferred subjects, extracurricular activities, and career aspirations to recommend suitable career paths. It suggests relevant courses, certifications, and workshops that will help students build the skills needed for their desired careers. Additionally, the app helps students find internships, volunteer opportunities, and job openings that align with their profiles. It might also include a mentor matching feature, where students can be paired with industry professionals for guidance, advice, and networking opportunities."
      },
      {
        title: "AD06: Vaccination Tracker and Appointment Scheduler",
        description: "The Vaccination Tracker and Appointment Scheduler is an app that helps individuals manage their vaccination history and ensure they never miss an important vaccination. By tracking dates of administered vaccines, users are sent timely reminders for upcoming doses. The app also allows users to schedule vaccination appointments at nearby healthcare facilities, whether they are routine vaccinations for children, seasonal flu shots, or COVID-19 vaccinations. The app provides location-based data on available vaccine stocks and appointment slots, making the process efficient and helping to ensure the timely completion of vaccination schedules."
      },
      {
        title: "AD07: Weather Data for Farmers",
        description: "This app provides weather forecasts, real-time meteorological data, and climate insights specifically tailored to the needs of farmers. It offers predictions on rainfall, temperature fluctuations, frost warnings, and wind speeds, helping farmers make informed decisions regarding planting, irrigation, pest control, and harvesting. The app may also include a weather-based irrigation scheduling feature to prevent water wastage. Additionally, it can offer advice on crop varieties best suited for the current season and climatic conditions, enabling farmers to maximize yields and minimize risks due to adverse weather conditions. Alerts for extreme weather events (e.g., drought, floods, storms) also help farmers take preemptive measures to protect their crops."
      },
      {
        title: "AD08: Social Volunteer Platform",
        description: "The Social Volunteer Platform is designed to connect people with local social impact projects and volunteer opportunities. It offers a searchable database of causes, from education and healthcare to environmental sustainability and disaster relief, allowing users to find projects that match their skills, interests, and availability. Volunteers can sign up for specific events, track the hours they’ve contributed, and receive certificates of participation that can be useful for resumes or applications. The platform could include features like user ratings of events, project organizers, and opportunities for skill-building, making it an attractive tool for those looking to make a tangible difference in their communities while gaining personal development."
      },
      {
        title: "AD09: Personal Finance and Investment Tracker",
        description: "This app helps users take control of their finances by offering real-time tracking of their spending, income, and savings. It includes budgeting tools that allow users to set monthly or yearly financial goals and provides insights into their spending habits. The app also offers personalized investment advice based on the user’s financial profile and risk tolerance, recommending opportunities such as stocks, bonds, mutual funds, and more. By integrating with users’ bank accounts, credit cards, and investment portfolios, the app provides a complete view of financial health and offers strategies to optimize savings and returns. Alerts and notifications for bills, investment opportunities, or changes in financial status help users stay proactive with their finances."
      },
      {
        title: "AD10: Global Travel Experience App",
        description: "This app is designed to enhance the travel experience by offering personalized travel itineraries based on the user’s preferences, budget, and past travel history. It provides tailored suggestions for destinations, accommodations, activities, and local experiences, taking into account the user’s interests, preferred climate, and travel constraints. It may include user-generated reviews, tips, and recommendations for destinations, restaurants, tours, and experiences, allowing travelers to make informed choices. The app can also integrate with booking services, offering users easy access to book flights, hotels, and tours. Social sharing features allow travelers to document their experiences, share photos and stories, and connect with like-minded travelers across the globe."
      }
    ]
  };

  // Data for the downloadables section
  const downloadablesData = [
    {
      question: "Rulebook",
      answer: <a href="https://docs.google.com/document/d/1GesVoglTzGEhPA3JENAQTmLbWUKyigds/edit?usp=sharing&ouid=110539728346982923634&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Download Rulebook</a>
    },
    {
      question: "Submission Template",
      answer: <a href="https://docs.google.com/presentation/d/1x2rkUV-5AAbOK999FyiKag82aWIemLbZ/edit?usp=sharing&ouid=110539728346982923634&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Download PPT Template</a>
    }
  ];

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
              App Development
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
                title="Open Innovation" 
                description="Dont find any problem statements that excites you?!, Dont worry, we are open to innovative solutions that address real-world challenges. Your approach should come under atleast one among the mentioned domains( AI | IoT ). Projects will be judged on creativity, impact, and technical implementation." 
              />
            </div>
          </div>

          {/* Downloadables Section Added Here */}
          <div className="mb-12" id="downloadables-section">
            <h3 className="mb-4 text-xl font-semibold continuous-rainbow-2">
              Downloadables
            </h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {downloadablesData.map((item, index) => (
                // Reusing FAQItem structure for consistency
                <FAQItem key={`downloadable-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
          
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemStatement;
