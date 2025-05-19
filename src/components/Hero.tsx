"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

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

function extractSlug(url: string): string {
  const idMatch = url.match(/[?&]v=([^&]+)/) || url.match(/\/embed\/([^/?]+)/);
  return idMatch ? idMatch[1] : "video";
}


      // Check transcript availability
      if (transcriptData.error === "TRANSCRIPT_DISABLED") {
        setIsLoading(false);
        setErrorMessage(
          "Transcript is disabled for this video. Please try another video."
        );
        return;
      }

      if (!transcriptData?.transcript) {
        setIsLoading(false);
        setErrorMessage(
          "Transcript is unavailable for this video. Please try another video."
        );
        return;
      }

      const lines = transcriptData.transcript.content;


      if (!Array.isArray(lines)) {
        setIsLoading(false);
        setErrorMessage("Unexpected transcript format received.");
        return;
      }

      const transcriptText = lines
        .map((line: { text: string }) => line.text)
        .join(" ");

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

      router.push(
        `/video/${slug}?url=${encodeURIComponent(url)}&transcript=${encodeURIComponent(
          transcriptText
        )}&summary=${encodeURIComponent(summaryData.summary)}`,
        { scroll: false }
      );

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
    <div className="my-50 w-full px-6 py-5 flex flex-col items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold text-center">
          Conversate With Any YouTube Video
        </h1>
        <p className="text-center text-xl font-medium m-3 p-3">
          TextTube allows you to chat with YouTube videos in real-time using AI
          <br />
          Ask questions, get summaries, pinpoint key points, translate content,
          and so much more!
        </p>
      </div>

      <div id="linker" className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter YouTube Video Link"
          className="border-2 rounded-xl p-3 w-96"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
        />
        <button
          className={`px-4 py-3 border rounded-xl bg-red-600 hover:bg-red-400 hover:cursor-pointer text-white ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Start Chatting"}
        </button>
      </div>

      {/* Error Popup */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 ml-3">
                Transcript Error
              </h3>
            </div>

            <p className="text-gray-700 mb-6">{errorMessage}</p>

            <div className="flex justify-end">
              <button
                onClick={closeErrorMessage}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
