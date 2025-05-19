import { NextResponse } from "next/server";

if (!process.env.RAPID_API_KEY) {
  throw new Error("Missing RAPID_API_KEY in environment variables");
}
const RAPID_API_KEY = process.env.RAPID_API_KEY;

if (!process.env.RAPID_API_HOST) {
  throw new Error("Missing RAPID_API_HOST in environment variables");
}
const RAPID_API_HOST = process.env.RAPID_API_HOST;

// ✅ Extracts video ID from all standard YouTube URL formats
function extractVideoId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    console.log("Received URL:", url);

    const videoId = extractVideoId(url);
    console.log("Extracted videoId:", videoId);

    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    const apiUrl = `https://youtube-transcripts.p.rapidapi.com/youtube/transcript?videoId=${videoId}&chunkSize=500`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": RAPID_API_HOST,
      },
    });

    const data = await response.json();
    console.log("Transcript API response:", data);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Transcript fetch failed", detail: data },
        { status: 500 }
      );
    }

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 400 });
    }

    return NextResponse.json({ transcript: data });
  } catch (error) {
    console.error("Transcript route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
