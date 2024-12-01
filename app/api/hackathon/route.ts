import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/db/index"; // Adjust the import path as needed
import { Hackathon } from "@/db/modules/hacker.model"; // Adjust the import path as needed

export async function POST(req: NextRequest) {
  try {
    // Authenticate the user using Clerk

    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const requestData = await req.json();
    console.log("Received hackathon data", requestData);

    // Destructure the required fields
    const {
      name,
      description,
      date,
      location,
      organizerId,
      cover,
      stamp,
      userId,
    } = requestData;

    if (userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Check if a hackathon with the same name already exists
    const existingHackathon = await Hackathon.findOne({ name });

    if (existingHackathon) {
      return NextResponse.json(
        {
          message: "A hackathon with this name already exists",
          nameInUse: true,
        },
        { status: 400 }
      );
    }

    // Create the Hackathon
    const newHackathon = new Hackathon({
      name,
      description,
      date: new Date(date), // Ensure date is converted to Date object
      location,
      organizerId,
      cover,
      stamp,
      stampRequests: [], // Initialize empty stamp requests array
    });

    // Save the hackathon to the database
    const savedHackathon = await newHackathon.save();

    console.log("Hackathon creation response", savedHackathon);

    return NextResponse.json(
      {
        message: "Hackathon created successfully",
        hackathonId: savedHackathon._id,
        name: savedHackathon.name,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Hackathon creation error:", error);
    return NextResponse.json(
      {
        message: "Hackathon creation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
