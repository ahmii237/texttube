
import { NextResponse } from "next/server";

// Add more robust error handling and logging
export async function POST(req: Request) {
  try {
    console.log("Transcript API called");

    // Parse request body with error handling
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    console.log("Video ID:", videoId);

    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // Use a more robust approach with multiple fallback methods
    try {
      // Method 1: Try direct YouTube page fetch with enhanced headers
      const transcript = await fetchTranscriptMethod1(videoId);
      if (transcript && transcript.length > 0) {
        console.log("Method 1 succeeded");
        return NextResponse.json({ transcript });
      }
    } catch (err) {
      console.error("Method 1 failed:", err);
    }

    try {
      // Method 2: Try alternative approach with different headers
      const transcript = await fetchTranscriptMethod2(videoId);
      if (transcript && transcript.length > 0) {
        console.log("Method 2 succeeded");
        return NextResponse.json({ transcript });
      }
    } catch (err) {
      console.error("Method 2 failed:", err);
    }

    try {
      // Method 3: Try with a different URL structure
      const transcript = await fetchTranscriptMethod3(videoId);
      if (transcript && transcript.length > 0) {
        console.log("Method 3 succeeded");
        return NextResponse.json({ transcript });
      }
    } catch (err) {
      console.error("Method 3 failed:", err);
    }

    // If we get here, all methods failed
    console.error("All transcript fetch methods failed");
    return NextResponse.json({ error: "TRANSCRIPT_DISABLED" }, { status: 404 });
  } catch (err) {
    console.error("Transcript API error:", err);
    return NextResponse.json(
      {
        error: "Failed to fetch transcript",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

// Method 1: Standard approach with enhanced headers
async function fetchTranscriptMethod1(videoId: string) {
  const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      Referer: "https://www.google.com/",
      "sec-ch-ua":
        '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "Sec-Fetch-Dest": "document",
      "Sec-Fetch-Mode": "navigate",
      "Sec-Fetch-Site": "none",
      "Sec-Fetch-User": "?1",
      "Upgrade-Insecure-Requests": "1",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`YouTube page fetch failed: ${response.status}`);
  }

  const html = await response.text();

  // Try multiple regex patterns to extract captions data
  let captionTracks = null;

  // Pattern 1: Standard pattern
  const captionsRegex = /"captionTracks":\s*(\[.*?\])/;
  let match = html.match(captionsRegex);

  if (match && match[1]) {
    try {
      captionTracks = JSON.parse(match[1]);
    } catch {
      console.error("Failed to parse caption tracks with pattern 1");
    }
  }

  // Pattern 2: Alternative pattern
  if (!captionTracks) {
    const altRegex = /\\"captionTracks\\":\s*(\[.*?\])/;
    match = html.match(altRegex);

    if (match && match[1]) {
      try {
        const jsonStr = match[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
        captionTracks = JSON.parse(jsonStr);
      } catch (e) {
        console.error("Failed to parse caption tracks with pattern 2",e);
      }
    }
  }

  // Pattern 3: Look for playerCaptionsTracklistRenderer
  if (!captionTracks) {
    const tracksRegex =
      /"playerCaptionsTracklistRenderer":\s*\{.*?"captionTracks":\s*(\[.*?\])/;
    match = html.match(tracksRegex);

    if (match && match[1]) {
      try {
        captionTracks = JSON.parse(match[1]);
      } catch (e) {
        // Handle parsing error
        console.error("Failed to parse caption tracks with pattern 3", e);
      }
    }
  }

  if (!captionTracks || captionTracks.length === 0) {
    throw new Error("No caption tracks found");
  }

  // Define a type for caption tracks
  type CaptionTrack = {
    languageCode: string;
    name?: { simpleText?: string; runs?: { text: string }[] };
    baseUrl?: string;
  };

  // Get the first English caption track, or the first available one
  const englishTrack =
    captionTracks.find(
      (track: CaptionTrack) =>
        track.languageCode === "en" ||
        (track.name && track.name.simpleText === "English") ||
        (track.name && track.name.runs && track.name.runs[0].text === "English")
    ) || captionTracks[0];

  if (!englishTrack || !englishTrack.baseUrl) {
    throw new Error("No valid caption track found");
  }

  // Fetch the actual transcript XML
  const transcriptResponse = await fetch(englishTrack.baseUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
    cache: "no-store",
  });

  if (!transcriptResponse.ok) {
    throw new Error(`Transcript fetch failed: ${transcriptResponse.status}`);
  }

  const transcriptXml = await transcriptResponse.text();

  // Parse the XML to get the transcript text
  const textRegex = /<text[^>]*>(.*?)<\/text>/g;
  const transcript: Array<{ text: string; start: string }> = [];
  let textMatch;

  while ((textMatch = textRegex.exec(transcriptXml)) !== null) {
    const startRegex = /start="([^"]*)"/;
    const startMatch = textMatch[0].match(startRegex);
    const start = startMatch ? startMatch[1] : "0";

    // Decode HTML entities
    const text = textMatch[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    transcript.push({ text, start });
  }

  return transcript;
}

// Method 2: Alternative approach with different headers and URL structure
async function fetchTranscriptMethod2(videoId: string) {
  const response = await fetch(`https://www.youtube.com/embed/${videoId}`, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      Referer: "https://www.youtube.com/",
      "sec-ch-ua":
        '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`YouTube embed fetch failed: ${response.status}`);
  }

  const html = await response.text();

  // Extract the yt-player-config
  const configRegex =
    /<script[^>]*>var ytInitialPlayerResponse\s*=\s*({.*?});<\/script>/;
  const match = html.match(configRegex);

  if (!match || !match[1]) {
    throw new Error("Could not find player config");
  }

  let playerConfig;
  try {
    playerConfig = JSON.parse(match[1]);
  } catch {
    throw new Error("Failed to parse player config");
  }

  // Extract captions data
  const captions =
    playerConfig?.captions?.playerCaptionsTracklistRenderer?.captionTracks;

  if (!captions || captions.length === 0) {
    throw new Error("No captions found in player config");
  }

  // Define a type for caption tracks
  type CaptionTrack = {
    languageCode: string;
    name?: { simpleText?: string; runs?: { text: string }[] };
    baseUrl?: string;
  };

  // Get the first English caption track, or the first available one
  const englishTrack =
    (captions as CaptionTrack[]).find(
      (track: CaptionTrack) =>
        track.languageCode === "en" ||
        (track.name && track.name.simpleText === "English") ||
        (track.name && track.name.runs && track.name.runs[0].text === "English")
    ) || (captions as CaptionTrack[])[0];

  if (!englishTrack || !englishTrack.baseUrl) {
    throw new Error("No valid caption track found");
  }

  // Fetch the actual transcript XML
  const transcriptResponse = await fetch(englishTrack.baseUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    },
    cache: "no-store",
  });

  if (!transcriptResponse.ok) {
    throw new Error(`Transcript fetch failed: ${transcriptResponse.status}`);
  }

  const transcriptXml = await transcriptResponse.text();

  // Parse the XML to get the transcript text
  const textRegex = /<text[^>]*>(.*?)<\/text>/g;
  const transcript: Array<{ text: string; start: string }> = [];
  let textMatch;

  while ((textMatch = textRegex.exec(transcriptXml)) !== null) {
    const startRegex = /start="([^"]*)"/;
    const startMatch = textMatch[0].match(startRegex);
    const start = startMatch ? startMatch[1] : "0";

    // Decode HTML entities
    const text = textMatch[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    transcript.push({ text, start });
  }

  return transcript;
}

// Method 3: Try with timedtext API
async function fetchTranscriptMethod3(videoId: string) {
  // First try to get the caption track list
  const response = await fetch(
    `https://www.youtube.com/watch?v=${videoId}&hl=en`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
        "Accept-Language": "en-US,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        Referer: "https://www.google.com/",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`YouTube page fetch failed: ${response.status}`);
  }

  const html = await response.text();

  // Try to find the serializedShareEntity which sometimes contains the caption track info
  const serializedRegex = /"serializedShareEntity":"([^"]*)"/;
  const match = html.match(serializedRegex);

  if (!match || !match[1]) {
    throw new Error("Could not find serializedShareEntity");
  }

  // Try to directly access the timedtext API
  const timedTextUrl = `https://www.youtube.com/api/timedtext?v=${videoId}&lang=en`;
  const transcriptResponse = await fetch(timedTextUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1",
    },
    cache: "no-store",
  });

  if (!transcriptResponse.ok) {
    throw new Error(
      `Timed text API fetch failed: ${transcriptResponse.status}`
    );
  }

  const transcriptXml = await transcriptResponse.text();

  // Parse the XML to get the transcript text
  const textRegex = /<text[^>]*>(.*?)<\/text>/g;
  const transcript: Array<{ text: string; start: string }> = [];
  let textMatch;

  while ((textMatch = textRegex.exec(transcriptXml)) !== null) {
    const startRegex = /start="([^"]*)"/;
    const startMatch = textMatch[0].match(startRegex);
    const start = startMatch ? startMatch[1] : "0";

    // Decode HTML entities
    const text = textMatch[1]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    transcript.push({ text, start });
  }

  return transcript;
}

function extractVideoId(url: string): string | null {
  const regex =
    /(?:v=|youtu\.be\/|\/embed\/|\/v\/|\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Add this to ensure Next.js knows this is a POST route
export const dynamic = "force-dynamic";
