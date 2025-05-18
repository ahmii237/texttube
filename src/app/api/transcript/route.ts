import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const videoId = extractVideoId(url);

    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // First fetch the video page to get the captions track URL
    const response = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const html = await response.text();

    // Extract captions data from the page
    const captionsRegex = /"captionTracks":\s*(\[.*?\])/;
    const match = html.match(captionsRegex);

    if (!match || !match[1]) {
      return NextResponse.json(
        { error: "No captions found for this video" },
        { status: 404 }
      );
    }

    const captionTracks = JSON.parse(match[1]);

    if (!captionTracks || captionTracks.length === 0) {
      return NextResponse.json(
        { error: "No caption tracks available" },
        { status: 404 }
      );
    }

    // Define a type for caption track
    type CaptionTrack = {
      languageCode: string;
      name: { simpleText: string };
      baseUrl: string;
    };

    // Get the first English caption track, or the first available one
    const englishTrack =
      captionTracks.find(
        (track: CaptionTrack) =>
          track.languageCode === "en" || track.name.simpleText === "English"
      ) || captionTracks[0];

    // Fetch the actual transcript XML
    const transcriptResponse = await fetch(englishTrack.baseUrl);
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

    return NextResponse.json({ transcript });
  } catch (err) {
    console.error("Transcript Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch transcript" },
      { status: 500 }
    );
  }
}

function extractVideoId(url: string): string | null {
  const regex =
    /(?:v=|youtu\.be\/|\/embed\/|\/v\/|\/shorts\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
