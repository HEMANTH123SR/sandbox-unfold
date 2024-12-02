'use client';

import MouseTrailer from './components/ui/MouseTrailer';
import ThemeToggle from './components/layout/ThemeToggle';
import Passport from './components/Passport';
import EventsGrid from './components/events/EventsGrid';
import { mockProfile } from './data/mockProfile';
import { mockEvents } from './data/mockEvents';
import { useState } from 'react';

export default function Passports() {
  const [currentView, setCurrentView] = useState<'passport' | 'events'>('passport');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <MouseTrailer />
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center mb-8 space-x-4">
          <button 
            onClick={() => setCurrentView('passport')}
            className={`px-4 py-2 rounded ${
              currentView === 'passport' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Passport
          </button>
          <button 
            onClick={() => setCurrentView('events')}
            className={`px-4 py-2 rounded ${
              currentView === 'events' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Events
          </button>
        </div>

        {currentView === 'passport' && (
          <div className="space-y-12">
            <h1 className="text-4xl font-bold text-center text-indigo-900 dark:text-indigo-400">
              DevRoot Passport
            </h1>
            <Passport profile={mockProfile} />
          </div>
        )}

        {currentView === 'events' && (
          <div className="space-y-12">
            <h1 className="text-4xl font-bold text-center text-indigo-900 dark:text-indigo-400">
              Upcoming Events
            </h1>
            <EventsGrid events={mockEvents} />
          </div>
        )}
      </div>
    </div>
  );
}