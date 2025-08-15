interface HeroFeatureCardProps {
  image: string;
}

const HeroFeatureCard = ({ image }: HeroFeatureCardProps) => {
  return (
    // Make the *parent section* of this card relative
    // <section className="relative"> ... </section>

    <div
      className="
        absolute inset-x-0 top-12 bottom-10
        sm:inset-x-0 sm:top-16 sm:bottom-8
        z-10                  /* lift above page bg */
        isolate               /* block backdrop bleed */
        bg-black              /* no gradient shows through rounded edges */
        rounded-3xl
        overflow-hidden
      "
    >
      <img
        src={image}
        alt="Luxury tropical resort"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          opacity-100
          mix-blend-normal
        "
      />
 <div className="absolute inset-0 bg-black/30 pointer-events-none" /> 
    </div>
  );
};

export default HeroFeatureCard;