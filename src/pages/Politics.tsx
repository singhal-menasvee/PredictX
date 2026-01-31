import { Vote } from 'lucide-react';
import CategoryPage from '@/components/CategoryPage';

const Politics = () => {
  return (
    <CategoryPage
      category="politics"
      title="Politics"
      description="Trade on elections, policy decisions, and political events worldwide."
      icon={Vote}
    />
  );
};

export default Politics;
