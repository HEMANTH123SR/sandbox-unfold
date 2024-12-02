import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/db/index"; // Adjust the import path as needed
import { Hackathon } from "@/db/modules/hacker.model"; // Adjust the import path as needed

export async function POST(
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

    // Parse the request body
    const { hackerId } = await req.json();

    if (!hackerId) {
      return NextResponse.json(
        { message: "Hacker ID is required" },
        { status: 400 }
      );
    }

    // Fetch the existing hackathon
    const existingHackathon = await Hackathon.findById(hackathonId);

    if (!existingHackathon) {
      return NextResponse.json(
        { message: "Hackathon not found" },
        { status: 404 }
      );
    }

    // Check if a stamp request from this hacker already exists
    const existingStampRequest = existingHackathon.stampRequests.find(
      (request) => request.hackerId === hackerId
    );

    if (existingStampRequest) {
      return NextResponse.json(
        { message: "Stamp request already exists" },
        { status: 400 }
      );
    }

    // Add new stamp request
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      hackathonId,
      {
        $push: {
          stampRequests: {
            hackerId,
            status: "pending",
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Stamp request sent successfully",
        hackathon: updatedHackathon,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Stamp request error:", error);
    return NextResponse.json(
      {
        message: "Stamp request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
