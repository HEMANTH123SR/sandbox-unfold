import type { Achievement } from '../types';

export const calculateReputationScore = (achievements: Achievement[]): number => {
  const weights = {
    hackathon: 10,
    conference: 5,
    meetup: 3,
    certification: 8
  };

  return achievements.reduce((score, achievement) => {
    return score + (weights[achievement.type] || 0);
  }, 0);
};

export const calculateEngagementScore = async (): Promise<number> => {
  // This would typically make API calls to GitHub, LinkedIn, and Twitter
  // For demo purposes, returning a mock score
  return 85;
};

export const calculateWeb3Score = (achievements: Achievement[]): number => {
  const web3Events = achievements.filter(a => 
    a.description.toLowerCase().includes('web3') || 
    a.description.toLowerCase().includes('blockchain')
  );
  
  return Math.min(100, web3Events.length * 15);
};