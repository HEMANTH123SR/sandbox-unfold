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

    // Query the database for all hackathons with stampRequests for the user
    const hackathons = await Hackathon.aggregate([
      { $unwind: "$stampRequests" }, // Deconstruct the array to access individual elements
      {
        $match: {
          "stampRequests.hackerId": userId,
          "stampRequests.status": "Approved",
        },
      },
      { $sort: { "stampRequests.createdAt": -1 } }, // Sort by the most recent createdAt
      { $limit: 1 }, // Get only the latest
      {
        $project: {
          tokenUri: "$stampRequests.tokenUri", // Include only tokenUri in the result
        },
      },
    ]);

    if (!hackathons.length) {
      return NextResponse.json(
        { message: "No approved stamps found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Latest approved tokenUri retrieved successfully",
        tokenUri: hackathons[0].tokenUri,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Hackathon retrieval error:", error);
    return NextResponse.json(
      {
        message: "Failed to retrieve approved tokenUri",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
