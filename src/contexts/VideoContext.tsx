"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface VideoData {
  url: string;
  transcript: string;
  summary: string;
  videoId: string;
}

interface VideoContextType {
  videoData: VideoData | null;
  setVideoData: (data: VideoData) => void;
  clearVideoData: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [videoData, setVideoDataState] = useState<VideoData | null>(null);

  const setVideoData = (data: VideoData) => {
    setVideoDataState(data);
  };

  const clearVideoData = () => {
    setVideoDataState(null);
  };

  return (
    <VideoContext.Provider value={{ videoData, setVideoData, clearVideoData }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
};
