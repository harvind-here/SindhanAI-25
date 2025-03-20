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

  // FAQ data organized by categories
  const faqData = {
    general: [
      {
        question: "What is a hackathon?",
        answer: "Hackathons are events where programmers collaborate together to create new software and hardware projects. While websites and mobile apps are common types of hacks, you are encouraged to build anything your imagination inspires. Reach for the stars!"
      },
      {
        question: "When is HackMIT?",
        answer: "Check-in for HackMIT will begin at 8am on Saturday, September 14th and the event will end around 7pm on Sunday, September 15th. If you're arriving early, you can also attend our pre-checkin from 9pm to 11pm on Friday, September 13th. Stay tuned for a more detailed schedule as we get closer to the event!"
      },
      {
        question: "What's the cost?",
        answer: "Admission is free and includes mentors, workshops, food, $wag, resources, and an unforgettable experience!"
      },
      {
        question: "What can I win?",
        answer: "We offer three general prizes, a beginner prize, and four track prizes! There will also be surprise prizes announced closer to the date — stay tuned for more info. If you're here to just have fun, you'll also get free $wag just by submitting a project."
      },
      {
        question: "But I've never hacked before!",
        answer: "That's totally okay—we'll be hosting a beginner workshop and will also have beginner mentors available to guide your team through the hackathon process. There will also be beginner prizes available!"
      },
    ],
    tracks: [
      {
        question: "What are hackathon tracks?",
        answer: "We've developed four tracks, or impact areas, for you to hack in. The top project in each track will be awarded a prize! You will be able to submit your project to at most ONE track to be eligible for that track prize. Submission to tracks is optional this year if you feel like your project doesn't fall into any of the areas — you will still be eligible for other prizes."
      },
      {
        question: "Do I have to submit a project if I attend?",
        answer: "You can attend all our events without submitting a project, but you must submit one to receive your travel reimbursement if eligible!"
      }
    ],
    registration: [
      {
        question: "Can I apply?",
        answer: "If you are a college undergraduate or an MIT M.Eng student, then yes! Note that we consider student status during the fall of 2024, so students who graduated prior to the event are not eligible. In addition, we require all non-MIT participants to be 18 or older by the time of the event."
      },
      {
        question: "What if I'm no longer eligible? / Can I volunteer to be a judge or mentor?",
        answer: <>If you're not a high schooler or college undergraduate, you are eligible to judge or mentor at HackMIT 2024! You can find the application <a href="https://go.hackmit.org/mentor-judge" className="text-purple-400 underline hover:text-purple-300">here</a> to be a mentor or a judge.</>
      },
      {
        question: "How do I apply?",
        answer: "Applications open in mid-June and are due on July 26, with decisions released mid-August. Additionally, the top 50 hackers who complete our admissions puzzle will receive automatic admission to HackMIT!"
      },
      {
        question: "How do teams work?",
        answer: "You can form a team of up to 4 people! You'll choose your teammates when you submit a project at HackMIT. If you don't have a team yet, don't worry! We'll have team formation events at the beginning of the weekend geared towards helping you find people to work with. You can also meet new people through our admitted hacker Discord server leading up to our event."
      },
    ],
    logistics: [
      {
        question: "Can I attend HackMIT virtually?",
        answer: "Unfortunately, HackMIT is only offered in-person."
      },
      {
        question: "Will food be provided?",
        answer: "Yes, we'll be providing meals from breakfast on Saturday to lunch on Sunday. If you have dietary restrictions, you'll have a chance to let us know when you confirm your spot so we can accommodate them. Of course, we'll also have an abundance of snacks throughout the weekend."
      },
      {
        question: "Will there be overnight accommodations?",
        answer: "Yes! Hacking all night is fun, but you can also get some rest when you need it. If you indicate in your confirmation form that you live outside the Boston area, we will try our best to match you with an MIT student who will provide a place for you to sleep and shower."
      },
      {
        question: "Where is HackMIT?",
        answer: <>HackMIT will be held in the <a href="https://goo.gl/maps/pngKVyQRHTrHzyQPA" target="_blank" rel="noreferrer" className="text-purple-400 underline hover:text-purple-300">Johnson Athletic Center</a> on MIT's campus! Check-in for the event will be under the tent on <a href="https://maps.app.goo.gl/yC5yxN6dYVKKBdwi8" target="_blank" rel="noreferrer" className="text-purple-400 underline hover:text-purple-300">Kresge Oval</a>.</>
      },
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
          <h2 className="mb-16 text-center text-3xl font-bold uppercase tracking-wide md:text-4xl">
            FAQ
          </h2>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold">General</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.general.map((item, index) => (
                <FAQItem key={`general-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold">Tracks</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.tracks.map((item, index) => (
                <FAQItem key={`tracks-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h3 className="mb-4 text-xl font-semibold">Registration</h3>
            <div className="rounded-xl bg-[#2a2e43]/60 p-6 backdrop-blur-sm md:p-8">
              {faqData.registration.map((item, index) => (
                <FAQItem key={`registration-${index}`} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">In-Person Logistics</h3>
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
