import type { DeveloperProfile } from '../types';

export const mockProfile: DeveloperProfile = {
  name: "Sarah Chen",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
  bio: "Full-stack developer passionate about Web3 and blockchain technology. Building the future of decentralized applications.",
  social: {
    github: "https://github.com/sarahchen",
    linkedin: "https://linkedin.com/in/sarahchen",
    twitter: "https://twitter.com/sarahchen",
    githubBadges: [
      {
        id: "1",
        name: "Arctic Code Vault",
        description: "Contributed code to the 2020 GitHub Archive Program",
        imageUrl: "https://github.githubassets.com/images/modules/profile/badge--acv-64.png",
        earnedDate: "2020-07-15"
      },
      {
        id: "2",
        name: "Pull Shark",
        description: "Opened 100 merged pull requests",
        imageUrl: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png",
        earnedDate: "2023-01-20"
      },
      {
        id: "3",
        name: "Galaxy Brain",
        description: "Answered 100 discussions with accepted answers",
        imageUrl: "https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png",
        earnedDate: "2023-06-10"
      }
    ]
  },
  achievements: [
    {
      id: "1",
      type: "hackathon",
      name: "ETHGlobal London 2024",
      date: "2024-03-15",
      description: "First place winner in the DeFi track with a decentralized lending protocol",
      issuer: "ETHGlobal",
      verified: true,
      nftData: {
        tokenId: "1234",
        contractAddress: "0x1234...5678",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80"
      }
    },
    {
      id: "2",
      type: "certification",
      name: "Ethereum Developer Certification",
      date: "2024-01-20",
      description: "Advanced certification in Ethereum development and smart contract programming",
      issuer: "Ethereum Foundation",
      verified: true
    },
    {
      id: "3",
      type: "conference",
      name: "DevCon 2023",
      date: "2023-11-10",
      description: "Speaker at DevCon 2023 - 'Building Scalable DApps with Layer 2 Solutions'",
      issuer: "Ethereum Foundation",
      verified: true
    },
    {
      id: "4",
      type: "meetup",
      name: "Web3 Toronto",
      date: "2024-02-15",
      description: "Organized monthly Web3 developer meetup with 200+ attendees",
      issuer: "Web3 Toronto Community",
      verified: true
    }
  ],
  reputationScore: 92,
  engagementScore: 85,
  web3Score: 95
};