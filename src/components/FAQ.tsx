import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700 py-3">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-base font-medium md:text-lg">{question}</h3>
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
        <div className="pt-2 text-sm text-gray-300 md:text-base">{answer}</div>
      </motion.div>
    </div>
  );
};

const FAQ = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
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

  // FAQ data organized by categories
  const faqData = {
    general: [
      {
        question: " What is Sindanai'25?",
        answer: " Sindanai'25 is a national-level innovation challenge aimed at fostering creative solutions in technology, engineering, and social impact domains. It provides a platform for students and professionals to showcase their problem-solving skills."
      },
      {
        question: "Who can participate in Sindanai'25?",
        answer: "The event is open to students, research scholars, and working professionals who are passionate about innovation and problem-solving."
      },
      {
        question: "Is there any registration fee?",
        answer: "Registration is free for the first round. However, if you get selected, you will have to pay a participation fee."
      },
      {
        question: "What are the different tracks or domains covered in the event?",
        answer: "Sindanai'25 focuses on AI, IoT, Data Analytics, App Development, and 3D Modelling (SolidWorks, AutoCAD, KiCad for electronics)."
      },
      {
        question: " Will there be any prizes or rewards?",
        answer: "  Yes! The prize pool for Sindanai'25 is around ₹60,000."
      },
    ],
    tracks: [
      {
        question: "How can I register for Sindanai'25?",
        answer: "Registration details will be provided on the official event website. Participants can sign up individually or as a team."
      },
      {
        question: "Can we participate as a team? If yes, what is the team size limit?",
        answer: "Yes, team participation is allowed. The team size should be between 4 to 6 members."
      },
      {
        question: "What is the mode of the event? Will it be online or offline?",
        answer: "Sindanai'25 is an offline event."
      },
      {
        question: "How will the evaluation process be conducted?",
        answer: " A panel of industry experts and academicians will assess the projects based on innovation, feasibility, and impact."
      },
      {
        question: "Are mentorship and resources provided for participants?",
        answer: " Yes, mentorship will be provided to help participants develop their projects effectively."
      },
    ],
    registration: [
      {
        question: "What is the format for project submissions?",
        answer: "Participants must submit a PowerPoint presentation (PPT) and a Proof of Concept (PoC) if applicable."
      },
      {
        question: "Will participants get access to any development kits or tools?",
        answer: "Yes, participants will get access to development boards for their projects."
      },
      {
        question: "What happens if I face technical difficulties during the event?",
        answer: "A dedicated support team will be available to assist participants with any issues."
      },
      {
        question: " Can we submit projects that have been worked on before?",
        answer: " No, this is a 24-hour hackathon, and all projects must be developed during the event itself."
      }
    ],
    logistics: [
      {
        question: "Can I attend SindhanAI virtually?",
        answer: "Unfortunately, SindhanAI is only offered in-person to provide the best collaborative AI learning experience."
      },
      {
        question: "Will food be provided?",
        answer: "Yes, we'll be providing meals from breakfast on Saturday to lunch on Sunday. We'll accommodate dietary restrictions - just let us know when confirming your spot. There will be plenty of snacks to fuel your AI development throughout the weekend!"
      },
      {
        question: "Will there be overnight accommodations?",
        answer: "Yes! While hacking all night is fun, you can also get some rest when you need it. We will provide accommodation details closer to the event for participants traveling from outside the city."
      }
    ],
  };

  return (
    <section id="FAQ" className="relative bg-[#1b2131] py-24">
      {/* Blue star wave background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 w-full overflow-hidden">
        <img
          src="https://ext.same-assets.com/2333832186/1820356295.png"
          alt="Star Wave"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          ref={ref}
          variants={sectionVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mx-auto max-w-4xl"
        >
          <h2 className="section-title mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl continuous-rainbow">
            FAQ
          </h2>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold continuous-rainbow-2">General</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.general.map((item, index) => (
                <FAQItem key={`general-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold continuous-rainbow-2">Event & Participation FAQs   </h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.tracks.map((item, index) => (
                <FAQItem key={`tracks-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold continuous-rainbow-2">Technical & Submission FAQs </h3>
            
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.registration.map((item, index) => (
                <FAQItem key={`registration-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          {/* <div>
            <h3 className="mb-4 text-xl font-semibold continuous-rainbow-2">In-Person Logistics</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.logistics.map((item, index) => (
                <FAQItem key={`logistics-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div> */}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
