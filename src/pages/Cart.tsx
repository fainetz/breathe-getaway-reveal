
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
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-6 sm:w-8 h-6 sm:h-8 text-neutral-900 dark:text-neutral-100" />
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">Your Travel Cart</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {cart.length === 0 ? (
              <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <CardContent className="p-8 sm:p-12 text-center">
                  <ShoppingCart className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 text-neutral-400 dark:text-neutral-600" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Your cart is empty</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-sm sm:text-base">Start exploring amazing destinations to fill your cart!</p>
                  <Button 
                    onClick={() => navigate('/')} 
                    className="bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900"
                  >
                    Explore Destinations
                  </Button>
                </CardContent>
              </Card>
            ) : (
              cart.map((item) => (
              <Card key={item.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <img 
                      src={item.destination.image} 
                      alt={item.destination.name}
                      className="w-full sm:w-48 h-48 sm:h-36 object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none"
                    />
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">{item.destination.name}</h4>
                          <p className="text-neutral-600 dark:text-neutral-400 text-sm">{item.destination.location}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 self-start"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                        
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2">{item.destination.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.destination.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs rounded-full border border-neutral-200 dark:border-neutral-700">
                              {tag}
                            </span>
                          ))}
                        </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                          <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100">{item.destination.price}</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-bold"
                            >
                              -
                            </button>
                            <span className="w-8 text-center font-semibold text-neutral-900 dark:text-neutral-100">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full flex items-center justify-center text-neutral-700 dark:text-neutral-300 font-bold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                          
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                              onClick={() => handleReaction(item.id, 'like')}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                                item.userReaction === 'like' 
                                  ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800' 
                                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                              }`}
                            >
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{item.likes || 0}</span>
                            </button>
                            <button
                              onClick={() => handleReaction(item.id, 'dislike')}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                                item.userReaction === 'dislike' 
                                  ? 'bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-800' 
                                  : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700'
                              }`}
                            >
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm">{item.dislikes || 0}</span>
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
              <Card className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 sticky top-4 sm:top-8">
                <CardHeader>
                  <CardTitle className="text-neutral-900 dark:text-neutral-100 text-lg sm:text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">{item.destination.name} x{item.quantity}</span>
                        <span className="text-neutral-900 dark:text-neutral-100">${(parseFloat(item.destination.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
                    <div className="flex justify-between text-base sm:text-lg font-bold">
                      <span className="text-neutral-900 dark:text-neutral-100">Total</span>
                      <span className="text-neutral-900 dark:text-neutral-100">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold py-3 transition-all duration-200"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                  
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center mt-4">
                    Secure checkout powered by industry-leading encryption
                  </p>
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
