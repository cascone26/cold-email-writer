import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { setProUser, removeProUser } from "@/lib/pro-users";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.metadata?.email || session.customer_email;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (email) {
        setProUser(email.toLowerCase(), customerId, subscriptionId);
        console.log(`Pro user activated: ${email}`);
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      // Look up email from customer
      const customer = await getStripe().customers.retrieve(
        subscription.customer as string
      );

      if (customer && !customer.deleted && "email" in customer && customer.email) {
        removeProUser(customer.email.toLowerCase());
        console.log(`Pro user deactivated: ${customer.email}`);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      if (subscription.status === "canceled" || subscription.status === "unpaid") {
        const customer = await getStripe().customers.retrieve(
          subscription.customer as string
        );
        if (customer && !customer.deleted && "email" in customer && customer.email) {
          removeProUser(customer.email.toLowerCase());
        }
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
