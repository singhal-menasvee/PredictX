import { TrendingUp } from 'lucide-react';
import CategoryPage from '@/components/CategoryPage';

const Finance = () => {
  return (
    <CategoryPage
      category="finance"
      title="Finance"
      description="Predict interest rates, market movements, and economic indicators."
      icon={TrendingUp}
      backdropImage="/images/finance-hero.jpg"
    />
  );
};

export default Finance;
