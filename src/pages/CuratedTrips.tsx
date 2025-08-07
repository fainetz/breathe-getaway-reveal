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
    },
    {
      id: '7',
      title: 'Traveling vegan in southern Italy (yes, it\'s possible)',
      subtitle: 'Plant-based paradise in pasta land',
      description: 'Discover southern Italy\'s incredible vegan scene. From traditional plant dishes to modern vegan restaurants.',
      coverImage: '/lovable-uploads/250f747d-157f-480c-9c25-76d931a9ad49.png',
      editor: {
        name: 'Sofia Romano',
        avatar: '/lovable-uploads/1b34fb02-ef92-4f9c-abad-7c07f22e9457.png',
        bio: 'Vegan food writer, Italian cuisine explorer',
        followers: 8900,
        verified: false
      },
      tags: ['Vegan Travel', 'Italy', 'Food Culture', 'Plant-Based'],
      contentCount: 13,
      followers: 6500,
      rating: 4.6,
      lastUpdated: '1 week ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Puglia Vegan Food Trail', excerpt: 'Traditional dishes, no meat' },
        { type: 'journal-entry', title: 'Explaining Veganism in Italian', excerpt: 'Language barriers and breakthroughs' },
        { type: 'local-review', title: 'Naples\' Hidden Vegan Gems', excerpt: 'Pizza and beyond' },
        { type: 'photo-essay', title: 'Market Day in Sicily', excerpt: 'Incredible produce and local connections' }
      ]
    },
    {
      id: '8',
      title: 'Luxury with kids: Bali without the chaos',
      subtitle: 'High-end family travel done right',
      description: 'Experience Bali\'s luxury side with children in tow. Family-friendly resorts, cultural experiences, and stress-free planning.',
      coverImage: '/lovable-uploads/33c21689-4a63-4d20-b050-b566ede4b771.png',
      editor: {
        name: 'Diana Patel',
        avatar: '/lovable-uploads/349adef3-59ea-405e-bc62-d704ea49bf62.png',
        bio: 'Luxury family travel specialist',
        followers: 12100,
        verified: true
      },
      tags: ['Luxury Travel', 'Family', 'Bali', 'Kids'],
      contentCount: 17,
      followers: 9200,
      rating: 4.7,
      lastUpdated: '3 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Kid-Friendly Luxury Resorts', excerpt: 'Where parents can actually relax' },
        { type: 'journal-entry', title: 'Temple Visits with Toddlers', excerpt: 'Cultural respect meets chaos' },
        { type: 'local-review', title: 'Ubud for Families', excerpt: 'Jungle adventures, spa time' },
        { type: 'photo-essay', title: 'Sunset Beaches, Happy Kids', excerpt: 'Perfect family moments' }
      ]
    },
    {
      id: '9',
      title: 'Mountains > People: A week off-grid in Colorado',
      subtitle: 'Escape civilization completely',
      description: 'True wilderness immersion in Colorado\'s backcountry. No cell service, no crowds, just mountains and peace.',
      coverImage: '/lovable-uploads/462239f6-9a27-4b7d-a660-d8474967fd14.png',
      editor: {
        name: 'Jake Mountain',
        avatar: '/lovable-uploads/44271e40-b9f9-4b74-a5b9-9f414e3a5eac.png',
        bio: 'Wilderness guide, people avoider',
        followers: 7400,
        verified: false
      },
      tags: ['Off-Grid', 'Colorado', 'Wilderness', 'Solo Travel'],
      contentCount: 11,
      followers: 5900,
      rating: 4.8,
      lastUpdated: '2 weeks ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Remote Colorado Trails', excerpt: 'Where you\'ll see more elk than people' },
        { type: 'journal-entry', title: 'Day 5: Talking to Trees', excerpt: 'When solitude becomes communion' },
        { type: 'local-review', title: 'Gear That Actually Works', excerpt: 'Tested in real wilderness' },
        { type: 'photo-essay', title: '14ers in Solitude', excerpt: 'Summit views, zero crowds' }
      ]
    },
    {
      id: '10',
      title: 'Cheap but dreamy: Croatia on $100/day',
      subtitle: 'Adriatic luxury on a budget',
      description: 'Experience Croatia\'s stunning coastline without breaking the bank. Smart strategies for affordable island hopping.',
      coverImage: '/lovable-uploads/495f63b6-10b4-4636-9eaa-039faf98b098.png',
      editor: {
        name: 'Ana Kovač',
        avatar: '/lovable-uploads/4bedad66-82e6-44d2-a571-8ac9e6a3973d.png',
        bio: 'Budget travel expert, Croatian local',
        followers: 10200,
        verified: false
      },
      tags: ['Budget Travel', 'Croatia', 'Island Hopping', 'Adriatic'],
      contentCount: 14,
      followers: 7800,
      rating: 4.5,
      lastUpdated: '4 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Island Hopping Route', excerpt: 'Ferry schedules and hidden costs' },
        { type: 'journal-entry', title: 'Dubrovnik on a Dime', excerpt: 'Game of Thrones locations for less' },
        { type: 'local-review', title: 'Apartment vs Hotel Reality', excerpt: 'Where to save, where to splurge' },
        { type: 'photo-essay', title: 'Croatian Sunsets for Free', excerpt: 'Million-dollar views, zero cost' }
      ]
    },
    {
      id: '11',
      title: 'Baby naps + beach time: Croatia with an infant',
      subtitle: 'Coastal family travel with tiny humans',
      description: 'Navigate Croatia\'s islands with a baby in tow. Stroller-friendly beaches, nap schedules, and realistic expectations.',
      coverImage: '/lovable-uploads/5da0882d-c336-4a6c-b816-25ff575ea341.png',
      editor: {
        name: 'Emma Thompson',
        avatar: '/lovable-uploads/5e12c786-7c01-4fb4-bf1b-eea0010773a6.png',
        bio: 'New mom, determined traveler',
        followers: 6300,
        verified: false
      },
      tags: ['Baby Travel', 'Croatia', 'Family', 'Beach'],
      contentCount: 12,
      followers: 4800,
      rating: 4.7,
      lastUpdated: '1 week ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Baby-Friendly Beach Route', excerpt: 'Shade, facilities, and peace' },
        { type: 'journal-entry', title: 'Ferry Naps and Sea Breezes', excerpt: 'When babies love boat rides' },
        { type: 'local-review', title: 'Restaurants That Welcome Babies', excerpt: 'High chairs and understanding' },
        { type: 'photo-essay', title: 'First Beach Day', excerpt: 'Tiny toes in Adriatic sand' }
      ]
    },
    {
      id: '12',
      title: 'Teen-approved Japan: anime, arcades & culture',
      subtitle: 'Japan through teenage eyes',
      description: 'Keep teenagers engaged in Japan with the perfect mix of pop culture, technology, and traditional experiences.',
      coverImage: '/lovable-uploads/57128f78-ae84-40b4-9e6e-e92dfb583dc4.png',
      editor: {
        name: 'Kenji Nakamura',
        avatar: '/lovable-uploads/5f365107-6261-4234-b664-965c3aea763b.png',
        bio: 'Otaku parent, cultural translator',
        followers: 9600,
        verified: true
      },
      tags: ['Teen Travel', 'Japan', 'Anime', 'Pop Culture'],
      contentCount: 15,
      followers: 8100,
      rating: 4.6,
      lastUpdated: '5 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Akihabara to Asakusa Route', excerpt: 'Modern anime culture meets tradition' },
        { type: 'journal-entry', title: 'My Teen Loved the Fish Market?', excerpt: 'Unexpected moments of connection' },
        { type: 'local-review', title: 'Arcade vs Temple Visits', excerpt: 'Balancing fun with culture' },
        { type: 'photo-essay', title: 'Cosplay in Harajuku', excerpt: 'When teens embrace Japanese creativity' }
      ]
    },
    {
      id: '13',
      title: 'Introvert-friendly Vietnam: the itinerary I wish I had',
      subtitle: 'Quiet corners in a bustling country',
      description: 'Vietnam for introverts who want authentic experiences without overwhelming crowds. Peaceful routes and mindful travel.',
      coverImage: '/lovable-uploads/5f78a1b2-c7a5-4064-891c-f2ab5db2c767.png',
      editor: {
        name: 'Linh Nguyen',
        avatar: '/lovable-uploads/62358993-d15b-4b81-9c51-49ab4c2e8d79.png',
        bio: 'Quiet traveler, cultural observer',
        followers: 7200,
        verified: false
      },
      tags: ['Introvert Travel', 'Vietnam', 'Cultural Immersion', 'Peaceful'],
      contentCount: 13,
      followers: 5600,
      rating: 4.8,
      lastUpdated: '6 days ago',
      featured: false,
      contents: [
        { type: 'trip-blueprint', title: 'Northern Mountains Route', excerpt: 'Sapa without tour groups' },
        { type: 'journal-entry', title: 'Coffee Shop Meditation', excerpt: 'Finding peace in Vietnamese café culture' },
        { type: 'local-review', title: 'Homestays vs Hotels', excerpt: 'Authentic connections without overwhelm' },
        { type: 'photo-essay', title: 'Mekong Delta Mornings', excerpt: 'Quiet moments on the water' }
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
      {/* Header */}
      <div className="sticky top-16 z-40 backdrop-blur-xl border-b border-border/50 bg-background/95">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-1.5 hover:bg-card/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Curated Trips</h1>
              <p className="text-xs text-muted-foreground">Trips designed for specific needs & situations</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-6 pb-4">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-3">
            <BookOpen className="w-3 h-3" />
            <span className="text-xs font-medium">Trip Zines</span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
            Niche Travel Magazines
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Curated travel collections by real people with real stories.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-sm mx-auto mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-3 h-3" />
            <input
              type="text"
              placeholder="Search zines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border/50 bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4">
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