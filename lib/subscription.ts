import { auth } from "@clerk/nextjs/server";
import { db } from "./prismadb";



const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const {userId} = auth();

    if (!userId) {
        return false;
    }

    const userSubScription = await db.userSubScription.findUnique({
        where : {
            userId : userId as string
        },
        select: {
          stripeSubscriptionId: true,
          stripeCustomerId: true,
          stripeCurrentPeriodEnd: true,
          stripePriceId: true
        }
    })

    if (!userSubScription) {
        return false;
    }


    const isValid = userSubScription.stripePriceId && userSubScription.stripeCurrentPeriodEnd?.getTime()! > Date.now();

    return !!isValid;
}