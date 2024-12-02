import React from 'react';
import HTMLFlipBook from 'react-pageflip';
// import { format } from 'date-fns';
import { Github, Linkedin, Twitter, Trophy, Users, Rocket } from 'lucide-react';
import type { DeveloperProfile } from '../types';
import Stamp from './Stamp';
import GithubBadge from './GithubBadge';

interface PassportProps {
  profile: DeveloperProfile;
}

const Passport: React.FC<PassportProps> = ({ profile }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <HTMLFlipBook
        width={400}
        height={600}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1000}
        showCover={true}
        className="passport-book"
      >
        {/* Cover */}
        <div className="bg-indigo-900 p-8 rounded-l-lg">
          <div className="border-4 border-gold p-6 h-full flex flex-col items-center justify-center text-gold">
            <h1 className="text-4xl font-bold mb-4">DEVROOT</h1>
            <h2 className="text-2xl mb-2">PASSPORT</h2>
            <div className="mt-auto">
              <p className="text-sm">Decentralized Developer Credentials</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white p-8">
          <div className="flex items-start gap-6">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-32 h-32 rounded-full border-4 border-indigo-900"
            />
            <div>
              <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
              <p className="text-gray-600 mb-4">{profile.bio}</p>
              <div className="flex gap-4">
                <a href={profile.social.github} className="text-gray-700 hover:text-indigo-600">
                  <Github size={20} />
                </a>
                <a href={profile.social.linkedin} className="text-gray-700 hover:text-indigo-600">
                  <Linkedin size={20} />
                </a>
                <a href={profile.social.twitter} className="text-gray-700 hover:text-indigo-600">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Badges */}
        <div className="bg-white p-8">
          <h3 className="text-xl font-bold mb-6">GitHub Achievements</h3>
          <div className="grid grid-cols-3 gap-4">
            {profile.social.githubBadges?.map((badge) => (
              <GithubBadge key={badge.id} badge={badge} />
            ))}
          </div>
        </div>

        {/* Scores */}
        <div className="bg-white p-8">
          <h3 className="text-xl font-bold mb-6">Developer Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <Trophy className="text-indigo-600 mb-2" />
              <h4 className="font-semibold">Reputation</h4>
              <p className="text-2xl font-bold text-indigo-600">{profile.reputationScore}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <Users className="text-purple-600 mb-2" />
              <h4 className="font-semibold">Engagement</h4>
              <p className="text-2xl font-bold text-purple-600">{profile.engagementScore}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <Rocket className="text-blue-600 mb-2" />
              <h4 className="font-semibold">Web3</h4>
              <p className="text-2xl font-bold text-blue-600">{profile.web3Score}</p>
            </div>
          </div>
        </div>

        {/* Achievement Stamps */}
        <div className="bg-white p-8">
          <h3 className="text-xl font-bold mb-6">Achievement Stamps</h3>
          <div className="grid grid-cols-2 gap-6">
            {profile.achievements.map((achievement) => (
              <Stamp key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </div>
      </HTMLFlipBook>
    </div>
  );
};

export default Passport;