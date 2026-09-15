import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { notifyOwnerQuestion } from "@/lib/email";
import { saveQuestion } from "@/lib/store";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  topic: z.string().min(2),
  message: z.string().min(10),
  orderId: z.string().optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid question" }, { status: 400 });
  }

  const question = await saveQuestion({
    id: nanoid(10),
    createdAt: new Date().toISOString(),
    status: "new",
    ...parsed.data,
  });

  const notify = await notifyOwnerQuestion(parsed.data);

  return NextResponse.json({ ok: true, id: question.id, notified: notify.sent });
}
