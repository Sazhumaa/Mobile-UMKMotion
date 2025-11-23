// Favorites.tsx
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFavorites } from "./hooks/useFavorites"; // UPDATE IMPORT

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Favorites() {
  // PAKAI USE_FAVORITES HOOK
  const { favorites, removeFavorite } = useFavorites();
  
  const [activeTab, setActiveTab] = useState<"all" | "product" | "consultant" | "store">("all");
  const [sortBy, setSortBy] = useState("newest");

  // FILTER & SORT MODAL
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

  // DATA FAVORIT DIAMBIL DARI CONTEXT
  const filteredAndSorted = useMemo(() => {
    let result = favorites;

    // Filter berdasarkan tab (untuk sekarang semua dianggap product)
    if (activeTab !== "all") {
      result = result.filter(i => i.type === activeTab);
    }

    // Filter kategori (kecuali "Semua")
    const hasAll = selectedCategories.includes(1);
    if (!hasAll && selectedCategories.length > 0) {
      result = result.filter(i => selectedCategories.includes(i.categoryId));
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest": 
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case "lowest": 
          return a.price - b.price;
        case "highest": 
          return b.price - a.price;
        case "rating": 
          return b.rating - a.rating;
        case "name": 
          return a.name.localeCompare(b.name);
        default: 
          return 0;
      }
    });
    return result;
  }, [favorites, activeTab, selectedCategories, sortBy]);

  const sortOptions = [
    { key: "newest", label: "Terbaru Ditambahkan" },
    { key: "lowest", label: "Harga Terendah" },
    { key: "highest", label: "Harga Tertinggi" },
    { key: "rating", label: "Rating Tertinggi" },
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

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4">
          <View className="flex-row items-center px-5 py-5 bg-white rounded-3xl shadow-sm border border-gray-100">
            <LinearGradient colors={["#FF7733", "#FF571A"]} className="w-14 h-14 rounded-2xl justify-center items-center">
              <Ionicons name="heart" size={28} color="white" />
            </LinearGradient>
            <View className="ml-4">
              <Text className="text-2xl font-extrabold text-gray-900">Favorit Saya</Text>
              <Text className="text-gray-500 text-base">{favorites.length} item</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View className="px-6 mt-5">
          <View className="flex-row items-center bg-gray-100 rounded-2xl px-5 py-4">
            <Ionicons name="search" size={22} color="#888" />
            <TextInput placeholder="Cari di favorit..." className="ml-3 flex-1 text-base" placeholderTextColor="#999" />
          </View>
        </View>

        {/* TABS */}
        <View className="px-6 mt-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {(["all", "product"] as const).map((tab) => {
              const count = tab === "all" ? favorites.length : favorites.filter(i => i.type === tab).length;
              const label = tab === "all" ? "Semua" : "Produk";
              const icon = tab === "all" ? "heart" : "cube";

              return (
                <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} className="mr-3">
                  <LinearGradient
                    colors={activeTab === tab ? ["#FF7733", "#FF571A"] : ["#e5e7eb", "#e5e7eb"]}
                    className="rounded-2xl px-5 py-3.5 flex-row items-center gap-2"
                  >
                    <Ionicons name={icon as any} size={18} color={activeTab === tab ? "white" : "#666"} />
                    <Text className={`font-bold ${activeTab === tab ? "text-white" : "text-gray-700"}`}>
                      {label} ({count})
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

        {/* List Item */}
        <View className="px-6 mt-6 pb-20">
          <Text className="text-gray-600 mb-4">
            Menampilkan <Text className="font-bold text-orange-600">{filteredAndSorted.length}</Text> item
          </Text>
          
          {filteredAndSorted.length === 0 ? (
            <View className="bg-white rounded-3xl p-8 items-center justify-center shadow-md border border-gray-100">
              <Ionicons name="heart-outline" size={64} color="#d1d5db" />
              <Text className="text-xl font-bold text-gray-500 mt-4">Belum ada favorit</Text>
              <Text className="text-gray-400 text-center mt-2">
                Produk yang kamu favoritkan akan muncul di sini
              </Text>
            </View>
          ) : (
            filteredAndSorted.map((item) => (
              <View key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 mb-5">
                <View className="relative">
                  <Image source={{ uri: item.image }} className="w-full h-48" resizeMode="cover" />
                  <View className="absolute top-3 left-3 bg-red-600 px-3 py-1.5 rounded-xl">
                    <Text className="text-white text-sm font-bold">HOT</Text>
                  </View>
                  <TouchableOpacity 
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full"
                    onPress={() => removeFavorite(item.id)}
                  >
                    <Ionicons name="trash-outline" size={22} color="#E54B16" />
                  </TouchableOpacity>
                </View>

                <View className="p-5">
                  <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>{item.name}</Text>
                  <Text className="text-gray-500 text-sm mt-1">{item.seller}</Text>

                  {/* Rating & Reviews */}
                  <View className="flex-row items-center mt-2">
                    <Ionicons name="star" size={18} color="#FFD700" />
                    <Text className="ml-1 font-bold text-gray-800">{item.rating}</Text>
                    <Text className="text-gray-500 text-sm ml-1">
                      ({item.sold} terjual)
                    </Text>
                  </View>

                  {/* Harga */}
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
            ))
          )}
        </View>
      </ScrollView>

      {/* Filter modal */}
      <Modal visible={filterVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeFilter}>
          <View className="flex-1 bg-black/40 justify-end">
            <TouchableWithoutFeedback>
              <Animated.View style={{ transform: [{ translateY: filterAnim }] }} className="bg-white rounded-t-3xl">
                <View className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-extrabold text-gray-900">Filter Kategori</Text>
                    <TouchableOpacity onPress={closeFilter}><Ionicons name="close" size={26} color="#999" /></TouchableOpacity>
                  </View>
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

      {/* MODAL SORT */}
      <Modal visible={sortVisible} transparent animationType="none">
        <TouchableWithoutFeedback onPress={closeSort}>
          <View className="flex-1 bg-black/40 justify-end">
            <TouchableWithoutFeedback>
              <Animated.View style={{ transform: [{ translateY: sortAnim }] }} className="bg-white rounded-t-3xl">
                <View className="px-6 pt-6 pb-4 bg-white border-b border-gray-200">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-extrabold text-gray-900">Urutkan Berdasarkan</Text>
                    <TouchableOpacity onPress={closeSort}><Ionicons name="close" size={26} color="#999" /></TouchableOpacity>
                  </View>
                </View>
                <View style={{ maxHeight: 380 }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="px-6 py-4 pb-10 bg-white">
                      {sortOptions.map((opt) => {
                        const isActive = sortBy === opt.key;
                        return (
                          <TouchableOpacity key={opt.key} onPress={() => { setSortBy(opt.key); closeSort(); }} className="mb-4">
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