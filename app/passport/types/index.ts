export interface Achievement {
  id: string;
  type: 'hackathon' | 'conference' | 'meetup' | 'certification';
  name: string;
  date: string;
  description: string;
  issuer: string;
  verified: boolean;
  nftData?: {
    tokenId: string;
    contractAddress: string;
    imageUrl: string;
  };
}

export interface GithubBadge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedDate: string;
}

export interface SocialProfile {
  github: string;
  linkedin: string;
  twitter: string;
  githubBadges?: GithubBadge[];
}

export interface DeveloperProfile {
  name: string;
  avatar: string;
  bio: string;
  social: SocialProfile;
  achievements: Achievement[];
  reputationScore: number;
  engagementScore: number;
  web3Score: number;
}