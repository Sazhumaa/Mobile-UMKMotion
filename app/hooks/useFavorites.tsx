// hooks/useFavorites.ts
import { createContext, useContext, useState, ReactNode } from 'react';

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
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  toggleFavorite: (product: FavoriteItem) => void;
  isFavorited: (productId: number) => boolean;
  removeFavorite: (productId: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

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

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited, removeFavorite }}>
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