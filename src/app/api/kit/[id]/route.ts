import { NextResponse } from "next/server";
import { getOrder } from "@/lib/store";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const order = await getOrder(id);
  if (!order?.kit || !order.intake) {
    return NextResponse.json({ error: "Kit not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: order.id,
    planId: order.planId,
    businessName: order.intake.businessName,
    kit: order.kit,
  });
}
