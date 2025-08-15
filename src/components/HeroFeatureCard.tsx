import { ArrowDownRight } from 'lucide-react';

interface HeroFeatureCardProps {
  image: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
}

const HeroFeatureCard = ({ 
  image, 
  title, 
  subtitle, 
  primaryButtonText, 
  secondaryButtonText 
}: HeroFeatureCardProps) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Main card container */}
      <div className="relative bg-slate-900/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={image}
            alt="Luxury tropical resort"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-slate-900/40" />
        </div>
        
        {/* Content overlay */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col items-center text-center min-h-[500px] justify-center">
          {/* Floating badge */}
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium">
              START PLANNING
            </span>
          </div>
          
          {/* Main heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            {title}
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-md leading-relaxed">
            {subtitle}
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group">
              <span className="text-lg">✈️</span>
              {primaryButtonText}
            </button>
            
            <button className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group backdrop-blur-sm">
              <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-200" />
              {secondaryButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroFeatureCard;