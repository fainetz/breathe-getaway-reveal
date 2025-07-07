
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-8 h-8 text-gray-800 dark:text-gray-200" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Travel Cart</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.length === 0 ? (
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-12 text-center">
                  <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Your cart is empty</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Start exploring amazing destinations to fill your cart!</p>
                  <Button 
                    onClick={() => navigate('/')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Explore Destinations
                  </Button>
                </CardContent>
              </Card>
            ) : (
              cart.map((item) => (
                <Card key={item.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-0">
                    <div className="flex">
                      <img 
                        src={item.destination.image} 
                        alt={item.destination.name}
                        className="w-48 h-36 object-cover rounded-l-lg"
                      />
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{item.destination.name}</h4>
                            <p className="text-gray-600 dark:text-gray-400">{item.destination.location}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{item.destination.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.destination.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-xl font-bold text-green-600 dark:text-green-400">{item.destination.price}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-semibold text-gray-900 dark:text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleReaction(item.id, 'like')}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                                item.userReaction === 'like' 
                                  ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-800' 
                                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600'
                              }`}
                            >
                              <Heart className="w-4 h-4" />
                              <span className="text-sm">{item.likes || 0}</span>
                            </button>
                            <button
                              onClick={() => handleReaction(item.id, 'dislike')}
                              className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                                item.userReaction === 'dislike' 
                                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500 border border-blue-200 dark:border-blue-800' 
                                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600'
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
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">{item.destination.name} x{item.quantity}</span>
                        <span className="text-gray-900 dark:text-white">${(parseFloat(item.destination.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total</span>
                      <span className="text-green-600 dark:text-green-400">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-200"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
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
