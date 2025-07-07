
import { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
}

const FloatingCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  // Listen for cart updates from localStorage
  useEffect(() => {
    const loadCart = () => {
      const savedCart = localStorage.getItem('travel-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };

    loadCart();
    window.addEventListener('storage', loadCart);
    
    // Custom event for same-page updates
    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('storage', loadCart);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const itemCount = getCartItemCount();

  if (itemCount === 0) return null;

  return (
    <button
      onClick={handleCartClick}
      className="fixed top-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center z-50 border-2 border-white/20"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5 text-white" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {itemCount}
        </span>
      </div>
    </button>
  );
};

export default FloatingCart;
