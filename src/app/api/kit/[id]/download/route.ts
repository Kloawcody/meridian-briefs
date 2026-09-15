import { NextResponse } from "next/server";
import { getOrder } from "@/lib/store";
import { kitToMarkdown } from "@/lib/demo-kit";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const order = await getOrder(id);
  if (!order?.kit || !order.intake) {
    return NextResponse.json({ error: "Kit not found" }, { status: 404 });
  }

  const md = kitToMarkdown(order.intake.businessName, order.planId, order.kit);
  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="meridian-${order.intake.businessName.toLowerCase().replace(/\s+/g, "-")}.md"`,
    },
  });
}
