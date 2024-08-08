import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";

import {
    increaseApiLimit,
    checkApiLimit
} from "@/lib/api-limit"
import { checkSubscription } from '@/lib/subscription';


export async function POST(
    req: Request
) {
    try {
        // Write your own dynamic content genetation code here

        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "512x512" } = body;


        if (!userId) {
            new NextResponse("UnAuthorized User", { status: 401 })
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        const freeTrial = await checkApiLimit();
        const isPro = checkSubscription();

        if (!freeTrial && !isPro) {
            return new NextResponse("Free trial is expired", { status: 403 });
        }

        if (!isPro) {
            await increaseApiLimit();
        }

        return NextResponse.json("All Ok", { status: 200 });

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}