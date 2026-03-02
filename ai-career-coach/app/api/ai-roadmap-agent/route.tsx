import { NextRequest, NextResponse } from "next/server";
import { inngest } from "@/inngest/client";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const { roadmapId, userInput } = await req.json();
    const user = await currentUser();

    const resultIds = await inngest.send({
      name: "AiRoadMapAgent",
      data: {
        userInput,
        roadmapId,
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

    // Fire-and-forget: Inngest Dev Server will process the event asynchronously.
    // Frontend can poll a separate API or DB later to fetch the generated roadmap.
    return NextResponse.json({ ok: true, eventId });
  } catch (err: any) {
    console.error("ai-roadmap-agent POST error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}