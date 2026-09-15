import { notFound } from "next/navigation";
import { KitView } from "@/components/KitView";
import { getOrder } from "@/lib/store";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function KitPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order?.kit || !order.intake) notFound();

  return (
    <main className="flex-1 px-5 py-16 md:px-8 md:py-24">
      <KitView
        businessName={order.intake.businessName}
        planId={order.planId}
        kit={order.kit}
        orderId={order.id}
      />
    </main>
  );
}
