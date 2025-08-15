interface HeroFeatureCardProps {
  image: string;
}

const HeroFeatureCard = ({ image }: HeroFeatureCardProps) => {
  return (
    <div
    className="
      absolute
      inset-x-0         /* mobile: no side gap */
      top-12              /* mobile: smaller top gap */
      bottom-4          /* mobile: smaller bottom gap */
      sm:inset-x-0       /* desktop: add side gap */
      sm:top-16          /* desktop: bigger top gap */
      sm:bottom-8        /* desktop: bigger bottom gap */
      z-0
      rounded-3xl
      overflow-hidden
    "
  >
  
      <img 
        src={image}
        alt="Luxury tropical resort"
        className="w-full h-full object-cover"
      />
      {/* Dark overlay for better text visibility on mobile */}
      <div className="absolute inset-0 bg-black/20 md:bg-transparent" />
    </div>
  );
};

export default HeroFeatureCard;