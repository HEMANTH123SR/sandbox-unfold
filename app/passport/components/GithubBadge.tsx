import React from 'react';
import type { GithubBadge as GithubBadgeType } from '../types';

interface GithubBadgeProps {
  badge: GithubBadgeType;
}

const GithubBadge: React.FC<GithubBadgeProps> = ({ badge }) => {
  return (
    <div className="relative w-32 h-32 border-2 border-gray-300 rounded-full overflow-hidden transform hover:scale-105 transition-transform">
      <img
        src={badge.imageUrl}
        alt={badge.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-2">
        <p className="text-xs text-white text-center truncate">{badge.name}</p>
      </div>
    </div>
  );
};

export default GithubBadge;