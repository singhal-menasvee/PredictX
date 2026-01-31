export interface ActiveBet {
    id: string;
    marketId: string;
    marketTitle: string;
    selectedOutcome: string;
    betAmount: number;
    odds: number;
    potentialPayout: number;
    status: 'active' | 'won' | 'lost';
    placedAt: string;
  }
  
  export interface PortfolioStats {
    totalInvested: number;
    currentValue: number;
    totalProfitLoss: number;
    activeBetsCount: number;
    winRate: number;
  }
  
  export const activeBets: ActiveBet[] = [
    {
      id: 'bet1',
      marketId: 'c1',
      marketTitle: 'Bitcoin Above $150K by 2026',
      selectedOutcome: 'Yes',
      betAmount: 500,
      odds: 0.45,
      potentialPayout: 1111.11,
      status: 'active',
      placedAt: '2026-01-15',
    },
    {
      id: 'bet2',
      marketId: 'p1',
      marketTitle: 'US Presidential Election 2028',
      selectedOutcome: 'Republican',
      betAmount: 250,
      odds: 0.52,
      potentialPayout: 480.77,
      status: 'active',
      placedAt: '2026-01-10',
    },
    {
      id: 'bet3',
      marketId: 's1',
      marketTitle: 'Super Bowl LXII Champion',
      selectedOutcome: 'Kansas City Chiefs',
      betAmount: 100,
      odds: 0.28,
      potentialPayout: 357.14,
      status: 'active',
      placedAt: '2026-01-08',
    },
    {
      id: 'bet4',
      marketId: 't2',
      marketTitle: 'AGI Announcement by 2027',
      selectedOutcome: 'No',
      betAmount: 200,
      odds: 0.78,
      potentialPayout: 256.41,
      status: 'active',
      placedAt: '2026-01-05',
    },
    {
      id: 'bet5',
      marketId: 'f2',
      marketTitle: 'S&P 500 Above 6500 EOY 2026',
      selectedOutcome: 'Yes',
      betAmount: 300,
      odds: 0.58,
      potentialPayout: 517.24,
      status: 'won',
      placedAt: '2025-12-20',
    },
    {
      id: 'bet6',
      marketId: 'c3',
      marketTitle: 'Solana All-Time High',
      selectedOutcome: 'Yes',
      betAmount: 150,
      odds: 0.38,
      potentialPayout: 394.74,
      status: 'lost',
      placedAt: '2025-12-15',
    },
  ];
  
  export const portfolioStats: PortfolioStats = {
    totalInvested: 1500,
    currentValue: 2205.43,
    totalProfitLoss: 705.43,
    activeBetsCount: 4,
    winRate: 62.5,
  };
  
  export interface RecentActivity {
    id: string;
    type: 'bet_placed' | 'bet_won' | 'bet_lost' | 'deposit' | 'withdrawal';
    description: string;
    amount: number;
    timestamp: string;
  }
  
  export const recentActivity: RecentActivity[] = [
    {
      id: 'act1',
      type: 'bet_placed',
      description: 'Placed bet on Bitcoin Above $150K',
      amount: -500,
      timestamp: '2026-01-15T14:30:00',
    },
    {
      id: 'act2',
      type: 'bet_won',
      description: 'Won bet on S&P 500 Above 6500',
      amount: 517.24,
      timestamp: '2026-01-14T09:00:00',
    },
    {
      id: 'act3',
      type: 'bet_placed',
      description: 'Placed bet on US Presidential Election',
      amount: -250,
      timestamp: '2026-01-10T16:45:00',
    },
    {
      id: 'act4',
      type: 'deposit',
      description: 'Deposited funds',
      amount: 1000,
      timestamp: '2026-01-08T10:00:00',
    },
    {
      id: 'act5',
      type: 'bet_lost',
      description: 'Lost bet on Solana All-Time High',
      amount: -150,
      timestamp: '2026-01-05T18:20:00',
    },
  ];
  
  export const getActiveBets = () => activeBets.filter(bet => bet.status === 'active');
  export const getClosedBets = () => activeBets.filter(bet => bet.status !== 'active');
  export const getPortfolioStats = () => portfolioStats;
  export const getRecentActivity = () => recentActivity;
  