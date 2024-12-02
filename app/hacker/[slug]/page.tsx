"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Hackathon } from "@/app/hacker/[slug]/lib/interface";
import { getImage } from "@/lib/appwrite";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface HackathonPageProps {
  params: { slug: string };
}

const HackathonPage: React.FC<HackathonPageProps> = ({ params }) => {
  const router = useRouter();
  const { user } = useUser();
  const userid = user?.id;
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestStatus, setRequestStatus] = useState<
    "idle" | "pending" | "error"
  >("idle");

  useEffect(() => {
    const fetchHackathonDetails = async () => {
      try {
        const response = await fetch(`/api/hackathon/${params.slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch hackathon details");
        }
        const data = await response.json();
        setHackathon(data.hackathon);

        if (data.hackathon.cover) {
          const imageUrl = await getImage(data.hackathon.cover);
          setCoverImageUrl(imageUrl);
        }

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        setLoading(false);
      }
    };

    fetchHackathonDetails();
  }, [params.slug]);

  const sendStampRequest = async () => {
    if (!userid || !hackathon) return;

    setRequestStatus("pending");
    try {
      const response = await fetch(`/api/hackathon/${params.slug}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hackerId: userid }),
      });

      if (!response.ok) {
        throw new Error("Failed to send stamp request");
      }

      const updatedHackathon = await response.json();
      console.log("updated hackathon:", updatedHackathon);
      // setHackathon(updatedHackathon);
      setRequestStatus("idle");
    } catch (err) {
      console.error(err);
      setRequestStatus("error");
    }
  };

  const updateStampRequestStatus = async (
    stampRequestId: string,
    status: "Approved" | "Rejected"
  ) => {
    try {
      console.log("stamp request id:", stampRequestId);

      const response = await fetch(`/api/hackathon/${params.slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stampRequestId, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update stamp request status");
      }

      const updatedData = await response.json();

      setHackathon(updatedData.hackathon);
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Failed to update stamp request status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-primary flex items-center justify-center">
        <div className="space-y-4">
          <div className="w-16 h-16 border-t-2 border-primary rounded-full animate-spin" />
          <p className="text-center text-primary/60">
            Loading hackathon details...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-primary flex items-center justify-center">
        <div className="max-w-md text-center space-y-4">
          <p className="text-red-400 text-xl font-light">{error}</p>
          <Link
            href="/hackathons"
            className="inline-block text-primary/60 hover:text-primary transition-colors"
          >
            Back to Hackathons
          </Link>
        </div>
      </div>
    );
  }

  if (!hackathon) return null;

  return (
    <div className="min-h-screen bg-black text-primary w-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        {coverImageUrl ? (
          <div className="absolute inset-0">
            <img
              src={coverImageUrl}
              alt={`${hackathon.name} cover`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
        )}

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-4xl w-full px-6">
            <Link
              href="/"
              className="inline-block text-primary/60 hover:text-primary mb-8 transition-colors"
            >
              ← Back to Hackathons
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              {hackathon.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary/60 text-sm mb-1">Location</h3>
            <a
              href={hackathon.location}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-blue-400 transition-colors"
            >
              View Location
            </a>
          </div>
          <div>
            <h3 className="text-primary/60 text-sm mb-1">Date</h3>
            {/* <p className="text-lg font-medium">
              {format(new Date(hackathon.date), "MMMM dd, yyyy")}
            </p> */}
            {hackathon.date && <p>{hackathon.date.slice(0, 10)}</p>}
          </div>
          <div>
            <h3 className="text-primary/60 text-sm mb-1">Participants</h3>
            <p className="text-lg font-medium">
              {hackathon.stampRequests.length} Registered
            </p>
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="text-2xl font-bold mb-6">About the Hackathon</h2>
          <p className="text-primary/80 text-lg leading-relaxed">
            {hackathon.description}
          </p>
        </div>

        {/* Stamp Request Section */}
        {userid === hackathon.organizerId ? (
          <div>
            <h2 className="text-2xl font-bold mb-8">Stamp Requests</h2>
            {hackathon.stampRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hackathon.stampRequests.map(
                  (stamp) => (
                    console.log("stamp:", stamp),
                    (
                      <div
                        key={stamp._id}
                        className="p-5 border-slate-600 w-full "
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <span className="font-medium text-primary">
                              {stamp.hackerId}
                            </span>
                            <span className="text-sm text-primary/60">
                              {format(
                                new Date(stamp.createdAt),
                                "MMMM dd, yyyy HH:mm"
                              )}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span
                              className={`
                            px-3 py-1 rounded-full text-xs font-medium capitalize
                            ${
                              stamp.status === "approved"
                                ? "bg-green-500/10 text-green-400"
                                : stamp.status === "pending"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                            }
                          `}
                            >
                              {stamp.status}
                            </span>

                            {stamp.status === "pending" && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    updateStampRequestStatus(
                                      stamp.hackerId,
                                      "Approved"
                                    )
                                  }
                                  className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg hover:bg-green-500/30 transition-colors text-xs"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() =>
                                    updateStampRequestStatus(
                                      stamp.hackerId,
                                      "Rejected"
                                    )
                                  }
                                  className="bg-red-500/20 text-red-400 px-2 py-1 rounded-lg hover:bg-red-500/30 transition-colors text-xs"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )
                )}
              </div>
            ) : (
              <div className="text-center text-primary/60">
                No stamp requests have been submitted yet.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            {/* Check if user has already submitted a request */}
            {hackathon.stampRequests.some(
              (request) => request.hackerId === userid
            ) ? (
              <div className="text-primary/80">
                <p className="mb-4">
                  You have already submitted a stamp request.
                </p>
                <p className="text-sm text-primary/60">
                  Current Status:{" "}
                  {
                    hackathon.stampRequests.find(
                      (request) => request.hackerId === userid
                    )?.status
                  }
                </p>
              </div>
            ) : (
              <button
                onClick={sendStampRequest}
                disabled={requestStatus === "pending"}
                className={`
                  px-8 py-3 rounded-lg text-lg font-medium transition-colors
                  ${
                    requestStatus === "pending"
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-black hover:bg-primary/80"
                  }
                `}
              >
                {requestStatus === "pending"
                  ? "Sending Request..."
                  : requestStatus === "error"
                  ? "Request Failed. Try Again"
                  : "Request Stamp"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonPage;
