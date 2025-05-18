"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import {
  A11y,
  Pagination,
  Scrollbar,
  Autoplay,
  Keyboard,
  Mousewheel,
} from "swiper/modules";

import Image from "next/image";

const tipData = [
  {
    heading: "💡 Get Better Summaries",
    tips: [
      "Use shorter videos for faster results.",
      "Include clear titles for best accuracy.",
      "Try different URLs to compare summaries.",
      "Summarize playlists for batch insights.",
    ],
    image: "/images/summary.png",
  },
  {
    heading: "🎯 Maximize Key Points",
    tips: [
      "Click 'Generate Keypoints' after summary.",
      "Use key points for quick understanding.",
      "Copy them to your notes easily.",
      "Share them with teammates via link.",
    ],
    image: "/images/keypoint.png",
  },
  {
    heading: "🧠 Converse with Video",
    tips: [
      "Ask follow-up questions after summary.",
      "Use natural language like 'what is X?'.",
      "Mention timestamp for context clarity.",
      "Use 'Regenerate' to get fresh answers.",
    ],
    image: "/images/chat.jpg",
  },
  {
    heading: "🗂️ Save & Share Smartly",
    tips: [
      "History is auto-saved for each session.",
      "Name your sessions to find them faster.",
      "Use 'Share Summary' to generate a link.",
      "Summaries can be shared on social apps.",
    ],
    image: "/images/save.png",
  },
];

export default function Tips() {
  return (
    <div className="w-full mx-auto px-4 py-10">
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay, Keyboard, Mousewheel]}
        pagination={{ clickable: true }}
        navigation={false}
        keyboard={{ enabled: true }}
        mousewheel={{ forceToAxis: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={1}
        loop
        centeredSlides
        className="!pb-12"
      >
        {tipData.map((tip, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-full h-[500px] mx-auto flex flex-col md:flex-row">
              {/* Left side - Content */}
              <div className="p-10 md:w-3/5 bg-gradient-to-br from-purple-100 to-white flex flex-col justify-center">
                <h2 className="text-4xl font-extrabold text-purple-800 mb-8 tracking-tight">
                  {tip.heading}
                </h2>
                <ul className="text-gray-700 space-y-5 list-none">
                  {tip.tips.map((t, i) => (
                    <li key={i} className="flex items-start">
                      <span className="inline-flex mr-4 mt-1 text-purple-600 text-2xl">
                        •
                      </span>
                      <span className="text-xl font-medium leading-relaxed">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right side - Image */}
              <div className="md:w-2/5 relative">
                <div className="h-full">
                  <Image
                    src={tip.image}
                    alt={tip.heading}
                    width={600}
                    height={500}
                    className="h-full w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/5"></div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
