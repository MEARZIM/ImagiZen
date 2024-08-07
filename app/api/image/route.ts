import { auth } from '@clerk/nextjs/server';
import { NextResponse } from "next/server";




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

       

        return NextResponse.json("All Ok", { status: 200});

    } catch (error) {
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}