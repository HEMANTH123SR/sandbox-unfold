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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate the user using Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const { stampRequestId, status } = await req.json();

    if (!stampRequestId || !["Approved", "Rejected"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid request. StampRequestId and status are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Find the hackathon by ID
    const hackathon = await Hackathon.findById(params.id);

    if (!hackathon) {
      return NextResponse.json(
        { message: "Hackathon not found" },
        { status: 404 }
      );
    }

    // Find the specific stamp request
    const stampRequest = hackathon.stampRequests.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (request: { hackerId: any }) => request.hackerId === stampRequestId // Use hackerId or other unique identifier
    );

    if (!stampRequest) {
      return NextResponse.json(
        { message: "Stamp request not found" },
        { status: 404 }
      );
    }

    // Update the status of the stamp request
    stampRequest.status = status;

    // Save the hackathon document
    await hackathon.save();

    return NextResponse.json(
      { message: "Stamp request status updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating stamp request status:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
