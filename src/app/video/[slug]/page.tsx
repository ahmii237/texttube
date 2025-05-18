"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VideoPage() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [transcript, setTranscript] = useState("");
  const [question, setQuestion] = useState("");
  const [chatLog, setChatLog] = useState<
    { question: string; answer: string }[]
  >([]);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);

  const askBot = async () => {
    if (!question.trim()) return;

    // Trigger button animation
    setIsButtonAnimating(true);
    setTimeout(() => setIsButtonAnimating(false), 300);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ transcript, summary, question }),
    });

    const data = await res.json();
    setChatLog((prev) => [...prev, { question, answer: data.answer }]);
    setQuestion("");
  };

  useEffect(() => {
    const summaryParam = searchParams.get("summary");
    const transcriptParam = searchParams.get("transcript");
    const urlParam = searchParams.get("url");

    if (summaryParam && transcriptParam && urlParam) {
      setSummary(summaryParam);
      setTranscript(transcriptParam);
      setUrl(urlParam);
      setChatLog([
        {
          question: "Can you summarize this video?",
          answer: summaryParam,
        },
      ]);
    }
  }, [searchParams]);

  const videoId =
    url &&
    (new URL(url).pathname.split("/").pop()?.split("?")[0] ||
      new URL(url).searchParams.get("v"));

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      askBot();
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen">
      {/* Left panel: Video */}
      <div className="w-full md:w-1/2 p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Video Content</h2>
        <div className="bg-black rounded-lg shadow-lg overflow-hidden aspect-video">
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

      {/* Right panel: Chat */}
      <div className="w-full md:w-1/2 p-4 flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Chat with AI</h2>

        {/* Combined chat area and input in a single div */}
        <div className="flex flex-col flex-grow bg-white rounded-lg shadow relative">
          {/* Chat messages area */}
          <div
            className="flex-grow p-4 overflow-y-auto"
            style={{ height: "calc(100vh - 240px)" }}
          >
            {chatLog.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Ask me anything about this video
              </div>
            ) : (
              chatLog.map((entry, i) => (
                <div key={i} className="mb-4">
                  <div className="flex items-start mb-2">
                    <div className="bg-gray-200 rounded-lg py-2 px-4 max-w-3/4 break-words">
                      <p className="text-gray-800">{entry.question}</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-end">
                    <div className="bg-blue-500 rounded-lg py-2 px-4 max-w-3/4 break-words">
                      <p className="text-white">{entry.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with input area - now visible and properly positioned */}
          <div className="border-t p-3 bg-gray-50 sticky bottom-0 left-0 right-0 w-full">
            <div className="flex items-center">
              <input
                className="flex-grow border border-gray-300 rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask something about the video..."
              />
              <button
                onClick={askBot}
                className={`bg-purple-600 text-white px-4 py-3 rounded-r-lg border border-purple-600 transition-all duration-300 
                  hover:bg-white hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${isButtonAnimating ? "transform scale-95" : ""}`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
