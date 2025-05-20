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
    <div className="relative w-full max-w-6xl h-[400px] overflow-hidden my-10">
      <div className="animate-scroll-up-slow">
        {/* Group feedback items into rows of cardsPerRow */}
        {[...feedback, ...feedback]
          .reduce((rows: Array<Array<(typeof feedback)[0]>>, item, index) => {
            if (index % cardsPerRow === 0) rows.push([]);
            rows[rows.length - 1].push(item);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-row gap-4 mb-4">
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
              {Array.from({ length: cardsPerRow - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1" />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AutoScrollFeedback;
