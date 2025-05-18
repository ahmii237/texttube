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
    <div className="flex flex-col items-center justify-center bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300 h-56">
      <div className="flex mb-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Star
              key={index}
              className="text-yellow-500 w-5 h-5"
              fill="#f59e0b" // Add yellow fill color
              strokeWidth={1} // Reduce the stroke width for better appearance
            />
          ))}
      </div>
      <h2 className="font-bold text-xl text-gray-800 mb-2">{Subject}</h2>
      <p className="text-base text-gray-600 text-center px-4">{Description}</p>
      <h3 className="font-medium text-gray-500 mt-4">{Name}</h3>
    </div>
  );
};

export default FeedbackCard;
