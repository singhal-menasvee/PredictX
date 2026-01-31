// Mock service layer for future backend integration
// All functions are async to simulate API calls

import { 
    markets, 
    getMarketsByCategory, 
    getFeaturedMarkets, 
    getMarketById, 
    searchMarkets,
    type Market 
  } from '@/data/markets';
  
  import {
    activeBets,
    portfolioStats,
    recentActivity,
    getActiveBets,
    getClosedBets,
    type ActiveBet,
    type PortfolioStats,
    type RecentActivity,
  } from '@/data/portfolio';
  
  // Simulated delay for realistic API behavior
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  // Market Services
  export const fetchAllMarkets = async (): Promise<Market[]> => {
    await delay(100);
    return markets;
  };
  
  export const fetchMarketsByCategory = async (category: Market['category']): Promise<Market[]> => {
    await delay(100);
    return getMarketsByCategory(category);
  };
  
  export const fetchFeaturedMarkets = async (): Promise<Market[]> => {
    await delay(100);
    return getFeaturedMarkets();
  };
  
  export const fetchMarketById = async (id: string): Promise<Market | undefined> => {
    await delay(50);
    return getMarketById(id);
  };
  
  export const searchMarketsAsync = async (query: string): Promise<Market[]> => {
    await delay(150);
    return searchMarkets(query);
  };
  
  // Portfolio Services
  export const fetchActiveBets = async (): Promise<ActiveBet[]> => {
    await delay(100);
    return getActiveBets();
  };
  
  export const fetchClosedBets = async (): Promise<ActiveBet[]> => {
    await delay(100);
    return getClosedBets();
  };
  
  export const fetchAllBets = async (): Promise<ActiveBet[]> => {
    await delay(100);
    return activeBets;
  };
  
  export const fetchPortfolioStats = async (): Promise<PortfolioStats> => {
    await delay(100);
    return portfolioStats;
  };
  
  export const fetchRecentActivity = async (): Promise<RecentActivity[]> => {
    await delay(100);
    return recentActivity;
  };
  
  // Betting Services (simulated - no real backend)
  export interface PlaceBetPayload {
    marketId: string;
    outcomeId: string;
    amount: number;
  }
  
  export interface PlaceBetResult {
    success: boolean;
    betId?: string;
    message: string;
  }
  
  export const placeBet = async (payload: PlaceBetPayload): Promise<PlaceBetResult> => {
    await delay(500);
    
    // Simulate validation
    if (payload.amount <= 0) {
      return { success: false, message: 'Invalid bet amount' };
    }
    
    // Simulate success
    const betId = `bet_${Date.now()}`;
    return { 
      success: true, 
      betId, 
      message: 'Bet placed successfully!' 
    };
  };
  
  // Calculate potential payout
  export const calculatePayout = (amount: number, probability: number): number => {
    if (probability <= 0 || probability >= 100) return 0;
    return amount / (probability / 100);
  };
  