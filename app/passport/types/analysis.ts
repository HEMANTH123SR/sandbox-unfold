export interface TechStack {
  frontend: number;
  backend: number;
  blockchain: number;
}

export interface BlockchainInterests {
  ethereum: number;
  polygon: number;
  aptos: number;
}

export interface TechAnalysis {
  techStack: TechStack;
  blockchainInterests: BlockchainInterests;
  expertise: string[];
}