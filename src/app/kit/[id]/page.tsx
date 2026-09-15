import { KitClient } from "@/components/KitClient";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { getOrder } from "@/lib/store";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function KitPage({ params }: Props) {
  const { id } = await params;
  const order = await getOrder(id);
  const initial =
    order?.kit && order.intake
      ? {
          orderId: order.id,
          planId: order.planId,
          businessName: order.intake.businessName,
          kit: order.kit,
        }
      : null;

  return (
    <>
      <SiteNav />
      <main className="surface-wash flex-1 px-5 py-16 md:px-8 md:py-24">
        <KitClient id={id} initial={initial} />
      </main>
      <SiteFooter />
    </>
  );
}
