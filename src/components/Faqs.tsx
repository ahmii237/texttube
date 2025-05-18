"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import faqsData from "../data/faqs.json"; // Importing data from JSON file

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

const Faqs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  useEffect(() => {
    // Load FAQs from the imported JSON file
    setFaqs(faqsData);
  }, []);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
              onClick={() => toggleFaq(faq.id)}
              aria-expanded={openFaqId === faq.id}
            >
              <span className="text-lg font-medium text-gray-800">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                  openFaqId === faq.id ? "transform rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                openFaqId === faq.id ? "max-h-96 py-4" : "max-h-0"
              }`}
            >
              <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
