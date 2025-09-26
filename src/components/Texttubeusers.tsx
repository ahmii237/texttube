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
    <div
      className="py-16 bg-gradient-to-br from-white to-purple-50"
      id="features"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Who Uses TextTube?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-700 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how different professionals leverage TextTube to enhance
            their workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {texttubeusers.map((user: UserCardProps, index: number) => {
            // Enhanced purple gradient scheme
            const gradients = [
              "from-purple-600 to-purple-700",
              "from-purple-700 to-purple-800",
              "from-purple-500 to-purple-600",
            ];

            const gradient = gradients[index % gradients.length];

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-purple-100 group`}
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <div className="text-white">{getUserIcon(user.user)}</div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {user.user}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {user.use_case}
                </p>
                <div className="pt-4 border-t border-purple-100">
                  <p className="text-sm text-purple-600 font-medium">
                    💡 {user.benefit}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
