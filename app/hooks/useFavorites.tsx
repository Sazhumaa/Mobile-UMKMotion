import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  sold: number;
  image: string;
  desc: string;
  storeRating: number;
  totalReviews: number;
  responseRate: string;
  seller: string;
  categoryId: number;
  addedAt: string;
  type: 'product' | 'consultant' | 'store';
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (product: FavoriteItem) => void;
  isFavorited: (productId: number) => boolean;
  removeFavorite: (productId: number) => void;
  clearAllFavorites: () => void;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Key untuk AsyncStorage
const FAVORITES_STORAGE_KEY = '@favorites_data';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites dari AsyncStorage saat app start
  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  // Save favorites ke AsyncStorage setiap kali favorites berubah
  useEffect(() => {
    if (isLoaded) {
      saveFavoritesToStorage();
    }
  }, [favorites, isLoaded]);

  // Load data dari AsyncStorage
  const loadFavoritesFromStorage = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        setFavorites(parsedFavorites);
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
      setIsLoaded(true);
    }
  };

  // Save data ke AsyncStorage
  const saveFavoritesToStorage = async () => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
    }
  };

  const toggleFavorite = (product: FavoriteItem) => {
    setFavorites(prev => {
      const isAlreadyFavorited = prev.some(item => item.id === product.id);
      
      if (isAlreadyFavorited) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, {
          ...product,
          addedAt: new Date().toISOString()
        }];
      }
    });
  };

  const isFavorited = (productId: number) => {
    return favorites.some(item => item.id === productId);
  };

  const removeFavorite = (productId: number) => {
    setFavorites(prev => prev.filter(item => item.id !== productId));
  };

  // Clear semua favorites
  const clearAllFavorites = () => {
    setFavorites([]);
  };

  // Get total favorites count
  const getFavoritesCount = () => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider value={{ 
      favorites, 
      toggleFavorite, 
      isFavorited, 
      removeFavorite,
      clearAllFavorites,
      getFavoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};