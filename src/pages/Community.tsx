import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, MessageCircle, Heart, Share, Search, Filter, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import CreateCommunityDialog from '@/components/community/CreateCommunityDialog';
import WaitlistForm from '@/components/WaitlistForm';
import ThreeBackground from '@/components/ThreeBackground';
import communityBeachDesktop from '@/assets/community-beach-desktop.jpg';
import communityLagoonMobile from '@/assets/community-lagoon-mobile.jpg';

interface Community {
  id: string;
  name: string;
  slug: string;
  description: string;
  member_count: number;
  post_count: number;
  tags: string[];
  created_at: string;
  creator_id: string;
  profiles: {
    username: string;
  } | null;
}

const Community = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          profiles:creator_id (username)
        `)
        .order('member_count', { ascending: false });

      if (error) throw error;
      setCommunities((data as any) || []);
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'women') return matchesSearch && community.tags.includes('women-travelers');
    if (selectedFilter === 'vegan') return matchesSearch && community.tags.includes('vegan');
    if (selectedFilter === 'eco') return matchesSearch && community.tags.includes('eco-friendly');
    if (selectedFilter === 'safety') return matchesSearch && community.tags.includes('safety');
    
    return matchesSearch;
  });

  const popularTags = [
    { name: 'Women Travelers', value: 'women', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
    { name: 'Vegan Travel', value: 'vegan', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { name: 'Eco-Friendly', value: 'eco', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200' },
    { name: 'Safety Tips', value: 'safety', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Following Home Page Structure */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-x-4 top-16 bottom-8 z-0 rounded-3xl overflow-hidden">
          {/* Desktop Background */}
          <img 
            src="/lovable-uploads/ece0129b-689b-46a6-a1b7-9d3cea96348b.png"
            alt="Tropical beach community"
            className="hidden md:block w-full h-full object-cover"
          />
          {/* Mobile Background */}
          <img 
            src="/lovable-uploads/5005a51e-41f4-4bd1-ae76-79e08ad632f7.png"
            alt="Lagoon swimming community"
            className="md:hidden w-full h-full object-cover"
          />
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ThreeBackground />
        </div>

        {/* Content */}
        <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">
          {/* Left Column - Main Content */}
          <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
            <div className="max-w-xl mx-auto lg:mx-0">
              {/* Join Waitlist Button at Top */}
              <div className="mb-8">
                <Link to="/waitlist">
                  <Button 
                    size="lg"
                    className="bg-black dark:bg-white text-white dark:text-black font-medium px-8 py-3 text-lg rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors duration-200 flex items-center gap-3">
                   
                    Join the Community Waitlist
                  </Button>
                </Link>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight">
                Connect with{' '}
                <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  Fellow Travelers
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                Share real experiences, get honest reviews, and discover hidden gems with a community 
                that values authentic travel stories over polished marketing.
              </p>

              {/* Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-white/80">
                  <Heart className="w-5 h-5 mr-3 text-red-300" />
                  <span>Real reviews from fellow travelers</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Share className="w-5 h-5 mr-3 text-blue-300" />
                  <span>Share safety tips and hidden spots</span>
                </div>
                <div className="flex items-center text-white/80">
                  <Users className="w-5 h-5 mr-3 text-green-300" />
                  <span>Connect with like-minded adventurers</span>
                </div>
              </div>

              {/* Development Notice */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <p className="text-white/90 text-sm">
                  🌟 <strong>Coming Soon:</strong> Our community features are in development. 
                  Join the waitlist for early access and founding member perks!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Example Community Images */}
          <div className="hidden lg:flex flex-col justify-center px-8 xl:px-12 py-12">
            <div className="space-y-6">
              {/* Community Post Example 1 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Maya_Explorer</p>
                    <p className="text-white/60 text-sm">2 hours ago</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  Just discovered this hidden cenote in Tulum! 🏊‍♀️ The water is crystal clear and it's way less crowded than the famous ones. DM me for exact location!
                </p>
                <div className="flex space-x-4 text-white/60 text-sm">
                  <span className="flex items-center"><Heart className="w-4 h-4 mr-1" /> 24</span>
                  <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" /> 8</span>
                </div>
              </div>

              {/* Community Post Example 2 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Alex_Backpacker</p>
                    <p className="text-white/60 text-sm">1 day ago</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  Safety tip for solo female travelers in Bali: Avoid the shortcut through the rice fields after sunset. Stick to main roads or grab a Blue Bird taxi. 🚗
                </p>
                <div className="flex space-x-4 text-white/60 text-sm">
                  <span className="flex items-center"><Heart className="w-4 h-4 mr-1" /> 156</span>
                  <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" /> 42</span>
                </div>
              </div>

              {/* Community Post Example 3 */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                    J
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Jake_Nomad</p>
                    <p className="text-white/60 text-sm">3 days ago</p>
                  </div>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  That "luxury" resort in Goa? Don't believe the photos. The beach is dirty and the pool was under construction during my entire stay. Save your money! 💸
                </p>
                <div className="flex space-x-4 text-white/60 text-sm">
                  <span className="flex items-center"><Heart className="w-4 h-4 mr-1" /> 89</span>
                  <span className="flex items-center"><MessageCircle className="w-4 h-4 mr-1" /> 31</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Community Features Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">What You'll Find in Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Real experiences from real travelers. No sponsored content, just honest insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Honest Reviews */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <Heart className="w-8 h-8 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Honest Reviews</h3>
                    <p className="text-white/80 text-sm">
                      Real experiences from travelers who actually stayed there, not paid influencers.
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 mt-4">
                    <p className="text-sm">"That 'luxury' resort? The pool was green and the WiFi didn't work!" - Sarah_Traveler</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - Safety Tips */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-green-500 to-teal-600 p-8 text-white">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <Users className="w-8 h-8 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Safety First</h3>
                    <p className="text-white/80 text-sm">
                      Share and discover crucial safety tips that guidebooks never mention.
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 mt-4">
                    <p className="text-sm">"Avoid the shortcut through the market after 9pm - take the main road instead." - Mike_Solo</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3 - Hidden Gems */}
            <div className="group relative overflow-hidden rounded-2xl">
              <div className="aspect-square bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <Sparkles className="w-8 h-8 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Hidden Gems</h3>
                    <p className="text-white/80 text-sm">
                      Discover secret spots that only locals and experienced travelers know about.
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 mt-4">
                    <p className="text-sm">"Found the most amazing cenote 20 mins from Tulum - zero tourists!" - Elena_Explorer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <Link to="/waitlist">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Sparkles className="w-4 h-4 mr-2" />
                Join the Community Waitlist
              </Button>
            </Link>
            <p className="text-muted-foreground text-sm mt-4">
              Be among the first to connect with fellow travelers and share authentic experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Create Community Dialog */}
      <CreateCommunityDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCommunityCreated={fetchCommunities}
      />
    </div>
  );
};

export default Community;