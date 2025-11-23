// Cartpage.tsx
import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Animated,
  Dimensions,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useCart } from "./hooks/useCart"; // IMPORT USE CART
import { useRouter } from "expo-router";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CartPage() {
  const router = useRouter();
  
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getCartTotal,
    getCartItemsCount 
  } = useCart();

  const [showSummary, setShowSummary] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const openSummary = () => {
    setShowSummary(true);
    Animated.timing(translateY, {
      toValue: 0,
      duration: 380,
      useNativeDriver: true,
    }).start();
  };

  const closeSummary = () => {
    Animated.timing(translateY, {
      toValue: SCREEN_HEIGHT,
      duration: 320,
      useNativeDriver: true,
    }).start(() => setShowSummary(false));
  };

  // Gesture drag ke bawah = close
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationY > 0) {
        translateY.setValue(e.translationY);
      }
    })
    .onEnd((e) => {
      if (e.translationY > 180 || e.velocityY > 1200) {
        closeSummary();
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          friction: 8,
          useNativeDriver: true,
        }).start();
      }
    });

  // Handle quantity changes
  const handleDecreaseQuantity = (itemId: number, currentQty: number) => {
    if (currentQty > 1) {
      updateQuantity(itemId, currentQty - 1);
    } else {
      Alert.alert(
        "Hapus Produk",
        "Apakah kamu yakin ingin menghapus produk ini dari keranjang?",
        [
          { text: "Batal", style: "cancel" },
          { text: "Hapus", onPress: () => removeFromCart(itemId) }
        ]
      );
    }
  };

  const handleIncreaseQuantity = (itemId: number, currentQty: number) => {
    updateQuantity(itemId, currentQty + 1);
  };

  // Handle select/deselect item
  const toggleSelectItem = (itemId: number) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItems.map(item => item.id));
    }
  };

  // Handle clear all
  const handleClearAll = () => {
    if (cartItems.length === 0) return;
    
    Alert.alert(
      "Hapus Semua",
      "Apakah kamu yakin ingin menghapus semua item dari keranjang?",
      [
        { text: "Batal", style: "cancel" },
        { text: "Hapus", onPress: () => clearCart() }
      ]
    );
  };

  // Calculate shipping cost (contoh sederhana)
  const shippingCost = 15000;
  const totalAmount = getCartTotal() + shippingCost;

  // Jika keranjang kosong
  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="cart-outline" size={80} color="#d1d5db" />
          <Text className="text-2xl font-bold text-gray-500 mt-4">Keranjang Kosong</Text>
          <Text className="text-gray-400 text-center mt-2">
            Yuk tambahkan produk favorit kamu ke keranjang belanja
          </Text>
          <TouchableOpacity 
            className="mt-6 bg-orange-500 px-8 py-4 rounded-2xl"
            onPress={() => router.push("/Homepage")}
          >
            <Text className="text-white font-bold text-lg">Jelajahi Produk</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Select All */}
          <View className="bg-white border-b border-gray-200 px-5 py-4 flex-row justify-between items-center">
            <TouchableOpacity 
              className="flex-row items-center gap-3"
              onPress={toggleSelectAll}
            >
              <View className={`w-6 h-6 rounded border-2 ${
                selectedItems.length === cartItems.length 
                  ? "border-orange-500 bg-orange-500" 
                  : "border-gray-400"
              } justify-center items-center`}>
                {selectedItems.length === cartItems.length && (
                  <Ionicons name="checkmark" size={16} color="white" />
                )}
              </View>
              <Text className="font-semibold text-gray-800">
                Pilih Semua ({selectedItems.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClearAll}>
              <Ionicons name="trash-outline" size={22} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Product Cards */}
          {cartItems.map((item) => (
            <View key={item.id} className="bg-white mx-5 mt-4 rounded-2xl border border-gray-200">
              <View className="flex-row p-5">
                <TouchableOpacity onPress={() => toggleSelectItem(item.id)}>
                  <View className={`w-6 h-6 rounded border-2 ${
                    selectedItems.includes(item.id)
                      ? "border-orange-500 bg-orange-500" 
                      : "border-gray-400"
                  } justify-center items-center mr-4 mt-1`}>
                    {selectedItems.includes(item.id) && (
                      <Ionicons name="checkmark" size={16} color="white" />
                    )}
                  </View>
                </TouchableOpacity>

                <View className="relative">
                  <Image
                    source={{ uri: item.image }}
                    className="w-24 h-24 rounded-xl"
                  />
                  <View className="absolute -top-2 -left-2 bg-red-500 px-2 py-1 rounded-lg">
                    <Text className="text-white text-xs font-bold">HOT</Text>
                  </View>
                </View>

                <View className="flex-1 ml-4">
                  <Text className="font-bold text-gray-900 text-base leading-5">
                    {item.name}
                  </Text>
                  <Text className="text-gray-500 text-sm mt-1">250g • {item.seller}</Text>
                  <View className="flex-row items-center mt-2">
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text className="ml-1 text-sm font-semibold text-gray-800">{item.rating}</Text>
                  </View>

                  <View className="mt-3">
                    <Text className="text-2xl font-bold text-orange-600">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </Text>
                    <Text className="text-gray-500 text-sm">
                      Rp {item.price.toLocaleString("id-ID")} x {item.quantity}
                    </Text>
                  </View>

                  <View className="flex-row items-center mt-5 bg-gray-100 rounded-full px-4 py-2 w-36 justify-between">
                    <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id, item.quantity)}>
                      <Text className="text-xl font-bold text-gray-600">-</Text>
                    </TouchableOpacity>
                    <Text className="font-bold text-gray-800 text-base">{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id, item.quantity)}>
                      <Text className="text-xl font-bold text-orange-600">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="#FF571A" />
                </TouchableOpacity>
              </View>

              {/* Subtotal per item */}
              <View className="border-t border-gray-200 px-5 py-4 bg-gray-50">
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-600 font-medium">Subtotal</Text>
                  <Text className="text-xl font-bold text-orange-600">
                    Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Bottom Bar */}
        <View className="bg-white border-t border-gray-200">
          <TouchableOpacity
            onPress={openSummary}
            className="px-5 py-4 border-b border-gray-200 flex-row justify-between items-center"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="receipt-outline" size={22} color="#FF571A" />
              <Text className="font-bold text-gray-800">
                Ringkasan ({getCartItemsCount()} item)
              </Text>
            </View>
            <Ionicons name="chevron-up" size={22} color="#999" />
          </TouchableOpacity>

          <View className="px-5 py-4 flex-row justify-between items-center">
            <View>
              <Text className="text-gray-500 text-sm">Total Bayar</Text>
              <Text className="text-2xl font-bold text-orange-600">
                Rp {totalAmount.toLocaleString("id-ID")}
              </Text>
            </View>
            <TouchableOpacity>
              <LinearGradient colors={["#FF7733", "#FF571A"]} className="px-8 py-4 rounded-2xl flex-row items-center gap-3">
                <Ionicons name="checkmark-circle-outline" size={24} color="white" />
                <Text className="text-white font-bold text-lg">Checkout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ringkasan Modal */}
        <Modal visible={showSummary} transparent animationType="none" onRequestClose={closeSummary}>
          <View className="flex-1 bg-black/40">
            <TouchableOpacity activeOpacity={1} onPress={closeSummary} className="flex-1" />
          </View>

          <GestureDetector gesture={panGesture}>
            <Animated.View
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                transform: [{ translateY }],
              }}
              className="bg-white rounded-t-3xl shadow-2xl"
            >
              <View className="bg-white px-6 pb-12 rounded-t-3xl">
                {/* Drag */}
                <View className="bg-white items-center pt-4 pb-3">
                  <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </View>

                {/* Header */}
                <View className="flex-row items-center justify-between mb-9">
                  <View className="flex-row items-center gap-4">
                    <Ionicons name="receipt-outline" size={48} color="#FF571A" />
                    <Text className="text-xl font-bold text-gray-900">
                      Ringkasan ({getCartItemsCount()} item)
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-2xl font-bold text-orange-600 -mt-1">
                      Rp {getCartTotal().toLocaleString("id-ID")}
                    </Text>
                  </View>
                </View>

                {/* Kode Promo */}
                <Text className="text-base font-semibold text-gray-700 mb-3">Kode Promo</Text>
                <View className="flex-row items-center gap-4 mb-6">
                  <View className="flex-1 bg-white border-2 border-gray-300 rounded-xl px-6 py-3">
                    <TextInput
                      placeholder="Masukkan kode"
                      value={promoCode}
                      onChangeText={setPromoCode}
                      placeholderTextColor="#aaa"
                      className="text-gray-800 text-base"
                    />
                  </View>
                  <TouchableOpacity>
                    <LinearGradient
                      colors={["#FFD8B8", "#FFB399"]}
                      className="px-11 py-3 rounded-xl shadow-sm"
                    >
                      <Text className="text-orange-700 font-bold text-base">Pakai</Text>
                    </LinearGradient>    
                  </TouchableOpacity>
                </View>

                {/* Tag Promo */}
                <View className="flex-row flex-wrap gap-4 mb-10">
                  {["UMKM10", "NEWUSER", "GRATIS20"].map((tag) => (
                    <TouchableOpacity key={tag} onPress={() => setPromoCode(tag)}>
                      <View className="bg-white border-2 border-gray-300 px-6 py-4 rounded-xl">
                        <Text className="text-gray-700 font-semibold text-base">{tag}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Detail Harga */}
                <View className="space-y-6">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600 text-base">Subtotal</Text>
                    <Text className="font-bold text-gray-900 text-base">
                      Rp {getCartTotal().toLocaleString("id-ID")}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600 text-base">Ongkir</Text>
                    <Text className="font-bold text-gray-900 text-base">
                      Rp {shippingCost.toLocaleString("id-ID")}
                    </Text>
                  </View>

                  <View className="flex-row justify-between border-t border-gray-200 pt-4">
                    <Text className="text-lg font-bold text-gray-900">Total</Text>
                    <Text className="text-2xl font-bold text-orange-600">
                      Rp {totalAmount.toLocaleString("id-ID")}
                    </Text>
                  </View>

                  <View className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex-row items-center gap-4">
                    <Ionicons name="cart-outline" size={24} color="#3B82F6" />
                    <Text className="text-blue-700 text-base font-medium flex-1">
                      Belanja Rp {(100000 - getCartTotal()).toLocaleString("id-ID")} lagi gratis ongkir!
                    </Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </GestureDetector>
        </Modal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}