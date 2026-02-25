import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import axios from "axios";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile") as File | null;
    const recordId = formData.get("recordId") as string | null;

    if (!resumeFile || !recordId) {
      return NextResponse.json(
        { error: "Missing resumeFile or recordId" },
        { status: 400 }
      );
    }

    // ✅ Load PDF text
    const loader = new WebPDFLoader(resumeFile);
    const docs = await loader.load();

    // ✅ Convert to base64
    const arrayBuffer = await resumeFile.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    // ✅ Send event to Inngest
    const resultIds = await inngest.send({
      name: "AiResumeAgent",
      data: {
        recordId,
        base64ResumeFile: base64,
        pdfText: docs?.[0]?.pageContent ?? "",
      },
    });

    const eventId = resultIds?.ids?.[0];

    if (!eventId) {
      return NextResponse.json(
        { error: "Failed to send event to Inngest" },
        { status: 502 }
      );
    }

    const host = process.env.INNGEST_SERVER_HOST;
    const signingKey = process.env.INNGEST_SIGNING_KEY;

    if (!host || !signingKey) {
      return NextResponse.json(
        { error: "Missing INNGEST_SERVER_HOST or INNGEST_SIGNING_KEY" },
        { status: 500 }
      );
    }

    let runStatus: any = null;
    const maxAttempts = 120;

    for (let i = 0; i < maxAttempts; i++) {
      runStatus = await getRuns(host, signingKey, eventId);

      const status = runStatus?.data?.[0]?.status;

      if (status === "Completed") break;

      if (status === "Failed") {
        return NextResponse.json(
          { error: "AI career agent run failed" },
          { status: 502 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (!runStatus?.data?.[0]) {
      return NextResponse.json(
        { error: "Timeout waiting for AI career agent result" },
        { status: 504 }
      );
    }

    return NextResponse.json(runStatus.data[0]?.output?.output?.[0] ?? {});
  } catch (err: any) {
    console.error("ai-career-chat-agent POST error:", err);

    return NextResponse.json(
      { error: err?.message ?? "Internal server error" },
      { status: 500 }
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