"use client";
import React, { useEffect, useState } from "react";
import feedback from "../data/feedback.json";
import FeedbackCard from "./FeedbackCard";

const AutoScrollFeedback: React.FC = () => {
  const [cardsPerRow, setCardsPerRow] = useState(3);

  useEffect(() => {
    // Update cards per row based on screen width
    const handleResize = () => {
      setCardsPerRow(window.innerWidth < 640 ? 2 : 3); // 640px is Tailwind's 'sm'
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-700 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their video
            experience with TextTube
          </p>
        </div>

        <div className="relative w-full max-w-6xl h-[450px] overflow-hidden mx-auto">
          <div className="animate-scroll-up-slow">
            {/* Group feedback items into rows of cardsPerRow */}
            {[...feedback, ...feedback]
              .reduce(
                (rows: Array<Array<(typeof feedback)[0]>>, item, index) => {
                  if (index % cardsPerRow === 0) rows.push([]);
                  rows[rows.length - 1].push(item);
                  return rows;
                },
                []
              )
              .map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-row gap-6 mb-6">
                  {row.map((item, itemIndex) => (
                    <div key={`${rowIndex}-${itemIndex}`} className="flex-1">
                      <FeedbackCard
                        Subject={item.Subject}
                        Description={item.Description}
                        Name={item.Name}
                      />
                    </div>
                  ))}
                  {/* If row has less than cardsPerRow items, add empty placeholders */}
                  {Array.from({ length: cardsPerRow - row.length }).map(
                    (_, i) => (
                      <div key={`empty-${i}`} className="flex-1" />
                    )
                  )}
                </div>
              ))}
          </div>

          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-purple-50 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default AutoScrollFeedback;
