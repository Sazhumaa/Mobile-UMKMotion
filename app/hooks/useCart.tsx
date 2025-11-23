// hooks/useCart.ts
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  seller: string;
  quantity: number;
  categoryId: number;
  rating: number;
  sold: number;
  addedAt: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Key untuk AsyncStorage
const CART_STORAGE_KEY = '@cart_data';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart dari AsyncStorage saat app start
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart ke AsyncStorage setiap kali cart berubah
  useEffect(() => {
    if (isLoaded) {
      saveCartToStorage();
    }
  }, [cartItems, isLoaded]);

  // Load data dari AsyncStorage
  const loadCartFromStorage = async () => {
    try {
      const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      setIsLoaded(true);
    }
  };

  // Save data ke AsyncStorage
  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };

  // Add item to cart
  const addToCart = (product: CartItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        // Jika item sudah ada, update quantity
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        // Jika item baru, tambahkan ke cart
        return [...prev, {
          ...product,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear all cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total price
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get total items count
  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Check if item is in cart
  const isInCart = (productId: number) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};