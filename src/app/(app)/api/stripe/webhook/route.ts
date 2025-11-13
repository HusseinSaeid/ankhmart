import type { Stripe } from "stripe";
import { getPayload } from "payload";
import config from "@payload-config";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { expandedLineItem } from "@/modules/checkout/types";

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    const body = await req.text(); // ✅ هنا التعديل
    const signature = req.headers.get("stripe-signature") as string;

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.log(`⚠️  Webhook signature verification failed.`, errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }

  console.log("✅ Success:", event.id);

  const permittedEvents = ["checkout.session.completed", "account.updated"];
  const payload = await getPayload({ config });

  if (permittedEvents.includes(event.type)) {
    let data;
    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;

          if (!data.metadata?.userId) throw new Error("Missing userId");

          const user = await payload.findByID({
            collection: "users",
            id: data.metadata.userId,
          });

          const expandedSession = await stripe.checkout.sessions.retrieve(
            data.id,
            { expand: ["line_items.data.price.product"] },
            { stripeAccount: event.account }
          );

          const lineItems = expandedSession.line_items
            ?.data as expandedLineItem[];

          if (!lineItems?.length) throw new Error("No line items found");

          for (const item of lineItems) {
            await payload.create({
              collection: "orders",
              data: {
                stripeCheckoutSessionId: data.id,
                stripeAccountId: event.account,
                user: user.id,
                product: item.price.product.metadata.id,
                name: item.price.product.name,
              },
            });
          }

          break;

        case "account.updated":
          data = event.data.object as Stripe.Account;
          await payload.update({
            collection: "tenants",
            where: {
              stripeAccountId: { equals: data.id },
            },
            data: {
              stripeDetailsSubmitted: data.details_submitted,
            },
          });
          break;

        default:
          throw new Error(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.log("❌ Handler Error:", error);
      return NextResponse.json(
        { error: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "received" }, { status: 200 });
}
