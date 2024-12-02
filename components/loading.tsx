// import React from "react";
// import { f2f } from "@/fonts/font";
// export const SandboxLoading = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden max-h-screen w-screen bg-black ">
//       {/* Logo Container */}
//       <div
//         className="mb-8 animate-fade-in-down text-primary text-[25rem]"
//         style={f2f.style}
//       >
//         SANDBOX
//       </div>
//     </div>
//   );
// };
// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import { f2f } from "@/fonts/font";

// export const SandboxLoading = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden max-h-screen w-screen bg-black">
//       {/* Logo Container */}
//       <motion.div
//         className="mb-8 text-primary text-[25rem]"
//         style={f2f.style}
//         initial={{ x: "100vw" }} // Start off-screen to the right
//         animate={{ x: "-100vw" }} // Move to the left off-screen
//         transition={{ duration: 4, ease: "easeInOut" }} // 1.5 second duration with ease-in-out
//       >
//         SANDBOX
//       </motion.div>
//     </div>
//   );

// };

"use client";
import React from "react";
import { motion } from "framer-motion";
import { f2f } from "@/fonts/font";

export const SandboxLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden max-h-screen w-screen bg-black">
      {/* Logo Container */}
      <motion.div
        className="mb-8 text-primary text-[25rem]"
        style={f2f.style}
        initial={{ x: "100vw", opacity: 0 }} // Start off-screen to the right and fully transparent
        animate={{ x: "0", opacity: 1 }} // Move to the center and become fully visible
        exit={{ x: "-100vw", opacity: 0 }} // Exit to the left side and fade out
        transition={{
          duration: 3, // Set to a longer duration for smoother loading
          ease: "easeInOut", // Smooth ease for a more natural effect
          delay: 0.2, // Optional delay before starting the animation
        }}
      >
        SANDBOX
      </motion.div>
    </div>
  );
};
