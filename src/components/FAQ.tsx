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
        question: "What is a hackathon?",
        answer: "Hackathons are events where programmers collaborate together to create innovative AI solutions and projects. While ML models and AI applications are common types of hacks, you are encouraged to build anything your imagination inspires in the field of artificial intelligence!"
      },
      {
        question: "When is SindhanAI?",
        answer: "Check-in for SindhanAI will begin at 8am on Saturday, April 19th and the event will end around 7pm on Sunday, April 20th. If you're arriving early, you can also attend our pre-checkin from 9pm to 11pm on Friday, April 18th. Stay tuned for a more detailed schedule as we get closer to the event!"
      },
      {
        question: "What's the cost?",
        answer: "The abstract submission round is completely free and conducted online. If your team gets shortlisted for the final 24-hour hackathon, there is a registration fee of ₹550 per participant. This fee covers meals, accommodation, swag, and access to all hackathon resources and events."
      },
      {
        question: "What can I win?",
        answer: "We offer prizes worth ₹60,000 total, Each domain the winner gets ₹20,000, Based on performance there will be consolidation prizes. Even if you're here to just have fun, you'll get free swag just by submitting a project."
      },
    ],
    tracks: [
      {
        question: "What are hackathon domains?",
        answer: "We've developed specialized domains like AI, IoT, Data Analytics. The top project in each domain will be awarded a prize! You can submit your idea to one domain to be eligible for that domain prize."
      },
      {
        question: "Do I have to submit a project if I attend?",
        answer: "Yes, project submission is mandatory for the hackathon. Teams that get shortlisted from the abstract submission round will need to build their proposed solution during the 24-hour hackathon event. The project should align with your submitted abstract and chosen domain."
      }
    ],
    registration: [
      {
        question: "Can I apply?",
        answer: "If you are a college undergraduate from any recognized institution in India, then yes! We welcome students from all backgrounds - whether you're studying computer science, engineering, or any other field with an interest in AI."
      },
      {
        question: "What if I'm no longer eligible? / Can I volunteer to be a judge or mentor?",
        answer: "If you're an AI professional or have experience in machine learning and artificial intelligence, you can apply to be a mentor or judge at SindhanAI 2025! Application details will be shared soon."
      },
      {
        question: "How do teams work?",
        answer: "You can form a team of up to 6 people! You'll choose your teammates when you submit an idea at SindhanAI.  "
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
            <h3 className="mb-4 text-xl font-semibold continuous-rainbow-2">Domains</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.tracks.map((item, index) => (
                <FAQItem key={`tracks-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold continuous-rainbow-2">Registration</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.registration.map((item, index) => (
                <FAQItem key={`registration-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold continuous-rainbow-2">In-Person Logistics</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.logistics.map((item, index) => (
                <FAQItem key={`logistics-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
