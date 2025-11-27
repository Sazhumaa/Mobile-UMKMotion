import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  rating: number;
  sold?: number;
  image: any;
  desc?: string;
  storeRating?: number;
  totalReviews?: number;
  responseRate?: string;
  seller?: string;
  categoryId?: number;
  addedAt: string;
  type: 'product' | 'consultant' | 'store';
  
  // Tambahan untuk konsultan
  spesialis?: string;
  lokasi?: string;
  pengalaman?: string;
  totalKlien?: number;
  totalJamKonsultasi?: string;
  deskripsi?: string;
  keahlian?: string[];
  pendidikan?: string;
  sertifikasi?: string[];
  kecepatanRespons?: string;
  kepuasan?: number;
  kepercayaan?: number;
}

interface FavoritesContextType {
  // State
  favorites: FavoriteItem[];
  isLoading: boolean;
  error: string | null;
  
  // Basic CRUD Operations
  addFavorite: (item: Omit<FavoriteItem, 'addedAt'>) => Promise<void>;
  removeFavorite: (itemId: number, itemType: FavoriteItem['type']) => Promise<void>;
  toggleFavorite: (item: Omit<FavoriteItem, 'addedAt'>) => Promise<void>;
  isFavorite: (itemId: number, itemType: FavoriteItem['type']) => boolean;
  clearAllFavorites: () => Promise<void>;
  
  // Utility Functions
  getFavoritesCount: () => number;
  getFavoritesByType: (type: FavoriteItem['type']) => FavoriteItem[];
  getFavoritesByCategory: (categoryId: number) => FavoriteItem[];
  hasFavorites: boolean;
  
  // Bulk Operations
  removeMultipleFavorites: (itemIds: number[], itemType: FavoriteItem['type']) => Promise<void>;
  addMultipleFavorites: (items: Omit<FavoriteItem, 'addedAt'>[]) => Promise<void>;
  
  // Search & Filter
  searchFavorites: (query: string) => FavoriteItem[];
  getRecentFavorites: (limit?: number) => FavoriteItem[];
  
  // Statistics
  getFavoritesStats: () => {
    total: number;
    products: number;
    consultants: number;
    stores: number;
    totalValue: number;
  };
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Key untuk AsyncStorage
const FAVORITES_STORAGE_KEY = '@favorites_data';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load favorites dari AsyncStorage saat app start
  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  // Load data dari AsyncStorage
  const loadFavoritesFromStorage = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      
      if (storedFavorites) {
        const parsedFavorites = JSON.parse(storedFavorites);
        // Validate and ensure all items have required fields
        const validatedFavorites = parsedFavorites.filter((item: FavoriteItem) => 
          item.id && item.name && item.type
        );
        setFavorites(validatedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites from storage:', error);
      setError('Gagal memuat data favorit');
    } finally {
      setIsLoading(false);
    }
  };

  // Save data ke AsyncStorage
  const saveFavoritesToStorage = async (newFavorites: FavoriteItem[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites to storage:', error);
      setError('Gagal menyimpan data favorit');
      throw error;
    }
  };

  // Helper function untuk generate unique identifier
  const getItemUniqueKey = (item: FavoriteItem) => {
    return `${item.type}_${item.id}`;
  };

  // Add favorite item
  const addFavorite = useCallback(async (item: Omit<FavoriteItem, 'addedAt'>) => {
    try {
      setError(null);
      const newFavorite: FavoriteItem = {
        ...item,
        addedAt: new Date().toISOString(),
      };

      setFavorites(prev => {
        // Cek apakah item sudah ada berdasarkan type dan id
        const itemKey = getItemUniqueKey(newFavorite);
        const isAlreadyExists = prev.some(fav => getItemUniqueKey(fav) === itemKey);
        
        if (isAlreadyExists) {
          return prev; // Jangan tambahkan jika sudah ada
        }

        const updatedFavorites = [...prev, newFavorite];
        // Save async but don't wait for it
        saveFavoritesToStorage(updatedFavorites);
        return updatedFavorites;
      });

    } catch (error) {
      console.error('Error adding favorite:', error);
      setError('Gagal menambahkan ke favorit');
      throw error;
    }
  }, []);

  // Remove favorite item - DIPERBARUI untuk support type
  const removeFavorite = useCallback(async (itemId: number, itemType: FavoriteItem['type']) => {
    try {
      setError(null);
      setFavorites(prev => {
        const targetKey = `${itemType}_${itemId}`;
        const updatedFavorites = prev.filter(item => getItemUniqueKey(item) !== targetKey);
        
        saveFavoritesToStorage(updatedFavorites);
        return updatedFavorites;
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      setError('Gagal menghapus dari favorit');
      throw error;
    }
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback(async (item: Omit<FavoriteItem, 'addedAt'>) => {
    const itemKey = `${item.type}_${item.id}`;
    const isAlreadyFavorited = favorites.some(fav => getItemUniqueKey(fav) === itemKey);
    
    if (isAlreadyFavorited) {
      await removeFavorite(item.id, item.type);
    } else {
      await addFavorite(item);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Check if item is favorited - DIPERBARUI untuk support type
  const isFavorite = useCallback((itemId: number, itemType: FavoriteItem['type']) => {
    const targetKey = `${itemType}_${itemId}`;
    return favorites.some(item => getItemUniqueKey(item) === targetKey);
  }, [favorites]);

  // Clear semua favorites
  const clearAllFavorites = useCallback(async () => {
    try {
      setError(null);
      setFavorites([]);
      await AsyncStorage.removeItem(FAVORITES_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
      setError('Gagal menghapus semua favorit');
      throw error;
    }
  }, []);

  // Get total favorites count
  const getFavoritesCount = useCallback(() => {
    return favorites.length;
  }, [favorites]);

  // Get favorites by type
  const getFavoritesByType = useCallback((type: FavoriteItem['type']) => {
    return favorites.filter(item => item.type === type);
  }, [favorites]);

  // Get favorites by category
  const getFavoritesByCategory = useCallback((categoryId: number) => {
    return favorites.filter(item => item.categoryId === categoryId);
  }, [favorites]);

  // Check if has any favorites
  const hasFavorites = favorites.length > 0;

  // Remove multiple favorites
  const removeMultipleFavorites = useCallback(async (itemIds: number[], itemType: FavoriteItem['type']) => {
    try {
      setError(null);
      setFavorites(prev => {
        const targetKeys = itemIds.map(id => `${itemType}_${id}`);
        const updatedFavorites = prev.filter(item => !targetKeys.includes(getItemUniqueKey(item)));
        saveFavoritesToStorage(updatedFavorites);
        return updatedFavorites;
      });
    } catch (error) {
      console.error('Error removing multiple favorites:', error);
      setError('Gagal menghapus beberapa favorit');
      throw error;
    }
  }, []);

  // Add multiple favorites
  const addMultipleFavorites = useCallback(async (items: Omit<FavoriteItem, 'addedAt'>[]) => {
    try {
      setError(null);
      const newFavorites: FavoriteItem[] = items.map(item => ({
        ...item,
        addedAt: new Date().toISOString(),
      }));

      setFavorites(prev => {
        const updatedFavorites = [...prev, ...newFavorites];
        saveFavoritesToStorage(updatedFavorites);
        return updatedFavorites;
      });
    } catch (error) {
      console.error('Error adding multiple favorites:', error);
      setError('Gagal menambahkan beberapa favorit');
      throw error;
    }
  }, []);

  // Search favorites
  const searchFavorites = useCallback((query: string) => {
    if (!query.trim()) return favorites;
    
    const lowercasedQuery = query.toLowerCase();
    return favorites.filter(item =>
      item.name.toLowerCase().includes(lowercasedQuery) ||
      item.desc?.toLowerCase().includes(lowercasedQuery) ||
      item.seller?.toLowerCase().includes(lowercasedQuery) ||
      item.spesialis?.toLowerCase().includes(lowercasedQuery) ||
      item.lokasi?.toLowerCase().includes(lowercasedQuery)
    );
  }, [favorites]);

  // Get recent favorites
  const getRecentFavorites = useCallback((limit?: number) => {
    const sorted = [...favorites].sort((a, b) => 
      new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
    );
    
    return limit ? sorted.slice(0, limit) : sorted;
  }, [favorites]);

  // Get favorites statistics
  const getFavoritesStats = useCallback(() => {
    const products = getFavoritesByType('product');
    const consultants = getFavoritesByType('consultant');
    const stores = getFavoritesByType('store');
    
    const totalValue = favorites.reduce((sum, item) => sum + (item.price || 0), 0);

    return {
      total: favorites.length,
      products: products.length,
      consultants: consultants.length,
      stores: stores.length,
      totalValue,
    };
  }, [favorites, getFavoritesByType]);

  const value: FavoritesContextType = {
    // State
    favorites,
    isLoading,
    error,
    
    // Basic CRUD Operations
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAllFavorites,
    
    // Utility Functions
    getFavoritesCount,
    getFavoritesByType,
    getFavoritesByCategory,
    hasFavorites,
    
    // Bulk Operations
    removeMultipleFavorites,
    addMultipleFavorites,
    
    // Search & Filter
    searchFavorites,
    getRecentFavorites,
    
    // Statistics
    getFavoritesStats,
  };

  return (
    <FavoritesContext.Provider value={value}>
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

// Utility function untuk konsultan
export const createConsultantFavorite = (konsultan: any): Omit<FavoriteItem, 'addedAt'> => {
  return {
    id: konsultan.id,
    name: konsultan.name,
    image: konsultan.foto,
    price: parseInt(konsultan.harga?.replace(/\D/g, '') || '0'),
    rating: konsultan.rating,
    type: 'consultant',
    seller: konsultan.spesialis,
    totalReviews: konsultan.totalUlasan,
    spesialis: konsultan.spesialis,
    lokasi: konsultan.lokasi,
    pengalaman: konsultan.pengalaman,
    totalKlien: konsultan.totalKlien,
    totalJamKonsultasi: konsultan.totalJamKonsultasi,
    deskripsi: konsultan.deskripsi,
    keahlian: konsultan.keahlian,
    pendidikan: konsultan.pendidikan,
    sertifikasi: konsultan.sertifikasi,
    kecepatanRespons: konsultan.kecepatanRespons,
    kepuasan: konsultan.kepuasan,
    kepercayaan: konsultan.kepercayaan,
    categoryId: 1,
    sold: konsultan.totalKlien,
    responseRate: konsultan.kecepatanRespons,
  };
};