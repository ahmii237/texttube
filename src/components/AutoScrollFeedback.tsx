"use client";
import React from "react";
import feedback from "../data/feedback.json";
import FeedbackCard from "./FeedbackCard";

const AutoScrollFeedback: React.FC = () => {
  return (
    <div className="relative w-full max-w-6xl h-[400px] overflow-hidden my-10">
      <div className="animate-scroll-up-slow">
        {/* Group feedback items into rows of 3 */}
        {[...feedback, ...feedback]
          .reduce((rows: Array<Array<typeof feedback[0]>>, item, index) => {
            // Create new row for every 3 items
            if (index % 3 === 0) rows.push([]);
            // Add current item to the last row
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
              {/* If row has less than 3 items, add empty placeholders to maintain layout */}
              {Array.from({ length: 3 - row.length }).map((_, i) => (
                <div key={`empty-${i}`} className="flex-1" />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AutoScrollFeedback;
