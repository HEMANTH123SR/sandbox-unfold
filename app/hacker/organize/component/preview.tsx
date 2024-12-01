import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface HackathonPreviewProps {
  coverImage: string | null;
  stampImage: string | null;
  name: string;
  description: string;
  date: string;
  location: string;
}

const HackathonPreview: React.FC<HackathonPreviewProps> = ({
  coverImage,
  stampImage,
  name,
  description,
  date,
  location,
}) => {
  return (
    <div className="bg-black text-white min-h-screen p-8">
      <Card className="max-w-2xl mx-auto bg-gray-900 border-gray-800 overflow-hidden">
        {/* Cover Image */}
        <div className="relative w-full h-64">
          {coverImage ? (
            <Image
              src={coverImage}
              alt="Hackathon Cover"
              layout="fill"
              objectCover="cover"
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-500">
              No Cover Image
            </div>
          )}

          {/* Stamp Image */}
          {stampImage && (
            <div className="absolute bottom-4 right-4 w-24 h-24 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <Image
                src={stampImage}
                alt="Hackathon Stamp"
                layout="fill"
                objectCover="cover"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Hackathon Details */}
        <div className="p-6 space-y-4">
          <h1 className="text-4xl font-bold mb-2">
            {name || <span className="text-gray-500">Hackathon Name</span>}
          </h1>

          <p className="text-xl text-gray-300">
            {description || (
              <span className="text-gray-500">
                Description of the hackathon
              </span>
            )}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-400">Date</h3>
              <p className="text-xl">
                {date ? (
                  format(new Date(date), "MMMM d, yyyy")
                ) : (
                  <span className="text-gray-500">Select a date</span>
                )}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-400">Location</h3>
              <p className="text-xl">
                {location || (
                  <span className="text-gray-500">Select a location</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HackathonPreview;
