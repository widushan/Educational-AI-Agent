import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
// @ts-ignore
import pdf from "pdf-parse/lib/pdf-parse.js";
import { currentUser } from "@clerk/nextjs/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeFile = formData.get("resumeFile") as File | null;
    const recordId = formData.get("recordId") as string | null;
    const companyName = formData.get("companyName") as string | null;
    const positionTitle = formData.get("positionTitle") as string | null;
    const user = await currentUser();

    if (!resumeFile || !recordId || !companyName || !positionTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfData = await pdf(buffer);
    const resumeText = pdfData.text;

    const resultIds = await inngest.send({
      name: "AiCoverLetterAgent",
      data: {
        recordId,
        resumeText,
        companyName,
        positionTitle,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      },
    });

    const eventId = resultIds?.ids?.[0];
    if (!eventId) {
      return NextResponse.json(
        { error: "Failed to send event to Inngest" },
        { status: 502 },
      );
    }

    // Fire-and-forget; cover letter is saved to DB by the Inngest function.
    return NextResponse.json({ ok: true, eventId });
  } catch (err: any) {
    console.error("ai-cover-letter-agent POST error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}

