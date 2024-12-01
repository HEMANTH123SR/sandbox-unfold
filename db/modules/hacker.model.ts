import mongoose from "mongoose";
// Schema for a Stamp
const StampSchema = new mongoose.Schema({
  hackerId: {
    type: mongoose.Schema.Types.ObjectId,
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
});

// Schema for a Hackathon
const HackathonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming there is a User schema for organizers
    required: true,
  },
  stampRequests: [StampSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Hackathon = mongoose.model("Hackathon", HackathonSchema);

module.exports = Hackathon;
