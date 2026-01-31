
export interface Outcome {
  id: string;
  name: string;
  probability: number;
}

export interface Market {
  id: string;
  title: string;
  description: string;
  category: "politics" | "sports" | "crypto" | "finance" | "tech";
  outcomes: Outcome[];
  volume: string;
  endDate: string;
  imageUrl?: string;
  featured?: boolean;
}

export const markets: Market[] = [
  // Politics
  {
    id: "p1",
    title: "US Presidential Election 2028",
    description: "Who will win the 2028 US Presidential Election?",
    category: "politics",
    outcomes: [
      { id: "p1-1", name: "Republican", probability: 52 },
      { id: "p1-2", name: "Democrat", probability: 48 },
    ],
    volume: "$12.5M",
    endDate: "2028-11-05",
    featured: true,
  },
  {
    id: "p2",
    title: "Supreme Court Ruling on AI Regulation",
    description: "Will the Supreme Court rule in favor of federal AI oversight?",
    category: "politics",
    outcomes: [
      { id: "p2-1", name: "Yes", probability: 35 },
      { id: "p2-2", name: "No", probability: 65 },
    ],
    volume: "$3.2M",
    endDate: "2026-06-30",
  },
  {
    id: "p3",
    title: "UK General Election Outcome",
    description: "Which party will form the next UK government?",
    category: "politics",
    outcomes: [
      { id: "p3-1", name: "Labour", probability: 58 },
      { id: "p3-2", name: "Conservative", probability: 32 },
      { id: "p3-3", name: "Coalition", probability: 10 },
    ],
    volume: "$5.8M",
    endDate: "2029-01-15",
  },
  {
    id: "p4",
    title: "China-Taiwan Diplomatic Resolution",
    description: "Will there be a formal diplomatic agreement by 2027?",
    category: "politics",
    outcomes: [
      { id: "p4-1", name: "Yes", probability: 12 },
      { id: "p4-2", name: "No", probability: 88 },
    ],
    volume: "$8.1M",
    endDate: "2027-12-31",
  },

  // Sports
  {
    id: "s1",
    title: "Super Bowl LXII Champion",
    description: "Which team will win Super Bowl LXII?",
    category: "sports",
    outcomes: [
      { id: "s1-1", name: "Kansas City Chiefs", probability: 28 },
      { id: "s1-2", name: "Philadelphia Eagles", probability: 22 },
      { id: "s1-3", name: "Buffalo Bills", probability: 18 },
      { id: "s1-4", name: "Other", probability: 32 },
    ],
    volume: "$45.2M",
    endDate: "2027-02-14",
    featured: true,
  },
  {
    id: "s2",
    title: "FIFA World Cup 2026 Winner",
    description: "Who will lift the trophy in USA/Canada/Mexico?",
    category: "sports",
    outcomes: [
      { id: "s2-1", name: "Brazil", probability: 22 },
      { id: "s2-2", name: "France", probability: 20 },
      { id: "s2-3", name: "Argentina", probability: 18 },
      { id: "s2-4", name: "Other", probability: 40 },
    ],
    volume: "$67.8M",
    endDate: "2026-07-19",
  },
  {
    id: "s3",
    title: "NBA MVP 2026-27 Season",
    description: "Who will be named NBA Most Valuable Player?",
    category: "sports",
    outcomes: [
      { id: "s3-1", name: "Luka Dončić", probability: 32 },
      { id: "s3-2", name: "Giannis Antetokounmpo", probability: 25 },
      { id: "s3-3", name: "Victor Wembanyama", probability: 20 },
      { id: "s3-4", name: "Other", probability: 23 },
    ],
    volume: "$18.9M",
    endDate: "2027-05-01",
  },

  // Crypto
  {
    id: "c1",
    title: "Bitcoin Above $150K by 2026",
    description: "Will Bitcoin exceed $150,000 before December 31, 2026?",
    category: "crypto",
    outcomes: [
      { id: "c1-1", name: "Yes", probability: 45 },
      { id: "c1-2", name: "No", probability: 55 },
    ],
    volume: "$89.3M",
    endDate: "2026-12-31",
    featured: true,
  },
  {
    id: "c2",
    title: "Ethereum Flippening",
    description: "Will ETH market cap surpass BTC by end of 2027?",
    category: "crypto",
    outcomes: [
      { id: "c2-1", name: "Yes", probability: 18 },
      { id: "c2-2", name: "No", probability: 82 },
    ],
    volume: "$23.1M",
    endDate: "2027-12-31",
  },
  {
    id: "c3",
    title: "Solana All-Time High",
    description: "Will Solana reach $500 in 2026?",
    category: "crypto",
    outcomes: [
      { id: "c3-1", name: "Yes", probability: 38 },
      { id: "c3-2", name: "No", probability: 62 },
    ],
    volume: "$15.7M",
    endDate: "2026-12-31",
  },
  {
    id: "c4",
    title: "US Spot Crypto ETF Approval",
    description: "Will the SEC approve a multi-asset crypto ETF?",
    category: "crypto",
    outcomes: [
      { id: "c4-1", name: "Yes", probability: 72 },
      { id: "c4-2", name: "No", probability: 28 },
    ],
    volume: "$31.2M",
    endDate: "2026-06-30",
  },

  // Finance
  {
    id: "f1",
    title: "Fed Rate Decision Q2 2026",
    description: "What will the Fed funds rate be after June 2026 meeting?",
    category: "finance",
    outcomes: [
      { id: "f1-1", name: "Cut 25bps", probability: 42 },
      { id: "f1-2", name: "No Change", probability: 45 },
      { id: "f1-3", name: "Hike 25bps", probability: 13 },
    ],
    volume: "$56.4M",
    endDate: "2026-06-15",
    featured: true,
  },
  {
    id: "f2",
    title: "S&P 500 Above 6500 EOY 2026",
    description: "Will S&P 500 close above 6500 on December 31, 2026?",
    category: "finance",
    outcomes: [
      { id: "f2-1", name: "Yes", probability: 58 },
      { id: "f2-2", name: "No", probability: 42 },
    ],
    volume: "$34.8M",
    endDate: "2026-12-31",
  },
  {
    id: "f3",
    title: "US Recession by 2027",
    description: "Will the NBER declare a US recession before 2027?",
    category: "finance",
    outcomes: [
      { id: "f3-1", name: "Yes", probability: 28 },
      { id: "f3-2", name: "No", probability: 72 },
    ],
    volume: "$41.2M",
    endDate: "2026-12-31",
  },

  // Tech
  {
    id: "t1",
    title: "Apple Vision Pro Sales 10M Units",
    description: "Will Apple sell 10M Vision Pro units by end of 2026?",
    category: "tech",
    outcomes: [
      { id: "t1-1", name: "Yes", probability: 35 },
      { id: "t1-2", name: "No", probability: 65 },
    ],
    volume: "$8.9M",
    endDate: "2026-12-31",
  },
  {
    id: "t2",
    title: "AGI Announcement by 2027",
    description: "Will a major lab announce AGI capabilities by 2027?",
    category: "tech",
    outcomes: [
      { id: "t2-1", name: "Yes", probability: 22 },
      { id: "t2-2", name: "No", probability: 78 },
    ],
    volume: "$67.3M",
    endDate: "2027-12-31",
    featured: true,
  },
  {
    id: "t3",
    title: "Tesla Full Self-Driving Approval",
    description: "Will Tesla FSD receive federal Level 4 approval?",
    category: "tech",
    outcomes: [
      { id: "t3-1", name: "Yes", probability: 41 },
      { id: "t3-2", name: "No", probability: 59 },
    ],
    volume: "$29.4M",
    endDate: "2026-12-31",
  },
  {
    id: "t4",
    title: "SpaceX Mars Mission 2026",
    description: "Will SpaceX launch a crewed Mars mission in 2026?",
    category: "tech",
    outcomes: [
      { id: "t4-1", name: "Yes", probability: 8 },
      { id: "t4-2", name: "No", probability: 92 },
    ],
    volume: "$12.1M",
    endDate: "2026-12-31",
  },
];

export const getMarketsByCategory = (category: Market["category"]) => {
  return markets.filter((market) => market.category === category);
};

export const getFeaturedMarkets = () => {
  return markets.filter((market) => market.featured);
};

export const getMarketById = (id: string) => {
  return markets.find((market) => market.id === id);
};

export const searchMarkets = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return markets.filter(
    (market) =>
      market.title.toLowerCase().includes(lowercaseQuery) || market.description.toLowerCase().includes(lowercaseQuery),
  );
};

