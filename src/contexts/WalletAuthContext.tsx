import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on?: (event: string, handler: (...args: unknown[]) => void) => void;
    };
  }
}

const WALLET_STORAGE_KEY = "predictx_wallet_address";

type WalletAuthContextType = {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
  connect: (options?: { signMessage?: boolean }) => Promise<void>;
  disconnect: () => void;
};

const WalletAuthContext = createContext<WalletAuthContextType | null>(null);

export function WalletAuthProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disconnect = useCallback(() => {
    setAddress(null);
    setError(null);
    try {
      localStorage.removeItem(WALLET_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const connect = useCallback(async (options?: { signMessage?: boolean }) => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError("MetaMask is not installed. Please install MetaMask to continue.");
      return;
    }
    setIsConnecting(true);
    setError(null);
    try {
      const accounts = (await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [],
      })) as string[];
      const account = accounts?.[0];
      if (!account) {
        setError("No account selected.");
        return;
      }

      if (options?.signMessage) {
        const message = `Sign in to PredictX at ${window.location.origin}`;
        await window.ethereum.request({
          method: "personal_sign",
          params: [message, account],
        });
      }

      setAddress(account);
      try {
        localStorage.setItem(WALLET_STORAGE_KEY, account);
      } catch {
        // ignore
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to connect wallet.";
      setError(message);
      setAddress(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // On mount: restore address from storage and verify wallet is still connected
  useEffect(() => {
    const stored = localStorage.getItem(WALLET_STORAGE_KEY);
    if (!stored || !window.ethereum) return;
    window.ethereum
      .request({ method: "eth_accounts", params: [] })
      .then((accounts) => {
        const current = (accounts as string[])?.[0];
        if (current && current.toLowerCase() === stored.toLowerCase()) {
          setAddress(current);
        } else {
          localStorage.removeItem(WALLET_STORAGE_KEY);
        }
      })
      .catch(() => {
        localStorage.removeItem(WALLET_STORAGE_KEY);
      });
  }, []);

  // Listen for account changes (e.g. user switches account or disconnects in MetaMask)
  useEffect(() => {
    if (!window.ethereum?.on) return;
    const handleAccountsChanged = (accounts: unknown) => {
      const list = accounts as string[];
      if (!list?.length) disconnect();
      else if (address && list[0]?.toLowerCase() !== address.toLowerCase()) {
        setAddress(list[0]);
        try {
          localStorage.setItem(WALLET_STORAGE_KEY, list[0]);
        } catch {
          // ignore
        }
      }
    };
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => { /* EIP-1193 providers may not expose removeListener */ };
  }, [address, disconnect]);

  const value: WalletAuthContextType = {
    address,
    isConnecting,
    error,
    connect,
    disconnect,
  };

  return (
    <WalletAuthContext.Provider value={value}>
      {children}
    </WalletAuthContext.Provider>
  );
}

export function useWalletAuth() {
  const ctx = useContext(WalletAuthContext);
  if (!ctx) throw new Error("useWalletAuth must be used within WalletAuthProvider");
  return ctx;
}
