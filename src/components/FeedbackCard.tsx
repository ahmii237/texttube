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
    <div className="flex flex-col items-center justify-between bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-64 min-w-0 w-full border border-purple-100 hover:border-purple-200">
      {/* Stars */}
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              className="text-yellow-400 w-5 h-5 drop-shadow-sm"
              fill="#fbbf24"
              strokeWidth={1}
            />
          ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center text-center">
        <h2 className="font-bold text-xl text-gray-800 mb-3 break-words leading-tight">
          {Subject}
        </h2>
        <p className="text-gray-600 text-center break-words leading-relaxed flex-1 flex items-center">
          {Description}
        </p>
      </div>

      {/* Author */}
      <div className="mt-4 pt-4 border-t border-gray-100 w-full">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-semibold text-sm">
              {Name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="font-semibold text-gray-700 break-words">{Name}</h3>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
