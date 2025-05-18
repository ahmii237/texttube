// components/PriceCard.tsx
"use client";

import { useState } from "react";
import pricingData from "../data/Pricing.json"; // Adjust path based on your structure
import { CheckCircle } from "lucide-react";

export default function PriceCard() {
  const [planType, setPlanType] = useState<"monthly" | "annually">("annually");

  const filteredPlans = pricingData.filter((plan) => plan.type === planType);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Toggle Switch */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <span
          className={
            planType === "monthly"
              ? "text-gray-500"
              : "text-gray-800 font-semibold"
          }
        >
          Annually
        </span>
        <button
          onClick={() =>
            setPlanType(planType === "monthly" ? "annually" : "monthly")
          }
          className={`relative w-14 h-8 bg-gray-300 rounded-full p-1 transition-colors duration-300 ${
            planType === "monthly" ? "bg-blue-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
              planType === "monthly" ? "translate-x-6" : ""
            }`}
          />
        </button>
        <span
          className={
            planType === "monthly"
              ? "text-gray-800 font-semibold"
              : "text-gray-500"
          }
        >
          Monthly
        </span>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
          >
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-red-500">
                {plan.title}
              </h3>
              <div className="flex items-center gap-2 text-3xl font-bold text-gray-900">
                ${plan.price}
                {plan.originalPrice && plan.originalPrice !== plan.price && (
                  <span className="text-sm line-through text-gray-400">
                    ${plan.originalPrice}
                  </span>
                )}
                <span className="text-base font-medium text-gray-500">
                  / {plan.duration}
                </span>
              </div>
              <p className="text-gray-600 mt-1">{plan.description}</p>
            </div>

            <button className="w-full mt-4 bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-800 transition">
              {plan.buttonText}
            </button>

            <ul className="mt-6 space-y-2">
              {plan.features.map((feature: string, index: number) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-gray-700 text-sm"
                >
                  <CheckCircle className="text-green-500 w-5 h-5 mt-[2px]" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
