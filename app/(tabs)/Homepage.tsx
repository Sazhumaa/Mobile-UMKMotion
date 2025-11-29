import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import dataProduk from "../data/product";
import { useFavorites } from "../hooks/useFavorites";
import { useCart } from "../hooks/useCart";

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(1);
  
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { getCartItemsCount } = useCart();

  const router = useRouter();

  const categories = [
    { id: 1, name: "Semua", icon: "grid-outline" },
    { id: 2, name: "Kuliner", icon: "fast-food-outline" },
    { id: 3, name: "Jasa", icon: "construct-outline" },
    { id: 4, name: "Fashion", icon: "shirt-outline" },
    { id: 5, name: "Kerajinan", icon: "color-palette-outline" },
    { id: 6, name: "Kesehatan", icon: "medkit-outline" },
    { id: 7, name: "Pertanian", icon: "leaf-outline" },
    { id: 8, name: "Elektronik", icon: "hardware-chip-outline" },
    { id: 9, name: "Furniture", icon: "cube-outline" },
    { id: 10, name: "Edukasi", icon: "school-outline" },
  ];

  // Filter produk berdasarkan kategori
  const filteredProducts = selectedCategory === 1 
    ? dataProduk 
    : dataProduk.filter(product => product.categoryId === selectedCategory);

  // Helper function untuk check favorite dengan type
  const checkIsFavorite = (productId: number) => {
    return isFavorite(productId, 'product');
  };

  // Utility function untuk product
  const createProductFavorite = (product: any) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      rating: product.rating,
      sold: product.sold,
      image: product.image,
      desc: product.desc,
      storeRating: product.storeRating,
      totalReviews: product.totalReviews,
      responseRate: product.responseRate,
      seller: product.seller,
      categoryId: product.categoryId,
      type: 'product' as const
    };
  };

  // Fungsi toggle favorite yang diperbaiki
  const handleToggleFavorite = (product: any) => {
    const favoriteData = createProductFavorite(product);
    toggleFavorite(favoriteData);
  };

  // Navigasi ke halaman toko
  const navigateToStore = (product: any) => {
    router.push({
      pathname: "/Toko",
      params: { 
        storeName: product.seller
      }
    });
  };

  // Navigasi ke detail produk - convert boolean ke string untuk params
  const navigateToDetail = (product: any) => {
    const params = {
      ...product,
      storeIsOfficial: product.storeIsOfficial ? "true" : "false",
      storeIsPowerMerchant: product.storeIsPowerMerchant ? "true" : "false"
    };
    
    router.push({
      pathname: "/Detailproduct",
      params: params,
    });
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile */}
          <TouchableOpacity onPress={() => router.push("/Profile")}>
            <View className="bg-white px-6 pt-4 pb-6 shadow-sm">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center space-x-4">
                  <Image
                    source={require("../../assets/images/Profile.jpg")}
                    className="max-w-14 max-h-14 rounded-full border-2 border-indigo-100"
                  />
                  <View>
                    <Text className="text-2xl font-bold text-gray-800">Halo, Elaina!</Text>
                    <Text className="text-gray-500">Selamat berbelanja lagi bro</Text>
                  </View>
                </View>
                <View className="flex-row gap-4">
                  <TouchableOpacity 
                    className="relative" 
                    onPress={() => router.push("/Favorites")}
                  >
                    <Ionicons name="heart-outline" size={28} color="#1f2937" />
                    {favorites.length > 0 && (
                      <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
                        <Text className="text-white text-xs font-bold text-center w-full">
                          {favorites.length}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                  
                  {/* Cart Icon dengan Counter */}
                  <TouchableOpacity 
                    className="relative" 
                    onPress={() => router.push("/Cartpage")}
                  >
                    <Ionicons name="cart-outline" size={28} color="#1f2937" />
                    {getCartItemsCount() > 0 && (
                      <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
                        <Text className="text-white text-xs font-bold text-center w-full">
                          {getCartItemsCount() > 99 ? '99+' : getCartItemsCount()}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          {/* Search Bar */}
          <View className="px-6 mt-6">
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200 shadow-sm">
              <Ionicons
                name="search"
                size={22}
                color={search.length > 0 ? "#f97316" : "#9ca3af"}
              />
              <TextInput
                className="ml-3 flex-1 text-base text-gray-800"
                placeholder="Cari apa lu woi..."
                placeholderTextColor="#9ca3af"
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <Ionicons name="close-circle" size={22} color="#9ca3af" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Category */}
          <View className="mt-8 px-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Kategori</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
              {categories.map((item) => {
                const isActive = selectedCategory === item.id;
                return (
                  <TouchableOpacity 
                    key={item.id} 
                    activeOpacity={0.8} 
                    onPress={() => setSelectedCategory(item.id)}
                  >
                    {isActive ? (
                      <LinearGradient
                        colors={["#f97316", "#ea580c"]}
                        className="flex-column items-center px-6 py-6 rounded-2xl shadow-lg"
                      >
                        <Ionicons name={item.icon as any} size={60} color="white" />
                        <Text className="text-white font-semibold mt-2">{item.name}</Text>
                      </LinearGradient>
                    ) : (
                      <View className="flex-column items-center px-6 py-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <Ionicons name={item.icon as any} size={60} color="#6b7280" />
                        <Text className="text-gray-700 font-medium mt-2">{item.name}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Banner Promosi */}
          <View className="mt-8 px-6 mb-8">
            <View className="bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
              <View className="absolute -top-20 -right-20 w-48 h-48 bg-white/10 rounded-full" />
              <View className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full" />
              <View className="relative z-10">
                <Text className="text-white text-2xl font-bold text-center mb-3">
                  Ingin Jualan di Sini?
                </Text>
                <Text className="text-white/90 text-base text-center leading-6 px-4">
                  Gabung sama ribuan UMKM sukses, jualan gampang, pembeli banjir!
                </Text>
                <TouchableOpacity className="mt-6 bg-white rounded-2xl px-8 py-4 shadow-lg self-center">
                  <Text className="text-orange-600 text-lg font-bold text-center">
                    Daftar Sekarang Gratis!
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Produk */}
          <View className="px-6 pb-10">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-bold text-gray-800">
                {selectedCategory === 1 ? 'Produk Terbaru' : `Produk ${categories.find(cat => cat.id === selectedCategory)?.name}`}
              </Text>
              <TouchableOpacity>
                <Text className="text-indigo-600 font-semibold">Lihat Semua</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row flex-wrap justify-between">
              {filteredProducts.map((product) => {
                const liked = checkIsFavorite(product.id);

                return (
                  <TouchableOpacity
                    key={product.id}
                    activeOpacity={0.8}
                    className="w-[48%] mb-6"
                    onPress={() => navigateToDetail(product)}
                  >
                    <View className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full flex flex-col">
                      <View className="relative">
                        <Image
                          source={{ uri: product.image }}
                          className="w-full h-56"
                          resizeMode="cover"
                        />
                        <View className="absolute top-3 left-3 bg-red-500 px-3 py-1 rounded-full">
                          <Text className="text-white text-xs font-bold">HOT</Text>
                        </View>
                      </View>

                      <View className="p-4 flex-1 flex flex-col justify-between">
                        <View>
                          <Text
                            className="text-gray-800 font-bold text-base leading-5"
                            numberOfLines={2}
                            style={{ minHeight: 44 }}
                          >
                            {product.name}
                          </Text>

                          <Text className="text-2xl font-black text-orange-500 mt-3">
                            Rp {product.price.toLocaleString("id-ID")}
                          </Text>

                          {/* Info Toko - Bagian Baru */}
                          <TouchableOpacity 
                            className="mt-3 flex-row items-center"
                            onPress={(e) => {
                              e.stopPropagation();
                              navigateToStore(product);
                            }}
                          >
                            <View className="w-6 h-6 bg-gray-200 rounded-full items-center justify-center mr-2">
                              <Text className="text-xs font-bold text-gray-600">
                                {product.seller.charAt(0)}
                              </Text>
                            </View>
                            <View className="flex-1">
                              <Text className="text-sm text-gray-600 font-medium" numberOfLines={1}>
                                {product.seller}
                              </Text>
                              <View className="flex-row items-center mt-1">
                                <Ionicons name="star" size={12} color="#F59E0B" />
                                <Text className="text-xs text-gray-500 ml-1">
                                  {product.storeRating} • {product.storeLocation}
                                </Text>
                              </View>
                            </View>
                            {product.storeIsOfficial && (
                              <View className="bg-blue-500 px-2 py-1 rounded">
                                <Text className="text-white text-xs">Official</Text>
                              </View>
                            )}
                          </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center justify-between mt-4 pt-2 border-t border-gray-100">
                          <View className="flex-row items-center">
                            <Ionicons name="star" size={18} color="#fbbf24" />
                            <Text className="text-sm font-semibold text-gray-700 ml-1">
                              {product.rating}
                            </Text>
                            <Text className="text-xs text-gray-500 ml-2">
                              ({product.sold} terjual)
                            </Text>
                          </View>

                          {/* Tombol Like dengan toggle */}
                          <TouchableOpacity
                            onPress={(e) => {
                              e.stopPropagation();
                              handleToggleFavorite(product);
                            }}
                            className="p-2 -mr-2"
                          >
                            <Ionicons
                              name={liked ? "heart" : "heart-outline"}
                              size={26}
                              color={liked ? "#ef4444" : "#94a3b8"}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View className="h-20" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}