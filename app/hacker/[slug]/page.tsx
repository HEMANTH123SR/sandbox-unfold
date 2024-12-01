// "use client";

// import React, { useState, useEffect } from "react";
// import { format } from "date-fns";
// import { Hackathon } from "@/app/hacker/[slug]/lib/interface";
// import { getImage } from "@/lib/appwrite";
// import { useUser } from "@clerk/nextjs";
// import Link from "next/link";

// interface HackathonPageProps {
//   params: { slug: string };
// }

// const HackathonPage: React.FC<HackathonPageProps> = ({ params }) => {
//   const { user } = useUser();
//   const userid = user?.id;
//   const [hackathon, setHackathon] = useState<Hackathon | null>(null);
//   const [coverImageUrl, setCoverImageUrl] = useState<string | undefined>(
//     undefined
//   );
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [requestStatus, setRequestStatus] = useState<
//     "idle" | "pending" | "error"
//   >("idle");

//   useEffect(() => {
//     const fetchHackathonDetails = async () => {
//       try {
//         const response = await fetch(`/api/hackathon/${params.slug}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch hackathon details");
//         }
//         const data = await response.json();
//         setHackathon(data.hackathon);

//         if (data.hackathon.cover) {
//           const imageUrl = await getImage(data.hackathon.cover);
//           setCoverImageUrl(imageUrl);
//         }

//         setLoading(false);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred"
//         );
//         setLoading(false);
//       }
//     };

//     fetchHackathonDetails();
//   }, [params.slug]);

//   const sendStampRequest = async () => {
//     if (!userid || !hackathon) return;

//     setRequestStatus("pending");
//     try {
//       const response = await fetch(`/api/hackathon/${params.slug}/request`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ hackerId: userid }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to send stamp request");
//       }

//       const updatedHackathon = await response.json();
//       setHackathon(updatedHackathon);
//       setRequestStatus("idle");
//     } catch (err) {
//       console.error(err);
//       setRequestStatus("error");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black text-primary flex items-center justify-center">
//         <div className="space-y-4">
//           <div className="w-16 h-16 border-t-2 border-primary rounded-full animate-spin" />
//           <p className="text-center text-primary/60">
//             Loading hackathon details...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-black text-primary flex items-center justify-center">
//         <div className="max-w-md text-center space-y-4">
//           <p className="text-red-400 text-xl font-light">{error}</p>
//           <Link
//             href="/hackathons"
//             className="inline-block text-primary/60 hover:text-primary transition-colors"
//           >
//             Back to Hackathons
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   if (!hackathon) return null;

//   return (
//     <div className="min-h-screen bg-black text-primary w-full">
//       {/* Hero Section */}
//       <div className="relative h-[60vh] w-full">
//         {coverImageUrl ? (
//           <div className="absolute inset-0">
//             <img
//               src={coverImageUrl}
//               alt={`${hackathon.name} cover`}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black" />
//           </div>
//         ) : (
//           <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black" />
//         )}

//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="max-w-4xl w-full px-6">
//             <Link
//               href="/hackathons"
//               className="inline-block text-primary/60 hover:text-primary mb-8 transition-colors"
//             >
//               ← Back to Hackathons
//             </Link>
//             <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
//               {hackathon.name}
//             </h1>
//           </div>
//         </div>
//       </div>

//       {/* Content Section */}
//       <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
//         {/* Event Details */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <div>
//             <h3 className="text-primary/60 text-sm mb-1">Date & Time</h3>
//             <p className="text-lg font-medium">
//               {format(new Date(hackathon.date), "MMMM dd, yyyy - hh:mm a")}
//             </p>
//           </div>
//           <div>
//             <h3 className="text-primary/60 text-sm mb-1">Location</h3>
//             <a
//               href={hackathon.location}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-lg font-medium hover:text-blue-400 transition-colors"
//             >
//               View Location
//             </a>
//           </div>
//           <div>
//             <h3 className="text-primary/60 text-sm mb-1">Participants</h3>
//             <p className="text-lg font-medium">
//               {hackathon.stampRequests.length} Registered
//             </p>
//           </div>
//         </div>

//         {/* Description */}
//         <div>
//           <h2 className="text-2xl font-bold mb-6">About the Hackathon</h2>
//           <p className="text-primary/80 text-lg leading-relaxed">
//             {hackathon.description}
//           </p>
//         </div>

//         {/* Conditional Rendering for Participants/Request */}
//         {userid === hackathon.organizerId ? (
//           hackathon.stampRequests.length > 0 ? (
//             <div>
//               <h2 className="text-2xl font-bold mb-8">Participants</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {hackathon.stampRequests.map((stamp, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
//                   >
//                     <div className="flex justify-between items-center">
//                       <span className="font-medium">{stamp.hackerId}</span>
//                       <span
//                         className={`
//                           px-3 py-1 rounded-full text-xs font-medium
//                           ${
//                             stamp.status === "Approved"
//                               ? "bg-green-500/10 text-green-400"
//                               : stamp.status === "Pending"
//                               ? "bg-yellow-500/10 text-yellow-400"
//                               : "bg-red-500/10 text-red-400"
//                           }
//                         `}
//                       >
//                         {stamp.status}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <div className="text-center text-primary/60">
//               No participants have registered yet.
//             </div>
//           )
//         ) : (
//           <div className="text-center">
//             <button
//               onClick={sendStampRequest}
//               disabled={requestStatus === "pending"}
//               className={`
//                 px-8 py-3 rounded-lg text-lg font-medium transition-colors
//                 ${
//                   requestStatus === "pending"
//                     ? "bg-gray-700 text-gray-400 cursor-not-allowed"
//                     : "bg-primary text-black hover:bg-primary/80"
//                 }
//               `}
//             >
//               {requestStatus === "pending"
//                 ? "Sending Request..."
//                 : requestStatus === "error"
//                 ? "Request Failed. Try Again"
//                 : "Request Stamp"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HackathonPage;

"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Hackathon, StampRequest } from "@/app/hacker/[slug]/lib/interface";
import { getImage } from "@/lib/appwrite";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

interface HackathonPageProps {
  params: { slug: string };
}

const HackathonPage: React.FC<HackathonPageProps> = ({ params }) => {
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
  const [editMode, setEditMode] = useState(false);
  const [editedHackathon, setEditedHackathon] = useState<Partial<Hackathon>>(
    {}
  );

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
      setHackathon(updatedHackathon);
      setRequestStatus("idle");
    } catch (err) {
      console.error(err);
      setRequestStatus("error");
    }
  };

  const updateHackathon = async () => {
    if (!hackathon) return;

    try {
      const response = await fetch(`/api/hackathon/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedHackathon),
      });

      if (!response.ok) {
        throw new Error("Failed to update hackathon");
      }

      const updatedData = await response.json();
      setHackathon(updatedData.hackathon);
      setEditMode(false);
    } catch (err) {
      console.error(err);
      setError("Failed to update hackathon");
    }
  };

  const updateStampRequestStatus = async (
    stampRequestId: string,
    status: "Approved" | "Rejected"
  ) => {
    if (!hackathon) return;

    try {
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
              href="/hackathons"
              className="inline-block text-primary/60 hover:text-primary mb-8 transition-colors"
            >
              ← Back to Hackathons
            </Link>
            {userid === hackathon.organizerId && !editMode ? (
              <div className="flex items-center justify-between">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                  {hackathon.name}
                </h1>
                <button
                  onClick={() => {
                    setEditedHackathon({
                      name: hackathon.name,
                      description: hackathon.description,
                      date: hackathon.date,
                      location: hackathon.location,
                    });
                    setEditMode(true);
                  }}
                  className="bg-primary/20 text-primary px-4 py-2 rounded-lg hover:bg-primary/30 transition-colors"
                >
                  Edit
                </button>
              </div>
            ) : userid === hackathon.organizerId && editMode ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={editedHackathon.name || ""}
                  onChange={(e) =>
                    setEditedHackathon((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-5xl md:text-7xl font-bold tracking-tighter mb-6"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={updateHackathon}
                    className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                {hackathon.name}
              </h1>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-primary/60 text-sm mb-1">Date & Time</h3>
            {editMode ? (
              <input
                type="datetime-local"
                value={
                  editedHackathon.date
                    ? format(
                        new Date(editedHackathon.date),
                        "yyyy-MM-dd'T'HH:mm"
                      )
                    : ""
                }
                onChange={(e) =>
                  setEditedHackathon((prev) => ({
                    ...prev,
                    date: new Date(e.target.value).toISOString(),
                  }))
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
              />
            ) : (
              <p className="text-lg font-medium">
                {format(new Date(hackathon.date), "MMMM dd, yyyy - hh:mm a")}
              </p>
            )}
          </div>
          <div>
            <h3 className="text-primary/60 text-sm mb-1">Location</h3>
            {editMode ? (
              <input
                type="text"
                value={editedHackathon.location || ""}
                onChange={(e) =>
                  setEditedHackathon((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2"
              />
            ) : (
              <a
                href={hackathon.location}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:text-blue-400 transition-colors"
              >
                View Location
              </a>
            )}
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
          {editMode ? (
            <textarea
              value={editedHackathon.description || ""}
              onChange={(e) =>
                setEditedHackathon((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 min-h-[150px]"
            />
          ) : (
            <p className="text-primary/80 text-lg leading-relaxed">
              {hackathon.description}
            </p>
          )}
        </div>

        {/* Conditional Rendering for Participants/Request */}
        {userid === hackathon.organizerId ? (
          hackathon.stampRequests.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mb-8">Participants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hackathon.stampRequests.map((stamp, index) => (
                  <div
                    key={index}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{stamp.hackerId}</span>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-medium
                            ${
                              stamp.status === "Approved"
                                ? "bg-green-500/10 text-green-400"
                                : stamp.status === "Pending"
                                ? "bg-yellow-500/10 text-yellow-400"
                                : "bg-red-500/10 text-red-400"
                            }
                          `}
                        >
                          {stamp.status}
                        </span>
                        {stamp.status === "Pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                updateStampRequestStatus(stamp._id, "Approved")
                              }
                              className="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg hover:bg-green-500/30 transition-colors text-xs"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                updateStampRequestStatus(stamp._id, "Rejected")
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
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-primary/60">
              No participants have registered yet.
            </div>
          )
        ) : (
          <div className="text-center">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonPage;
