import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWalletAuth } from '@/contexts/WalletAuthContext';
import { toast } from '@/hooks/use-toast';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm = ({ mode: _mode }: AuthFormProps) => {
  const { address, isConnecting, error, connect } = useWalletAuth();
  const [signMessage, setSignMessage] = useState(true);

  const handleConnect = async () => {
    await connect({ signMessage });
    toast({
      title: 'Wallet connected',
      description: 'You are now signed in.',
    });
  };

  if (address) {
    const short = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md px-4"
        >
          <div className="glass-card p-8 text-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-2xl font-bold text-foreground">
                Predict<span className="text-primary">X</span>
              </span>
            </Link>
            <div className="rounded-lg bg-success/20 border border-success/30 px-4 py-3 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Connected as</p>
              <p className="font-mono font-medium text-foreground break-all">{short}</p>
            </div>
            <Link to="/">
              <Button variant="hero" className="w-full gap-2">
                Continue to PredictX
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div className="glass-card p-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">
              Predict<span className="text-primary">X</span>
            </span>
          </Link>

          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              Connect your wallet
            </h1>
            <p className="text-muted-foreground">
              Sign in with MetaMask to access your portfolio and trade on prediction markets.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-destructive/20 border border-destructive/30 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={signMessage}
                onChange={(e) => setSignMessage(e.target.checked)}
                className="rounded border-border"
              />
              Sign message to verify ownership (recommended)
            </label>

            <Button
              variant="hero"
              className="w-full h-12 gap-2"
              disabled={isConnecting}
              onClick={handleConnect}
            >
              {isConnecting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Connecting...
                </span>
              ) : (
                <>
                  <Wallet className="h-5 w-5" />
                  Connect Wallet
                </>
              )}
            </Button>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By connecting, you agree to our{' '}
            <button type="button" className="text-primary hover:underline">Terms of Service</button>
            {' '}and{' '}
            <button type="button" className="text-primary hover:underline">Privacy Policy</button>.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
