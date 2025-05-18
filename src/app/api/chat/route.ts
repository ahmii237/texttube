import { NextRequest, NextResponse } from "next/server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY!,
  model: "gemini-2.0-flash",
  temperature: 0.5,
});

export async function POST(req: NextRequest) {
  const { transcript, summary, question } = await req.json();

  if (!transcript || !summary || !question) {
    return NextResponse.json(
      { error: "Missing summary, transcript, or question" },
      { status: 400 }
    );
  }

  const prompt = PromptTemplate.fromTemplate(
    `You're a smart assistant helping explain YouTube videos.

Here is the summary of the video:
{summary}

Here is the transcript of the video:
{transcript}

Now answer the user's question based on the above content:
{question}`
  );

  const chain = RunnableSequence.from([
    async (input) => ({
      transcript: input.transcript,
      summary: input.summary,
      question: input.question,
    }),
    prompt,
    model,
  ]);

  const result = await chain.invoke({ transcript, summary, question });

  return NextResponse.json({ answer: result.text });
}
