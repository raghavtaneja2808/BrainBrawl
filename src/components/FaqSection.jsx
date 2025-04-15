import React, { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "How does Brain Brawl work?",
    answer:
      "Brain Brawl is a quiz platform where users can challenge their knowledge in various categories, climb leaderboards, and earn recognition.",
  },
  {
    question: "Is Brain Brawl free to use?",
    answer:
      "Yes, Brain Brawl offers free quizzes. However, to unlock premium features like challenge mode, exclusive categories, and leaderboard boosts, users can subscribe to a monthly or yearly plan.",
  },
  {
    question: "Can I challenge my friends?",
    answer:
      "Absolutely! You can invite and challenge your friends to compete on scores and see who tops the leaderboard.",
  },
  {
    question: "Is there a trial period before subscribing?",
    answer:
      "Yes, we offer a 7-day free trial on both our monthly and yearly subscription plans so you can experience the premium features first.",
  },
  {
    question: "Which devices are supported?",
    answer:
      "Brain Brawl works on all modern browsers and is fully responsive on mobile, tablet, and desktop devices.",
  },
];

const FaqSection = ({ faqRef }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={faqRef}
      className="mt-[-90px] min-h-screen py-16 px-6 md:px-12 bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 flex items-center justify-center"
    >
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-2">📚 Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about Brain Brawl.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              index={index}
              openIndex={openIndex}
              toggleFAQ={toggleFAQ}
              faq={faq}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const AccordionItem = ({ index, openIndex, toggleFAQ, faq }) => {
  const contentRef = useRef(null);
  const isOpen = openIndex === index;

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm transition-all duration-300 bg-white dark:bg-zinc-900">
      <button
        onClick={() => toggleFAQ(index)}
        className="w-full flex justify-between items-center px-6 py-4 text-left text-base font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-300"
      >
        {faq.question}
        <span
          className={`text-xl transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      <div
        ref={contentRef}
        className="px-6 overflow-hidden transition-max-height duration-500 ease-in-out"
        style={{ maxHeight: "0px" }}
      >
        <div className="py-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
