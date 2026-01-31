import { Cpu } from 'lucide-react';
import CategoryPage from '@/components/CategoryPage';

const Tech = () => {
  return (
    <CategoryPage
      category="tech"
      title="Tech"
      description="Trade on product launches, company milestones, and tech breakthroughs."
      icon={Cpu}
    />
  );
};

export default Tech;
