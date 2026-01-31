import { Bitcoin } from 'lucide-react';
import CategoryPage from '@/components/CategoryPage';

const Crypto = () => {
  return (
    <CategoryPage
      category="crypto"
      title="Crypto"
      description="Trade on cryptocurrency prices, adoption milestones, and market events."
      icon={Bitcoin}
      backdropImage="/images/crypto-hero.jpg"
    />
  );
};

export default Crypto;
