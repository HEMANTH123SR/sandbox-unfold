import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/db/index"; // Adjust the import path as needed
import { Hackathon } from "@/db/modules/hacker.model"; // Adjust the import path as needed

export async function GET() {
  try {
    // Authenticate the user using Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Fetch the hackathon by ID
    const hackathons = await Hackathon.find({});

    if (!hackathons) {
      return NextResponse.json(
        { message: "Hackathon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Hackathon retrieved successfully",
        hackathons,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Hackathon retrieval error:", error);
    return NextResponse.json(
      {
        message: "Hackathon retrieval failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
