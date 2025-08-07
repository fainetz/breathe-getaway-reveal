-- Create communities table
CREATE TABLE public.communities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  banner_image TEXT,
  avatar_image TEXT,
  creator_id UUID NOT NULL,
  member_count INTEGER DEFAULT 0,
  post_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_private BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Create posts table
CREATE TABLE public.posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  author_id UUID NOT NULL,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  location TEXT,
  is_pinned BOOLEAN DEFAULT false,
  post_type TEXT DEFAULT 'discussion' CHECK (post_type IN ('discussion', 'question', 'tip', 'warning', 'recommendation'))
);

-- Create comments table
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  author_id UUID NOT NULL,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create community members table
CREATE TABLE public.community_members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  community_id UUID NOT NULL REFERENCES public.communities(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(community_id, user_id)
);

-- Create post votes table
CREATE TABLE public.post_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create comment votes table
CREATE TABLE public.comment_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id UUID NOT NULL REFERENCES public.comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('upvote', 'downvote')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Create trip components integration table
CREATE TABLE public.trip_components (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  trip_name TEXT,
  notes TEXT,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Enable Row Level Security
ALTER TABLE public.communities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_components ENABLE ROW LEVEL SECURITY;

-- RLS Policies for communities
CREATE POLICY "Communities are viewable by everyone" ON public.communities FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create communities" ON public.communities FOR INSERT WITH CHECK (auth.uid() = creator_id);
CREATE POLICY "Community creators and mods can update" ON public.communities FOR UPDATE USING (
  creator_id = auth.uid() OR 
  EXISTS(SELECT 1 FROM public.community_members WHERE community_id = communities.id AND user_id = auth.uid() AND role IN ('moderator', 'admin'))
);

-- RLS Policies for posts
CREATE POLICY "Posts are viewable by everyone" ON public.posts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Post authors can update their posts" ON public.posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Post authors can delete their posts" ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for comments
CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Comment authors can update their comments" ON public.comments FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Comment authors can delete their comments" ON public.comments FOR DELETE USING (auth.uid() = author_id);

-- RLS Policies for community members
CREATE POLICY "Community members are viewable by everyone" ON public.community_members FOR SELECT USING (true);
CREATE POLICY "Users can join communities" ON public.community_members FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can leave communities" ON public.community_members FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for votes
CREATE POLICY "Votes are viewable by everyone" ON public.post_votes FOR SELECT USING (true);
CREATE POLICY "Users can vote on posts" ON public.post_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their votes" ON public.post_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their votes" ON public.post_votes FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Comment votes are viewable by everyone" ON public.comment_votes FOR SELECT USING (true);
CREATE POLICY "Users can vote on comments" ON public.comment_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their comment votes" ON public.comment_votes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their comment votes" ON public.comment_votes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for trip components
CREATE POLICY "Users can view their own trip components" ON public.trip_components FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add posts to their trips" ON public.trip_components FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their trip components" ON public.trip_components FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their trip components" ON public.trip_components FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_communities_creator ON public.communities(creator_id);
CREATE INDEX idx_communities_slug ON public.communities(slug);
CREATE INDEX idx_posts_community ON public.posts(community_id);
CREATE INDEX idx_posts_author ON public.posts(author_id);
CREATE INDEX idx_posts_created ON public.posts(created_at DESC);
CREATE INDEX idx_comments_post ON public.comments(post_id);
CREATE INDEX idx_comments_author ON public.comments(author_id);
CREATE INDEX idx_community_members_community ON public.community_members(community_id);
CREATE INDEX idx_community_members_user ON public.community_members(user_id);
CREATE INDEX idx_post_votes_post ON public.post_votes(post_id);
CREATE INDEX idx_comment_votes_comment ON public.comment_votes(comment_id);
CREATE INDEX idx_trip_components_user ON public.trip_components(user_id);

-- Create triggers for updated_at
CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON public.communities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create functions to update counters
CREATE OR REPLACE FUNCTION update_community_counters()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'posts' THEN
      UPDATE public.communities 
      SET post_count = post_count + 1 
      WHERE id = NEW.community_id;
    ELSIF TG_TABLE_NAME = 'community_members' THEN
      UPDATE public.communities 
      SET member_count = member_count + 1 
      WHERE id = NEW.community_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'posts' THEN
      UPDATE public.communities 
      SET post_count = post_count - 1 
      WHERE id = OLD.community_id;
    ELSIF TG_TABLE_NAME = 'community_members' THEN
      UPDATE public.communities 
      SET member_count = member_count - 1 
      WHERE id = OLD.community_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for counter updates
CREATE TRIGGER update_community_post_count AFTER INSERT OR DELETE ON public.posts FOR EACH ROW EXECUTE FUNCTION update_community_counters();
CREATE TRIGGER update_community_member_count AFTER INSERT OR DELETE ON public.community_members FOR EACH ROW EXECUTE FUNCTION update_community_counters();

-- Create function to update vote counts
CREATE OR REPLACE FUNCTION update_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF TG_TABLE_NAME = 'post_votes' THEN
      IF NEW.vote_type = 'upvote' THEN
        UPDATE public.posts SET upvotes = upvotes + 1 WHERE id = NEW.post_id;
      ELSE
        UPDATE public.posts SET downvotes = downvotes + 1 WHERE id = NEW.post_id;
      END IF;
    ELSIF TG_TABLE_NAME = 'comment_votes' THEN
      IF NEW.vote_type = 'upvote' THEN
        UPDATE public.comments SET upvotes = upvotes + 1 WHERE id = NEW.comment_id;
      ELSE
        UPDATE public.comments SET downvotes = downvotes + 1 WHERE id = NEW.comment_id;
      END IF;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF TG_TABLE_NAME = 'post_votes' THEN
      IF OLD.vote_type = 'upvote' THEN
        UPDATE public.posts SET upvotes = upvotes - 1 WHERE id = OLD.post_id;
      ELSE
        UPDATE public.posts SET downvotes = downvotes - 1 WHERE id = OLD.post_id;
      END IF;
    ELSIF TG_TABLE_NAME = 'comment_votes' THEN
      IF OLD.vote_type = 'upvote' THEN
        UPDATE public.comments SET upvotes = upvotes - 1 WHERE id = OLD.comment_id;
      ELSE
        UPDATE public.comments SET downvotes = downvotes - 1 WHERE id = OLD.comment_id;
      END IF;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF TG_TABLE_NAME = 'post_votes' THEN
      IF OLD.vote_type = 'upvote' AND NEW.vote_type = 'downvote' THEN
        UPDATE public.posts SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.post_id;
      ELSIF OLD.vote_type = 'downvote' AND NEW.vote_type = 'upvote' THEN
        UPDATE public.posts SET downvotes = downvotes - 1, upvotes = upvotes + 1 WHERE id = NEW.post_id;
      END IF;
    ELSIF TG_TABLE_NAME = 'comment_votes' THEN
      IF OLD.vote_type = 'upvote' AND NEW.vote_type = 'downvote' THEN
        UPDATE public.comments SET upvotes = upvotes - 1, downvotes = downvotes + 1 WHERE id = NEW.comment_id;
      ELSIF OLD.vote_type = 'downvote' AND NEW.vote_type = 'upvote' THEN
        UPDATE public.comments SET downvotes = downvotes - 1, upvotes = upvotes + 1 WHERE id = NEW.comment_id;
      END IF;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create triggers for vote count updates
CREATE TRIGGER update_post_vote_counts AFTER INSERT OR UPDATE OR DELETE ON public.post_votes FOR EACH ROW EXECUTE FUNCTION update_vote_counts();
CREATE TRIGGER update_comment_vote_counts AFTER INSERT OR UPDATE OR DELETE ON public.comment_votes FOR EACH ROW EXECUTE FUNCTION update_vote_counts();