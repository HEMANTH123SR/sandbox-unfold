export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  type: 'hackathon' | 'conference' | 'meetup' | 'workshop';
  imageUrl: string;
  organizer: string;
  website?: string;
  tags: string[];
  isVirtual: boolean;
  price?: {
    amount: number;
    currency: string;
  };
}

export interface EventFilters {
  type?: Event['type'];
  isVirtual?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}