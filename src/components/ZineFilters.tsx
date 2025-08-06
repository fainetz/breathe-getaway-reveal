import { Sparkles, Heart, Users, TrendingUp, Clock, Award } from 'lucide-react';

interface ZineFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const ZineFilters = ({ selectedFilter, onFilterChange }: ZineFiltersProps) => {
  const filters = [
    { id: 'all', label: 'All Zines', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'featured', label: 'Featured', icon: Award },
    { id: 'following', label: 'Following', icon: Heart },
    { id: 'new', label: 'New', icon: Clock },
    { id: 'popular', label: 'Most Popular', icon: Users }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedFilter === filter.id
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50 hover:border-primary/20'
            }`}
          >
            <Icon className="w-4 h-4" />
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default ZineFilters;