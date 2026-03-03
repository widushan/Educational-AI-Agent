import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import axios from "axios";
// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse.js";
import { currentUser } from "@clerk/nextjs/server";
import ImageKit from "imagekit";

export const runtime = "nodejs";

// ✅ ImageKit instance — upload happens here so base64 never reaches Inngest
const imagekit = new ImageKit({
  // @ts-ignore
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  // @ts-ignore
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  // @ts-ignore
  urlEndpoint: process.env.IMAGEKIT_ENDPOINT_URL,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile") as File | null;
    const recordId = formData.get("recordId") as string | null;
    const user = await currentUser();

    if (!resumeFile || !recordId) {
      return NextResponse.json(
        { error: "Missing resumeFile or recordId" },
        { status: 400 }
      );
    }

    // ✅ Convert file to Buffer
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // ✅ Extract text from PDF
    const pdfData = await pdf(buffer);
    const pdfText: string = pdfData.text;

    // ✅ Upload PDF to ImageKit HERE (keeps base64 out of the Inngest event)
    const base64 = buffer.toString("base64");
    const imageKitFile = await imagekit.upload({
      file: base64,
      fileName: `${Date.now()}.pdf`,
      isPublished: true,
    });
    const resumeFileUrl = imageKitFile.url;

    // ✅ Send only the URL + extracted text — no binary payload
    const resultIds = await inngest.send({
      name: "AiResumeAgent",
      data: {
        recordId,
        resumeFileUrl,   // CDN URL instead of raw base64
        pdfText,
        aiAgentType: "/ai-tools/ai-resume-analyzer",
        userEmail: user?.primaryEmailAddress?.emailAddress,
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

    for (let i = 0; i < 120; i++) {
      runStatus = await getRuns(host, signingKey, eventId);
      const status = runStatus?.data?.[0]?.status;

      if (status === "Completed") break;

      if (status === "Failed") {
        return NextResponse.json(
          { error: "AI resume agent run failed" },
          { status: 502 }
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    if (!runStatus?.data?.[0]) {
      return NextResponse.json(
        { error: "Timeout waiting for AI resume agent result" },
        { status: 504 }
      );
    }

    return NextResponse.json(
      runStatus.data[0]?.output?.output?.[0] ?? {}
    );

  } catch (err: any) {
    console.error("ai-resume-agent POST error:", err);

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