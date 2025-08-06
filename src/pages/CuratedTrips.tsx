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
      title: 'Quiet AF Trips for Tech Burnout',
      subtitle: 'Digital detox destinations that actually work',
      description: 'Real escapes from the constant ping of notifications. Curated by burnt-out tech workers who found their way back to peace.',
      coverImage: '/lovable-uploads/84e83280-d2ee-48a4-ba76-9feb7362ed10.png',
      editor: {
        name: 'Maya Chen',
        avatar: '/lovable-uploads/5935897b-1c16-4e4f-8a47-50073b06561d.png',
        bio: 'Ex-Silicon Valley, now finding quiet places',
        followers: 12400,
        verified: true
      },
      tags: ['Digital Detox', 'Mental Health', 'Remote Work', 'Mindfulness'],
      contentCount: 12,
      followers: 8900,
      rating: 4.9,
      lastUpdated: '2 days ago',
      featured: true,
      contents: [
        { type: 'trip-blueprint', title: 'Iceland Silent Retreat (No Wifi)', excerpt: '7 days of pure disconnection' },
        { type: 'journal-entry', title: 'Day 3: I Forgot What Slack Was', excerpt: 'Personal account of digital withdrawal' },
        { type: 'local-review', title: 'Monastery Stays in Bhutan', excerpt: 'Rating the most peaceful places on earth' },
        { type: 'photo-essay', title: 'Sunrise Without Instagram', excerpt: 'What happens when you just watch' }
      ]
    },
    {
      id: '2',
      title: 'Black Women Abroad',
      subtitle: 'Stories, tips, and real talk from the road',
      description: 'Honest travel experiences, safety insights, and cultural connections from Black women exploring the world unapologetically.',
      coverImage: '/lovable-uploads/c3e077fc-fb5b-4df6-9b8c-75bcc742e307.png',
      editor: {
        name: 'Zara Johnson',
        avatar: '/lovable-uploads/6a2f9c54-bbe6-4609-b27d-841996453813.png',
        bio: 'Travel writer, cultural explorer, truth-teller',
        followers: 15600,
        verified: true
      },
      tags: ['Solo Travel', 'Cultural Heritage', 'Safety', 'Empowerment'],
      contentCount: 18,
      followers: 11200,
      rating: 4.8,
      lastUpdated: '1 day ago',
      featured: true,
      contents: [
        { type: 'trip-blueprint', title: 'Ghana Homecoming Journey', excerpt: 'A deeply personal 2-week itinerary' },
        { type: 'journal-entry', title: 'Hair Care in Humid Climates', excerpt: 'Real talk about travel beauty routines' },
        { type: 'local-review', title: 'Black-Owned Hotels Worldwide', excerpt: 'Supporting our community while traveling' },
        { type: 'photo-essay', title: 'Melanin in Morocco', excerpt: 'Finding representation in unexpected places' }
      ]
    },
    {
      id: '3',
      title: 'Luxury Travel That Isn\'t Cringe',
      subtitle: 'High-end experiences without the pretense',
      description: 'Thoughtful luxury travel that respects local culture, pays fair wages, and doesn\'t make you feel like a walking Instagram ad.',
      coverImage: '/lovable-uploads/9f082fcd-2f60-40ba-a703-582f95955704.png',
      editor: {
        name: 'Alessandro Rossi',
        avatar: '/lovable-uploads/37d54649-724a-4949-a90c-e7ce7a18e976.png',
        bio: 'Hospitality industry insider, ethical luxury advocate',
        followers: 9800,
        verified: true
      },
      tags: ['Sustainable Luxury', 'Local Culture', 'Responsible Travel', 'Authentic Experiences'],
      contentCount: 15,
      followers: 7300,
      rating: 4.7,
      lastUpdated: '4 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Japan\'s Hidden Ryokans', excerpt: 'Traditional inns that respect heritage' },
        { type: 'journal-entry', title: 'Why I Stopped Flying Private', excerpt: 'A privileged perspective on climate impact' },
        { type: 'local-review', title: 'Michelin vs. Street Food', excerpt: 'When expensive isn\'t better' },
        { type: 'photo-essay', title: 'Craft Over Corporate', excerpt: 'Supporting artisan communities' }
      ]
    },
    {
      id: '4',
      title: 'Neurodivergent Nomads',
      subtitle: 'Travel guides for different brains',
      description: 'Sensory-friendly destinations, routine-flexible itineraries, and real advice from travelers who think differently.',
      coverImage: '/lovable-uploads/5f342a0e-24bf-4a28-ba1c-e6c7aed09f67.png',
      editor: {
        name: 'Dr. Sam Taylor',
        avatar: '/lovable-uploads/40732476-5f3d-426e-b486-daf165370855.png',
        bio: 'Autism researcher & travel enthusiast',
        followers: 6700,
        verified: true
      },
      tags: ['Neurodivergent', 'Sensory-Friendly', 'Accessibility', 'Family Travel'],
      contentCount: 14,
      followers: 5400,
      rating: 4.9,
      lastUpdated: '1 week ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Tokyo for Sensory Seekers', excerpt: 'Structured chaos that actually works' },
        { type: 'journal-entry', title: 'Meltdown in Milan', excerpt: 'When travel plans go wrong (and that\'s okay)' },
        { type: 'local-review', title: 'Autism-Friendly Airlines', excerpt: 'Who actually gets it right' },
        { type: 'photo-essay', title: 'Stimming in Stunning Places', excerpt: 'Finding comfort in beautiful spaces' }
      ]
    },
    {
      id: '5',
      title: 'Single Parents Escape Club',
      subtitle: 'Adventures that work with real life',
      description: 'Realistic travel plans for parents doing it solo - with backup plans, kid-friendly logistics, and sanity-saving tips.',
      coverImage: '/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png',
      editor: {
        name: 'Rachel Morrison',
        avatar: '/lovable-uploads/c19085d5-4229-450c-8c8c-aa391d6902a5.png',
        bio: 'Single mom of 2, reformed perfectionist',
        followers: 8200,
        verified: false
      },
      tags: ['Single Parent', 'Family Travel', 'Budget-Friendly', 'Realistic Planning'],
      contentCount: 11,
      followers: 6100,
      rating: 4.6,
      lastUpdated: '3 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Costa Rica with Kids (Solo)', excerpt: 'Adventure that won\'t break you or the bank' },
        { type: 'journal-entry', title: 'Airport Crying is Normal', excerpt: 'When travel gets overwhelming' },
        { type: 'local-review', title: 'Kid Clubs That Actually Help', excerpt: 'Where parents can actually relax' },
        { type: 'photo-essay', title: 'Bedtime Stories from Bali', excerpt: 'Making memories in chaos' }
      ]
    },
    {
      id: '6',
      title: 'Accessible Adventures',
      subtitle: 'The world is for everyone',
      description: 'Wheelchair-accessible wonders, mobility-friendly routes, and destinations that welcome all bodies with genuine inclusivity.',
      coverImage: '/lovable-uploads/ad282feb-6c07-42fa-a2c1-b6262dc7d9a9.png',
      editor: {
        name: 'Marcus Williams',
        avatar: '/lovable-uploads/42f30823-7039-463f-8b34-fa31699595d9.png',
        bio: 'Adaptive sports athlete, accessibility consultant',
        followers: 11300,
        verified: true
      },
      tags: ['Accessibility', 'Inclusive Travel', 'Universal Design', 'Adventure'],
      contentCount: 16,
      followers: 8700,
      rating: 4.8,
      lastUpdated: '5 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'European Art Cities by Wheelchair', excerpt: 'Culture without barriers' },
        { type: 'journal-entry', title: 'The Bathroom Situation', excerpt: 'Let\'s talk about what really matters' },
        { type: 'local-review', title: 'Hotels That Get It Right', excerpt: 'Beyond just ramps and elevators' },
        { type: 'photo-essay', title: 'Rolling Through Rome', excerpt: 'Ancient streets, modern access' }
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
    <div className="min-h-screen bg-background text-foreground pt-24 overflow-x-hidden transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-16 z-40 backdrop-blur-xl border-b border-border/50 bg-background/90"
        style={{ position: 'sticky' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-muted/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Curated Trips</h1>
              <p className="text-sm text-muted-foreground">Trips designed for specific needs & situations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-medium">Trip Zines</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Niche Travel Magazines
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Thoughtfully curated travel collections by real people with real stories. Each zine is a deep dive into specific travel experiences, complete with blueprints, honest reviews, and personal insights.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search zines, topics, or editors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/50 bg-card/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ZineFilters selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
        </div>

        {/* Zines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredZines.map((zine) => (
            <ZineCard key={zine.id} zine={zine} onZineClick={handleZineClick} />
          ))}
        </div>

        {/* Empty State */}
        {filteredZines.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Zines Found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to discover more travel zines.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div 
            className="inline-block p-8 rounded-2xl border border-border/50 bg-card"
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Want to Create Your Own Zine?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Have a unique travel perspective or niche expertise? Pitch your zine idea and start curating for our community.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => navigate('/chat')}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Pitch a Zine
              </button>
              <button 
                onClick={() => navigate('/chat')}
                className="flex items-center gap-2 px-6 py-3 bg-card/50 text-foreground border border-border/50 rounded-xl font-semibold hover:bg-card transition-colors"
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