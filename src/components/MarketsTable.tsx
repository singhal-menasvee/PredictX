import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, TrendingUp } from 'lucide-react';
import type { ActiveBet } from '@/data/portfolio';

interface MarketsTableProps {
  bets: ActiveBet[];
}

const MarketsTable = ({ bets }: MarketsTableProps) => {
  const getStatusIcon = (status: ActiveBet['status']) => {
    switch (status) {
      case 'won':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case 'lost':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: ActiveBet['status']) => {
    const styles = {
      active: 'bg-primary/20 text-primary border-primary/30',
      won: 'bg-success/20 text-success border-success/30',
      lost: 'bg-destructive/20 text-destructive border-destructive/30',
    };
    return styles[status];
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="border-b border-border/50 p-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Your Positions</h3>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <th className="px-4 py-3">Market</th>
              <th className="px-4 py-3">Outcome</th>
              <th className="px-4 py-3 text-right">Bet</th>
              <th className="px-4 py-3 text-right">Odds</th>
              <th className="px-4 py-3 text-right">Potential</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {bets.map((bet, index) => (
              <motion.tr
                key={bet.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-secondary/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                      {getStatusIcon(bet.status)}
                    </div>
                    <span className="font-medium text-foreground text-sm max-w-[200px] truncate">
                      {bet.marketTitle}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center rounded-full bg-secondary/50 px-2.5 py-1 text-xs font-medium text-foreground">
                    {bet.selectedOutcome}
                  </span>
                </td>
                <td className="px-4 py-4 text-right font-medium text-foreground">
                  ${bet.betAmount.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-right text-muted-foreground">
                  {(bet.odds * 100).toFixed(0)}%
                </td>
                <td className="px-4 py-4 text-right font-semibold text-success">
                  ${bet.potentialPayout.toFixed(2)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${getStatusBadge(bet.status)}`}>
                      {getStatusIcon(bet.status)}
                      {bet.status}
                    </span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {bets.length === 0 && (
        <div className="p-12 text-center text-muted-foreground">
          No positions found. Start betting to see your positions here.
        </div>
      )}
    </div>
  );
};

export default MarketsTable;
