import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/db/index"; // Adjust the import path as needed
import { Hackathon } from "@/db/modules/hacker.model"; // Adjust the import path as needed

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate the user using Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Connect to the database
    await connectToDatabase();

    // Extract the hackathon ID from the request
    const hackathonId = params.id;

    if (!hackathonId) {
      return NextResponse.json(
        { message: "Hackathon ID is required" },
        { status: 400 }
      );
    }

    // Fetch the hackathon by ID
    const hackathon = await Hackathon.findById(hackathonId);

    if (!hackathon) {
      return NextResponse.json(
        { message: "Hackathon not found" },
        { status: 404 }
      );
    }

    // Optional: Add additional authorization check if needed
    // Uncomment and modify as per your requirements
    // if (hackathon.organizerId !== userId) {
    //   return NextResponse.json(
    //     { message: "You are not authorized to view this hackathon" },
    //     { status: 403 }
    //   );
    // }

    return NextResponse.json(
      {
        message: "Hackathon retrieved successfully",
        hackathon,
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
