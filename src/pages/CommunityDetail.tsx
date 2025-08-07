import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, MessageCircle, Plus, TrendingUp, Calendar, MapPin, AlertTriangle, ThumbsUp, ThumbsDown, Bookmark, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import CreatePostDialog from '@/components/community/CreatePostDialog';

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

interface Post {
  id: string;
  title: string;
  content: string;
  post_type: string;
  upvotes: number;
  downvotes: number;
  comment_count: number;
  tags: string[];
  location: string;
  created_at: string;
  author_id: string;
  profiles: {
    username: string;
  } | null;
  user_vote?: {
    vote_type: string;
  };
}

const CommunityDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [community, setCommunity] = useState<Community | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [activeTab, setActiveTab] = useState('recent');
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      fetchCommunity();
      fetchPosts();
      if (user) {
        checkMembership();
      }
    }
  }, [slug, user]);

  const fetchCommunity = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          profiles:creator_id (username)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setCommunity(data as any);
    } catch (error) {
      console.error('Error fetching community:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (username),
          post_votes!left (vote_type)
        `)
        .eq('community_id', (await supabase.from('communities').select('id').eq('slug', slug).single()).data?.id);

      if (activeTab === 'recent') {
        query = query.order('created_at', { ascending: false });
      } else if (activeTab === 'popular') {
        query = query.order('upvotes', { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;

      // Process user votes
      const processedPosts = data?.map((post: any) => ({
        ...post,
        user_vote: post.post_votes?.find((vote: any) => vote.user_id === user?.id)
      })) || [];

      setPosts(processedPosts as any);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkMembership = async () => {
    if (!user || !community) return;

    try {
      const { data, error } = await supabase
        .from('community_members')
        .select('id')
        .eq('community_id', community.id)
        .eq('user_id', user.id)
        .single();

      setIsMember(!!data);
    } catch (error) {
      setIsMember(false);
    }
  };

  const joinCommunity = async () => {
    if (!user || !community) return;

    try {
      const { error } = await supabase
        .from('community_members')
        .insert({
          community_id: community.id,
          user_id: user.id,
          role: 'member'
        });

      if (error) throw error;

      setIsMember(true);
      toast({
        title: "Welcome to the community!",
        description: `You've successfully joined ${community.name}`,
      });

      // Refresh community data to update member count
      fetchCommunity();
    } catch (error) {
      console.error('Error joining community:', error);
      toast({
        title: "Error joining community",
        description: "There was an error joining the community. Please try again.",
        variant: "destructive"
      });
    }
  };

  const leaveCommunity = async () => {
    if (!user || !community) return;

    try {
      const { error } = await supabase
        .from('community_members')
        .delete()
        .eq('community_id', community.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setIsMember(false);
      toast({
        title: "Left community",
        description: `You've left ${community.name}`,
      });

      // Refresh community data to update member count
      fetchCommunity();
    } catch (error) {
      console.error('Error leaving community:', error);
      toast({
        title: "Error leaving community",
        description: "There was an error leaving the community. Please try again.",
        variant: "destructive"
      });
    }
  };

  const voteOnPost = async (postId: string, voteType: 'upvote' | 'downvote') => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to vote on posts.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('post_votes')
        .upsert({
          post_id: postId,
          user_id: user.id,
          vote_type: voteType
        });

      if (error) throw error;

      // Refresh posts to update vote counts
      fetchPosts();
    } catch (error) {
      console.error('Error voting on post:', error);
      toast({
        title: "Error voting",
        description: "There was an error processing your vote. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addToTrip = async (postId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to add posts to your trip.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('trip_components')
        .insert({
          user_id: user.id,
          post_id: postId,
          trip_name: 'My Trip' // This could be enhanced to let users choose trip name
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "Already added",
            description: "This post is already in your trip components.",
            variant: "destructive"
          });
          return;
        }
        throw error;
      }

      toast({
        title: "Added to trip!",
        description: "This post has been added to your trip components.",
      });
    } catch (error) {
      console.error('Error adding to trip:', error);
      toast({
        title: "Error adding to trip",
        description: "There was an error adding this post to your trip. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'tip': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'question': return <MessageCircle className="w-4 h-4 text-blue-500" />;
      default: return <MessageCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'tip': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'question': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'recommendation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (loading || !community) {
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
          <div className="flex items-center mb-6">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link to="/community">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Communities
              </Link>
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-3">{community.name}</h1>
              <p className="text-muted-foreground mb-4">{community.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-4 h-4 mr-1" />
                  {community.member_count} members
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {community.post_count} posts
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created {formatDistanceToNow(new Date(community.created_at))} ago
                </div>
              </div>

              {/* Tags */}
              {community.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {community.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {user && isMember && (
                <Button onClick={() => setShowCreatePost(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              )}
              
              {user && (
                <Button
                  variant={isMember ? "outline" : "default"}
                  onClick={isMember ? leaveCommunity : joinCommunity}
                >
                  {isMember ? "Leave Community" : "Join Community"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="recent">Recent Posts</TabsTrigger>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-4">Be the first to start a conversation!</p>
                {user && isMember && (
                  <Button onClick={() => setShowCreatePost(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Post
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {post.profiles?.username?.[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">{post.profiles?.username || 'Unknown'}</p>
                              <Badge className={`text-xs ${getPostTypeColor(post.post_type)}`}>
                                {post.post_type}
                              </Badge>
                              {post.location && (
                                <div className="flex items-center text-muted-foreground text-xs">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {post.location}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(post.created_at))} ago
                            </p>
                          </div>
                        </div>
                        {getPostTypeIcon(post.post_type)}
                      </div>
                      
                      <CardTitle className="text-xl mt-3">{post.title}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4 whitespace-pre-wrap">{post.content}</p>
                      
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Voting */}
                          <div className="flex items-center space-x-2">
                            <Button
                              variant={post.user_vote?.vote_type === 'upvote' ? "default" : "ghost"}
                              size="sm"
                              onClick={() => voteOnPost(post.id, 'upvote')}
                              className="flex items-center space-x-1"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span>{post.upvotes}</span>
                            </Button>
                            <Button
                              variant={post.user_vote?.vote_type === 'downvote' ? "default" : "ghost"}
                              size="sm"
                              onClick={() => voteOnPost(post.id, 'downvote')}
                              className="flex items-center space-x-1"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              <span>{post.downvotes}</span>
                            </Button>
                          </div>

                          {/* Comments */}
                          <div className="flex items-center text-muted-foreground">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            <span>{post.comment_count}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          {user && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addToTrip(post.id)}
                              className="flex items-center space-x-1"
                            >
                              <Bookmark className="w-4 h-4" />
                              <span className="hidden sm:inline">Add to Trip</span>
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline ml-1">Share</span>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Post Dialog */}
      {community && (
        <CreatePostDialog
          open={showCreatePost}
          onOpenChange={setShowCreatePost}
          communityId={community.id}
          onPostCreated={() => {
            fetchPosts();
            fetchCommunity(); // Refresh to update post count
          }}
        />
      )}
    </div>
  );
};

export default CommunityDetail;