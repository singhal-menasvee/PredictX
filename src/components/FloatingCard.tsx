import { motion } from "framer-motion";
import type { Market } from "@/data/markets";

interface FloatingCardProps {
  market: Market;
  delay?: number;
  className?: string;
}

const FloatingCard = ({ market, delay = 0, className = "" }: FloatingCardProps) => {
  const mainOutcome = market.outcomes[0];
  const isYes = mainOutcome.name.toLowerCase() === "yes";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -15, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: 4 + Math.random() * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      className={`glass-card p-3 min-w-[180px] max-w-[220px] cursor-pointer hover:border-primary/50 transition-colors ${className}`}
    >
      <p className="text-xs font-medium text-foreground line-clamp-2 mb-2">{market.title}</p>
      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-lg font-bold ${
            isYes || mainOutcome.probability > 50 ? "text-success" : "text-destructive"
          }`}
        >
          {mainOutcome.probability}%
        </span>
        <span className="text-xs text-muted-foreground">{mainOutcome.name}</span>
      </div>
    </motion.div>
  );
};

export default FloatingCard;

