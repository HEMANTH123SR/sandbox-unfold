// Interfaces for Hackathon and related types
export interface StampRequest {
  hackerId: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  _id: string;
}

export interface Hackathon {
  _id: string;
  cover: string;
  name: string;
  description: string;
  date: string;
  location: string;
  organizerId: string;
  stampRequests: StampRequest[];
  stamp: string;
  createdAt: string;
  updatedAt: string;
}
