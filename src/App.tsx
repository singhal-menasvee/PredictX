import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletAuthProvider } from "@/contexts/WalletAuthContext";
import Index from "./pages/index";

const Politics = lazy(() => import("./pages/Politics"));
const Sports = lazy(() => import("./pages/Sports"));
const Crypto = lazy(() => import("./pages/Crypto"));
const Finance = lazy(() => import("./pages/Finance"));
const Tech = lazy(() => import("./pages/Tech"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WalletAuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Suspense fallback={<div className="p-6 text-muted-foreground">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/politics" element={<Politics />} />
            <Route path="/sports" element={<Sports />} />
            <Route path="/crypto" element={<Crypto />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </TooltipProvider>
    </WalletAuthProvider>
  </QueryClientProvider>
);

export default App;

