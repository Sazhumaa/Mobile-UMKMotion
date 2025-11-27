import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useFavorites, FavoriteItem } from "./hooks/useFavorites";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Favorites() {
  const { 
    favorites, 
    removeFavorite, 
    clearAllFavorites,
    getFavoritesByType,
    getFavoritesCount,
    searchFavorites,
    getRecentFavorites,
    getFavoritesStats
  } = useFavorites();
  
  const router = useRouter();
  
  // Tabs
  const [activeTab, setActiveTab] = useState<"all" | "product" | "consultant" | "store">("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter & Sort Modal
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([1]);
  const [sortVisible, setSortVisible] = useState(false);

  const filterAnim = new Animated.Value(SCREEN_HEIGHT);
  const sortAnim = new Animated.Value(SCREEN_HEIGHT);

  const openFilter = () => {
    setFilterVisible(true);
    Animated.timing(filterAnim, { toValue: 0, duration: 320, useNativeDriver: true }).start();
  };

  const closeFilter = () => {
    Animated.timing(filterAnim, { toValue: SCREEN_HEIGHT, duration: 280, useNativeDriver: true }).start(() => setFilterVisible(false));
  };

  const openSort = () => {
    setSortVisible(true);
    Animated.timing(sortAnim, { toValue: 0, duration: 320, useNativeDriver: true }).start();
  };

  const closeSort = () => {
    Animated.timing(sortAnim, { toValue: SCREEN_HEIGHT, duration: 280, useNativeDriver: true }).start(() => setSortVisible(false));
  };

  const categories = [
    { id: 1, name: "Semua" },
    { id: 2, name: "Kuliner" },
    { id: 3, name: "Jasa" },
    { id: 4, name: "Fashion" },
    { id: 5, name: "Kerajinan" },
    { id: 6, name: "Kesehatan" },
    { id: 7, name: "Pertanian" },
    { id: 8, name: "Elektronik" },
    { id: 9, name: "Furniture" },
    { id: 10, name: "Edukasi" },
  ];

  // Filter & Sort Logic dengan improved hook functions
  const filteredAndSorted = useMemo(() => {
    let result = favorites;

    // Filter berdasarkan tab
    if (activeTab !== "all") {
      result = getFavoritesByType(activeTab);
    }

    // Filter kategori (kecuali "Semua")
    const hasAll = selectedCategories.includes(1);
    if (!hasAll && selectedCategories.length > 0) {
      result = result.filter(i => selectedCategories.includes(i.categoryId || 1));
    }

    // Search filter
    if (searchQuery.trim()) {
      result = searchFavorites(searchQuery);
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest": 
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case "lowest": 
          return (a.price || 0) - (b.price || 0);
        case "highest": 
          return (b.price || 0) - (a.price || 0);
        case "rating": 
          return (b.rating || 0) - (a.rating || 0);
        case "name": 
          return a.name.localeCompare(b.name);
        case "popular": 
          return (b.sold || 0) - (a.sold || 0);
        default: 
          return 0;
      }
    });
    return result;
  }, [favorites, activeTab, selectedCategories, sortBy, searchQuery, getFavoritesByType, searchFavorites]);

  const sortOptions = [
    { key: "newest", label: "Terbaru Ditambahkan" },
    { key: "lowest", label: "Harga Terendah" },
    { key: "highest", label: "Harga Tertinggi" },
    { key: "rating", label: "Rating Tertinggi" },
    { key: "popular", label: "Paling Populer" },
    { key: "name", label: "Nama A-Z" },
  ];

  const toggleCategory = (id: number) => {
    if (id === 1) {
      setSelectedCategories([1]);
    } else {
      let newSel = selectedCategories.filter(x => x !== 1);
      if (newSel.includes(id)) {
        newSel = newSel.filter(x => x !== id);
      } else {
        newSel.push(id);
      }
      setSelectedCategories(newSel.length === 0 ? [1] : newSel);
    }
  };

  // Fungsi format harga
  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`;
  };

  // Fungsi untuk clear all favorites dengan konfirmasi
  const handleClearAll = () => {
    if (favorites.length === 0) return;
    
    Alert.alert(
      "Hapus Semua Favorit",
      "Apakah kamu yakin ingin menghapus semua item favorit?",
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => clearAllFavorites()
        }
      ]
    );
  };

  // Fungsi untuk handle remove favorite dengan konfirmasi
  const handleRemoveFavorite = (item: FavoriteItem) => {
    Alert.alert(
      "Hapus Favorit",
      `Apakah kamu yakin ingin menghapus ${item.name} dari favorit?`,
      [
        {
          text: "Batal",
          style: "cancel"
        },
        {
          text: "Hapus",
          style: "destructive",
          onPress: () => removeFavorite(item.id)
        }
      ]
    );
  };

  // Fungsi untuk render item berdasarkan type
  const renderItem = (item: FavoriteItem) => {
    switch (item.type) {
      case "consultant":
        return (
          <View key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 mb-5">
            <View className="relative">
              <Image source={item.image} className="w-full h-48" resizeMode="cover" />
              <TouchableOpacity 
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full"
                onPress={() => handleRemoveFavorite(item)}
              >
                <Ionicons name="trash-outline" size={22} color="#E54B16" />
              </TouchableOpacity>
            </View>

            <View className="p-5">
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>{item.name}</Text>
                  <Text className="text-blue-600 text-sm mt-1 font-semibold">{item.spesialis || item.seller}</Text>
                  {item.lokasi && (
                    <Text className="text-gray-500 text-sm mt-1 flex-row items-center">
                      <Ionicons name="location-outline" size={14} color="#6b7280" />
                      <Text className="ml-1">{item.lokasi}</Text>
                    </Text>
                  )}
                </View>
                <View className="bg-blue-100 px-3 py-1 rounded-full ml-2">
                  <Text className="text-blue-800 text-xs font-bold">KONSULTAN</Text>
                </View>
              </View>

              <View className="flex-row items-center mt-2">
                <Ionicons name="star" size={18} color="#FFD700" />
                <Text className="ml-1 font-bold text-gray-800">{item.rating}</Text>
                <Text className="text-gray-500 text-sm ml-1">({item.totalReviews} ulasan)</Text>
              </View>

              {item.pengalaman && (
                <View className="flex-row items-center mt-2">
                  <Ionicons name="briefcase-outline" size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600 text-sm">Pengalaman: {item.pengalaman}</Text>
                </View>
              )}

              {item.totalKlien && (
                <View className="flex-row items-center mt-1">
                  <Ionicons name="people-outline" size={16} color="#6b7280" />
                  <Text className="ml-2 text-gray-600 text-sm">{item.totalKlien}+ Klien</Text>
                </View>
              )}

              <View className="flex-row items-end justify-between mt-4">
                <View>
                  <Text className="text-2xl font-extrabold text-blue-600 mt-1">
                    {formatPrice(item.price || 0)}
                  </Text>
                  {item.totalJamKonsultasi && (
                    <Text className="text-gray-500 text-sm">{item.totalJamKonsultasi} konsultasi</Text>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => router.push('/Konsultan')}
                >
                  <LinearGradient colors={["#3B82F6", "#1D4ED8"]} className="px-6 py-3.5 rounded-2xl">
                    <Text className="text-white font-bold">Jadwalkan</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case "store":
        return (
          <View key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 mb-5">
            <View className="relative">
              <Image source={item.image} className="w-full h-48" resizeMode="cover" />
              <TouchableOpacity 
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full"
                onPress={() => handleRemoveFavorite(item)}
              >
                <Ionicons name="trash-outline" size={22} color="#E54B16" />
              </TouchableOpacity>
            </View>

            <View className="p-5">
              <View className="flex-row items-start justify-between">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>{item.name}</Text>
                  <Text className="text-green-600 text-sm mt-1 font-semibold">{item.seller}</Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-full ml-2">
                  <Text className="text-green-800 text-xs font-bold">TOKO</Text>
                </View>
              </View>

              <View className="flex-row items-center mt-2">
                <Ionicons name="star" size={18} color="#FFD700" />
                <Text className="ml-1 font-bold text-gray-800">{item.rating}</Text>
                <Text className="text-gray-500 text-sm ml-1">({item.totalReviews} ulasan)</Text>
              </View>

              <View className="flex-row items-center justify-between mt-4">
                <View>
                  <Text className="text-gray-600 font-semibold">{item.sold} produk</Text>
                  <Text className="text-gray-500 text-sm">{item.responseRate} response rate</Text>
                </View>
                <TouchableOpacity>
                  <LinearGradient colors={["#10B981", "#059669"]} className="px-6 py-3.5 rounded-2xl">
                    <Text className="text-white font-bold">Kunjungi</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      default: // product
        return (
          <View key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 mb-5">
            <View className="relative">
              <Image source={item.image} className="w-full h-48" resizeMode="cover" />
              <View className="absolute top-3 left-3 bg-red-600 px-3 py-1.5 rounded-xl">
                <Text className="text-white text-sm font-bold">HOT</Text>
              </View>
              <TouchableOpacity 
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full"
                onPress={() => handleRemoveFavorite(item)}
              >
                <Ionicons name="trash-outline" size={22} color="#E54B16" />
              </TouchableOpacity>
            </View>

            <View className="p-5">
              <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>{item.name}</Text>
              <Text className="text-gray-500 text-sm mt-1">{item.seller}</Text>

              <View className="flex-row items-center mt-2">
                <Ionicons name="star" size={18} color="#FFD700" />
                <Text className="ml-1 font-bold text-gray-800">{item.rating}</Text>
                <Text className="text-gray-500 text-sm ml-1">({item.sold} terjual)</Text>
              </View>

              <View className="flex-row items-end justify-between mt-4">
                <View>
                  <Text className="text-2xl font-extrabold text-orange-600 mt-1">
                    {formatPrice(item.price)}
                  </Text>
                </View>
                <TouchableOpacity>
                  <LinearGradient colors={["#FF7733", "#FF571A"]} className="px-6 py-3.5 rounded-2xl flex-row items-center gap-2">
                    <Ionicons name="cart-outline" size={22} color="white" />
                    <Text className="text-white font-bold">Keranjang</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
  };

  // Hitung jumlah per tab menggunakan improved hook
  const getTabCount = (tab: string) => {
    switch (tab) {
      case "all": return getFavoritesCount();
      case "product": return getFavoritesByType('product').length;
      case "consultant": return getFavoritesByType('consultant').length;
      case "store": return getFavoritesByType('store').length;
      default: return 0;
    }
  };

  // Get statistics
  const stats = getFavoritesStats();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4">
          <View className="flex-row items-center px-5 py-5 bg-white rounded-3xl shadow-sm border border-gray-100">
            <LinearGradient colors={["#FF7733", "#FF571A"]} className="w-14 h-14 rounded-2xl justify-center items-center">
              <Ionicons name="heart" size={28} color="white" />
            </LinearGradient>
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-extrabold text-gray-900">Favorit Saya</Text>
              <Text className="text-gray-500 text-base">
                {getFavoritesCount()} item • {stats.products} produk • {stats.consultants} konsultan
              </Text>
            </View>
            
            {/* Tombol Clear All */}
            {favorites.length > 0 && (
              <TouchableOpacity 
                onPress={handleClearAll}
                className="bg-red-50 px-4 py-2 rounded-2xl border border-red-200"
              >
                <Text className="text-red-600 font-semibold text-sm">Hapus Semua</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Search */}
        <View className="px-6 mt-5">
          <View className="flex-row items-center bg-gray-100 rounded-2xl px-5 py-4">
            <Ionicons name="search" size={22} color="#888" />
            <TextInput 
              placeholder="Cari di favorit..." 
              className="ml-3 flex-1 text-base" 
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={22} color="#888" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Tabs */}
        <View className="px-6 mt-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {(["all", "product", "consultant", "store"] as const).map((tab) => {
              const count = getTabCount(tab);
              const labels = {
                all: "Semua",
                product: "Produk", 
                consultant: "Konsultan",
                store: "Toko"
              };
              const icons = {
                all: "heart",
                product: "cube",
                consultant: "person",
                store: "storefront"
              };

              return (
                <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} className="mr-3">
                  <LinearGradient
                    colors={activeTab === tab ? ["#FF7733", "#FF571A"] : ["#e5e7eb", "#e5e7eb"]}
                    className="rounded-2xl px-5 py-3.5 flex-row items-center gap-2"
                  >
                    <Ionicons name={icons[tab] as any} size={18} color={activeTab === tab ? "white" : "#666"} />
                    <Text className={`font-bold ${activeTab === tab ? "text-white" : "text-gray-700"}`}>
                      {labels[tab]} ({count})
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Filter & Sort Buttons */}
        <View className="px-6 mt-6 flex-row gap-4">
          <TouchableOpacity onPress={openFilter} className="flex-1 flex-row items-center justify-center gap-2 py-4 border border-gray-300 rounded-2xl bg-white">
            <Ionicons name="options-outline" size={22} color="#555" />
            <Text className="font-semibold text-gray-700">Filter</Text>
            {selectedCategories.length > 1 && (
              <View className="ml-2 bg-orange-600 w-6 h-6 rounded-full justify-center items-center">
                <Text className="text-white text-xs font-bold">{selectedCategories.length - 1}</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={openSort} className="flex-1 flex-row items-center justify-center gap-2 py-4 border border-gray-300 rounded-2xl bg-white">
            <MaterialCommunityIcons name="sort-variant" size={22} color="#555" />
            <Text className="font-semibold text-gray-700">Urutkan</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        {favorites.length > 0 && (
          <View className="px-6 mt-6">
            <View className="bg-white rounded-2xl p-4 border border-gray-200">
              <Text className="text-lg font-bold text-gray-800 mb-2">Statistik Favorit</Text>
              <View className="flex-row justify-between">
                <View className="items-center">
                  <Text className="text-2xl font-bold text-orange-600">{stats.total}</Text>
                  <Text className="text-gray-500 text-sm">Total</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-blue-600">{stats.products}</Text>
                  <Text className="text-gray-500 text-sm">Produk</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-green-600">{stats.consultants}</Text>
                  <Text className="text-gray-500 text-sm">Konsultan</Text>
                </View>
                <View className="items-center">
                  <Text className="text-2xl font-bold text-purple-600">{stats.stores}</Text>
                  <Text className="text-gray-500 text-sm">Toko</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* List Item */}
        <View className="px-6 mt-6 pb-20">
          <Text className="text-gray-600 mb-4">
            Menampilkan <Text className="font-bold text-orange-600">{filteredAndSorted.length}</Text> item
            {activeTab !== "all" && ` dalam ${activeTab}`}
            {searchQuery && ` untuk "${searchQuery}"`}
          </Text>
          
          {filteredAndSorted.length === 0 ? (
            <View className="bg-white rounded-3xl p-8 items-center justify-center shadow-md border border-gray-100">
              <Ionicons 
                name={searchQuery ? "search-outline" : "heart-outline"} 
                size={64} 
                color="#d1d5db" 
              />
              <Text className="text-xl font-bold text-gray-500 mt-4">
                {searchQuery ? "Tidak ada hasil pencarian" : "Belum ada favorit"}
              </Text>
              <Text className="text-gray-400 text-center mt-2">
                {searchQuery 
                  ? `Tidak ditemukan favorit untuk "${searchQuery}"`
                  : activeTab === "product" && "Produk yang kamu favoritkan akan muncul di sini"
                  || activeTab === "consultant" && "Konsultan yang kamu favoritkan akan muncul di sini"
                  || activeTab === "store" && "Toko yang kamu favoritkan akan muncul di sini"
                  || "Item yang kamu favoritkan akan muncul di sini"
                }
              </Text>
              
              <TouchableOpacity 
                className="mt-6 bg-orange-500 px-6 py-3 rounded-2xl"
                onPress={() => {
                  if (searchQuery) {
                    setSearchQuery("");
                  } else {
                    router.push(activeTab === "consultant" ? '/Konsultan' : '/Homepage');
                  }
                }}
              >
                <Text className="text-white font-bold">
                  {searchQuery ? "Hapus Pencarian" : `Jelajahi ${activeTab === "consultant" ? "Konsultan" : "Produk"}`}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredAndSorted.map(item => renderItem(item))
          )}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={filterVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeFilter}>
          <View className="flex-1 bg-black/40 justify-end">
            <TouchableWithoutFeedback>
              <Animated.View style={{ transform: [{ translateY: filterAnim }] }} className="bg-white rounded-t-3xl">
                <View className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-extrabold text-gray-900">Filter Kategori</Text>
                    <TouchableOpacity onPress={closeFilter}>
                      <Ionicons name="close" size={26} color="#999" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-gray-500 text-sm mt-1">
                    Filter berdasarkan kategori {activeTab !== "all" && `untuk ${activeTab}`}
                  </Text>
                </View>
                <View style={{ maxHeight: 380 }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="px-6 py-4 pb-10 bg-white">
                      {categories.map((cat) => {
                        const isActive = selectedCategories.includes(cat.id);
                        return (
                          <TouchableOpacity key={cat.id} onPress={() => toggleCategory(cat.id)} className="mb-4">
                            {isActive ? (
                              <LinearGradient colors={["#FF7733", "#FF571A"]} className="px-6 py-4 rounded-full shadow-sm">
                                <Text className="text-white font-semibold text-center">{cat.name}</Text>
                              </LinearGradient>
                            ) : (
                              <View className="px-6 py-4 rounded-full bg-gray-100">
                                <Text className="text-gray-700 font-semibold text-center">{cat.name}</Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Sort Modal */}
      <Modal visible={sortVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeSort}>
          <View className="flex-1 bg-black/40 justify-end">
            <TouchableWithoutFeedback>
              <Animated.View style={{ transform: [{ translateY: sortAnim }] }} className="bg-white rounded-t-3xl">
                <View className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-extrabold text-gray-900">Urutkan Berdasarkan</Text>
                    <TouchableOpacity onPress={closeSort}>
                      <Ionicons name="close" size={26} color="#999" />
                    </TouchableOpacity>
                  </View>
                  <Text className="text-gray-500 text-sm mt-1">
                    Urutkan {activeTab !== "all" && activeTab} favorit kamu
                  </Text>
                </View>
                <View style={{ maxHeight: 380 }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="px-6 py-4 pb-10 bg-white">
                      {sortOptions.map((opt) => {
                        const isActive = sortBy === opt.key;
                        return (
                          <TouchableOpacity 
                            key={opt.key} 
                            onPress={() => { setSortBy(opt.key); closeSort(); }} 
                            className="mb-4"
                          >
                            {isActive ? (
                              <LinearGradient colors={["#FF7733", "#FF571A"]} className="px-6 py-4 rounded-full shadow-sm">
                                <Text className="text-white font-semibold text-center">{opt.label}</Text>
                              </LinearGradient>
                            ) : (
                              <View className="px-6 py-4 rounded-full bg-gray-100">
                                <Text className="text-gray-700 font-semibold text-center">{opt.label}</Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}