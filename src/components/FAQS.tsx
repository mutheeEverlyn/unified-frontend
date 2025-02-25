import  { useState } from "react";

const FAQS = () => {
  const faqData = [
    {
      question: "What is entailed in our property management system?",
      answer:
        "We deal with selling land,vehicles and houses.",
    },
    {
      question: "How do I access the site?",
      answer:
        "Navigate to the Login button if you are a new member or signup button if you already have an account,then it will take you to the dashboard where all our services are located.",
    },
    {
      question: "how is you website important to the user",
      answer:
        "Our website is available to all users at any time and due to its unified nature alot of time is saved where you are able to access land,houses and vehicles in a click of a button",
    },
  ];

  // State to track which answers are shown
  const [visibleAnswers, setVisibleAnswers] = useState<number[]>([]);

  // Toggle visibility of an answer
  const toggleAnswer = (index: number) => {
    setVisibleAnswers((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index) // Hide the answer
        : [...prev, index] // Show the answer
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">FAQs</h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{faq.question}</h2>
              <button
                onClick={() => toggleAnswer(index)}
                className="text-sm font-medium px-4 py-2 bg-gray-400 text-white rounded hover:bg-amber-300 focus:outline-none *:transition duration-500"
              >
                {visibleAnswers.includes(index) ? "Hide Answer" : "Show Answer"}
              </button>
            </div>
            {visibleAnswers.includes(index) && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQS;
