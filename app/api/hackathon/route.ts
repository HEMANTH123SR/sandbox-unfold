import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/db/index';
import { Hackathon } from '@/db/modules/hacker.model';
import pinataSDK from '@pinata/sdk';

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
    console.log('Received hackathon data', requestData);

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
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if a hackathon with the same name already exists
    const existingHackathon = await Hackathon.findOne({ name });

    if (existingHackathon) {
      return NextResponse.json(
        {
          message: 'A hackathon with this name already exists',
          nameInUse: true,
        },
        { status: 400 }
      );
    }

    // Generate Appwrite image URI for stamp
    const stampUri = `https://cloud.appwrite.io/v1/storage/buckets/672b6cd9002495266de5/files/${stamp}/view?project=672b6bf500226ac971b7&mode=admin`;

    // Upload metadata to IPFS via Pinata
    let ipfsHash = null;
    let pinataMetadataUri = null;
    try {
      const metadata = {
        attributes: [{ trait_type: 'Organizer ID', value: organizerId }],
        description: description,
        name: name,
        date: date, // Original date
        location: location,
        image: stampUri, // Image for blockchain
      };

      const pinataResponse = await pinata.pinJSONToIPFS(metadata, {
        pinataMetadata: {
          name: `hackathon-${name}-metadata`,
        },
      });

      ipfsHash = pinataResponse.IpfsHash;
      // Construct the Pinata metadata URI
      pinataMetadataUri = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      console.log('Pinata Metadata URI:', pinataMetadataUri);
    } catch (ipfsError) {
      console.error('IPFS Upload Error:', ipfsError);
      return NextResponse.json(
        {
          message: 'Failed to upload metadata to IPFS',
          error:
            ipfsError instanceof Error ? ipfsError.message : 'Unknown error',
        },
        { status: 500 }
      );
    }

    // Create the Hackathon
    const newHackathon = new Hackathon({
      name,
      description,
      date: new Date(date),
      location,
      organizerId,
      cover,
      stamp: stampUri, // Use the Appwrite stamp URI
      stampRequests: [
        {
          hackerId: organizerId,  // Assign hackerId (this could be the organizer or user)
          tokenUri: pinataMetadataUri, // Store the Pinata metadata URI in tokenUri
        },
      ],
      ipfsMetadataHash: ipfsHash, // Store IPFS hash if upload was successful
      pinataMetadataUri: pinataMetadataUri, // Store Pinata metadata URI
    });

    // Save the hackathon to the database
    const savedHackathon = await newHackathon.save();

    console.log('Hackathon creation response', savedHackathon);

    return NextResponse.json(
      {
        message: 'Hackathon created successfully',
        hackathonId: savedHackathon._id,
        name: savedHackathon.name,
        ipfsHash: ipfsHash,
        pinataMetadataUri: pinataMetadataUri, // This URI can be used to mint NFTs
        metadataLink: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Hackathon creation error:', error);
    return NextResponse.json(
      {
        message: 'Hackathon creation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
