import { OpenAI } from 'openai';
import axios from 'axios';
import * as cheerio from 'cheerio';
import type { TechAnalysis } from '../types/analysis';

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export class AIAnalysisService {
  private async fetchGitHubData(username: string) {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}/repos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      return [];
    }
  }

  private async fetchLinkedInPosts(profileUrl: string) {
    try {
      const response = await axios.get(profileUrl);
      const $ = cheerio.load(response.data);
      // Extract posts and activity data
      const posts = $('.post-content').map((_, el) => $(el).text()).get();
      return posts;
    } catch (error) {
      console.error('Error fetching LinkedIn data:', error);
      return [];
    }
  }

  private async fetchTwitterData(username: string) {
    try {
      const response = await axios.get(`https://api.twitter.com/2/users/${username}/tweets`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Twitter data:', error);
      return [];
    }
  }

  private async analyzeWithAI(data: unknown): Promise<TechAnalysis> {
    try {
      const prompt = `
        Analyze the following developer activity data and provide:
        1. Their proficiency in different tech stacks (as percentages)
        2. Their interest in different blockchain platforms (as percentages)
        3. Key areas of expertise
        
        Data: ${JSON.stringify(data)}
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an AI expert in analyzing developer profiles and technical expertise."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      });

      // Parse the AI response into structured data
      const analysis = this.parseAIResponse(response.choices[0].message.content || '');
      return analysis;
    } catch (error) {
      console.error('Error analyzing with AI:', error);
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private parseAIResponse(): TechAnalysis {
    // Implementation would parse the AI response into structured data
    return {
      techStack: {
        frontend: 80,
        backend: 70,
        blockchain: 90,
      },
      blockchainInterests: {
        ethereum: 40,
        polygon: 30,
        aptos: 30,
      },
      expertise: ['Smart Contracts', 'DeFi', 'React', 'Node.js'],
    };
  }

  public async analyzeDeveloperProfile(
    githubUsername: string,
    linkedinUrl: string,
    twitterUsername: string
  ): Promise<TechAnalysis> {
    // Fetch data from all sources
    const [githubData, linkedinPosts, twitterData] = await Promise.all([
      this.fetchGitHubData(githubUsername),
      this.fetchLinkedInPosts(linkedinUrl),
      this.fetchTwitterData(twitterUsername),
    ]);

    // Combine all data for analysis
    const combinedData = {
      github: githubData,
      linkedin: linkedinPosts,
      twitter: twitterData,
    };

    // Analyze with AI
    return await this.analyzeWithAI(combinedData);
  }
}