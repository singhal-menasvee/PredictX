import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  PiggyBank, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  Activity
} from 'lucide-react';
import MainLayout from '@/layouts/MainLayout';
import DashboardStatCard from '@/components/DashboardStatCard';
import MarketsTable from '@/components/MarketsTable';
import { 
  portfolioStats, 
  activeBets, 
  recentActivity,
  getActiveBets,
  getClosedBets 
} from '@/data/portfolio';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'closed'>('active');
  const displayedBets = activeTab === 'active' ? getActiveBets() : getClosedBets();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'bet_placed':
        return <ArrowUpRight className="h-4 w-4 text-primary" />;
      case 'bet_won':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'bet_lost':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'deposit':
        return <ArrowDownRight className="h-4 w-4 text-success" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Track your portfolio and active positions</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <DashboardStatCard
            title="Total Invested"
            value={`$${portfolioStats.totalInvested.toLocaleString()}`}
            icon={Wallet}
            variant="default"
          />
          <DashboardStatCard
            title="Current Value"
            value={`$${portfolioStats.currentValue.toLocaleString()}`}
            change={((portfolioStats.currentValue - portfolioStats.totalInvested) / portfolioStats.totalInvested * 100)}
            changeLabel="vs. invested"
            icon={TrendingUp}
            variant="success"
          />
          <DashboardStatCard
            title="Profit / Loss"
            value={`${portfolioStats.totalProfitLoss >= 0 ? '+' : ''}$${portfolioStats.totalProfitLoss.toLocaleString()}`}
            icon={PiggyBank}
            variant={portfolioStats.totalProfitLoss >= 0 ? 'success' : 'danger'}
          />
          <DashboardStatCard
            title="Win Rate"
            value={`${portfolioStats.winRate}%`}
            icon={Target}
            variant="default"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Positions Table */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Button
                variant={activeTab === 'active' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveTab('active')}
              >
                Active ({getActiveBets().length})
              </Button>
              <Button
                variant={activeTab === 'closed' ? 'default' : 'secondary'}
                size="sm"
                onClick={() => setActiveTab('closed')}
              >
                Closed ({getClosedBets().length})
              </Button>
            </div>
            <MarketsTable bets={displayedBets} />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="glass-card overflow-hidden">
              <div className="border-b border-border/50 p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-display font-semibold text-foreground">Recent Activity</h3>
                </div>
              </div>
              <div className="divide-y divide-border/30">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(activity.timestamp)}
                        </p>
                      </div>
                      <span className={`text-sm font-semibold ${
                        activity.amount >= 0 ? 'text-success' : 'text-destructive'
                      }`}>
                        {activity.amount >= 0 ? '+' : ''}${Math.abs(activity.amount).toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold text-foreground">Portfolio Performance</h3>
            </div>
            <div className="flex gap-2">
              {['1D', '1W', '1M', 'ALL'].map((period) => (
                <button
                  key={period}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    period === '1M' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart placeholder with gradient bar */}
          <div className="h-48 rounded-lg bg-secondary/30 flex items-end justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
            <div className="w-full h-1 rounded-full bg-gradient-to-r from-primary via-accent to-success" />
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-muted-foreground text-sm">
              Chart visualization coming soon
            </p>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
