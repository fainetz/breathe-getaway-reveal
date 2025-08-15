interface HeroFeatureCardProps {
  image: string;
}

const HeroFeatureCard = ({ image }: HeroFeatureCardProps) => {
  return (
    <div className="absolute inset-8 z-0 rounded-3xl overflow-hidden">
      <img 
        src={image}
        alt="Luxury tropical resort"
        className="w-full h-full object-cover"
      />
      {/* Light overlay to maintain readability but keep image visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-slate-900/5" />
    </div>
  );
};

export default HeroFeatureCard;