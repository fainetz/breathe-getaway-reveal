
import { useState, useEffect } from 'react';
import { Trash2, Heart, ThumbsDown, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartItem {
  id: string;
  destination: {
    id: string;
    name: string;
    location: string;
    price: string;
    image: string;
    description: string;
    tags: string[];
  };
  quantity: number;
  addedAt: Date;
  likes?: number;
  dislikes?: number;
  userReaction?: 'like' | 'dislike' | null;
}

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('travel-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('travel-cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (itemId: string) => {
    const newCart = cart.filter(item => item.id !== itemId);
    updateCart(newCart);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    const newCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  const handleReaction = (itemId: string, reaction: 'like' | 'dislike') => {
    const newCart = cart.map(item => {
      if (item.id === itemId) {
        const currentReaction = item.userReaction;
        let newLikes = item.likes || 0;
        let newDislikes = item.dislikes || 0;
        let newUserReaction: 'like' | 'dislike' | null = reaction;

        // Remove previous reaction
        if (currentReaction === 'like') newLikes--;
        if (currentReaction === 'dislike') newDislikes--;

        // Add new reaction or toggle off
        if (currentReaction === reaction) {
          newUserReaction = null;
        } else {
          if (reaction === 'like') newLikes++;
          if (reaction === 'dislike') newDislikes++;
        }

        return {
          ...item,
          likes: newLikes,
          dislikes: newDislikes,
          userReaction: newUserReaction
        };
      }
      return item;
    });
    updateCart(newCart);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.destination.price.replace(/[^0-9.]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Checkout functionality would be implemented here with payment processing!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80 self-start rounded-xl px-4 py-3 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">Your Travel Cart</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {cart.length === 0 ? (
              <Card className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 shadow-xl rounded-2xl">
                <CardContent className="p-8 sm:p-12 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl flex items-center justify-center">
                    <ShoppingCart className="w-10 sm:w-12 h-10 sm:h-12 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-neutral-900 dark:text-neutral-100">Your cart is empty</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">Start exploring amazing destinations to fill your cart with unforgettable experiences!</p>
                  <Button 
                    onClick={() => navigate('/')} 
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8 py-3 font-semibold"
                  >
                    Explore Destinations
                  </Button>
                </CardContent>
              </Card>
            ) : (
              cart.map((item) => (
              <Card key={item.id} className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative overflow-hidden">
                        <img 
                          src={item.destination.image} 
                          alt={item.destination.name}
                          className="w-full sm:w-48 h-56 sm:h-40 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="flex-1 p-5 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                          <div className="flex-1">
                            <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">{item.destination.name}</h4>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">{item.destination.location}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-3 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all duration-200 text-red-400 hover:text-red-600 dark:hover:text-red-400 self-start group"
                          >
                            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                          </button>
                        </div>
                        
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-5 line-clamp-2 leading-relaxed">{item.destination.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {item.destination.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200/50 dark:border-blue-800/50">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{item.destination.price}</div>
                            <div className="flex items-center gap-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-10 h-10 bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-bold shadow-sm hover:shadow-md transition-all duration-200"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-bold text-lg text-neutral-900 dark:text-neutral-100">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-10 h-10 bg-white dark:bg-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-600 rounded-lg flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-bold shadow-sm hover:shadow-md transition-all duration-200"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleReaction(item.id, 'like')}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                                item.userReaction === 'like' 
                                  ? 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 text-rose-600 dark:text-rose-400 border-2 border-rose-200 dark:border-rose-800 shadow-sm' 
                                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                              }`}
                            >
                              <Heart className="w-4 h-4" />
                              <span className="text-sm font-semibold">{item.likes || 0}</span>
                            </button>
                            <button
                              onClick={() => handleReaction(item.id, 'dislike')}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 font-medium ${
                                item.userReaction === 'dislike' 
                                  ? 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 text-orange-600 dark:text-orange-400 border-2 border-orange-200 dark:border-orange-800 shadow-sm' 
                                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm font-semibold">{item.dislikes || 0}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-800/50 shadow-xl rounded-2xl sticky top-4 sm:top-8">
                <CardHeader className="pb-4">
                  <CardTitle className="text-neutral-900 dark:text-neutral-100 text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg"></div>
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center py-2 px-3 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                        <span className="text-neutral-600 dark:text-neutral-400 font-medium">{item.destination.name} x{item.quantity}</span>
                        <span className="text-neutral-900 dark:text-neutral-100 font-bold">${(parseFloat(item.destination.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-6">
                    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl border border-green-200/50 dark:border-green-800/50">
                      <span className="text-neutral-900 dark:text-neutral-100 text-lg font-bold">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white font-bold py-4 transition-all duration-300 hover:shadow-xl rounded-xl text-lg"
                  >
                    <CreditCard className="w-5 h-5 mr-3" />
                    Proceed to Checkout
                  </Button>
                  
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center">
                      Secure checkout powered by industry-leading encryption
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
