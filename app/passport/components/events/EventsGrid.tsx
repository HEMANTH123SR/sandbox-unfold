import React from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import type { Event } from '../../types/events';

interface EventsGridProps {
  events: Event[];
}

const EventsGrid: React.FC<EventsGridProps> = ({ events }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </motion.div>
  );
};

export default EventsGrid;