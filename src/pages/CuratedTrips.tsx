import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Calendar, Users } from 'lucide-react';

const CuratedTrips = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl border-b border-border/50 bg-background/95">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-1.5 hover:bg-card/50 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground">Curated Trips</h1>
              <span className="text-xs text-muted-foreground px-2 py-1 bg-muted/50 rounded-full">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-4">
            <MapPin className="w-3 h-3" />
            <span className="text-xs font-medium">Curated Experiences</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Handpicked Travel Experiences
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We're curating unique travel experiences based on real traveler insights and local expertise. 
            Each trip is designed for specific needs, interests, and travel styles.
          </p>
        </div>

        {/* Coming Soon Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Expert-Curated</h3>
            <p className="text-sm text-muted-foreground">
              Travel experiences curated by local experts and seasoned travelers
            </p>
          </div>
          
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 text-center">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Flexible Planning</h3>
            <p className="text-sm text-muted-foreground">
              Adaptable itineraries that fit your schedule and preferences
            </p>
          </div>
          
          <div className="p-6 rounded-2xl border border-border/50 bg-card/50 text-center">
            <Search className="w-8 h-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Personalized Matches</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered recommendations based on your travel style and interests
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="inline-block p-8 rounded-2xl border border-border/50 bg-card">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Explore?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              While we're preparing these curated experiences, start planning your next adventure with our AI travel assistant.
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => navigate('/chat')}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                <Search className="w-4 h-4" />
                Plan Your Trip
              </button>
              <button 
                onClick={() => navigate('/destinations')}
                className="flex items-center gap-2 px-6 py-3 bg-card/50 text-foreground border border-border/50 rounded-xl font-semibold hover:bg-card transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Browse Destinations
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratedTrips;