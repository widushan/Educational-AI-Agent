import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server";


export async function POST(req: any) {
  try {
    const { userInput } = await req.json();

    const resultIds = await inngest.send({
      name: 'AiCareerAgent',
      data: {
        userInput: userInput,
      },
    });

    const eventId = resultIds?.ids?.[0];
    if (!eventId) {
      return NextResponse.json(
        { error: 'Failed to send event to Inngest' },
        { status: 502 }
      );
    }

    const host = process.env.INNGEST_SERVER_HOST;
    const signingKey = process.env.INNGEST_SIGNING_KEY;
    if (!host || !signingKey) {
      return NextResponse.json(
        { error: 'Server misconfigured: missing INNGEST_SERVER_HOST or INNGEST_SIGNING_KEY' },
        { status: 500 }
      );
    }

    let runStatus: Awaited<ReturnType<typeof getRuns>> | null = null;
    const maxAttempts = 120; // 60s at 500ms
    for (let i = 0; i < maxAttempts; i++) {
      runStatus = await getRuns(host, signingKey, eventId);
      if (runStatus?.data?.[0]?.status === 'Completed') {
        break;
      }
      if (runStatus?.data?.[0]?.status === 'Failed') {
        return NextResponse.json(
          { error: 'AI career agent run failed', details: runStatus.data[0] },
          { status: 502 }
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (!runStatus?.data?.[0]) {
      return NextResponse.json(
        { error: 'Timeout waiting for AI career agent result' },
        { status: 504 }
      );
    }

    return NextResponse.json(runStatus.data?.[0].output?.output[0]);
  } catch (err: any) {
    console.error('ai-career-chat-agent POST error:', err?.response?.data ?? err?.message ?? err);
    return NextResponse.json(
      { error: err?.response?.data ?? err?.message ?? 'Internal server error' },
      { status: err?.response?.status ?? 500 }
    );
  }
}

async function getRuns(
  host: string,
  signingKey: string,
  eventId: string
) {
  const url = `${host}/v1/events/${eventId}/runs`;
  const result = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${signingKey}`,
    },
  });
  return result.data;
}