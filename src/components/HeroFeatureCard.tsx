interface HeroFeatureCardProps {
  image: string;
}

const HeroFeatureCard = ({ image }: HeroFeatureCardProps) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Background overlay container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img 
            src={image}
            alt="Luxury tropical resort"
            className="w-full h-full object-cover"
          />
          {/* Light overlay to maintain readability but keep image visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/10" />
        </div>
      </div>
    </div>
  );
};

export default HeroFeatureCard;