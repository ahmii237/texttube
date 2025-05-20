"use client";
import React from "react";
import { Star } from "lucide-react";

interface FeedbackCardProps {
  Subject: string;
  Description: string;
  Name: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({
  Subject,
  Description,
  Name,
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-56 min-w-0 w-full max-w-xs sm:max-w-none">
      <div className="flex mb-2 sm:mb-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              className="text-yellow-500 w-5 h-5"
              fill="#f59e0b"
              strokeWidth={1}
            />
          ))}
      </div>
      <h2 className="font-bold text-lg sm:text-xl text-gray-800 mb-1 sm:mb-2 text-center break-words w-full">
        {Subject}
      </h2>
      <p className="text-sm sm:text-base text-gray-600 text-center px-2 sm:px-4 break-words w-full">
        {Description}
      </p>
      <h3 className="font-medium text-gray-500 mt-2 sm:mt-4 text-center w-full break-words">
        {Name}
      </h3>
    </div>
  );
};

export default FeedbackCard;
