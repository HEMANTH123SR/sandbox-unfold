import React from 'react';
import { motion } from 'framer-motion';
import type { TechStack, BlockchainInterests } from '../../types/analysis';

interface TechStackChartProps {
  techStack: TechStack;
  blockchainInterests: BlockchainInterests;
}

const TechStackChart: React.FC<TechStackChartProps> = ({ techStack, blockchainInterests }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold mb-4">Tech Stack Proficiency</h3>
        <div className="space-y-4">
          {Object.entries(techStack).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium capitalize">{key}</span>
                <span className="text-sm text-gray-500">{value}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-indigo-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Blockchain Interests</h3>
        <div className="space-y-4">
          {Object.entries(blockchainInterests).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium capitalize">{key}</span>
                <span className="text-sm text-gray-500">{value}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-purple-600 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStackChart;