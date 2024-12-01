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

export async function PUT(
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

    // Fetch the existing hackathon
    const existingHackathon = await Hackathon.findById(hackathonId);

    if (!existingHackathon) {
      return NextResponse.json(
        { message: "Hackathon not found" },
        { status: 404 }
      );
    }

    // Check if the user is the organizer
    if (existingHackathon.organizerId !== userId) {
      return NextResponse.json(
        { message: "You are not authorized to update this hackathon" },
        { status: 403 }
      );
    }

    // Parse the request body
    const requestBody = await req.json();

    // Define the fields that can be updated
    const updateFields = {
      name: requestBody.name,
      description: requestBody.description,
      date: requestBody.date,
      location: requestBody.location,
      cover: requestBody.cover,
    };

    // Remove undefined fields
    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    // Update the hackathon
    const updatedHackathon = await Hackathon.findByIdAndUpdate(
      hackathonId,
      updateFields,
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Hackathon updated successfully",
        hackathon: updatedHackathon,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Hackathon update error:", error);
    return NextResponse.json(
      {
        message: "Hackathon update failed",
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

    // Fetch the existing hackathon
    const existingHackathon = await Hackathon.findById(hackathonId);

    if (!existingHackathon) {
      return NextResponse.json(
        { message: "Hackathon not found" },
        { status: 404 }
      );
    }

    // Check if the user is the organizer
    if (existingHackathon.organizerId !== userId) {
      return NextResponse.json(
        { message: "You are not authorized to update this hackathon" },
        { status: 403 }
      );
    }

    // Parse the request body
    const requestBody = await req.json();

    // Handle stamp request status updates
    if (requestBody.stampRequestId && requestBody.status) {
      const updatedHackathon = await Hackathon.findOneAndUpdate(
        {
          _id: hackathonId,
          "stampRequests._id": requestBody.stampRequestId,
        },
        {
          $set: {
            "stampRequests.$.status": requestBody.status,
          },
        },
        { new: true }
      );

      return NextResponse.json(
        {
          message: "Stamp request status updated successfully",
          hackathon: updatedHackathon,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "No valid update operation" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Hackathon patch error:", error);
    return NextResponse.json(
      {
        message: "Hackathon update failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
