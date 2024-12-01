import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/db/index";
import { Hackathon } from "@/db/modules/hacker.model";
import pinataSDK from "@pinata/sdk";

// Initialize Pinata
const pinata = new pinataSDK(
  process.env.PINATA_API_KEY, 
  process.env.PINATA_SECRET_KEY
);

export async function POST(req: NextRequest) {
  try {
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

    // Upload metadata to IPFS via Pinata
    let ipfsHash = null;
    try {
      const metadata = {
        name,
        description,
        date,
        location,
        cover,
        stamp
      };

      const pinataResponse = await pinata.pinJSONToIPFS(metadata, {
        pinataMetadata: {
          name: `hackathon-${name}-metadata`
        }
      });

      ipfsHash = pinataResponse.IpfsHash;
    } catch (ipfsError) {
      console.error("IPFS Upload Error:", ipfsError);
      // Optionally, you can choose to continue without IPFS upload
      // or return an error
    }

    // Create the Hackathon
    const newHackathon = new Hackathon({
      name,
      description,
      date: new Date(date),
      location,
      organizerId,
      cover,
      stamp,
      stampRequests: [], // Initialize empty stamp requests array
      ipfsMetadataHash: ipfsHash // Store IPFS hash if upload was successful
    });

    // Save the hackathon to the database
    const savedHackathon = await newHackathon.save();

    console.log("Hackathon creation response", savedHackathon);

    return NextResponse.json(
      {
        message: "Hackathon created successfully",
        hackathonId: savedHackathon._id,
        name: savedHackathon.name,
        ipfsHash: ipfsHash // Return IPFS hash to client if needed
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