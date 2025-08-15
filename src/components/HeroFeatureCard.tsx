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
    </div>
  );
};

export default HeroFeatureCard;