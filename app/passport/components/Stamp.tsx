import React from 'react';
import { Award } from 'lucide-react';
import { format } from 'date-fns';
import type { Achievement } from '../types';

interface StampProps {
  achievement: Achievement;
}

const Stamp: React.FC<StampProps> = ({ achievement }) => {
  const isNFT = achievement.type === 'hackathon' && achievement.nftData;

  return (
    <div className="relative w-48 h-48 border-4 border-indigo-900 rounded-lg overflow-hidden transform rotate-3 hover:rotate-0 transition-transform">
      {isNFT ? (
        <div className="relative h-full">
          <img
            src={achievement.nftData?.imageUrl}
            alt={achievement.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
            <p className="text-xs text-white truncate">{achievement.name}</p>
            <p className="text-xs text-gray-300">{format(new Date(achievement.date), 'MMM dd, yyyy')}</p>
          </div>
          {achievement.verified && (
            <Award className="absolute top-2 right-2 text-green-500" size={20} />
          )}
        </div>
      ) : (
        <div className="h-full bg-indigo-50 p-4 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-sm mb-1">{achievement.name}</h4>
            <p className="text-xs text-gray-600 line-clamp-2">{achievement.description}</p>
          </div>
          <div className="mt-2">
            <p className="text-xs text-gray-500">{format(new Date(achievement.date), 'MMM dd, yyyy')}</p>
            <p className="text-xs text-gray-600">Issued by: {achievement.issuer}</p>
          </div>
          {achievement.verified && (
            <Award className="absolute top-2 right-2 text-green-500" size={20} />
          )}
        </div>
      )}
    </div>
  );
};

export default Stamp;