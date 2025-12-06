"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Linking,
  Animated,
  FlatList,
  StatusBar,
  Modal,
  PanResponder,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

// NativeWind styling - pakai className langsung
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

// Color Scheme - Orange Theme
const COLORS = {
  primary: "#FF6B35",
  primaryDark: "#E55A2B",
  primaryLight: "#FF8C5A",
  secondary: "#FF9F1C",
  background: "#FFF9F2",
  card: "#FFFFFF",
  text: "#2D3748",
  textLight: "#718096",
  border: "#FED7AA",
  success: "#48BB78",
  warning: "#ED8936",
  error: "#F56565",
}

// Product Types
export interface Product {
  id: number
  name: string
  price: number
  rating: number
  sold: number
  image: string
  desc: string
  storeRating: number
  totalReviews: number
  responseRate: string
  seller: string
  categoryId: number
}

const dataProduk: Product[] = [
  {
    id: 1,
    name: "Batagor Spesial Bandung",
    price: 25000,
    rating: 4.9,
    sold: 1230,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    desc: "Batagor khas Bandung dengan bumbu kacang pedas manis. Gurih, renyah, dan cocok untuk semua usia.",
    storeRating: 4.8,
    totalReviews: 3400,
    responseRate: "98%",
    seller: "Warung Makan Sederhana",
    categoryId: 2,
  },
  {
    id: 2,
    name: "Kebaya Modern Bordir Premium",
    price: 450000,
    rating: 5.0,
    sold: 892,
    image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400",
    desc: "Kebaya modern bordir premium, nyaman dipakai, cocok untuk acara resmi atau pesta pernikahan.",
    storeRating: 4.9,
    totalReviews: 5100,
    responseRate: "96%",
    seller: "Butik Fashion Modern",
    categoryId: 4,
  },
  {
    id: 3,
    name: "Kopi Arabica Gayo 500g",
    price: 85000,
    rating: 4.8,
    sold: 2100,
    image: "https://images.unsplash.com/photo-1568649969366-2304a40e5b74?w=400",
    desc: "Kopi Arabica Gayo 500g, biji kopi pilihan dengan aroma khas dan rasa yang lembut.",
    storeRating: 4.7,
    totalReviews: 1900,
    responseRate: "92%",
    seller: "Kedai Kopi Nusantara",
    categoryId: 2,
  },
  {
    id: 4,
    name: "Meja Kayu Jati Minimalis",
    price: 1250000,
    rating: 4.7,
    sold: 456,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    desc: "Meja Kayu Jati Minimalis, kokoh dan elegan. Cocok untuk ruang tamu atau kerja.",
    storeRating: 4.9,
    totalReviews: 2800,
    responseRate: "94%",
    seller: "Furniture Jati Asli",
    categoryId: 9,
  },
  {
    id: 5,
    name: "Tas Anyaman Rotan Bali",
    price: 280000,
    rating: 4.8,
    sold: 789,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    desc: "Tas Anyaman Rotan Bali, handcrafted dengan detail unik. Ringan dan stylish.",
    storeRating: 4.8,
    totalReviews: 1500,
    responseRate: "97%",
    seller: "Galeri Kerajinan Bali",
    categoryId: 5,
  },
  {
    id: 6,
    name: "Vitamin C 1000mg - Suplemen Daya Tahan Tubuh",
    price: 35000,
    rating: 4.9,
    sold: 5670,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    desc: "Vitamin C 1000mg, suplemen harian untuk meningkatkan daya tahan tubuh.",
    storeRating: 4.9,
    totalReviews: 8700,
    responseRate: "99%",
    seller: "Apotek Sehat Selalu",
    categoryId: 6,
  },
]

// Types
interface UMKMLocation {
  id: string
  name: string
  category: string
  rating: number
  reviews: number
  distance: number
  address: string
  phone: string
  openHours: string
  image: string
  lat: number
  lng: number
  verified: boolean
  description: string
  isOpen: boolean
  photos: string[]
  products: Product[]
  owner: string
  established: string
  totalProducts: number
  delivery: boolean
  website?: string
  socialMedia: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }
}

// Data UMKM/Toko
const SAMPLE_UMKM_DATA: UMKMLocation[] = [
  {
    id: "1",
    name: "Warung Makan Sederhana",
    category: "Kuliner",
    rating: 4.8,
    reviews: 124,
    distance: 1.2,
    address: "Jl. Merdeka No. 123, Jakarta Pusat",
    phone: "+628123456789",
    openHours: "08:00 - 21:00",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    lat: -6.2088,
    lng: 106.8456,
    verified: true,
    description:
      "Warung makan keluarga yang telah berdiri sejak 1995, menyajikan masakan tradisional Indonesia dengan cita rasa autentik. Kami menggunakan bahan-bahan segar dan resep turun-temurun.",
    isOpen: true,
    photos: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400",
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=400",
    ],
    products: dataProduk.filter((product) => product.seller === "Warung Makan Sederhana"),
    owner: "Ibu Siti Rahayu",
    established: "1995",
    totalProducts: 15,
    delivery: true,
    socialMedia: {
      instagram: "@warungsederhana",
      facebook: "Warung Makan Sederhana",
    },
  },
  {
    id: "2",
    name: "Galeri Kerajinan Bali",
    category: "Kerajinan",
    rating: 4.5,
    reviews: 89,
    distance: 2.5,
    address: "Jl. Sudirman No. 456, Jakarta Selatan",
    phone: "+628987654321",
    openHours: "09:00 - 20:00",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    lat: -6.2297,
    lng: 106.8224,
    verified: true,
    description:
      "Galeri kerajinan tangan khas Bali yang menampilkan karya terbaik pengrajin lokal. Setiap produk dibuat dengan teknik tradisional dan perhatian terhadap detail.",
    isOpen: true,
    photos: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
      "https://images.unsplash.com/photo-1566155376650-bf2088e89c1c?w=400",
    ],
    products: dataProduk.filter((product) => product.seller === "Galeri Kerajinan Bali"),
    owner: "Made Wijaya",
    established: "2008",
    totalProducts: 8,
    delivery: true,
    website: "www.galerikerajinanbali.com",
    socialMedia: {
      instagram: "@galerikerajinanbali",
      facebook: "Galeri Kerajinan Bali",
      tiktok: "@galeribali",
    },
  },
  {
    id: "3",
    name: "Butik Fashion Modern",
    category: "Fashion",
    rating: 4.7,
    reviews: 203,
    distance: 3.1,
    address: "Jl. Thamrin No. 789, Jakarta Pusat",
    phone: "+628112233445",
    openHours: "10:00 - 22:00",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    lat: -6.1865,
    lng: 106.834,
    verified: true,
    description:
      "Butik fashion yang menggabungkan gaya modern dengan elemen tradisional Indonesia. Menyediakan pakaian berkualitas dengan desain eksklusif dan bahan premium.",
    isOpen: false,
    photos: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400",
    ],
    products: dataProduk.filter((product) => product.seller === "Butik Fashion Modern"),
    owner: "Sarah Putri",
    established: "2015",
    totalProducts: 12,
    delivery: true,
    website: "www.butikfashionmodern.com",
    socialMedia: {
      instagram: "@butikfashionmodern",
      tiktok: "@butikmodern",
    },
  },
]

interface Category {
  id: string
  label: string
  icon: string
  color: string
}

const categories: Category[] = [
  { id: "all", label: "Semua", icon: "apps", color: COLORS.primary },
  { id: "food", label: "Kuliner", icon: "restaurant", color: COLORS.primary },
  { id: "fashion", label: "Fashion", icon: "shirt", color: COLORS.primary },
  { id: "craft", label: "Kerajinan", icon: "brush", color: COLORS.primary },
  { id: "electronics", label: "Elektronik", icon: "hardware-chip", color: COLORS.primary },
]

// Filter Modal Component
interface FilterModalProps {
  visible: boolean
  onClose: () => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, selectedCategory, onCategoryChange }) => {
  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1 bg-white pt-16">
        <View className="px-6 pb-4 border-b border-gray-200">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-gray-900">Filter UMKM</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 px-6 pt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">Kategori</Text>
          <View className="flex-row flex-wrap">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                className={`flex-row items-center px-4 py-3 rounded-2xl mr-3 mb-3 ${
                  selectedCategory === category.id ? "bg-orange-500" : "bg-gray-100"
                }`}
                onPress={() => onCategoryChange(category.id)}
              >
                <Ionicons
                  name={category.icon as any}
                  size={18}
                  color={selectedCategory === category.id ? "white" : COLORS.primary}
                />
                <Text
                  className={`ml-2 font-semibold ${selectedCategory === category.id ? "text-white" : "text-gray-700"}`}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-8">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Jarak Maksimal</Text>
            <View className="flex-row justify-between">
              {[1, 3, 5, 10].map((distance) => (
                <TouchableOpacity key={distance} className="bg-gray-100 px-6 py-3 rounded-2xl">
                  <Text className="font-semibold text-gray-700">{distance} km</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View className="mt-8">
            <Text className="text-lg font-semibold text-gray-900 mb-4">Rating Minimal</Text>
            <View className="flex-row justify-between">
              {[3, 4, 4.5].map((rating) => (
                <TouchableOpacity key={rating} className="bg-gray-100 px-6 py-3 rounded-2xl">
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#f59e0b" />
                    <Text className="font-semibold text-gray-700 ml-1">{rating}+</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View className="px-6 py-4 border-t border-gray-200">
          <TouchableOpacity className="bg-orange-500 rounded-2xl py-4 items-center" onPress={onClose}>
            <Text className="text-white font-bold text-lg">Terapkan Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

// Bottom Sheet Component untuk UMKM Terdekat
interface BottomSheetProps {
  isVisible: boolean
  onClose: () => void
  umkmData: UMKMLocation[]
  onUMKMSelect: (umkm: UMKMLocation) => void
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isVisible, onClose, umkmData, onUMKMSelect }) => {
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current
  const panY = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 300,
      }).start()
    } else {
      Animated.spring(translateY, {
        toValue: SCREEN_HEIGHT,
        useNativeDriver: true,
        damping: 20,
        stiffness: 300,
      }).start()
    }
  }, [isVisible])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose()
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  const handleClose = () => {
    Animated.spring(translateY, {
      toValue: SCREEN_HEIGHT,
      useNativeDriver: true,
      damping: 20,
      stiffness: 300,
    }).start(onClose)
  }

  return (
    <Modal visible={isVisible} animationType="none" transparent={true} onRequestClose={handleClose}>
      <View className="flex-1 bg-black/50">
        <TouchableOpacity className="flex-1" onPress={handleClose} />

        <Animated.View
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-3/4"
          style={{
            transform: [{ translateY: Animated.add(translateY, panY) }],
          }}
        >
          {/* Drag Handle */}
          <View {...panResponder.panHandlers} className="items-center py-3">
            <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </View>

          {/* Header */}
          <View className="px-6 pb-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-bold text-gray-900">UMKM Terdekat</Text>
              <TouchableOpacity onPress={handleClose}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <Text className="text-gray-600 mt-1">{umkmData.length} UMKM ditemukan di sekitar Anda</Text>
          </View>

          {/* Content */}
          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            <View className="px-6 pt-4">
              {umkmData.map((umkm: UMKMLocation) => (
                <TouchableOpacity
                  key={umkm.id}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-lg border border-orange-100 active:opacity-80"
                  onPress={() => {
                    onUMKMSelect(umkm)
                    handleClose()
                  }}
                >
                  <View className="flex-row">
                    <Image source={{ uri: umkm.image }} className="w-20 h-20 rounded-xl" />
                    <View className="flex-1 ml-4">
                      <Text className="text-lg font-bold text-gray-900 mb-1" numberOfLines={1}>
                        {umkm.name}
                      </Text>
                      <Text className="text-orange-600 text-sm font-medium mb-2">{umkm.category}</Text>

                      <View className="flex-row justify-between items-center mb-2">
                        <View className="flex-row items-center">
                          <Ionicons name="star" size={16} color="#f59e0b" />
                          <Text className="text-sm text-gray-600 ml-1">{umkm.rating}</Text>
                          <Text className="text-sm text-gray-400 ml-2">• {umkm.distance} km</Text>
                        </View>
                        <View className={`px-2 py-1 rounded-full ${umkm.isOpen ? "bg-green-100" : "bg-red-100"}`}>
                          <Text className={`text-xs font-semibold ${umkm.isOpen ? "text-green-700" : "text-red-700"}`}>
                            {umkm.isOpen ? "Buka" : "Tutup"}
                          </Text>
                        </View>
                      </View>

                      {/* Product Preview */}
                      {umkm.products.length > 0 && (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
                          <View className="flex-row space-x-2">
                            {umkm.products.slice(0, 3).map((product: Product) => (
                              <View
                                key={product.id}
                                className="flex-row items-center bg-orange-50 px-2 py-1 rounded-full"
                              >
                                <Image source={{ uri: product.image }} className="w-4 h-4 rounded" />
                                <Text className="text-xs text-gray-700 ml-1 font-medium" numberOfLines={1}>
                                  {product.name}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </ScrollView>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  )
}

// Simple Map Component untuk UI
interface SimpleMapViewProps {
  umkmData: UMKMLocation[]
  onUMKMSelect: (umkm: UMKMLocation) => void
  selectedUMKM: UMKMLocation | null
}

const SimpleMapView: React.FC<SimpleMapViewProps> = ({ umkmData, onUMKMSelect, selectedUMKM }) => {
  return (
    <View className="flex-1 bg-gray-100 relative">
      {/* Background Map Simulation */}
      <View className="flex-1 bg-blue-50 relative overflow-hidden">
        {/* Grid lines untuk efek peta */}
        <View className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <View key={`h-${i}`} className="absolute w-full h-px bg-gray-400" style={{ top: `${i * 10}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <View key={`v-${i}`} className="absolute h-full w-px bg-gray-400" style={{ left: `${i * 10}%` }} />
          ))}
        </View>

        {/* Roads */}
        <View className="absolute w-full h-3 bg-gray-300 top-1/3" />
        <View className="absolute w-full h-3 bg-gray-300 top-2/3" />
        <View className="absolute h-full w-3 bg-gray-300 left-1/3" />
        <View className="absolute h-full w-3 bg-gray-300 left-2/3" />

        {/* User Location */}
        <View className="absolute top-1/2 left-1/2 -ml-4 -mt-4">
          <View className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white shadow-lg items-center justify-center">
            <View className="w-2 h-2 bg-white rounded-full" />
          </View>
          <View className="absolute inset-0 border-2 border-blue-500 rounded-full animate-ping" />
        </View>

        {/* UMKM Markers */}
        {umkmData.map((umkm: UMKMLocation, index: number) => {
          // Position markers around user location
          const positions = [
            { top: "35%", left: "25%" },
            { top: "60%", left: "65%" },
            { top: "25%", left: "70%" },
          ]

          const position = positions[index % positions.length]
          const isSelected = selectedUMKM?.id === umkm.id

          return (
            <TouchableOpacity
              key={umkm.id}
              className={`absolute -ml-6 -mt-6 ${isSelected ? "z-10" : "z-0"}`}
              style={position as any}
              onPress={() => onUMKMSelect(umkm)}
              activeOpacity={0.7}
            >
              <View className={`relative ${isSelected ? "scale-110" : "scale-100"}`}>
                <View
                  className={`w-12 h-12 rounded-2xl items-center justify-center shadow-lg border-2 ${
                    isSelected ? "border-orange-500 bg-white" : "border-white bg-white"
                  }`}
                >
                  <View
                    className={`w-8 h-8 rounded-xl items-center justify-center ${
                      umkm.category === "Kuliner"
                        ? "bg-orange-500"
                        : umkm.category === "Fashion"
                          ? "bg-pink-500"
                          : umkm.category === "Kerajinan"
                            ? "bg-green-500"
                            : "bg-blue-500"
                    }`}
                  >
                    <Ionicons
                      name={
                        umkm.category === "Kuliner"
                          ? "restaurant"
                          : umkm.category === "Fashion"
                            ? "shirt"
                            : umkm.category === "Kerajinan"
                              ? "brush"
                              : "cube"
                      }
                      size={16}
                      color="white"
                    />
                  </View>
                </View>
                <View className={`mt-1 px-2 py-1 rounded-full ${isSelected ? "bg-orange-500" : "bg-white"} shadow-sm`}>
                  <Text className={`text-xs font-bold ${isSelected ? "text-white" : "text-gray-800"}`}>
                    {umkm.name.split(" ")[0]}
                  </Text>
                </View>

                {/* Info window ketika selected */}
                {isSelected && (
                  <View className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white rounded-xl p-3 shadow-2xl border border-orange-200 min-w-48">
                    <View className="flex-row items-center mb-2">
                      <Image source={{ uri: umkm.image }} className="w-10 h-10 rounded-lg" />
                      <View className="ml-2 flex-1">
                        <Text className="font-bold text-gray-900 text-sm" numberOfLines={1}>
                          {umkm.name}
                        </Text>
                        <Text className="text-orange-600 text-xs">{umkm.category}</Text>
                      </View>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={12} color="#f59e0b" />
                        <Text className="text-xs text-gray-600 ml-1">{umkm.rating}</Text>
                      </View>
                      <Text className="text-xs text-gray-600">{umkm.distance} km</Text>
                      <View className={`px-2 py-1 rounded-full ${umkm.isOpen ? "bg-green-100" : "bg-red-100"}`}>
                        <Text className={`text-xs font-semibold ${umkm.isOpen ? "text-green-700" : "text-red-700"}`}>
                          {umkm.isOpen ? "Buka" : "Tutup"}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Map Controls */}
      <View className="absolute top-4 right-4 space-y-2">
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center active:opacity-80">
          <Ionicons name="locate" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center active:opacity-80">
          <Ionicons name="add" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full shadow-lg items-center justify-center active:opacity-80">
          <Ionicons name="remove" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Map Attribution */}
      <View className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded-full">
        <Text className="text-white text-xs">Peta Simulasi • Rumah UMKM</Text>
      </View>
    </View>
  )
}

export default function RumahUMKM() {
  const [selectedUMKM, setSelectedUMKM] = useState<UMKMLocation | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [viewMode, setViewMode] = useState<"map" | "list" | "detail" | "directions">("map")
  const [selectedRoute, setSelectedRoute] = useState<"car" | "walk" | "bike">("car")
  const [activeTab, setActiveTab] = useState<"overview" | "reviews" | "photos" | "products" | "info">("overview")
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false)
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false)

  const sidebarAnim = useRef(new Animated.Value(SCREEN_WIDTH)).current
  const detailScrollViewRef = useRef<ScrollView>(null)

  const filteredUMKM: UMKMLocation[] = SAMPLE_UMKM_DATA.filter((umkm: UMKMLocation) => {
    const matchesSearch =
      !searchQuery ||
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === "all" || umkm.category.toLowerCase().includes(selectedCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  const toggleSidebar = (show: boolean): void => {
    Animated.timing(sidebarAnim, {
      toValue: show ? 0 : SCREEN_WIDTH,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }

  const handleSelectUMKM = (umkm: UMKMLocation): void => {
    console.log("UMKM selected:", umkm.name)
    setSelectedUMKM(umkm)
    setViewMode("detail")
    toggleSidebar(true)
    // Reset scroll position ketika UMKM baru dipilih
    setTimeout(() => {
      detailScrollViewRef.current?.scrollTo({ y: 0, animated: false })
    }, 100)
  }

  const handleBackToList = (): void => {
    toggleSidebar(false)
    setTimeout(() => {
      setViewMode("map")
      setSelectedUMKM(null)
      setActiveTab("overview")
    }, 300)
  }

  const handleStartNavigation = (): void => {
    if (selectedUMKM) {
      setViewMode("directions")
      // Reset scroll position ketika beralih ke directions
      setTimeout(() => {
        detailScrollViewRef.current?.scrollTo({ y: 0, animated: false })
      }, 100)
    }
  }

  const toggleFavorite = (id: string): void => {
    setFavorites((prev) => {
      const updated = new Set(prev)
      if (updated.has(id)) {
        updated.delete(id)
      } else {
        updated.add(id)
      }
      return updated
    })
  }

  const calculateTime = (distance: number, routeType: "car" | "walk" | "bike"): string => {
    const speeds = { car: 40, walk: 5, bike: 15 }
    const hours = distance / speeds[routeType]
    const minutes = Math.round(hours * 60)
    if (minutes < 60) return `${minutes} mnt`
    return `${Math.floor(minutes / 60)} jam ${minutes % 60} mnt`
  }

  const openMapsNavigation = (): void => {
    if (!selectedUMKM) return

    const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedUMKM.lat},${selectedUMKM.lng}&travelmode=${
      selectedRoute === "car" ? "driving" : selectedRoute === "walk" ? "walking" : "bicycling"
    }`

    Linking.openURL(url).catch((err) => console.error("Error opening maps:", err))
  }

  const openPhone = (phone: string): void => {
    Linking.openURL(`tel:${phone}`).catch((err) => console.error("Error opening phone:", err))
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const renderProductCard = (product: Product, index: number) => (
    <TouchableOpacity
      key={product.id}
      className="bg-white rounded-2xl p-4 mb-3 shadow-lg border border-orange-100 active:opacity-80"
      style={{ shadowColor: COLORS.primary, shadowOpacity: 0.1 }}
    >
      <View className="flex-row">
        <Image source={{ uri: product.image }} className="w-20 h-20 rounded-xl" />
        <View className="flex-1 ml-4">
          <Text className="text-base font-bold text-gray-900 mb-1" numberOfLines={2}>
            {product.name}
          </Text>
          <Text className="text-lg font-bold text-orange-600 mb-2">{formatPrice(product.price)}</Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="star" size={16} color="#f59e0b" />
              <Text className="text-sm text-gray-600 ml-1">{product.rating}</Text>
              <Text className="text-sm text-gray-400 ml-2">• Terjual {product.sold}</Text>
            </View>
            <View className="bg-orange-500 px-3 py-1 rounded-full">
              <Text className="text-white text-xs font-semibold">Beli Sekarang</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderUMKMCard = ({ item, index }: { item: UMKMLocation; index: number }) => (
    <TouchableOpacity
      key={item.id}
      className="bg-white rounded-3xl mb-4 shadow-2xl border border-orange-100 active:opacity-80"
      style={{ shadowColor: COLORS.primary, shadowOpacity: 0.15 }}
      onPress={() => handleSelectUMKM(item)}
      activeOpacity={0.7}
    >
      <View className="p-4">
        <View className="flex-row">
          <Image source={{ uri: item.image }} className="w-24 h-24 rounded-2xl" />
          <View className="flex-1 ml-4">
            <View className="flex-row justify-between items-start mb-2">
              <Text className="text-lg font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
                {item.name}
              </Text>
              <TouchableOpacity onPress={() => toggleFavorite(item.id)} className="p-1 active:opacity-70">
                <Ionicons
                  name={favorites.has(item.id) ? "heart" : "heart-outline"}
                  size={22}
                  color={favorites.has(item.id) ? COLORS.primary : "#9CA3AF"}
                />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center">
                <View className="bg-amber-100 px-2 py-1 rounded-full flex-row items-center">
                  <Ionicons name="star" size={14} color="#f59e0b" />
                  <Text className="text-sm font-semibold text-amber-900 ml-1">{item.rating}</Text>
                  <Text className="text-xs text-amber-700 ml-1">({item.reviews})</Text>
                </View>
              </View>
              <View className="bg-orange-100 px-3 py-1 rounded-full">
                <Text className="text-orange-800 text-xs font-semibold">{item.category}</Text>
              </View>
            </View>

            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Ionicons name="navigate" size={16} color={COLORS.primary} />
                <Text className="text-sm text-gray-600 ml-1">{item.distance} km</Text>
              </View>
              <View
                className={`flex-row items-center px-3 py-1 rounded-full ${
                  item.isOpen ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <View className={`w-2 h-2 rounded-full mr-2 ${item.isOpen ? "bg-green-500" : "bg-red-500"}`} />
                <Text className={`text-xs font-semibold ${item.isOpen ? "text-green-700" : "text-red-700"}`}>
                  {item.isOpen ? "Buka Sekarang" : "Tutup"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {item.products.length > 0 && (
          <View className="mt-4 pt-4 border-t border-orange-50">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Produk Unggulan</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: 16 }}
            >
              <View className="flex-row space-x-3">
                {item.products.map((product: Product) => (
                  <View key={product.id} className="flex-row items-center bg-orange-50 px-3 py-2 rounded-full">
                    <Image source={{ uri: product.image }} className="w-6 h-6 rounded" />
                    <Text className="text-xs text-gray-700 ml-2 font-medium" numberOfLines={1}>
                      {product.name}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )

  const renderMapView = () => (
    <View className="flex-1">
      <SimpleMapView umkmData={filteredUMKM} onUMKMSelect={handleSelectUMKM} selectedUMKM={selectedUMKM} />

      <TouchableOpacity
        className="absolute bottom-24 right-6 bg-orange-500 w-14 h-14 rounded-2xl items-center justify-center shadow-2xl active:opacity-80"
        style={{ shadowColor: COLORS.primary }}
        onPress={() => setShowBottomSheet(true)}
      >
        <Ionicons name="list" size={24} color="white" />
      </TouchableOpacity>

      <View className="absolute bottom-6 right-6 space-y-3">
        <TouchableOpacity
          className="bg-white w-12 h-12 rounded-2xl items-center justify-center shadow-lg border border-orange-100 active:opacity-80"
          onPress={() => setShowBottomSheet(true)}
        >
          <Ionicons name="business" size={20} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white w-12 h-12 rounded-2xl items-center justify-center shadow-lg border border-orange-100 active:opacity-80"
          onPress={() => setViewMode("list")}
        >
          <Ionicons name="grid" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  )

  const renderListView = () => (
    <View className="flex-1 bg-white">
      <View className="bg-white rounded-t-3xl pt-6 px-6 flex-1">
        <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-6" />
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-2xl font-bold text-gray-900">{filteredUMKM.length} UMKM</Text>
            <Text className="text-gray-500">Ditemukan di sekitar Anda</Text>
          </View>
          <TouchableOpacity
            className="bg-orange-500 px-4 py-2 rounded-full active:opacity-80"
            onPress={() => setViewMode("map")}
          >
            <Text className="text-white font-semibold text-sm">Tampilkan Peta</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filteredUMKM}
          renderItem={renderUMKMCard}
          keyExtractor={(item: UMKMLocation) => item.id}
          showsVerticalScrollIndicator={false}
          className="flex-1 pb-6"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  )

  const renderDetailView = () => {
    if (!selectedUMKM) return null

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          ref={detailScrollViewRef}
          contentContainerStyle={{ 
            flexGrow: 1,
            paddingBottom: 100 
          }}
          showsVerticalScrollIndicator={true}
          alwaysBounceVertical={true}
          bounces={true}
        >
          {/* Header Image */}


          {/* Title and Verification */}
          <View className="px-6 pt-6 pb-4 bg-white -mt-8 rounded-t-3xl">
            <View className="flex-row justify-between items-start mb-3">
              <Text className="text-2xl font-bold text-gray-900 flex-1 mr-3">{selectedUMKM.name}</Text>
              {selectedUMKM.verified && (
                <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full">
                  <Ionicons name="checkmark-circle" size={16} color="#059669" />
                  <Text className="text-green-700 text-sm font-semibold ml-1">Terverifikasi</Text>
                </View>
              )}
            </View>

            <View className="flex-row items-center flex-wrap">
              <View className="bg-orange-500 px-4 py-2 rounded-full mr-3 mb-2">
                <Text className="text-white text-sm font-semibold">{selectedUMKM.category}</Text>
              </View>
              {selectedUMKM.delivery && (
                <View className="bg-green-500 px-4 py-2 rounded-full mr-3 mb-2">
                  <Text className="text-white text-sm font-semibold">🚗 Delivery</Text>
                </View>
              )}
              <View className="bg-purple-500 px-4 py-2 rounded-full mb-2">
                <Text className="text-white text-sm font-semibold">📅 {selectedUMKM.established}</Text>
              </View>
            </View>
          </View>

          {/* Rating Card */}
          <View className="flex-row justify-between items-center px-6 py-4 bg-orange-50 mx-6 rounded-2xl mt-4">
            <View className="flex-row items-center">
              <View className="bg-amber-500 p-2 rounded-full">
                <Ionicons name="star" size={20} color="white" />
              </View>
              <View className="ml-3">
                <Text className="text-2xl font-bold text-gray-900">{selectedUMKM.rating}</Text>
                <Text className="text-sm text-gray-600">{selectedUMKM.reviews} ulasan</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-white px-4 py-2 rounded-full shadow-sm active:opacity-80">
              <Text className="text-orange-600 font-semibold">Lihat Semua Ulasan</Text>
            </TouchableOpacity>
          </View>


          {/* Tab Navigation */}
          <View className="flex-row border-b border-gray-200 mx-6">
            {(["overview", "products", "info", "reviews", "photos"] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`flex-1 py-4 items-center ${activeTab === tab ? "border-b-2 border-orange-500" : ""}`}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text className={`font-semibold text-sm ${activeTab === tab ? "text-orange-600" : "text-gray-500"}`}>
                  {tab === "products"
                    ? "Produk"
                    : tab === "overview"
                      ? "Overview"
                      : tab === "info"
                        ? "Info Toko"
                        : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Tab Content */}
          <View className="p-6 pb-20">
            {activeTab === "overview" && (
              <View className="space-y-6">
                <Text className="text-gray-600 leading-7 text-base">{selectedUMKM.description}</Text>

                {[
                  {
                    icon: "location" as const,
                    title: "Alamat",
                    content: selectedUMKM.address,
                    subContent: `${selectedUMKM.distance} km dari Anda`,
                    color: COLORS.primary,
                    bgColor: "bg-orange-50",
                    borderColor: "border-orange-200",
                  },
                  {
                    icon: "time" as const,
                    title: "Jam Operasional",
                    content: selectedUMKM.openHours,
                    subContent: selectedUMKM.isOpen ? "Buka sekarang" : "Tutup",
                    color: "#3B82F6",
                    bgColor: "bg-blue-50",
                    borderColor: "border-blue-200",
                  },
                  {
                    icon: "call" as const,
                    title: "Telepon",
                    content: selectedUMKM.phone,
                    subContent: "Klik untuk menghubungi",
                    color: "#10B981",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-200",
                  },
                ].map((info) => (
                  <View key={info.title} className={`rounded-2xl p-4 border ${info.bgColor} ${info.borderColor}`}>
                    <View className="flex-row items-start">
                      <View
                        className="w-12 h-12 rounded-xl items-center justify-center mr-4"
                        style={{ backgroundColor: info.color }}
                      >
                        <Ionicons name={info.icon} size={24} color="white" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-gray-900 text-lg mb-1">{info.title}</Text>
                        <Text className="text-gray-700 text-base mb-1">{info.content}</Text>
                        <Text className="text-orange-600 font-semibold text-sm">{info.subContent}</Text>
                      </View>
                      {info.title === "Telepon" && (
                        <TouchableOpacity onPress={() => openPhone(selectedUMKM.phone)} activeOpacity={0.7}>
                          <Ionicons name="open-outline" size={24} color={info.color} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {activeTab === "products" && (
              <View>
                <View className="flex-row justify-between items-center mb-6">
                  <Text className="text-xl font-bold text-gray-900">Produk ({selectedUMKM.products.length})</Text>
                  <TouchableOpacity className="bg-orange-500 px-4 py-2 rounded-full active:opacity-80">
                    <Text className="text-white font-semibold">Lihat Semua</Text>
                  </TouchableOpacity>
                </View>
                {selectedUMKM.products.length > 0 ? (
                  selectedUMKM.products.map((product: Product, index: number) => renderProductCard(product, index))
                ) : (
                  <View className="items-center justify-center py-12">
                    <Ionicons name="cube-outline" size={64} color="#D1D5DB" />
                    <Text className="text-gray-500 text-lg mt-4 font-medium">Belum ada produk</Text>
                  </View>
                )}
              </View>
            )}

            {activeTab === "info" && (
              <View className="space-y-6">
                <View className="bg-purple-50 rounded-2xl p-6 border border-purple-200">
                  <View className="flex-row items-center">
                    <View className="w-14 h-14 bg-purple-500 rounded-xl items-center justify-center mr-4">
                      <Ionicons name="person" size={28} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-bold text-gray-900 text-lg mb-1">Pemilik</Text>
                      <Text className="text-gray-700 text-base font-medium">{selectedUMKM.owner}</Text>
                      <Text className="text-purple-600 font-semibold text-sm">
                        Berdiri sejak {selectedUMKM.established}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6">
                  <Text className="text-white font-bold text-lg mb-4 text-center">Statistik Toko</Text>
                  <View className="flex-row justify-between">
                    {[
                      { value: selectedUMKM.totalProducts, label: "Produk" },
                      { value: selectedUMKM.rating, label: "Rating" },
                      { value: selectedUMKM.reviews, label: "Ulasan" },
                    ].map((stat) => (
                      <View key={stat.label} className="items-center">
                        <Text className="text-white text-3xl font-bold">{stat.value}</Text>
                        <Text className="text-orange-100 text-sm mt-1">{stat.label}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <Text className="font-bold text-gray-900 text-lg mb-4">Media Sosial</Text>
                  <View className="space-y-3">
                    {Object.entries(selectedUMKM.socialMedia).map(
                      ([platform, handle]) =>
                        handle && (
                          <View
                            key={platform}
                            className="flex-row items-center justify-between bg-white px-4 py-3 rounded-xl"
                          >
                            <View className="flex-row items-center">
                              <Ionicons
                                name={`logo-${platform}` as any}
                                size={20}
                                color={
                                  platform === "instagram"
                                    ? "#E1306C"
                                    : platform === "facebook"
                                      ? "#1877F2"
                                      : platform === "tiktok"
                                        ? "#000000"
                                        : "#6B7280"
                                }
                              />
                              <Text className="text-gray-700 font-medium ml-3 capitalize">{platform}</Text>
                            </View>
                            <Text className="text-gray-500 text-sm">{handle}</Text>
                          </View>
                        ),
                    )}
                  </View>
                </View>
              </View>
            )}

            {activeTab === "reviews" && (
              <View className="items-center justify-center py-12">
                <Ionicons name="chatbubble-ellipses" size={64} color="#D1D5DB" />
                <Text className="text-gray-500 text-lg mt-4 font-medium">Ulasan akan segera hadir</Text>
              </View>
            )}

            {activeTab === "photos" && (
              <View className="flex-row flex-wrap justify-between">
                {selectedUMKM.photos.map((photo: string, index: number) => (
                  <Image key={index} source={{ uri: photo }} className="w-48 h-32 rounded-2xl mb-4" />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    )
  }

  const renderDirectionsView = () => {
    if (!selectedUMKM) return null

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          className="flex-1 bg-white"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        >
          <Text className="text-2xl font-bold text-gray-900 mb-2">Menuju {selectedUMKM.name}</Text>
          <Text className="text-gray-600 mb-8">Pilih moda transportasi yang paling nyaman untuk Anda</Text>

          <View className="flex-row justify-between mb-8">
            {(["car", "walk", "bike"] as const).map((mode) => {
              const icons: Record<string, any> = {
                car: "car-sport",
                walk: "walk",
                bike: "bicycle",
              }

              const labels: Record<string, string> = {
                car: "Mobil",
                walk: "Jalan Kaki",
                bike: "Sepeda",
              }

              return (
                <TouchableOpacity
                  key={mode}
                  className={`flex-1 items-center p-4 mx-2 rounded-2xl border-2 ${
                    selectedRoute === mode ? "border-orange-500 bg-orange-50 shadow-lg" : "border-gray-200 bg-white"
                  }`}
                  onPress={() => setSelectedRoute(mode)}
                  style={{ shadowColor: COLORS.primary }}
                  activeOpacity={0.7}
                >
                  <View
                    className={`w-16 h-16 rounded-full items-center justify-center mb-3 ${
                      selectedRoute === mode ? "bg-orange-500" : "bg-gray-100"
                    }`}
                  >
                    <Ionicons
                      name={icons[mode] as any}
                      size={28}
                      color={selectedRoute === mode ? "white" : "#6b7280"}
                    />
                  </View>
                  <Text className={`font-bold text-sm ${selectedRoute === mode ? "text-orange-600" : "text-gray-600"}`}>
                    {labels[mode]}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">{calculateTime(selectedUMKM.distance, mode)}</Text>
                </TouchableOpacity>
              )
            })}
          </View>

          <View className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 mb-6 shadow-xl">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-orange-100 text-sm font-medium">Jarak Tempuh</Text>
                <Text className="text-white text-3xl font-bold mt-1">{selectedUMKM.distance} km</Text>
              </View>
              <View className="items-end">
                <Text className="text-orange-100 text-sm font-medium">Estimasi Waktu</Text>
                <Text className="text-white text-3xl font-bold mt-1">
                  {calculateTime(selectedUMKM.distance, selectedRoute)}
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg border border-orange-100">
            <View className="flex-row items-center mb-5">
              <View className="w-4 h-4 bg-green-500 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="font-bold text-gray-900">Lokasi Anda</Text>
                <Text className="text-gray-600 text-sm">Titik awal perjalanan</Text>
              </View>
            </View>

            <View className="h-8 w-1 bg-gray-200 ml-1.5 mb-1" />

            <View className="flex-row items-center">
              <View className="w-4 h-4 bg-orange-500 rounded-full mr-4" />
              <View className="flex-1">
                <Text className="font-bold text-gray-900">{selectedUMKM.name}</Text>
                <Text className="text-gray-600 text-sm">{selectedUMKM.address}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="bg-orange-500 rounded-2xl py-5 items-center shadow-2xl active:opacity-80"
            style={{ shadowColor: COLORS.primary }}
            onPress={openMapsNavigation}
          >
            <View className="flex-row items-center">
              <Ionicons name="navigate" size={28} color="white" />
              <Text className="text-white text-xl font-bold ml-3">Mulai Navigasi</Text>
            </View>
          </TouchableOpacity>

          <Text className="text-gray-500 text-center mt-4 text-sm">Akan membuka di Google Maps</Text>
        </ScrollView>
      </View>
    )
  }

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* Main Container */}
      <View className="flex-1">
        <View className="bg-gradient-to-r from-orange-500 to-orange-600 pt-12 pb-4 rounded-b-3xl shadow-2xl">
          <View className="px-6">
            <Text className="text-white text-2xl font-bold mb-1">Rumah UMKM</Text>
            <Text className="text-orange-100 text-base">Temukan UMKM terdekat di sekitar Anda</Text>
          </View>

          <View className="px-6 mt-4">
            <View className="flex-row items-center bg-white rounded-2xl shadow-2xl border border-orange-100">
              <View className="pl-4">
                <Ionicons name="search" size={20} color={COLORS.primary} />
              </View>
              <TextInput
                className="flex-1 px-4 py-4 text-gray-800 text-base"
                placeholder="Cari UMKM terdekat..."
                placeholderTextColor="#9CA3AF"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <TouchableOpacity className="pr-4 active:opacity-70" onPress={() => setShowFilterModal(true)}>
                <Ionicons name="filter" size={20} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-4 px-6"
            contentContainerStyle={{ paddingRight: 24 }}
          >
            {categories.map((category: Category) => (
              <TouchableOpacity
                key={category.id}
                className={`flex-row items-center px-5 py-3 rounded-2xl mr-3 shadow-lg ${
                  selectedCategory === category.id ? "bg-orange-500 shadow-orange-200" : "bg-white shadow-gray-200"
                } active:opacity-80`}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Ionicons
                  name={category.icon as any}
                  size={18}
                  color={selectedCategory === category.id ? "white" : COLORS.primary}
                />
                <Text
                  className={`ml-2 font-semibold ${selectedCategory === category.id ? "text-white" : "text-gray-700"}`}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Main Content */}
        <View className="flex-1">
          {viewMode === "map" && renderMapView()}
          {viewMode === "list" && renderListView()}
        </View>
      </View>

      {/* Sidebar for Detail/Directions */}
      {selectedUMKM && (
        <Animated.View 
          className="absolute top-0 left-0 bottom-0 right-0"
          style={{ 
            transform: [{ translateX: sidebarAnim }],
          }}
        >
          <View className="flex-1 bg-white">
            {/* Back Button */}
            <TouchableOpacity 
              className="absolute top-4 left-4 z-20 bg-white w-12 h-12 rounded-2xl items-center justify-center shadow-lg border border-orange-100 active:opacity-80"
              onPress={handleBackToList}
              style={{ shadowColor: COLORS.primary }}
            >
              <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
            </TouchableOpacity>

            {/* Content */}
            <View className="flex-1 pt-16">
              {viewMode === "detail" && renderDetailView()}
              {viewMode === "directions" && renderDirectionsView()}
            </View>
          </View>
        </Animated.View>
      )}

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Bottom Sheet untuk UMKM Terdekat */}
      <BottomSheet
        isVisible={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
        umkmData={filteredUMKM}
        onUMKMSelect={handleSelectUMKM}
      />
    </View>
  )
}