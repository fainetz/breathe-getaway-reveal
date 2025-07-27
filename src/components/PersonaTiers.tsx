import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Wallet, Heart, Crown, Star, Plane, Bed, Coffee } from 'lucide-react';

const PersonaTiers = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const tiers = [
    {
      id: 0,
      icon: Wallet,
      emoji: "💰",
      title: "Everyday Users",
      subtitle: "Budget-Conscious • Students • Young Professionals",
      description: "Smart, affordable travel for the everyday explorer. Find amazing deals and make every dollar count.",
      color: "emerald",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-green-600",
      bgGradient: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
      examples: [
        "\"What's the cheapest way to leave this weekend?\"",
        "\"Give me a solo trip under $200.\"",
        "\"I want to go to NYC next month, lowest price?\""
      ],
      features: [
        { icon: Star, text: "Budget optimization & flexible dates" },
        { icon: Plane, text: "Hostels, budget airlines, smart deals" },
        { icon: Coffee, text: "Clear price breakdowns & value focus" }
      ],
      promise: "Travel smart, spend less, explore more"
    },
    {
      id: 1,
      icon: Heart,
      emoji: "💙",
      title: "Emotional Escapists",
      subtitle: "Mid-Tier • Seeking Healing • Impulse Travelers",
      description: "Travel that heals. For breakups, burnout, and emotional overload—we find places that restore your soul.",
      color: "blue",
      gradientFrom: "from-blue-500",
      gradientTo: "to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
      examples: [
        "\"I need to get away.\"",
        "\"Somewhere warm that feels like a reset.\"",
        "\"Find me a place to cry alone.\""
      ],
      features: [
        { icon: Heart, text: "Empathetic AI that understands emotions" },
        { icon: Bed, text: "Healing retreats, nature, ocean therapy" },
        { icon: Coffee, text: "Mid-tier resorts & boutique experiences" }
      ],
      promise: "Journey inward, heal outward"
    },
    {
      id: 2,
      icon: Crown,
      emoji: "👑",
      title: "Luxury Clients",
      subtitle: "High-Income • Executives • Experience-Driven",
      description: "Your personal AI concierge. Stress-free luxury with zero decisions required. We orchestrate everything.",
      color: "amber",
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-600",
      bgGradient: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
      examples: [
        "\"Book me something stress-free. No decisions.\"",
        "\"Give me a 5-star escape with a private driver.\"",
        "\"AI concierge: I want to disappear in luxury.\""
      ],
      features: [
        { icon: Crown, text: "Private jets, first-class only, 5-star hotels" },
        { icon: Plane, text: "Personal concierge planning everything" },
        { icon: Star, text: "Exclusive access, privacy, and prestige" }
      ],
      promise: "Effortless luxury, infinite possibilities"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const activeTier = tiers[activeTab];

  return (
    <section id="personas" className="py-20 sm:py-32 px-6 relative overflow-hidden bg-gradient-to-br from-gray-50/60 via-slate-50/60 to-stone-50/60 dark:from-slate-950/80 dark:via-gray-950/80 dark:to-slate-900/80" ref={sectionRef}>
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/10 to-transparent dark:via-gray-800/5"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-gray-200/20 dark:bg-gray-800/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-stone-200/20 dark:bg-stone-800/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Three Types of Travelers,
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-gray-600 dark:from-slate-300 dark:to-gray-400 bg-clip-text text-transparent">One Intelligent System</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Our AI adapts completely to your travel personality. Whether you're budget-conscious, emotionally seeking, or wanting luxury—we speak your language.
          </p>
        </div>

        {/* Tier Tabs */}
        <div className={`flex flex-col sm:flex-row justify-center gap-4 mb-12 transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {tiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                  activeTab === index
                    ? `bg-gradient-to-r ${tier.gradientFrom} ${tier.gradientTo} text-white shadow-xl scale-105`
                    : 'bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-2xl">{tier.emoji}</span>
                <div className="text-left">
                  <div className="font-semibold text-sm sm:text-base">{tier.title}</div>
                  <div className="text-xs opacity-80">{tier.subtitle.split(' • ')[0]}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Tier Content */}
        <div className={`transition-all duration-1200 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          <div className={`bg-gradient-to-br ${activeTier.bgGradient} rounded-3xl p-8 sm:p-12 shadow-2xl`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${activeTier.gradientFrom} ${activeTier.gradientTo} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <activeTier.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{activeTier.title}</h3>
                    <p className="text-muted-foreground">{activeTier.subtitle}</p>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {activeTier.description}
                </p>

                {/* Promise */}
                <div className={`bg-gradient-to-r ${activeTier.gradientFrom} ${activeTier.gradientTo} bg-opacity-10 rounded-2xl p-6 mb-8`}>
                  <h4 className="font-bold text-foreground mb-2">Our Promise</h4>
                  <p className="text-muted-foreground italic">"{activeTier.promise}"</p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  {activeTier.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <feature.icon className={`w-5 h-5 text-${activeTier.color}-600`} />
                      <span className="text-foreground">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side - Examples */}
              <div className="bg-background/60 backdrop-blur-sm rounded-2xl p-8 border border-border">
                <h4 className="text-xl font-bold text-foreground mb-6">Typical Prompts</h4>
                <div className="space-y-4">
                  {activeTier.examples.map((example, index) => (
                    <div key={index} className="bg-background/80 rounded-xl p-4 border border-border">
                      <p className="text-muted-foreground italic">{example}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Ready to try this approach?</span>
                    <button className={`flex items-center gap-2 bg-gradient-to-r ${activeTier.gradientFrom} ${activeTier.gradientTo} text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonaTiers;