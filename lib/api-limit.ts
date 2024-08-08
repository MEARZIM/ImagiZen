import { auth } from "@clerk/nextjs/server";
import { db } from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constant";


export const increaseApiLimit = async () => {
    const {userId} = auth();

    if (!userId) {
        return;
    }

    const userApiLimit = await db.userApiLimit.findUnique({
        where: {userId: userId}
    })

    if(userApiLimit) {
        await db.userApiLimit.update({
            where: {userId: userId},
            data:{
                count: userApiLimit.count + 1
            }
        })
    } else {
        await db.userApiLimit.create({
            data:{
                userId,
                count: 1
            }
        })
    }
}


export const checkApiLimit = async () => {
    const {userId} = auth();

    if (!userId) {
        return;
    }

    const userApiLimit = await db.userApiLimit.findUnique({
        where: {userId: userId}
    })

    if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
        return true;
    } else {
        false;
    }
}