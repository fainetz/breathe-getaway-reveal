import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, BookOpen, Eye, UserCircle, Star, Calendar, ArrowRight } from 'lucide-react';

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

interface ZineCardProps {
  zine: Zine;
  onZineClick: (zine: Zine) => void;
}

const ZineCard = ({ zine, onZineClick }: ZineCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const getContentTypeIcon = (type: string) => {
    switch(type) {
      case 'trip-blueprint': return '🗺️';
      case 'journal-entry': return '📝';
      case 'local-review': return '⭐';
      case 'photo-essay': return '📸';
      default: return '📚';
    }
  };

  return (
    <div
      onClick={() => onZineClick(zine)}
      className="group cursor-pointer"
    >
      <div 
        className="rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1"
        style={{ background: 'var(--gradient-card)' }}
      >
        {/* Cover Image */}
        <div className="relative">
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${zine.coverImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Featured Badge */}
            {zine.featured && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  FEATURED
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={handleLikeClick}
                className="p-2 bg-white/10 backdrop-blur-sm rounded-full transition-all hover:bg-white/20"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
              </button>
              <button
                onClick={handleFollowClick}
                className={`px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm transition-all ${
                  isFollowing 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>

            {/* Magazine Style Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-white text-sm font-medium">{zine.rating}</span>
                <span className="text-white/60 text-sm">•</span>
                <span className="text-white/80 text-sm">{zine.followers.toLocaleString()} followers</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1 leading-tight">
                {zine.title}
              </h3>
              <p className="text-white/90 text-sm font-medium">
                {zine.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Editor Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img 
                src={zine.editor.avatar} 
                alt={zine.editor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {zine.editor.verified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">✓</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{zine.editor.name}</span>
                <span className="text-xs text-muted-foreground">Editor</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{zine.editor.bio}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Updated</div>
              <div className="text-xs font-medium text-foreground">{zine.lastUpdated}</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
            {zine.description}
          </p>

          {/* Content Preview */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {zine.contentCount} pieces
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {zine.contents.slice(0, 4).map((content, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                  <span className="text-sm">{getContentTypeIcon(content.type)}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {content.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {zine.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
            {zine.tags.length > 3 && (
              <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                +{zine.tags.length - 3}
              </span>
            )}
          </div>

          {/* Call to Action */}
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{zine.followers.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Read Zine</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZineCard;