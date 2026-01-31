import { motion } from 'framer-motion';
import MainLayout from '@/layouts/MainLayout';
import PredictionCard from '@/components/PredictionCard';
import { getMarketsByCategory, type Market } from '@/data/markets';
import { LucideIcon } from 'lucide-react';

interface CategoryPageProps {
  category: Market['category'];
  title: string;
  description: string;
  icon: LucideIcon;
}

const CategoryPage = ({ category, title, description, icon: Icon }: CategoryPageProps) => {
  const markets = getMarketsByCategory(category);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">{title}</h1>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </motion.div>

        {/* Markets Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {markets.map((market, index) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PredictionCard market={market} />
            </motion.div>
          ))}
        </div>

        {markets.length === 0 && (
          <div className="glass-card p-12 text-center">
            <p className="text-muted-foreground">No markets available in this category yet.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
