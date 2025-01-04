import { deleteDish } from "@/actions/app/deleteData/deleteDish";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    const rateLimitUnmet = true; //TODO: implement Ratelimiting, [20, 60]
    if (!rateLimitUnmet) {
        return NextResponse.json({ message: 'Too many requests, please try again later.' }, { status: 429, });
    }
    const dishId = req.nextUrl.searchParams.get("dishId");
    if (!dishId) {
        return NextResponse.json({ message: "Invalid Id/ Id not found." }, { status: 404 });
    }
    try {
        await deleteDish(dishId);
    } catch (e) {
        if (e instanceof Error) {
            return NextResponse.json({ message: `Internal server error: ${e.message}` }, { status: 400 });
        }
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
    return NextResponse.json({ message: "Dish deleted" }, { status: 200 });
} 