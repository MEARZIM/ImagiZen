import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/prismadb";


export async function POST(req: Request) {
    const body = await req.text();

    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {

        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOKS_SECRET!
        )


    } catch (error: any) {
        console.log(error);
        return new NextResponse(`WebHooks Error: ${error.message}`, {
            status: 400
        });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );

        if (!session?.metadata?.userId) {
            return new NextResponse("UserId is required", {
                status: 400
            });
        }

        await db.userSubScription.create({
            data: {
                userId: session.metadata.userId,
                stripeCustomerId: subscription.customer.toString(),
                stripePriceId: subscription.items.data[0].price.id,
                stripeSubscriptionId: subscription.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            }
        })
    }

    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string,
        );
        await db.userSubScription.update({
            where: {
                stripeSubscriptionId: subscription.id,
            }, data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000
                ),
            }
        });
    }

    return new NextResponse(null, {
        status: 200
    });
}
