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
    <div
      className="w-full py-16 bg-gradient-to-br from-white to-purple-50"
      id="faqs"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-700 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about TextTube
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-purple-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-purple-50 transition-colors duration-300"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openFaqId === faq.id}
              >
                <span className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    openFaqId === faq.id ? "transform rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFaqId === faq.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 bg-purple-50/50">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
