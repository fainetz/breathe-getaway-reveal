interface HeroFeatureCardProps {
  image: string;
}

const HeroFeatureCard = ({ image }: HeroFeatureCardProps) => {
  return (
    <div className="absolute inset-x-8 top-16 bottom-8 z-0 rounded-3xl overflow-hidden">
      <img 
        src={image}
        alt="Luxury tropical resort"
        className="w-full h-full object-cover"
      />
      {/* Darker overlay to improve text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/50 to-slate-900/60" />
    </div>
  );
};

export default HeroFeatureCard;