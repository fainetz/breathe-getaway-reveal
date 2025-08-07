import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, TrendingUp, MessageCircle, Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import CreateCommunityDialog from '@/components/community/CreateCommunityDialog';

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
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Travel Communities</h1>
              <p className="text-muted-foreground">Connect with fellow travelers and share your experiences</p>
            </div>
            {user && (
              <Button onClick={() => setShowCreateDialog(true)} className="w-fit">
                <Plus className="w-4 h-4 mr-2" />
                Create Community
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search communities, tags, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('all')}
                className="w-fit"
              >
                All Communities
              </Button>
            </div>

            {/* Popular Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {popularTags.map(tag => (
                <Button
                  key={tag.value}
                  variant={selectedFilter === tag.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedFilter(selectedFilter === tag.value ? 'all' : tag.value)}
                  className="text-xs"
                >
                  <Filter className="w-3 h-3 mr-1" />
                  {tag.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCommunities.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No communities found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Be the first to create a community!'}
            </p>
            {user && !searchTerm && (
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Community
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <Card key={community.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <Link to={`/community/${community.slug}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {community.name}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground mt-1">
                          Created by {community.profiles?.username || 'Unknown'} · {formatDistanceToNow(new Date(community.created_at))} ago
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-muted-foreground text-sm mb-1">
                          <Users className="w-4 h-4 mr-1" />
                          {community.member_count}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {community.post_count}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {community.description || 'No description available'}
                    </p>
                    
                    {/* Tags */}
                    {community.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {community.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {community.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{community.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>

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