import { NextResponse } from "next/server";
import { listQuestions, updateQuestionStatus } from "@/lib/store";

function authorized(req: Request) {
  const password = process.env.OWNER_PASSWORD || "meridian-owner";
  const header = req.headers.get("x-owner-password");
  return header === password;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const questions = await listQuestions();
  return NextResponse.json({ questions });
}

export async function PATCH(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { id?: string; status?: "new" | "answered" };
  if (!body.id || !body.status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }
  const updated = await updateQuestionStatus(body.id, body.status);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ question: updated });
}
