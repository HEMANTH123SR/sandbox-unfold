"use client";
import React from "react";
import { hackerbold } from "@/fonts/font";
import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export interface EventCardProps {
  imageUrl: string;
  eventName: string;
  isOpened: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  eventName,
  isOpened,
}) => {
  return (
    <div className={`flex flex-col mx-6 `}>
      <EventCardImage imageUrl={imageUrl} eventName={eventName} />
      <div className="flex flex-row justify-between items-center mt-4">
        <h2
          className="text-primary text-3xl capitalize"
          style={hackerbold.style}
        >
          {eventName}
        </h2>
        {isOpened ? <button>open</button> : <button>closed</button>}
      </div>
    </div>
  );
};

function EventCardImage({
  eventName,
  imageUrl,
}: {
  eventName: string;
  imageUrl: string;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative"
    >
      <div className="event-card__image-container">
        <img src={imageUrl} alt={eventName} className="event-card__image" />
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0"
          >
            <CanvasRevealEffect
              containerClassName="bg-transparent"
              colors={[
                [59, 130, 246],
                [139, 92, 246],
              ]}
              opacities={[0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1]}
              dotSize={3}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Radial gradient for the cute fade */}
      <div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
    </div>
  );
}

// name , wallet addr , social links , github data fetch , passport stamp
