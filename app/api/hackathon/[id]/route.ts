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

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Authenticate the user using Clerk
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Connect to the database
//     await connectToDatabase();

//     // Extract the hackathon ID from the request
//     const hackathonId = params.id;

//     if (!hackathonId) {
//       return NextResponse.json(
//         { message: "Hackathon ID is required" },
//         { status: 400 }
//       );
//     }

//     // Fetch the existing hackathon
//     const existingHackathon = await Hackathon.findById(hackathonId);

//     if (!existingHackathon) {
//       return NextResponse.json(
//         { message: "Hackathon not found" },
//         { status: 404 }
//       );
//     }

//     // Check if the user is the organizer
//     if (existingHackathon.organizerId !== userId) {
//       return NextResponse.json(
//         { message: "You are not authorized to update this hackathon" },
//         { status: 403 }
//       );
//     }

//     // Parse the request body
//     const requestBody = await req.json();

//     // Define the fields that can be updated
//     const updateFields = {
//       name: requestBody.name,
//       description: requestBody.description,
//       date: requestBody.date,
//       location: requestBody.location,
//       cover: requestBody.cover,
//     };

//     // Remove undefined fields
//     Object.keys(updateFields).forEach(
//       (key) => updateFields[key] === undefined && delete updateFields[key]
//     );

//     // Update the hackathon
//     const updatedHackathon = await Hackathon.findByIdAndUpdate(
//       hackathonId,
//       updateFields,
//       { new: true }
//     );

//     return NextResponse.json(
//       {
//         message: "Hackathon updated successfully",
//         hackathon: updatedHackathon,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Hackathon update error:", error);
//     return NextResponse.json(
//       {
//         message: "Hackathon update failed",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   console.log("PATCH request received");
//   try {
//     // Authenticate the user using Clerk
//     const { userId } = await auth();

//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Connect to the database
//     await connectToDatabase();

//     // Extract the hackathon ID from the request
//     const hackathonId = params.id;

//     console.log("Hackathon ID:", hackathonId);
//     console.log("User ID:", userId);
//     console.log("params:", params);
//     // if (!hackathonId) {
//     //   return NextResponse.json(
//     //     { message: "Hackathon ID is required" },
//     //     { status: 400 }
//     //   );
//     // }

//     // Fetch the existing hackathon
//     const existingHackathon = await Hackathon.findById(hackathonId);

//     if (!existingHackathon) {
//       return NextResponse.json(
//         { message: "Hackathon not found" },
//         { status: 404 }
//       );
//     }

//     // Check if the user is the organizer
//     if (existingHackathon.organizerId !== userId) {
//       return NextResponse.json(
//         { message: "You are not authorized to update this hackathon" },
//         { status: 403 }
//       );
//     }

//     // Parse the request body
//     const { stampRequestId, status } = await req.json();
//     console.log("stampRequestId:", stampRequestId);
//     console.log("status:", status);
//     // Handle stamp request status updates
//     if (stampRequestId && status) {
//       const updatedHackathon = await Hackathon.findOneAndUpdate(
//         {
//           _id: hackathonId,
//           "stampRequests._id": stampRequestId,
//         },
//         {
//           $set: {
//             "stampRequests.$.status": status.toLowerCase(),
//           },
//         },
//         { new: true }
//       );

//       return NextResponse.json(
//         {
//           message: "Stamp request status updated successfully",
//           hackathon: updatedHackathon,
//         },
//         { status: 200 }
//       );
//     }

//     return NextResponse.json(
//       { message: "No valid update operation" },
//       { status: 400 }
//     );
//   } catch (error) {
//     console.error("Hackathon patch error:", error);
//     return NextResponse.json(
//       {
//         message: "Hackathon update failed",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

// https://cloud.appwrite.io/v1/storage/buckets/672b6cd9002495266de5/files/${ID}/view?project=672b6bf500226ac971b7&project=672b6bf500226ac971b7&mode=admin

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Authenticate the user
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Connect to database
//     await connectToDatabase();

//     const hackathonId = params.id;
//     const { stampRequestId, status } = await req.json();

//     // Validate input
//     if (!hackathonId || !stampRequestId || !status) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Find and validate existing hackathon
//     const existingHackathon = await Hackathon.findById(hackathonId);
//     if (!existingHackathon) {
//       return NextResponse.json(
//         { message: "Hackathon not found" },
//         { status: 404 }
//       );
//     }

//     // Authorization check
//     if (existingHackathon.organizerId !== userId) {
//       return NextResponse.json(
//         { message: "Not authorized to update" },
//         { status: 403 }
//       );
//     }

//     // Perform the update
//     const updateResult = await Hackathon.updateOne(
//       {
//         _id: hackathonId,
//         "stampRequests._id": new mongoose.Types.ObjectId(stampRequestId),
//       },
//       {
//         $set: {
//           "stampRequests.$.status": status.toLowerCase(),
//         },
//       }
//     );

//     // Check if update was successful
//     if (updateResult.modifiedCount === 0) {
//       return NextResponse.json(
//         {
//           message: "Update failed",
//           details: {
//             matchedCount: updateResult.matchedCount,
//             modifiedCount: updateResult.modifiedCount,
//           },
//         },
//         { status: 400 }
//       );
//     }

//     // Fetch updated document to confirm
//     const updatedHackathon = await Hackathon.findById(hackathonId);

//     return NextResponse.json(
//       {
//         message: "Stamp request updated successfully",
//         hackathon: updatedHackathon,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Update error:", error);
//     return NextResponse.json(
//       {
//         message: "Server error during update",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     // Authenticate the user using Clerk
//     const { userId } = await auth();

//     console.log("userId:", userId);
//     if (!userId) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//     }

//     // Parse the request body
//     const { stampRequestId, status } = await req.json();
//     console.log("stampRequestId:", stampRequestId);
//     console.log("status:", status);

//     if (!stampRequestId || !["Approved", "Rejected"].includes(status)) {
//       return NextResponse.json(
//         { message: "Invalid request. StampRequestId and status are required." },
//         { status: 400 }
//       );
//     }

//     // Connect to the database
//     await connectToDatabase();

//     // Find the hackathon by slug
//     const hackathon = await Hackathon.findById(params.id);
//     console.log("hackathon:", hackathon);

//     if (!hackathon) {
//       return NextResponse.json(
//         { message: "Hackathon not found" },
//         { status: 404 }
//       );
//     }

//     // Find the specific stamp request
//     const stampRequest = hackathon.stampRequests.find(
//       (request) => request._id.toString() === stampRequestId
//     );

//     if (!stampRequest) {
//       return NextResponse.json(
//         { message: "Stamp request not found" },
//         { status: 404 }
//       );
//     }

//     // Update the stamp request status
//     stampRequest.status = status;

//     // Save the updated hackathon
//     await hackathon.save();

//     return NextResponse.json(
//       {
//         message: "Stamp request status updated successfully",
//         hackathon,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating stamp request status:", error);
//     return NextResponse.json(
//       {
//         message: "Failed to update stamp request status",
//         details: error instanceof Error ? error.message : "Unknown error",
//       },
//       { status: 500 }
//     );
//   }
// }

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
