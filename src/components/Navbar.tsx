import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, Wallet, LogOut, Menu, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchModal from "./SearchModal";
import { useWalletAuth } from "@/contexts/WalletAuthContext";

const navLinks = [
  { name: "Politics", path: "/politics" },
  { name: "Sports", path: "/sports" },
  { name: "Crypto", path: "/crypto" },
  { name: "Finance", path: "/finance" },
  { name: "Tech", path: "/tech" },
];

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { address, disconnect } = useWalletAuth();
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div className="absolute inset-0 rounded-lg bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Predict<span className="text-primary">X</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-secondary rounded-lg -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Link to="/dashboard" className="hidden sm:block">
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              {shortAddress ? (
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-sm font-mono text-muted-foreground">{shortAddress}</span>
                  <Button variant="ghost" size="sm" className="gap-2" onClick={() => disconnect()}>
                    <LogOut className="h-4 w-4" />
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:block">
                  <Button variant="default" size="sm" className="gap-2">
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </Button>
                </Link>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-muted-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border/50">
                  <Link to="/dashboard" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="secondary" className="w-full gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                  {shortAddress ? (
                    <>
                      <span className="text-xs text-muted-foreground font-mono px-2">{shortAddress}</span>
                      <Button variant="outline" className="w-full gap-2" onClick={() => { disconnect(); setIsMobileMenuOpen(false); }}>
                        <LogOut className="h-4 w-4" />
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Link to="/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full gap-2">
                        <Wallet className="h-4 w-4" />
                        Connect Wallet
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Navbar;

