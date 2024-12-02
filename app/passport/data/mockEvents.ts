import type { Event } from '../types/events';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'ETHGlobal Toronto',
    description: 'Join the biggest Ethereum hackathon in Toronto. Build, learn, and connect with the global Web3 community.',
    date: '2024-06-21',
    location: 'Toronto, Canada',
    type: 'hackathon',
    imageUrl: 'https://images.unsplash.com/photo-1558403194-611308249627?w=800&q=80',
    organizer: 'ETHGlobal',
    website: 'https://ethglobal.com',
    tags: ['ethereum', 'web3', 'blockchain', 'defi'],
    isVirtual: false,
    price: {
      amount: 0,
      currency: 'USD'
    }
  },
  {
    id: '2',
    title: 'DevConnect 2024',
    description: 'The premier developer conference for Web3 builders. Network with industry leaders and showcase your projects.',
    date: '2024-07-15',
    location: 'Virtual',
    type: 'conference',
    imageUrl: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
    organizer: 'DevConnect',
    website: 'https://devconnect.org',
    tags: ['development', 'web3', 'networking'],
    isVirtual: true
  },
  {
    id: '3',
    title: 'Web3 Toronto Meetup',
    description: 'Monthly meetup for Web3 developers in Toronto. Share knowledge, discuss projects, and find collaborators.',
    date: '2024-04-05',
    location: 'Toronto, Canada',
    type: 'meetup',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    organizer: 'Web3 Toronto',
    tags: ['web3', 'networking', 'toronto'],
    isVirtual: false
  }
];