import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const { title } = await req.json();

        // Check if user is authenticated
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Assuming you want to create a course or perform some operation with the title
        const course = await db.course.create({ data: { title, userId } }); // Example operation

        // Return a successful response with the created course information
        return new NextResponse(JSON.stringify(course), { status: 201 });

    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}