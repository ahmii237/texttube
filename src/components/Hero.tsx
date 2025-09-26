"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useVideo } from "@/contexts/VideoContext";

const Header: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { setVideoData } = useVideo();

  const handleClick = async () => {
    if (!url.trim()) return alert("Please enter a valid YouTube URL");

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Fetch transcript
      const transcriptRes = await fetch("/api/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const transcriptData = await transcriptRes.json();
      console.log("Transcript Data:", transcriptData);
      console.log(
        "Transcript structure:",
        JSON.stringify(transcriptData, null, 2)
      );

      // Check if the API returned an error
      if (transcriptData.error) {
        setIsLoading(false);
        setErrorMessage(`Transcript error: ${transcriptData.error}`);
        return;
      }

      function extractSlug(url: string): string {
        // Handle various YouTube URL formats
        const patterns = [
          /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
          /[?&]v=([a-zA-Z0-9_-]{11})/,
        ];

        for (const pattern of patterns) {
          const match = url.match(pattern);
          if (match) {
            console.log("Extracted video ID:", match[1]);
            return match[1];
          }
        }

        console.warn("Could not extract video ID from URL:", url);
        return "video";
      }

      // Check transcript availability
      if (transcriptData.error === "TRANSCRIPT_DISABLED") {
        setIsLoading(false);
        setErrorMessage(
          "Transcript is disabled for this video. Please try another video."
        );
        return;
      }

      console.log("Raw transcriptData:", transcriptData);
      console.log(
        "transcriptData.transcript exists:",
        !!transcriptData?.transcript
      );

      if (!transcriptData?.transcript) {
        setIsLoading(false);
        setErrorMessage(
          "Transcript is unavailable for this video. Please try another video."
        );
        return;
      }

      // Handle different transcript response formats
      let transcriptText: string;

      console.log("Transcript type:", typeof transcriptData.transcript);
      console.log("Is array:", Array.isArray(transcriptData.transcript));
      console.log(
        "Has content property:",
        transcriptData.transcript?.content !== undefined
      );
      console.log(
        "Full transcript object keys:",
        Object.keys(transcriptData.transcript || {})
      );

      if (typeof transcriptData.transcript === "string") {
        // If transcript is already a plain text string (flat_text=true)
        console.log("Using string format");
        transcriptText = transcriptData.transcript;
      } else if (transcriptData.transcript?.content) {
        // If transcript has content property with array
        console.log("Using content property format");
        const lines = transcriptData.transcript.content;
        if (!Array.isArray(lines)) {
          console.log("Content is not array:", lines);
          setIsLoading(false);
          setErrorMessage("Unexpected transcript format received.");
          return;
        }
        transcriptText = lines
          .map((line: { text: string }) => line.text)
          .join(" ");
      } else if (Array.isArray(transcriptData.transcript)) {
        // If transcript is directly an array
        console.log("Using direct array format");
        transcriptText = transcriptData.transcript
          .map((line: { text: string }) => line.text)
          .join(" ");
      } else {
        console.log(
          "Unknown format. Transcript object:",
          transcriptData.transcript
        );
        setIsLoading(false);
        setErrorMessage("Unexpected transcript format received.");
        return;
      }

      // 2. Fetch summary
      const summaryRes = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcriptText }),
      });

      const summaryData = await summaryRes.json();

      if (!summaryData?.summary) {
        console.error("Summary fetch failed:", summaryData);
        setIsLoading(false);
        return alert("Could not generate summary.");
      }

      const slug = extractSlug(url);
      console.log("Final video ID (slug):", slug);

      // Store data in context
      setVideoData({
        url,
        transcript: transcriptText,
        summary: summaryData.summary,
        videoId: slug,
      });

      // Navigate with only the video ID
      router.push(`/video/${slug}`, { scroll: false });
    } catch (err) {
      console.error("Unexpected error:", err);
      setIsLoading(false);
      alert("Something went wrong. Check console for details.");
    }
  };

  const closeErrorMessage = () => {
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex flex-col items-center justify-center px-4 py-16">
      {/* Hero Content */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        {/* Main Headline */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800 mb-6 leading-tight">
            Chat with Any
            <br />
            <span className="text-purple-900">YouTube Video</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-purple-700 mx-auto mb-8"></div>
        </div>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 font-medium leading-relaxed max-w-3xl mx-auto mb-4">
          Transform any YouTube video into an intelligent conversation using AI
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ask questions, get summaries, extract key insights, and discover
          content like never before
        </p>
      </div>

      {/* Input Section */}
      <div className="w-full max-w-2xl mx-auto mb-16">
        <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 p-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Paste your YouTube video link here..."
                className="w-full px-6 py-4 text-lg border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-300 placeholder-gray-500"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <button
              className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[200px] ${
                isLoading ? "animate-pulse" : ""
              }`}
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Processing...
                </div>
              ) : (
                "Start Conversation"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Interactive Chat
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Ask questions about video content and get instant, intelligent
            responses powered by AI.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Smart Summaries
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Get concise summaries highlighting the most important points and key
            takeaways.
          </p>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">Key Insights</h3>
          <p className="text-gray-600 leading-relaxed">
            Extract meaningful insights, quotes, and important moments from any
            video content.
          </p>
        </div>
      </div>

      {/* Error Popup */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 ml-3">
                Transcript Error
              </h3>
            </div>

            <p className="text-gray-700 mb-8 leading-relaxed">{errorMessage}</p>

            <div className="flex justify-end">
              <button
                onClick={closeErrorMessage}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
