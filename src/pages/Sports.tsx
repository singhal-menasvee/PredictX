import { Trophy } from 'lucide-react';
import CategoryPage from '@/components/CategoryPage';

const Sports = () => {
  return (
    <CategoryPage
      category="sports"
      title="Sports"
      description="Bet on championships, player awards, and major sporting events."
      icon={Trophy}
      backdropImage="/images/sports-hero.jpg"
    />
  );
};

export default Sports;
