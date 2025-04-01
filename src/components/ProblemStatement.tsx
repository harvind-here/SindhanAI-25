import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ProblemItemProps {
  title: string;
  description: string;
}

const ProblemItem = ({ title, description }: ProblemItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-3">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-medium md:text-lg">{title}</h3>
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
    threshold: 0.1,
  });

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
        title: "AI Healthcare Assistant",
        description: "Design an AI-powered healthcare assistant that can analyze medical images, provide preliminary diagnoses, and assist healthcare professionals in decision-making. The solution should focus on improving accuracy and reducing diagnosis time."
      },
      {
        title: "Smart Education Platform",
        description: "Create an AI-driven educational platform that adapts to individual learning styles and provides personalized learning paths. Include features like progress tracking and automated assessment generation."
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
          <h2 className="mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
            PROBLEM STATEMENTS
          </h2>

          <div className="mb-12" id="ai-track">
            <h3 className="mb-4 text-xl font-semibold">Artificial Intelligence</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {problemStatements.ai.map((item, index) => (
                <ProblemItem key={`ai-${index}`} title={item.title} description={item.description} />
              ))}
            </div>
          </div>

          <div className="mb-12" id="iot-track">
            <h3 className="mb-4 text-xl font-semibold">Internet of Things</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {problemStatements.iot.map((item, index) => (
                <ProblemItem key={`iot-${index}`} title={item.title} description={item.description} />
              ))}
            </div>
          </div>

          <div className="mb-12" id="data-track">
            <h3 className="mb-4 text-xl font-semibold">Data Analysis</h3>
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
            <h3 className="mb-4 text-xl font-semibold">Open Innovation</h3>
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