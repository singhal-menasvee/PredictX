import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Calculator, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculatePayout, placeBet } from '@/services/marketService';
import { toast } from '@/hooks/use-toast';
import type { Market } from '@/data/markets';

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  market: Market;
  selectedOutcome: { id: string; name: string; probability: number } | null;
}

const BetModal = ({ isOpen, onClose, market, selectedOutcome }: BetModalProps) => {
  const [betAmount, setBetAmount] = useState<string>('');
  const [isPlacing, setIsPlacing] = useState(false);

  const amount = parseFloat(betAmount) || 0;
  const potentialPayout = selectedOutcome 
    ? calculatePayout(amount, selectedOutcome.probability) 
    : 0;
  const potentialProfit = potentialPayout - amount;

  const handlePlaceBet = async () => {
    if (!selectedOutcome || amount <= 0) return;

    setIsPlacing(true);
    const result = await placeBet({
      marketId: market.id,
      outcomeId: selectedOutcome.id,
      amount,
    });

    setIsPlacing(false);

    if (result.success) {
      toast({
        title: 'Bet Placed! 🎉',
        description: `$${amount.toFixed(2)} on "${selectedOutcome.name}" - Potential payout: $${potentialPayout.toFixed(2)}`,
      });
      setBetAmount('');
      onClose();
    } else {
      toast({
        title: 'Error',
        description: result.message,
        variant: 'destructive',
      });
    }
  };

  const quickAmounts = [10, 25, 50, 100, 250];

  return (
    <AnimatePresence>
      {isOpen && selectedOutcome && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal - centered in viewport with safe insets so it stays fully visible */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={(e) => e.target === e.currentTarget && onClose()}
          >
            <div className="w-full max-w-[min(28rem,100%)] max-h-[min(90vh,calc(100vh-2rem))] my-auto">
              <div className="glass-card overflow-hidden overflow-y-auto max-h-[min(90vh,calc(100vh-2rem))]">
              {/* Header */}
              <div className="relative border-b border-border/50 p-5">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute right-0 top-0 rounded-lg p-2 hover:bg-secondary transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 pr-8">
                      <h3 className="font-display font-semibold text-foreground line-clamp-2">
                        {market.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Selected Outcome Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-success/20 px-4 py-2 border border-success/30">
                    <Sparkles className="h-4 w-4 text-success" />
                    <span className="text-sm font-semibold text-success">
                      {selectedOutcome.name} @ {selectedOutcome.probability}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-5">
                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Bet Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                      $
                    </span>
                    <Input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      placeholder="0.00"
                      className="pl-8 h-12 text-lg font-semibold bg-secondary/50 border-border/50 focus:border-primary"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex flex-wrap gap-2">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setBetAmount(quickAmount.toString())}
                      className={`flex-1 min-w-[60px] py-2 rounded-lg text-sm font-medium transition-all ${
                        amount === quickAmount
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                    >
                      ${quickAmount}
                    </button>
                  ))}
                </div>

                {/* Payout Calculation */}
                <div className="rounded-xl bg-secondary/30 p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calculator className="h-4 w-4" />
                    <span>Payout Calculation</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Your bet</span>
                      <span className="font-medium text-foreground">${amount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Odds</span>
                      <span className="font-medium text-foreground">{selectedOutcome.probability}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">If you win</span>
                      <span className="font-bold text-success">
                        +${potentialProfit.toFixed(2)}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-border/50 flex justify-between">
                      <span className="font-medium text-foreground">Total Payout</span>
                      <span className="font-bold text-lg text-primary">
                        ${potentialPayout.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Place Bet Button */}
                <Button
                  onClick={handlePlaceBet}
                  disabled={amount <= 0 || isPlacing}
                  className="w-full h-12 text-base font-semibold"
                  variant="hero"
                >
                  {isPlacing ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Placing Bet...
                    </span>
                  ) : (
                    `Place Bet - $${amount.toFixed(2)}`
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By placing a bet, you agree to our terms and conditions.
                </p>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BetModal;
