import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Tag } from 'lucide-react';
import type { Event } from '../../types/events';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-purple-500/20"
    >
      <div className="relative h-48">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium
            ${event.type === 'hackathon' ? 'bg-purple-500 text-white' :
              event.type === 'conference' ? 'bg-blue-500 text-white' :
              event.type === 'meetup' ? 'bg-green-500 text-white' :
              'bg-orange-500 text-white'}`}
          >
            {event.type}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{event.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-300">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{format(new Date(event.date), 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {event.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;