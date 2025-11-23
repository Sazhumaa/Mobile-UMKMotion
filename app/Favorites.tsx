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

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Favorites() {
  // TAB BARU: Semua, Produk, Konsultan, Toko
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

  // DATA FAVORIT — ADA TOKO JUGA
  const dataFavorites = [
    { id: 1, name: "Sambal Cumi Asap Mak Rini", seller: "Nusantara Rasa", rating: 4.9, reviews: 198, priceBefore: "Rp 45.000", priceAfter: "Rp 40.500", discount: "-10%", type: "product" as const, categoryId: 2, addedAt: "2025-04-05", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=60" },
    { id: 2, name: "Rendang Daging Sapi Premium", seller: "Dapur Padang Asli", rating: 5.0, reviews: 312, priceBefore: "Rp 125.000", priceAfter: "Rp 99.000", discount: "-21%", type: "product" as const, categoryId: 2, addedAt: "2025-03-28", image: "https://images.unsplash.com/photo-1626645734936-69a8c1a5d9f7?auto=format&fit=crop&w=600&q=60" },
    { id: 3, name: "Konsultasi Gizi & Diet Sehat", seller: "dr. Sari Ahmad, Sp.GK", rating: 4.8, reviews: 89, priceBefore: "Rp 350.000", priceAfter: "Rp 299.000", discount: "-15%", type: "consultant" as const, categoryId: 6, addedAt: "2025-04-01", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=60" },
    { id: 4, name: "Toko Batik Cirebon Jaya", seller: "Batik Cirebon Jaya", rating: 4.9, reviews: 892, followers: "12.4K", products: 156, type: "store" as const, categoryId: 4, addedAt: "2025-04-10", image: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=600&q=60" },
    { id: 5, name: "Warung Makan Bu RT", seller: "Warung Makan Bu RT", rating: 4.7, reviews: 2341, followers: "8.9K", products: 42, type: "store" as const, categoryId: 2, addedAt: "2025-03-20", image: "https://images.unsplash.com/photo-1517248135467-2c7ed3af65fa?auto=format&fit=crop&w=600&q=60" },
  ];

  const filteredAndSorted = useMemo(() => {
    let result = dataFavorites;

    // Filter berdasarkan tab
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
        case "newest": return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
        case "lowest": return parseInt((a.priceAfter || "0").replace(/\D/g, "")) - parseInt((b.priceAfter || "0").replace(/\D/g, ""));
        case "highest": return parseInt((b.priceAfter || "0").replace(/\D/g, "")) - parseInt((a.priceAfter || "0").replace(/\D/g, ""));
        case "rating": return (b.rating || 0) - (a.rating || 0);
        case "name": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    return result;
  }, [activeTab, selectedCategories, sortBy]);

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
              <Text className="text-gray-500 text-base">{dataFavorites.length} item</Text>
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

        {/* TABS — SEKARANG ADA TOKO */}
        <View className="px-6 mt-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {(["all", "product", "consultant", "store"] as const).map((tab) => {
              const count = tab === "all" ? dataFavorites.length : dataFavorites.filter(i => i.type === tab).length;
              const label = tab === "all" ? "Semua" : tab === "product" ? "Produk" : tab === "consultant" ? "Konsultan" : "Toko";
              const icon = tab === "all" ? "heart" : tab === "product" ? "cube" : tab === "consultant" ? "person" : "storefront";

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

        {/* List Item — Support Produk, Konsultan, & Toko */}
        <View className="px-6 mt-6 pb-20">
          <Text className="text-gray-600 mb-4">
            Menampilkan <Text className="font-bold text-orange-600">{filteredAndSorted.length}</Text> item
          </Text>
          {filteredAndSorted.map((item) => (
            <View key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 mb-5">
              <View className="relative">
                <Image source={{ uri: item.image }} className="w-full h-48" resizeMode="cover" />
                {item.discount && (
                  <View className="absolute top-3 left-3 bg-red-600 px-3 py-1.5 rounded-xl">
                    <Text className="text-white text-sm font-bold">{item.discount}</Text>
                  </View>
                )}
                <TouchableOpacity className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                  <Ionicons name="trash-outline" size={22} color="#E54B16" />
                </TouchableOpacity>
              </View>

              <View className="p-5">
                <Text className="text-lg font-bold text-gray-900" numberOfLines={2}>{item.name}</Text>
                <Text className="text-gray-500 text-sm mt-1">{item.seller}</Text>

                {/* Rating & Reviews / Followers */}
                <View className="flex-row items-center mt-2">
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text className="ml-1 font-bold text-gray-800">{item.rating}</Text>
                  <Text className="text-gray-500 text-sm ml-1">
                    ({item.type === "store" ? `${item.followers} pengikut` : `${item.reviews} ulasan`})
                  </Text>
                </View>

                {/* Harga atau Info Toko */}
                {item.type === "store" ? (
                  <View className="flex-row items-center justify-between mt-4">
                    <Text className="text-gray-600">{item.products} produk</Text>
                    <TouchableOpacity>
                      <LinearGradient colors={["#FF7733", "#FF571A"]} className="px-6 py-3 rounded-2xl">
                        <Text className="text-white font-bold">Kunjungi Toko</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View className="flex-row items-end justify-between mt-4">
                    <View>
                      <Text className="text-gray-400 line-through text-sm">{item.priceBefore}</Text>
                      <Text className="text-2xl font-extrabold text-orange-600 mt-1">{item.priceAfter}</Text>
                    </View>
                    <TouchableOpacity>
                      <LinearGradient colors={["#FF7733", "#FF571A"]} className="px-6 py-3.5 rounded-2xl flex-row items-center gap-2">
                        <Ionicons name="cart-outline" size={22} color="white" />
                        <Text className="text-white font-bold">Keranjang</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* MODAL FILTER */}
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