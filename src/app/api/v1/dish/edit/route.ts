import { NextRequest, NextResponse } from "next/server";
// import { RedisRateLimiter } from "@/lib/rateLimiter/client";
import { editDish } from "@/actions/app/mutateData/editDish";

export async function POST(req: NextRequest) {

    // const ip = req.headers.get('x-forwarded-for');
    // const path = req.nextUrl.pathname;
    // const identifier = `${path}-${ip}`
    // const rateLimit = await RedisRateLimiter.rateLimit(identifier as string, 5, 60);

    // if (!rateLimit.success) {
    //     return NextResponse.json({ message: 'Too many requests, please try again later.' }, { status: 429, });
    // }
    const values = await req.json();
    const dishId = req.nextUrl.searchParams.get("dishId");
    if (!dishId) {
        return NextResponse.json({ message: "Invalid Id/ Id not found." }, { status: 404 });
    }
    try {
        await editDish(dishId, values);
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({ message: e.message }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Dish created" }, { status: 200 });
} 