import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { HistoryTable } from "@/configs/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { content, recordId, aiAgentType, metaData } = await req.json();
    const user = await currentUser();

    if (!recordId) {
      return NextResponse.json({ error: "recordId is required" }, { status: 400 });
    }

    const result = await db.insert(HistoryTable).values({
      recordId: String(recordId),
      content: content ?? [],
      userEmail: user?.primaryEmailAddress?.emailAddress ?? null,
      createdAt: new Date().toISOString(),
      aiAgentType,
      metaData: metaData ?? null,
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (e: any) {
    console.error("History POST error:", e?.message ?? e);
    return NextResponse.json(
      { error: e?.message ?? "Failed to store history record" },
      { status: 500 }
    );
  }
}


export async function PUT(req: any) {
  const { content, recordId } = await req.json();
  try {
    // Insert record
    const result = await db.update(HistoryTable).set({
      content: content,
    }).where(eq(HistoryTable.recordId, recordId))
    
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json(e)
  }
}



export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const recordId = searchParams.get('recordId');
  
  try {
    if (recordId) {
      const result = await db.select().from(HistoryTable)
        .where(eq(HistoryTable.recordId, recordId));
      return NextResponse.json(result[0])
    }
    return NextResponse.json({})
    
  } catch (e) {
    return NextResponse.json(e)
  }
}