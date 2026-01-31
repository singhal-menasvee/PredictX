import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlobeScene from "@/components/GlobeScene";
import FloatingCard from "@/components/FloatingCard";
import MainLayout from "@/layouts/MainLayout";
import { getFeaturedMarkets } from "@/data/markets";

const Index = () => {
  const featuredMarkets = getFeaturedMarkets();

  return (
    <MainLayout>
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero" />

        <GlobeScene />

        <div className="absolute inset-0 pointer-events-none hidden lg:block">
          {featuredMarkets.slice(0, 3).map((market, index) => {
            const positions = ["top-[20%] left-[8%]", "top-[35%] right-[6%]", "bottom-[25%] left-[12%]"];
            return (
              <div key={market.id} className={`absolute ${positions[index]} pointer-events-auto`}>
                <FloatingCard market={market} delay={index * 0.3} />
              </div>
            );
          })}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 mb-8"
            >
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm font-medium text-primary">Live Markets • 24/7 Trading</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6"
            >
              Predict the Future.{" "}
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Bet on Outcomes.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              Trade on real-world events across politics, sports, crypto, and more. Put your predictions to the test and
              profit from your insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/politics">
                <Button variant="hero" size="xl" className="gap-2 group">
                  Explore Markets
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="heroOutline" size="xl" className="gap-2">
                  View Dashboard
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-2.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Why Trade on PredictX?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The most advanced prediction market platform with real-time odds, instant settlements, and unmatched
              liquidity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Real-Time Markets",
                description:
                  "Trade on live events with dynamic odds that update in real-time based on market activity.",
              },
              {
                icon: Shield,
                title: "Secure & Transparent",
                description: "All trades are recorded on-chain for complete transparency and security of your funds.",
              },
              {
                icon: Zap,
                title: "Instant Payouts",
                description: "Win a bet? Get your winnings instantly credited to your account. No waiting periods.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-6 text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 mb-5">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;

