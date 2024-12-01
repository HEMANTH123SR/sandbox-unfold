import React from "react";

export const SandboxLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black ">
      {/* Logo Container */}
      <div className="mb-8 animate-fade-in-down text-[#C1C4D4]">Sandbox</div>

      {/* Loading Bar Container */}
      <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="w-full h-full bg-blue-800 animate-loading-bar" />
      </div>
    </div>
  );
};
