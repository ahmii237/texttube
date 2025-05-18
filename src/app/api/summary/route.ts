import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
  model: "gemini-2.0-flash",
  temperature: 0.7,
});

export async function POST(req: NextRequest) {
  try {
    const { transcript } = await req.json();

    if (!transcript) {
      return NextResponse.json(
        { error: "Missing transcript" },
        { status: 400 }
      );
    }

    console.log("Transcript length:", transcript.length);

    const prompt = `Summarize the following YouTube transcript in a concise way highlighting the main points and key information:\n\n${transcript}`;

    const res = await model.invoke(prompt);

    // Log the full response to debug
    console.log("Raw Gemini response:", res);

    // LangChain Gemini sometimes wraps the text in res.content
    const summaryText = res?.content || res?.text || "";

    if (!summaryText) {
      return NextResponse.json(
        { error: "Empty summary response from Gemini", raw: res },
        { status: 500 }
      );
    }

    return NextResponse.json({ summary: summaryText });
  } catch (error) {
    console.error("Error in summary generation:", error);
    return NextResponse.json(
      { error: "Failed to generate summary", details: String(error) },
      { status: 500 }
    );
  }
}
