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

// dummy data produk
const dummyProducts = [
  { 
    id: 1, 
    name: "Batagor Spesial Bandung", 
    price: 25000, 
    rating: 4.9, 
    sold: 1230, 
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    desc: "Batagor khas Bandung dengan bumbu kacang pedas manis. Gurih, renyah, dan cocok untuk semua usia."
  },
  { 
    id: 2, 
    name: "Kebaya Modern Bordir Premium", 
    price: 450000, 
    rating: 5.0, 
    sold: 892, 
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400",
    desc: "Kebaya modern bordir premium, nyaman dipakai, cocok untuk acara resmi atau pesta pernikahan."
  },
  { 
    id: 3, 
    name: "Kopi Arabica Gayo 500g", 
    price: 85000, 
    rating: 4.8, 
    sold: 2100, 
    image: "https://img.lazcdn.com/g/p/5d024f9972fc9a1052dae93c14d03350.jpg_720x720q80.jpg",
    desc: "Kopi Arabica Gayo 500g, biji kopi pilihan dengan aroma khas dan rasa yang lembut, pas untuk penikmat kopi sejati."
  },
  { 
    id: 4, 
    name: "Meja Kayu Jati Minimalis", 
    price: 1250000, 
    rating: 4.7, 
    sold: 456, 
    image: "https://kursicafe.net/wp-content/uploads/2020/07/Meja-Jati-Solid-Tebal-Kaki-Besi-Alami.jpg",
    desc: "Meja Kayu Jati Minimalis, kokoh dan elegan. Desain modern yang cocok untuk ruang tamu atau ruang kerja."
  },
  { 
    id: 5, 
    name: "Tas Anyaman Rotan Bali", 
    price: 280000, 
    rating: 4.8, 
    sold: 789, 
    image: "https://images.tokopedia.net/img/cache/700/o3syd0/1997/1/1/a251b523fe4d4813aaeafc1a25c6d8f8~.jpeg",
    desc: "Tas Anyaman Rotan Bali, handcrafted dengan detail unik. Ringan, stylish, dan cocok untuk hangout atau jalan-jalan."
  },
  { 
    id: 6, 
    name: "Vitamin C 1000mg - Suplemen Daya Tahan Tubuh", 
    price: 35000, 
    rating: 4.9, 
    sold: 5670, 
    image: "https://down-id.img.susercontent.com/file/id-11134207-7r98s-lqsqjcxm0qx1db",
    desc: "Vitamin C 1000mg, suplemen harian untuk meningkatkan daya tahan tubuh. Praktis dan aman dikonsumsi."
  },
  { 
    id: 7, 
    name: "Benih Padi Ciherang 1kg", 
    price: 750000, 
    rating: 5.0, 
    sold: 234, 
    image: "https://cf.shopee.co.id/file/id-11134207-81ztp-mfc5ugoi3zf01d",
    desc: "Benih Padi Ciherang 1kg, kualitas unggul dengan tingkat pertumbuhan tinggi. Cocok untuk petani skala kecil hingga besar."
  },
  { 
    id: 8, 
    name: "Benih Padi Ciherang 1kg", 
    price: 750000, 
    rating: 5.0, 
    sold: 234, 
    image: "https://cf.shopee.co.id/file/id-11134207-81ztp-mfc5ugoi3zf01d",
    desc: "Benih Padi Ciherang 1kg, kualitas unggul dengan tingkat pertumbuhan tinggi. Cocok untuk petani skala kecil hingga besar."
  },
];


export default function Homepage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
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


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Profile */}
          <View className="bg-white px-6 pt-4 pb-6 shadow-sm">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center space-x-4">
                <Image
                  source={require("../assets/images/Profile.jpg")}
                  className="max-w-14 max-h-14 rounded-full border-2 border-indigo-100"
                />
                <View>
                  <Text className="text-2xl font-bold text-gray-800">Halo, Elaina!</Text>
                  <Text className="text-gray-500">Selamat berbelanja lagi bro</Text>
                </View>
              </View>
              <View className="flex-row gap-4">
                <TouchableOpacity className="relative">
                  <Ionicons name="heart-outline" size={28} color="#1f2937" />
                  <View className="absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name="notifications-outline" size={28} color="#1f2937" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Search Bar */}
          <View className="px-6 mt-6">
            <View className="flex-row items-center bg-gray-50 rounded-2xl px-5 py-4 border border-gray-200 shadow-sm">
              <Ionicons
                name="search"
                size={22}
                color={search.length > 0 ? "#f97316" : "#9ca3af"} // warna berubah saat mengetik
              />

              <TextInput
                className="ml-3 flex-1 text-base text-gray-800"
                placeholder="Cari apa lu woi..."
                placeholderTextColor="#9ca3af"
                value={search}
                onChangeText={setSearch}
              />

              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.7}>
                  <Ionicons name="close-circle" size={22} color="#9ca3af" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Kategori */}
          <View className="mt-8 px-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">Kategori</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
              {categories.map((item) => {
                const isActive = selectedCategory === item.id;
                return (
                  <TouchableOpacity key={item.id} activeOpacity={0.8} onPress={() => setSelectedCategory(item.id)}>
                    {isActive ? (
                    <LinearGradient
                      colors={["#f97316", "#ea580c"]} // red-500 → red-700
                      className="flex-column items-center px-6 py-6 rounded-2xl shadow-lg"
                    >
                      <Ionicons name={item.icon as any} size={60} color="white" />
                      <Text className="text-white font-semibold ml-2">{item.name}</Text>
                    </LinearGradient>
                    ) : (
                      <View className="flex-column items-center px-6 py-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
                        <Ionicons name={item.icon as any} size={60} color="#6b7280" />
                        <Text className="text-gray-700 font-medium ml-2">{item.name}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Promosi */}
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

          {/*Produk Grid */}
          <View className="px-6 pb-10">
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-2xl font-bold text-gray-800">Produk Terbaru</Text>
              <TouchableOpacity>
                <Text className="text-indigo-600 font-semibold">Lihat Semua</Text>
              </TouchableOpacity>
            </View>

            {/* Grid 2 Kolom */}
            <View className="flex-row flex-wrap justify-between">
              {dummyProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                activeOpacity={0.8}
                className="w-[48%] mb-6"
                onPress={() => router.push({
                  pathname: "/Detailproduct",
                  params: {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    rating: product.rating,
                    sold: product.sold,
                    image: product.image,
                    desc: product.desc,
                  },
                })}
              >
                  <View className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 h-full flex flex-col">
                    {/* Gambar */}
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

                    {/* Konten Info */}
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
                      </View>

                      {/* Rating */}
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
                        <TouchableOpacity className="p-2 -mr-2">
                          <Ionicons name="heart-outline" size={22} color="#94a3b8" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          {/* Spacer */}
          <View className="h-20" />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}