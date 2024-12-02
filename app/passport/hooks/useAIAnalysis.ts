import { useState, useEffect } from 'react';
import { AIAnalysisService } from '../services/aiAnalysis';
import type { TechAnalysis } from '../types/analysis';

export const useAIAnalysis = (
  githubUsername: string,
  linkedinUrl: string,
  twitterUsername: string
) => {
  const [analysis, setAnalysis] = useState<TechAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeProfile = async () => {
      try {
        setLoading(true);
        const aiService = new AIAnalysisService();
        const result = await aiService.analyzeDeveloperProfile(
          githubUsername,
          linkedinUrl,
          twitterUsername
        );
        setAnalysis(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    analyzeProfile();
  }, [githubUsername, linkedinUrl, twitterUsername]);

  return { analysis, loading, error };
};