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
      {/* Light overlay to make black text visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/60 to-white/70" />
    </div>
  );
};

export default HeroFeatureCard;