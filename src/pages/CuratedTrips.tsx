import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Users, MapPin, Clock, Star, Eye, Sparkles, Shield, Baby, Accessibility } from 'lucide-react';

interface CuratedTrip {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  duration: string;
  priceRange: string;
  imageUrl: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  rating: number;
  tripCount: number;
  situations: string[];
}

const CuratedTrips = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Trips', icon: MapPin },
    { id: 'solo-female', label: 'Solo Female', icon: Shield },
    { id: 'neurodivergent', label: 'Neurodivergent Friendly', icon: Accessibility },
    { id: 'family', label: 'Family Challenges', icon: Baby },
    { id: 'accessibility', label: 'Accessibility Needs', icon: Users },
    { id: 'cultural', label: 'Cultural Sensitivities', icon: Eye }
  ];

  const curatedTrips: CuratedTrip[] = [
    {
      id: '1',
      title: 'Safe Solo Female Travel in Spain',
      description: 'Navigate Spain confidently with insider tips on safe neighborhoods, reliable transport, and female-friendly accommodations.',
      category: 'solo-female',
      tags: ['Solo Travel', 'Safety First', 'Cultural Immersion', 'Budget-Friendly'],
      duration: '7-10 days',
      priceRange: '$800-1200',
      imageUrl: '/lovable-uploads/c3e077fc-fb5b-4df6-9b8c-75bcc742e307.png',
      difficulty: 'Easy',
      rating: 4.9,
      tripCount: 1247,
      situations: [
        'Avoiding tourist scams in Barcelona',
        'Safe late-night transport options',
        'Female-only accommodations and spaces',
        'Cultural norms around solo dining'
      ]
    },
    {
      id: '2',
      title: 'Traveling with Neurodivergent Children in Japan',
      description: 'Experience Japan stress-free with sensory-friendly activities, quiet spaces, and autism-understanding accommodations.',
      category: 'neurodivergent',
      tags: ['Family Travel', 'Sensory-Friendly', 'Structured Itinerary', 'Educational'],
      duration: '10-14 days',
      priceRange: '$2500-4000',
      imageUrl: '/lovable-uploads/5f342a0e-24bf-4a28-ba1c-e6c7aed09f67.png',
      difficulty: 'Moderate',
      rating: 4.8,
      tripCount: 432,
      situations: [
        'Sensory-friendly temple visits',
        'Quiet train car reservations',
        'Visual schedule creation for activities',
        'Autism-friendly hotels with routine support'
      ]
    },
    {
      id: '3',
      title: 'Wheelchair Accessible Europe',
      description: 'Explore European cities with confidence using wheelchair-accessible transport, attractions, and accommodations.',
      category: 'accessibility',
      tags: ['Accessibility', 'City Breaks', 'Culture', 'Historic Sites'],
      duration: '14-21 days',
      priceRange: '$1800-3200',
      imageUrl: '/lovable-uploads/ad282feb-6c07-42fa-a2c1-b6262dc7d9a9.png',
      difficulty: 'Easy',
      rating: 4.7,
      tripCount: 890,
      situations: [
        'Accessible museum entrances and facilities',
        'Wheelchair-friendly public transport',
        'Hotels with roll-in showers',
        'Accessible restaurant recommendations'
      ]
    },
    {
      id: '4',
      title: 'Halal Family Travel in Southeast Asia',
      description: 'Discover halal-friendly destinations with mosque locations, prayer times, and family-appropriate activities.',
      category: 'cultural',
      tags: ['Halal', 'Family', 'Cultural Respect', 'Religious Sites'],
      duration: '12-16 days',
      priceRange: '$1500-2800',
      imageUrl: '/lovable-uploads/9f082fcd-2f60-40ba-a703-582f95955704.png',
      difficulty: 'Easy',
      rating: 4.9,
      tripCount: 756,
      situations: [
        'Finding nearby mosques for prayer',
        'Halal restaurant verification',
        'Modest dress code guidance',
        'Family-friendly Islamic cultural sites'
      ]
    },
    {
      id: '5',
      title: 'Single Parent Adventures in Costa Rica',
      description: 'Manageable adventures for single parents with age-appropriate activities and childcare support options.',
      category: 'family',
      tags: ['Single Parent', 'Adventure', 'Kid-Friendly', 'Support Network'],
      duration: '7-10 days',
      priceRange: '$1200-2200',
      imageUrl: '/lovable-uploads/6a3317c4-1f50-4152-9c40-e9b2a8c49675.png',
      difficulty: 'Moderate',
      rating: 4.6,
      tripCount: 623,
      situations: [
        'Supervised kids clubs during activities',
        'Single-parent group tour options',
        'Age-appropriate adventure levels',
        'Emergency childcare arrangements'
      ]
    },
    {
      id: '6',
      title: 'Anxiety-Friendly Iceland',
      description: 'Low-stress travel with predictable schedules, small groups, and mental health-conscious planning.',
      category: 'neurodivergent',
      tags: ['Mental Health', 'Small Groups', 'Nature Therapy', 'Flexible Itinerary'],
      duration: '5-8 days',
      priceRange: '$1800-2800',
      imageUrl: '/lovable-uploads/84e83280-d2ee-48a4-ba76-9feb7362ed10.png',
      difficulty: 'Easy',
      rating: 4.8,
      tripCount: 345,
      situations: [
        'Quiet nature activities for overwhelm',
        'Flexible schedule for bad mental health days',
        'Small group tours under 8 people',
        'Hotels with 24/7 support services'
      ]
    }
  ];

  const filteredTrips = selectedCategory === 'all' 
    ? curatedTrips 
    : curatedTrips.filter(trip => trip.category === selectedCategory);

  const handleTripClick = (trip: CuratedTrip) => {
    const query = `${trip.title} - curated trip`;
    navigate(`/trip-results?q=${encodeURIComponent(query)}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'text-green-600 bg-green-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      case 'Challenging': return 'text-red-600 bg-red-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-soft)' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-xl border-b border-border/50" style={{ background: 'hsl(var(--background) / 0.9)' }}>
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
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Someone Gets You</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Travel Made for Your Reality
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real trips planned by people who understand your specific challenges, needs, and limitations. 
            Because everyone deserves to explore the world, regardless of their circumstances.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground border border-border/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Trip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => handleTripClick(trip)}
              className="group cursor-pointer"
            >
              <div 
                className="rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30"
                style={{ background: 'var(--gradient-card)' }}
              >
                {/* Image */}
                <div 
                  className="h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${trip.imageUrl})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(trip.difficulty)}`}>
                      {trip.difficulty}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {trip.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {trip.tripCount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {trip.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm font-medium text-foreground">{trip.rating}</span>
                        </div>
                        <span className="text-muted-foreground text-sm">•</span>
                        <span className="text-sm font-medium text-primary">{trip.priceRange}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {trip.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {trip.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {trip.tags.length > 3 && (
                      <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                        +{trip.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Situations Preview */}
                  <div className="border-t border-border/30 pt-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Addresses:</h4>
                    <ul className="space-y-1">
                      {trip.situations.slice(0, 2).map((situation, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {situation}
                        </li>
                      ))}
                      {trip.situations.length > 2 && (
                        <li className="text-xs text-primary font-medium">
                          +{trip.situations.length - 2} more situations covered
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div 
            className="inline-block p-8 rounded-2xl border border-border/50"
            style={{ background: 'var(--gradient-card)' }}
          >
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Don't See Your Situation?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Tell us about your specific needs and we'll create a personalized trip that works for your unique circumstances.
            </p>
            <button 
              onClick={() => navigate('/chat')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Create Custom Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratedTrips;