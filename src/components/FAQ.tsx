import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

// Export FAQItem so it can be reused
export const FAQItem = ({ question, answer }: FAQItemProps) => {
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
    triggerOnce: true,
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
        answer: "Sindanai'25 focuses on AI, IoT, Data Analytics. Participants can choose their own problem statement provided their idea comes under tracks(AI or IoT)."
      },
      {
        question: " Will there be any prizes or rewards?",
        answer: "Yes! The prize pool for Sindanai'25 is around ₹60,000. Winners will receive cash prizes, certificates, if notable performance observed during hacakthon, one may recieve consolidation prize too."
      },
    ],
    tracks: [
      {
        question: "How can I register for Sindanai'25?",
        answer: "Click the 'Register' button in website, which will direct you to a form, fill it and wait for confirmation mail. Participants can register as a team upto 6 members(including leader)."
      },
      {
        question: "Can we participate as a team? If yes, what is the team size limit?",
        answer: "Yes, team participation is allowed. The team size should be between 4 to 6 members."
      },
      {
        question: "What is the mode of the event? Will it be online or offline?",
        answer: "The Round 1 of Sindanai'25 is an online round, where your ideas are evaluated by dedicated technical teams. Upon shortlisting for Round 2, conducted as 24H hackathon offline event at SRMTRPEC, Tiruchirappalli."
      },
      {
        question: "How will the evaluation process be conducted in Final Round?",
        answer: " A panel of industry experts and academicians will assess the projects."
      },
      {
        question: "Are mentorship and resources provided for participants?",
        answer: "Guidance and basic technical support will be available during the hackathon. IoT participants will be provided with generic components, if you are planning to use specific component, it is advised to bring it yourself."
      },
    ],
    registration: [
      {
        question: "What is the format for project submissions?",
        answer: "Participants must submit a PowerPoint presentation (PPT) and a Proof of Concept (PoC) and any supporting document if applicable, which then reviewed for getting shortlisted for the final round."
      },
      {
        question: "Will participants get access to any development kits or tools?",
        answer: "Yes, IoT participants will be provided with generic components, if you are planning to use specific component, it is advised to bring it yourself. AI and DataAnalytics participants are provided with systems, If you are planning to train any models, you are advised to bring your own laptop."
      },
      {
        question: "What happens if I face technical difficulties during the event?",
        answer: "A dedicated support team will be available to assist participants with any issues."
      },
      {
        question: " Can we submit projects that have been worked on before?",
        answer: " No, this is a 24-hour hackathon, and all projects must be developed during the event itself. Unless your prject is in the ideation stage and align with any tracks."
      }
    ],
    downloadables: [
      {
        question: "Rulebook",
        answer: <a href="https://docs.google.com/document/d/1GesVoglTzGEhPA3JENAQTmLbWUKyigds/edit?usp=sharing&ouid=110539728346982923634&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Download Rulebook</a>
      },
      {
        question: "PPT Template",
        answer: <a href="https://docs.google.com/presentation/d/1x2rkUV-5AAbOK999FyiKag82aWIemLbZ/edit?usp=sharing&ouid=110539728346982923634&rtpof=true&sd=true" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Download PPT Template</a>
      }
    ], // Removed downloadables array entry
    logistics: [
      {
        question: "Can I attend SindhanAI virtually?",
        answer: "Unfortunately, SindhanAI is only offered in-person to provide the best collaborative AI learning experience. However, the first round is online, so you can participate from anywhere."
      },
      {
        question: "Will food be provided?",
        answer: "Yes, Participants will be provided with refreshments/snacks from time to time at free of cost. Besides that, food stalls and cafeterias will be made available for breakfast, lunch and dinner."
      },
      {
        question: "Will there be overnight accommodations?",
        answer: "Yes, based on the accomodation demanding participants further details will be notified when they get shortlisted."
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

          {/* Downloadables section removed from here */}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
