import mongoose from "mongoose";

// Schema for a Stamp
const StampSchema = new mongoose.Schema(
  {
    hackerId: {
      type: String,
      ref: "User", // Assuming there is a User schema
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tokenUri: {
      type: String,
    },
  },
  { _id: false }
); // Prevent generating _id for subdocuments

// Schema for a Hackathon
const HackathonSchema = new mongoose.Schema(
  {
    cover: {
      type: String,
      required: true, // Fixed typo from 'require' to 'required'
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    organizerId: {
      type: String, // Changed to String to directly store Clerk user ID
      required: true,
    },
    stampRequests: [StampSchema],
    stamp: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Add automatic createdAt and updatedAt
    // Add index to improve query performance
    indexes: [
      { fields: { name: 1 }, unique: true },
      { fields: { organizerId: 1 } },
    ],
  }
);

// Prevent model recompilation
export const Hackathon =
  mongoose.models.Hackathon || mongoose.model("Hackathon", HackathonSchema);
