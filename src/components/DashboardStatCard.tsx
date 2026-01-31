import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';

interface DashboardStatCardProps {
  title: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

const DashboardStatCard = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  variant = 'default',
}: DashboardStatCardProps) => {
  const variantStyles = {
    default: 'from-primary/20 to-primary/5 border-primary/20',
    success: 'from-success/20 to-success/5 border-success/20',
    warning: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/20',
    danger: 'from-destructive/20 to-destructive/5 border-destructive/20',
  };

  const iconStyles = {
    default: 'bg-primary/20 text-primary',
    success: 'bg-success/20 text-success',
    warning: 'bg-yellow-500/20 text-yellow-500',
    danger: 'bg-destructive/20 text-destructive',
  };

  const getTrendIcon = () => {
    if (change === undefined) return null;
    if (change > 0) return <TrendingUp className="h-4 w-4 text-success" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-destructive" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendColor = () => {
    if (change === undefined) return '';
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-br p-5 ${variantStyles[variant]}`}
    >
      {/* Background glow */}
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-current opacity-5 blur-2xl" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className={`rounded-lg p-2.5 ${iconStyles[variant]}`}>
            <Icon className="h-5 w-5" />
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
              {getTrendIcon()}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground font-display">{value}</p>
          {changeLabel && (
            <p className="text-xs text-muted-foreground mt-1">{changeLabel}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardStatCard;
