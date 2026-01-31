import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BetModal from './BetModal';
import type { Market } from '@/data/markets';

interface PredictionCardProps {
  market: Market;
}

const PredictionCard = ({ market }: PredictionCardProps) => {
  const [isBetModalOpen, setIsBetModalOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<{ id: string; name: string; probability: number } | null>(null);

  const handleOutcomeClick = (outcome: { id: string; name: string; probability: number }) => {
    setSelectedOutcome(outcome);
    setIsBetModalOpen(true);
  };

  const formatEndDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Determine if we should show yes/no buttons or multiple outcomes
  const isBinaryMarket = market.outcomes.length === 2 && 
    (market.outcomes[0].name.toLowerCase() === 'yes' || market.outcomes[0].name.toLowerCase() === 'no');

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="glass-card-hover p-5 flex flex-col h-full"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground leading-tight line-clamp-2 mb-1">
              {market.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{market.description}</p>
          </div>
          {market.featured && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                <TrendingUp className="h-3 w-3" />
                Hot
              </span>
            </div>
          )}
        </div>

        {/* Outcomes */}
        <div className="flex-1 space-y-3 mb-4">
          {isBinaryMarket ? (
            // Binary Yes/No display
            <div className="space-y-3">
              {market.outcomes.map((outcome) => {
                const isYes = outcome.name.toLowerCase() === 'yes';
                return (
                  <div key={outcome.id} className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{outcome.name}</span>
                        <span className={`text-sm font-bold ${isYes ? 'text-success' : 'text-destructive'}`}>
                          {outcome.probability}%
                        </span>
                      </div>
                      <div className="probability-bar">
                        <div 
                          className="probability-bar-fill"
                          style={{ 
                            width: `${outcome.probability}%`,
                            background: isYes 
                              ? 'hsl(var(--success))' 
                              : 'hsl(var(--destructive))'
                          }}
                        />
                      </div>
                    </div>
                    <Button
                      variant={isYes ? 'yes' : 'no'}
                      size="sm"
                      onClick={() => handleOutcomeClick(outcome)}
                      className="min-w-[60px]"
                    >
                      {isYes ? 'Yes' : 'No'}
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            // Multiple outcomes display
            <div className="space-y-2">
              {market.outcomes.slice(0, 4).map((outcome, index) => (
                <div 
                  key={outcome.id}
                  className="flex items-center justify-between gap-3 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                  onClick={() => handleOutcomeClick(outcome)}
                >
                  <span className="text-sm font-medium text-foreground truncate">{outcome.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">{outcome.probability}%</span>
                    <Button variant="yes" size="sm" className="h-7 px-2 text-xs">
                      Bet
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/50">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {market.volume} Vol.
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatEndDate(market.endDate)}
            </span>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Bet Modal */}
      <BetModal
        isOpen={isBetModalOpen}
        onClose={() => setIsBetModalOpen(false)}
        market={market}
        selectedOutcome={selectedOutcome}
      />
    </>
  );
};

export default PredictionCard;
