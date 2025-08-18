import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, ShoppingCart, Star, Sparkles, Heart, Package, Plane, Shield, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useTheme } from '../contexts/ThemeContext';

interface TravelProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  type: 'comfort' | 'tech' | 'safety' | 'wellness';
  image: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  colors: string[];
  rating?: number;
  featured?: boolean;
  newProduct?: boolean;
  bestSeller?: boolean;
}

interface CategoryRow {
  title: string;
  products: TravelProduct[];
}

const BreatheGetawayShop = () => {
  const { theme } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<TravelProduct | null>(null);
  const [heroIndex, setHeroIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');

  const travelProducts: TravelProduct[] = [
    // COMFORT ESSENTIALS
    {
      id: 1,
      name: "CloudRest Memory Foam Travel Pillow",
      brand: "Breathe & Getaway",
      category: "comfort",
      type: "comfort",
      image: "/lovable-uploads/5f365107-6261-4234-b664-965c3aea763b.png",
      price: "$89",
      originalPrice: "$119",
      description: "Revolutionary ergonomic neck pillow with premium memory foam and breathable bamboo cover. Perfect for long flights and peaceful sleep anywhere.",
      features: ["Memory foam core", "Bamboo fiber cover", "360° neck support", "Compact carry case"],
      colors: ["Sage Green", "Ocean Blue", "Stone Gray"],
      rating: 4.9,
      featured: true,
      bestSeller: true
    },
    {
      id: 2,
      name: "AirFlow Compression Socks",
      brand: "Breathe & Getaway",
      category: "wellness",
      type: "wellness",
      image: "/lovable-uploads/92794f25-53c0-4644-af8d-3e9343c68684.png",
      price: "$49",
      description: "Medical-grade compression socks designed for travelers. Improves circulation and reduces swelling during long journeys.",
      features: ["15-20 mmHg compression", "Moisture-wicking fabric", "Seamless toe design", "Available in 3 sizes"],
      colors: ["Charcoal", "Navy", "Black"],
      rating: 4.8,
      featured: true
    },
    {
      id: 3,
      name: "ZenPack Portable Meditation Kit",
      brand: "Breathe & Getaway",
      category: "wellness",
      type: "wellness",
      image: "/lovable-uploads/18aa8cb3-7178-47f3-b218-3aa6b8687db5.png",
      price: "$129",
      description: "Complete meditation kit in a sleek travel case. Includes guided meditation device, aromatherapy pods, and comfort cushion.",
      features: ["50+ guided sessions", "Essential oil diffuser", "Foldable cushion", "Bluetooth connectivity"],
      colors: ["Himalayan Salt", "Forest Green", "Midnight Blue"],
      rating: 4.7,
      newProduct: true
    },
    {
      id: 4,
      name: "SafeGuard RFID Travel Wallet",
      brand: "Breathe & Getaway",
      category: "security",
      type: "safety",
      image: "/lovable-uploads/5da0882d-c336-4a6c-b816-25ff575ea341.png",
      price: "$79",
      description: "Premium leather wallet with RFID blocking technology. Keeps your cards safe while maintaining elegant style.",
      features: ["RFID blocking", "Genuine leather", "6 card slots", "Hidden cash compartment"],
      colors: ["Cognac Brown", "Midnight Black", "Slate Gray"],
      rating: 4.9,
      bestSeller: true
    },
    {
      id: 5,
      name: "PowerFlow Portable Charger",
      brand: "Breathe & Getaway",
      category: "tech",
      type: "tech",
      image: "/lovable-uploads/e2c6c5a8-65a5-4005-976d-25a14867e43e.png",
      price: "$159",
      description: "High-capacity wireless charging station with solar panel backup. Never run out of power during your adventures.",
      features: ["20,000mAh capacity", "Solar charging", "Wireless charging pad", "USB-C fast charge"],
      colors: ["Arctic White", "Space Gray", "Desert Sand"],
      rating: 4.8,
      featured: true
    },
    {
      id: 6,
      name: "HydroMist Travel Humidifier",
      brand: "Breathe & Getaway",
      category: "wellness",
      type: "wellness",
      image: "/lovable-uploads/6b7f673a-c32c-4c6e-9496-bf8f5b86ec9a.png",
      price: "$69",
      description: "Compact ultrasonic humidifier perfect for hotel rooms and dry airplane cabins. Breathe better wherever you go.",
      features: ["USB powered", "Whisper quiet", "Auto shut-off", "Essential oil compatible"],
      colors: ["Pearl White", "Rose Gold", "Matte Black"],
      rating: 4.6
    },
    {
      id: 7,
      name: "TravelFit Resistance Band Set",
      brand: "Breathe & Getaway",
      category: "fitness",
      type: "wellness",
      image: "/lovable-uploads/a993028f-ad55-4fcd-bf8e-60a2820594d1.png",
      price: "$45",
      description: "Complete workout system in a compact pouch. Maintain your fitness routine anywhere with multiple resistance levels.",
      features: ["5 resistance levels", "Door anchor included", "Exercise guide", "Travel pouch"],
      colors: ["Ocean Teal", "Sunset Orange", "Mountain Gray"],
      rating: 4.8
    },
    {
      id: 8,
      name: "NoiseShield Pro Earbuds",
      brand: "Breathe & Getaway",
      category: "tech",
      type: "tech",
      image: "/lovable-uploads/b6902c70-0899-4bb8-b8ae-a982867eac3c.png",
      price: "$199",
      description: "Premium noise-canceling earbuds designed for travelers. Crystal clear audio with 30-hour battery life.",
      features: ["Active noise canceling", "30hr battery", "Wireless charging case", "Touch controls"],
      colors: ["Polar White", "Carbon Black", "Rose Gold"],
      rating: 4.5,
      newProduct: true
    }
  ];

  const featuredProducts = travelProducts.filter(product => product.featured);
  const categoryRows: CategoryRow[] = [
    {
      title: "Travel Comfort Essentials",
      products: travelProducts.filter(product => product.type === 'comfort')
    },
    {
      title: "Smart Travel Technology",
      products: travelProducts.filter(product => product.type === 'tech')
    },
    {
      title: "Wellness & Self-Care",
      products: travelProducts.filter(product => product.type === 'wellness')
    },
    {
      title: "Safety & Security",
      products: travelProducts.filter(product => product.type === 'safety')
    }
  ];

  const handleProductClick = (product: TravelProduct) => {
    setSelectedProduct(product);
    setSelectedColor(product.colors[0]);
  };

  const handleAddToCart = (product: TravelProduct) => {
    // Add to cart logic here
    console.log('Adding to cart:', product.name, 'Color:', selectedColor);
  };

  const scrollRow = (direction: 'left' | 'right', rowIndex: number) => {
    const container = document.getElementById(`carousel-${rowIndex}`);
    if (container) {
      const scrollAmount = 520;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const currentHero = featuredProducts[heroIndex];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-24 transition-colors duration-300">
      {/* Contemporary Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/15 to-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-gradient-to-tl from-accent/20 to-primary/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-1/3 w-48 h-48 bg-gradient-to-tr from-primary/25 to-accent/15 rounded-full blur-3xl"></div>
      </div>

      {/* Elegant Back Button - Hidden on mobile */}
      <div className="fixed top-28 left-6 z-40 hidden md:block">
        <Link 
          to="/" 
          className="group flex items-center gap-3 bg-background/60 backdrop-blur-2xl border border-primary/20 rounded-2xl px-6 py-4 text-sm font-medium text-foreground hover:bg-primary/10 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>Back to Home</span>
        </Link>
      </div>


      {/* Clean Hero Section */}
      <section className="relative min-h-screen pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Contemporary Header */}
          <div className="text-center mb-20 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-xl border border-primary/30 rounded-full px-4 py-2 text-sm font-medium">
              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
              <Package className="w-4 h-4 text-primary" />
              <span className="text-foreground/80">Premium Travel Gear</span>
            </div>
            
            <div className="relative">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-tight">
                <span className="block text-foreground/90 mb-2">
                  Breathe &
                </span>
                <span className="block text-foreground font-medium">
                  Getaway Shop
                </span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Curated travel essentials designed to enhance every journey
            </p>
            
            {/* Product Categories */}
            <div className="flex flex-wrap justify-center gap-3 pt-6">
              {[
                { text: "Comfort", icon: Heart },
                { text: "Technology", icon: Wifi },
                { text: "Wellness", icon: Sparkles },
                { text: "Security", icon: Shield }
              ].map((category, index) => {
                const Icon = category.icon;
                return (
                  <button
                    key={index}
                    className="group bg-primary/5 hover:bg-primary/15 backdrop-blur-xl border border-primary/20 rounded-2xl px-5 py-3 transition-all duration-300 hover:scale-105"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Icon className="w-4 h-4" />
                      {category.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Magazine-Style Featured Section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[80vh]">
              {/* Large Featured Card - Left Side */}
              <div className="lg:col-span-2">
                <div 
                  className="relative h-full rounded-3xl overflow-hidden group cursor-pointer shadow-2xl bg-gradient-to-br from-primary/10 to-accent/5"
                  onClick={() => currentHero && handleProductClick(currentHero)}
                >
                  <div className="absolute inset-0 p-12 flex flex-col justify-center">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        {currentHero?.bestSeller && (
                          <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-1">
                            <span className="text-sm font-medium text-primary-foreground">Best Seller</span>
                          </div>
                        )}
                        {currentHero?.newProduct && (
                          <div className="bg-accent/90 backdrop-blur-sm rounded-lg px-3 py-1">
                            <span className="text-sm font-medium text-accent-foreground">New</span>
                          </div>
                        )}
                        {currentHero?.rating && (
                          <div className="flex items-center gap-1 bg-background/50 backdrop-blur-xl rounded-lg px-3 py-1">
                            <Star className="w-4 h-4 text-primary fill-current" />
                            <span className="text-sm font-medium">{currentHero.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                        {currentHero?.name}
                      </h2>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-lg font-medium">{currentHero?.brand}</span>
                      </div>
                      
                      <p className="text-foreground/80 text-lg max-w-2xl leading-relaxed">
                        {currentHero?.description}
                      </p>
                      
                      <div className="flex items-center gap-4 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-foreground">{currentHero?.price}</span>
                          {currentHero?.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">{currentHero.originalPrice}</span>
                          )}
                        </div>
                        <button 
                          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-3 font-medium transition-all duration-300 flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            currentHero && handleAddToCart(currentHero);
                          }}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-8 right-8 w-80 h-80">
                    {currentHero?.image ? (
                      <img 
                        src={currentHero.image} 
                        alt={currentHero.name}
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted rounded-2xl"></div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right Side - Two Stacked Product Cards */}
              <div className="space-y-8">
                {featuredProducts.slice(1, 3).map((product, index) => (
                  <div
                    key={product.id}
                    className="relative h-[calc(50%-1rem)] rounded-2xl overflow-hidden group cursor-pointer shadow-xl bg-gradient-to-br from-card to-muted/50 border border-border/50"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="absolute inset-0 p-6 flex items-center justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          {product.bestSeller && (
                            <div className="bg-primary/90 backdrop-blur-sm rounded px-2 py-1">
                              <span className="text-xs font-medium text-primary-foreground">Best Seller</span>
                            </div>
                          )}
                          {product.newProduct && (
                            <div className="bg-accent/90 backdrop-blur-sm rounded px-2 py-1">
                              <span className="text-xs font-medium text-accent-foreground">New</span>
                            </div>
                          )}
                          {product.rating && (
                            <div className="flex items-center gap-1 bg-background/50 backdrop-blur-xl rounded px-2 py-1">
                              <Star className="w-3 h-3 text-primary fill-current" />
                              <span className="text-xs font-medium">{product.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold text-foreground leading-tight">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground font-medium">{product.brand}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-foreground">{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-32 h-32 ml-4">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Category Carousels */}
          <div className="space-y-16">
            {categoryRows.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl md:text-4xl font-light text-foreground">
                    {category.title}
                  </h2>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => scrollRow('left', categoryIndex)}
                      className="p-3 rounded-2xl bg-background/60 backdrop-blur-xl border border-primary/20 text-foreground hover:bg-primary/10 transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => scrollRow('right', categoryIndex)}
                      className="p-3 rounded-2xl bg-background/60 backdrop-blur-xl border border-primary/20 text-foreground hover:bg-primary/10 transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div 
                  id={`carousel-${categoryIndex}`}
                  className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {category.products.map((product, productIndex) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 w-[480px] group cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-xl bg-card border border-border/50">
                        <div className="aspect-[4/3] relative bg-gradient-to-br from-muted/30 to-muted/10 flex items-center justify-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-3/4 h-3/4 object-contain transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* Status badges */}
                          <div className="absolute top-4 left-4 flex gap-2">
                            {product.bestSeller && (
                              <div className="bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-1">
                                <span className="text-sm font-medium text-primary-foreground">Best Seller</span>
                              </div>
                            )}
                            {product.newProduct && (
                              <div className="bg-accent/90 backdrop-blur-sm rounded-lg px-3 py-1">
                                <span className="text-sm font-medium text-accent-foreground">New</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Rating */}
                          {product.rating && (
                            <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 backdrop-blur-xl rounded-lg px-3 py-1">
                              <Star className="w-4 h-4 text-primary fill-current" />
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground font-medium">{product.brand}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-foreground">{product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                                )}
                              </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-foreground leading-tight">
                              {product.name}
                            </h3>
                            
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {product.description}
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {product.features.slice(0, 2).map((feature, featureIndex) => (
                                <span 
                                  key={featureIndex}
                                  className="bg-muted/50 rounded px-2 py-1 text-xs text-muted-foreground"
                                >
                                  {feature}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Colors:</span>
                              <div className="flex gap-1">
                                {product.colors.slice(0, 3).map((color, colorIndex) => (
                                  <div 
                                    key={colorIndex}
                                    className="w-4 h-4 rounded-full bg-primary/20 border border-border"
                                    title={color}
                                  ></div>
                                ))}
                              </div>
                            </div>
                            
                            <button
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl py-3 font-medium transition-all duration-300 flex items-center justify-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddToCart(product);
                              }}
                            >
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default BreatheGetawayShop;