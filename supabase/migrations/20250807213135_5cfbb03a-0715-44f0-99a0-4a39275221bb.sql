-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION update_community_counters()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;

-- Fix security warnings by setting search_path for vote counts function
CREATE OR REPLACE FUNCTION update_vote_counts()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
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
$$;