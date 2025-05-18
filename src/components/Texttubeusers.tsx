"use client";
import React from "react";
import texttubeusers from "../data/texttubeusers.json";
import { GraduationCap, Briefcase, PenTool, FileText } from "lucide-react";

interface UserCardProps {
  user: string;
  use_case: string;
  benefit: string;
}

// Function to get the appropriate icon based on user type
const getUserIcon = (userType: string) => {
  switch (userType) {
    case "Students & Learners":
      return <GraduationCap className="w-8 h-8" />;
    case "Professionals & Executives":
      return <Briefcase className="w-8 h-8" />;
    case "Content Creators & Researchers":
      return <PenTool className="w-8 h-8" strokeWidth={1.5} />;
    default:
      return <FileText className="w-8 h-8" />;
  }
};

export default function Texttubeusers() {
  return (
    <div className="flex flex-col gap-4">
      {texttubeusers.map((user: UserCardProps, index: number) => {
        const isHighlighted = user.user === "Students & Learners";

        // Define card styles based on user type
        let cardStyle = "bg-white border border-gray-200";
        let iconBgStyle = "bg-gray-100";
        let textColor = "text-gray-800";
        let descColor = "text-gray-600";

        if (isHighlighted) {
          cardStyle = "bg-gradient-to-r from-blue-900 to-blue-700 text-white";
          iconBgStyle = "bg-blue-800";
          textColor = "text-white";
          descColor = "text-blue-100";
        } else if (user.user === "Content Creators & Researchers") {
          cardStyle =
            "bg-gradient-to-r from-purple-600 to-purple-400 text-white";
          iconBgStyle = "bg-purple-700";
          textColor = "text-white";
          descColor = "text-purple-100";
        } else if (user.user === "Professionals & Executives") {
          cardStyle =
            "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white";
          iconBgStyle = "bg-emerald-700";
          textColor = "text-white";
          descColor = "text-emerald-100";
        }

        return (
          <div
            key={index}
            className={`flex flex-row items-center p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl ${cardStyle}`}
            style={{ width: "100%", height: "auto", minHeight: "130px" }}
          >
            <div className={`mr-4 p-3 rounded-full ${iconBgStyle}`}>
              {getUserIcon(user.user)}
            </div>

            <div className="flex-1">
              <h2 className={`text-md font-bold mb-1 ${textColor}`}>
                {user.user}
              </h2>
              <p className={`text-sm mb-1 ${descColor}`}>{user.use_case}</p>
              <p className={`text-xs italic ${descColor}`}>{user.benefit}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
