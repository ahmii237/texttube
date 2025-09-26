"use client";

import { useEffect, useState } from "react";
import { useVideo } from "@/contexts/VideoContext";
import { useRouter } from "next/navigation";

export default function VideoPage() {
  const { videoData } = useVideo();
  const router = useRouter();
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState<
    { question: string; answer: string }[]
  >([]);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const askBot = async () => {
    if (!question.trim() || !videoData) return;

    // Trigger button animation
    setIsButtonAnimating(true);
    setTimeout(() => setIsButtonAnimating(false), 300);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        transcript: videoData.transcript,
        summary: videoData.summary,
        question,
      }),
    });

    const data = await res.json();
    setChatLog((prev) => [...prev, { question, answer: data.answer }]);
    setQuestion("");
  };

  useEffect(() => {
    if (videoData) {
      setChatLog([
        {
          question: "Can you summarize this video?",
          answer: videoData.summary,
        },
      ]);
      setIsLoading(false);
    } else {
      // If no video data, redirect to home after a short delay
      const timeout = setTimeout(() => {
        router.push("/");
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [videoData, router]);

  const videoId = videoData?.videoId;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      askBot();
    }
  };

  if (isLoading || !videoData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading video data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left panel: Video */}
        <div className="w-full lg:w-3/5 p-6">
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden h-full">
            <div className="p-6 border-b border-purple-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                Video Content
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-2xl overflow-hidden aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right panel: Chat */}
        <div className="w-full lg:w-2/5 p-6 flex flex-col">
          <div className="bg-white rounded-2xl shadow-xl border border-purple-100 flex flex-col h-full">
            <div className="p-6 border-b border-purple-100">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                AI Conversation
              </h2>
            </div>

            {/* Chat messages area */}
            <div
              className="flex-1 p-6 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 300px)" }}
            >
              {chatLog.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">
                      Ready to chat!
                    </p>
                    <p className="text-gray-400 text-sm">
                      Ask me anything about this video
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {chatLog.map((entry, i) => (
                    <div key={i} className="space-y-4">
                      {/* User question */}
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl px-6 py-4 max-w-[85%] shadow-lg">
                          <p className="text-white font-medium">
                            {entry.question}
                          </p>
                        </div>
                      </div>

                      {/* AI response */}
                      <div className="flex justify-start">
                        <div className="bg-gray-100 rounded-2xl px-6 py-4 max-w-[85%] shadow-sm border border-gray-200">
                          <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                            {entry.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Input area */}
            <div className="p-6 border-t border-purple-100 bg-gray-50 rounded-b-2xl">
              <div className="flex gap-3">
                <input
                  className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 placeholder-gray-500 bg-white"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask something about the video..."
                />
                <button
                  onClick={askBot}
                  className={`bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-medium min-w-[80px] ${
                    isButtonAnimating ? "animate-pulse scale-95" : ""
                  }`}
                  disabled={!question.trim()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7-7l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
