import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Users, PlusCircle, Sparkles, Search, Filter } from 'lucide-react';
import ZineCard from '../components/ZineCard';
import ZineFilters from '../components/ZineFilters';

interface ZineEditor {
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  verified: boolean;
}

interface ZineContent {
  type: 'trip-blueprint' | 'journal-entry' | 'local-review' | 'photo-essay';
  title: string;
  excerpt: string;
  author?: string;
}

interface Zine {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  editor: ZineEditor;
  tags: string[];
  contentCount: number;
  followers: number;
  rating: number;
  lastUpdated: string;
  featured: boolean;
  contents: ZineContent[];
}

const CuratedTrips = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const travelZines: Zine[] = [
    {
      id: '1',
      title: 'Two strollers and no regrets — Barcelona with toddlers',
      subtitle: 'Family adventure without the chaos',
      description: 'Realistic Barcelona guide for families with multiple small kids. Real strategies for metro travel, nap scheduling, and sanity preservation.',
      coverImage: '/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png',
      editor: {
        name: 'Rachel Morrison',
        avatar: '/lovable-uploads/d77c7114-7ceb-4de8-8302-8d8c17ae1c79.png',
        bio: 'Mom of twins, travel chaos coordinator',
        followers: 8200,
        verified: false
      },
      tags: ['Family Travel', 'Toddlers', 'Barcelona', 'Practical Tips'],
      contentCount: 14,
      followers: 6800,
      rating: 4.8,
      lastUpdated: '2 days ago',
      featured: true,
      contents: [
        { type: 'trip-blueprint', title: 'Stroller-Friendly Barcelona Routes', excerpt: 'Metro maps that actually work' },
        { type: 'journal-entry', title: 'Meltdown at Sagrada Familia', excerpt: 'When plans go sideways' },
        { type: 'local-review', title: 'Playgrounds Worth the Detour', excerpt: 'Hidden gems for tired parents' },
        { type: 'photo-essay', title: 'Naptime Views', excerpt: 'Beautiful spots for stroller naps' }
      ]
    },
    {
      id: '2',
      title: 'Places I felt safe alone as a Black woman in Europe',
      subtitle: 'Honest experiences and safety insights',
      description: 'Real talk about solo travel safety, cultural experiences, and the cities where I felt genuinely welcome and secure.',
      coverImage: '/lovable-uploads/c3e077fc-fb5b-4df6-9b8c-75bcc742e307.png',
      editor: {
        name: 'Zara Johnson',
        avatar: '/lovable-uploads/6a2f9c54-bbe6-4609-b27d-841996453813.png',
        bio: 'Travel writer, cultural explorer, truth-teller',
        followers: 15600,
        verified: true
      },
      tags: ['Solo Travel', 'Safety', 'Black Women', 'Europe'],
      contentCount: 18,
      followers: 11200,
      rating: 4.9,
      lastUpdated: '1 day ago',
      featured: true,
      contents: [
        { type: 'trip-blueprint', title: 'Amsterdam Solo Wandering', excerpt: 'Why this city felt like home' },
        { type: 'journal-entry', title: 'The Lisbon Experience', excerpt: 'Warmth beyond the weather' },
        { type: 'local-review', title: 'Cities That Surprised Me', excerpt: 'Unexpected safe havens' },
        { type: 'photo-essay', title: 'Confident & Comfortable', excerpt: 'Photos from my safest moments' }
      ]
    },
    {
      id: '3',
      title: 'Solo but not lonely: Japan for introverts',
      subtitle: 'Peaceful adventures for quiet souls',
      description: 'Japan through an introvert\'s lens - quiet temples, solo dining culture, and how to recharge while exploring.',
      coverImage: '/lovable-uploads/84e83280-d2ee-48a4-ba76-9feb7362ed10.png',
      editor: {
        name: 'Maya Chen',
        avatar: '/lovable-uploads/b375de54-3fb8-4756-b6a3-4368913122d6.png',
        bio: 'Introvert traveler, temple seeker',
        followers: 12400,
        verified: true
      },
      tags: ['Solo Travel', 'Introvert', 'Japan', 'Mindful Travel'],
      contentCount: 16,
      followers: 9800,
      rating: 4.8,
      lastUpdated: '3 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Kyoto Temple Hopping Route', excerpt: 'Peaceful paths away from crowds' },
        { type: 'journal-entry', title: 'Eating Alone in Tokyo', excerpt: 'How ramen bars saved my soul' },
        { type: 'local-review', title: 'Ryokans for Solo Travelers', excerpt: 'Where quiet is celebrated' },
        { type: 'photo-essay', title: 'Solitude in Bamboo Forests', excerpt: 'Finding peace in nature' }
      ]
    },
    {
      id: '4',
      title: 'Digital detox: Iceland edition',
      subtitle: 'Disconnect to reconnect with nature',
      description: 'Seven days of pure disconnection in Iceland. No wifi, no notifications, just waterfalls and your thoughts.',
      coverImage: '/lovable-uploads/5f342a0e-24bf-4a28-ba1c-e6c7aed09f67.png',
      editor: {
        name: 'Dr. Sam Taylor',
        avatar: '/lovable-uploads/de9ac698-f095-4727-9365-8db574cbfca2.png',
        bio: 'Ex-tech worker, current nature enthusiast',
        followers: 6700,
        verified: true
      },
      tags: ['Digital Detox', 'Iceland', 'Nature', 'Mindfulness'],
      contentCount: 12,
      followers: 5400,
      rating: 4.9,
      lastUpdated: '4 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Ring Road Without GPS', excerpt: 'Old-school navigation adventure' },
        { type: 'journal-entry', title: 'Day 3: Phone Withdrawal', excerpt: 'When FOMO becomes JOMO' },
        { type: 'local-review', title: 'Offline-Friendly Accommodations', excerpt: 'Places that embrace disconnection' },
        { type: 'photo-essay', title: 'Northern Lights, No Filters', excerpt: 'Experiencing awe without sharing it' }
      ]
    },
    {
      id: '5',
      title: 'Wheelchair-accessible Barcelona: the real guide',
      subtitle: 'Honest accessibility insights',
      description: 'The unvarnished truth about Barcelona\'s accessibility - what works, what doesn\'t, and how to navigate it all.',
      coverImage: '/lovable-uploads/ad282feb-6c07-42fa-a2c1-b6262dc7d9a9.png',
      editor: {
        name: 'Marcus Williams',
        avatar: '/lovable-uploads/b496d712-6814-4b95-864d-dbb412ce5f43.png',
        bio: 'Wheelchair user, accessibility advocate',
        followers: 11300,
        verified: true
      },
      tags: ['Accessibility', 'Barcelona', 'Wheelchair', 'Honest Reviews'],
      contentCount: 16,
      followers: 8700,
      rating: 4.8,
      lastUpdated: '5 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Accessible Metro Routes', excerpt: 'Which stations actually work' },
        { type: 'journal-entry', title: 'Sagrada Familia Reality Check', excerpt: 'Beautiful but challenging' },
        { type: 'local-review', title: 'Hotels That Get It Right', excerpt: 'Beyond basic compliance' },
        { type: 'photo-essay', title: 'Rolling Through Barcelona', excerpt: 'The good, bad, and accessible' }
      ]
    },
    {
      id: '6',
      title: 'Muslim-friendly Paris in the summer',
      subtitle: 'Halal food, prayer times, and cultural respect',
      description: 'Navigate Paris as a Muslim traveler with confidence. Mosque locations, halal restaurants, and cultural considerations.',
      coverImage: '/lovable-uploads/9f082fcd-2f60-40ba-a703-582f95955704.png',
      editor: {
        name: 'Amina Hassan',
        avatar: '/lovable-uploads/865b2ee3-3062-4d55-9354-b3f3dbbcef62.png',
        bio: 'Muslim travel blogger, cultural bridge-builder',
        followers: 9800,
        verified: true
      },
      tags: ['Muslim Travel', 'Halal Food', 'Paris', 'Cultural Respect'],
      contentCount: 15,
      followers: 7300,
      rating: 4.7,
      lastUpdated: '6 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Mosque & Monument Route', excerpt: 'Prayer times around major sights' },
        { type: 'journal-entry', title: 'Ramadan in Paris', excerpt: 'Finding community while traveling' },
        { type: 'local-review', title: 'Best Halal Restaurants', excerpt: 'Beyond just kebab shops' },
        { type: 'photo-essay', title: 'Islamic Art in Paris', excerpt: 'Hidden cultural treasures' }
      ]
    }
  ];

  const filteredZines = travelZines.filter(zine => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'featured' && zine.featured) ||
      (selectedFilter === 'trending' && zine.rating >= 4.8) ||
      (selectedFilter === 'new' && zine.lastUpdated.includes('day')) ||
      (selectedFilter === 'popular' && zine.followers > 8000);
    
    const matchesSearch = searchQuery === '' || 
      zine.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zine.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      zine.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const handleZineClick = (zine: Zine) => {
    const query = `${zine.title} zine - ${zine.subtitle}`;
    navigate(`/trip-results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      {/* Header - Positioned below nav scroller */}
      <div className="sticky top-20 md:top-24 z-30 backdrop-blur-xl border-b border-border/50 bg-background/95 safe-area-inset-top">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 sm:p-1.5 hover:bg-card/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground touch-manipulation"
            >
              <ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4" />
            </button>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <h1 className="text-xl sm:text-lg font-semibold text-foreground truncate">Curated Trips</h1>
              <span className="hidden sm:inline text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded-full whitespace-nowrap">
                Trips designed for specific needs & situations
              </span>
            </div>
          </div>
          {/* Mobile subtitle */}
          <div className="sm:hidden mt-2">
            <span className="text-xs text-muted-foreground">
              Trips designed for specific needs & situations
            </span>
          </div>
        </div>
      </div>

      {/* Main Content with spacing for nav + header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-6 sm:pb-8 safe-area-inset-bottom">
        {/* Hero Section - Mobile optimized */}
        <div className="text-center mb-8 sm:mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-1 bg-primary/10 text-primary rounded-full mb-4 sm:mb-3">
            <BookOpen className="w-4 h-4 sm:w-3 sm:h-3" />
            <span className="text-sm sm:text-xs font-medium">Trip Zines</span>
          </div>
          <h2 className="text-2xl sm:text-xl md:text-2xl font-semibold text-foreground mb-3 sm:mb-2 px-4 sm:px-0">
            Niche Travel Magazines
          </h2>
          <p className="text-base sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
            Curated travel collections by real people with real stories.
          </p>
          
          {/* Search Bar - Mobile optimized */}
          <div className="max-w-sm mx-auto mt-6 sm:mt-4 relative px-4 sm:px-0">
            <Search className="absolute left-7 sm:left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 sm:w-3 sm:h-3" />
            <input
              type="text"
              placeholder="Search zines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 sm:pl-9 pr-4 sm:pr-3 py-3 sm:py-2 text-base sm:text-sm rounded-xl sm:rounded-lg border border-border/50 bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 sm:focus:ring-1 focus:ring-primary/50 focus:border-primary touch-manipulation"
              style={{ fontSize: '16px' }} // Prevent zoom on iOS
            />
          </div>
        </div>

        {/* Filters - Mobile optimized */}
        <div className="mb-6 sm:mb-4 px-2 sm:px-0">
          <ZineFilters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        </div>

        {/* Zines Grid - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-2 sm:px-0">
          {filteredZines.map((zine) => (
            <ZineCard key={zine.id} zine={zine} onZineClick={handleZineClick} />
          ))}
        </div>

        {/* Empty State - Mobile optimized */}
        {filteredZines.length === 0 && (
          <div className="text-center py-16 sm:py-12 px-4 sm:px-0">
            <BookOpen className="w-16 h-16 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl sm:text-lg font-semibold text-foreground mb-2">No Zines Found</h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto">
              Try adjusting your search or filter to discover more travel zines.
            </p>
          </div>
        )}

        {/* Call to Action - Mobile optimized */}
        <div className="text-center mt-16 sm:mt-12 px-4 sm:px-0">
          <div className="inline-block p-6 sm:p-8 rounded-2xl border border-border/50 bg-card w-full max-w-md sm:max-w-none">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              Want to Create Your Own Zine?
            </h3>
            <p className="text-muted-foreground mb-6 sm:mb-6 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
              Have a unique travel perspective or niche expertise? Pitch your zine idea and start curating for our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button 
                onClick={() => navigate('/chat')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors touch-manipulation w-full sm:w-auto"
              >
                <PlusCircle className="w-4 h-4" />
                Pitch a Zine
              </button>
              <button 
                onClick={() => navigate('/chat')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-card/50 text-foreground border border-border/50 rounded-xl font-semibold hover:bg-card transition-colors touch-manipulation w-full sm:w-auto"
              >
                <Search className="w-4 h-4" />
                Custom Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratedTrips;