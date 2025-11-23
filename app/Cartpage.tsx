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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function CartPage() {
  const [showSummary, setShowSummary] = useState(false);
  const [promoCode, setPromoCode] = useState("");

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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-gray-50">

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Select All */}
          <View className="bg-white border-b border-gray-200 px-5 py-4 flex-row justify-between items-center">
            <TouchableOpacity className="flex-row items-center gap-3">
              <View className="w-6 h-6 rounded border-2 border-orange-500 bg-orange-500 justify-center items-center">
                <Ionicons name="checkmark" size={16} color="white" />
              </View>
              <Text className="font-semibold text-gray-800">Pilih Semua (1)</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="trash-outline" size={22} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Product Card + Subtotal */}
          <View className="bg-white mx-5 mt-4 rounded-2xl border border-gray-200">
            <View className="flex-row p-5">
              <TouchableOpacity>
                <View className="w-6 h-6 rounded border-2 border-orange-500 bg-orange-500 justify-center items-center mr-4 mt-1">
                  <Ionicons name="checkmark" size={16} color="white" />
                </View>
              </TouchableOpacity>

              <View className="relative">
                <Image
                  source={{ uri: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fid.pinterest.com%2Fclaracristabel18%2Fzani%2F&psig=AOvVaw1Omrhz5YXODzivZxsmIvkd&ust=1763974238671000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCOin7KLyh5EDFQAAAAAdAAAAABAE" }}
                  className="w-24 h-24 rounded-xl"
                />
                <View className="absolute -top-2 -left-2 bg-red-500 px-2 py-1 rounded-lg">
                  <Text className="text-white text-xs font-bold">15%</Text>
                </View>
              </View>

              <View className="flex-1 ml-4">
                <Text className="font-bold text-gray-900 text-base leading-5">
                  Rendang Padang Asli Daging Sapi
                </Text>
                <Text className="text-gray-500 text-sm mt-1">250g • Nusantara Rasa</Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text className="ml-1 text-sm font-semibold text-gray-800">4.9</Text>
                </View>

                <View className="mt-3">
                  <Text className="text-gray-400 line-through text-sm">Rp 85.000</Text>
                  <Text className="text-2xl font-bold text-orange-600">Rp 72.250</Text>
                </View>

                <View className="flex-row items-center mt-5 bg-gray-100 rounded-full px-4 py-2 w-36 justify-between">
                  <TouchableOpacity><Text className="text-xl font-bold text-gray-600">-</Text></TouchableOpacity>
                  <Text className="font-bold text-gray-800 text-base">1</Text>
                  <TouchableOpacity><Text className="text-xl font-bold text-orange-600">+</Text></TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity className="ml-3">
                <Ionicons name="trash-outline" size={22} color="#FF571A" />
              </TouchableOpacity>
            </View>

            {/* Subtotal di dalam card */}
            <View className="border-t border-gray-200 px-5 py-4 bg-gray-50">
              <View className="flex-row justify-between items-center">
                <Text className="text-gray-600 font-medium">Subtotal</Text>
                <Text className="text-xl font-bold text-orange-600">Rp 72.250</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Bar */}
        <View className="bg-white border-t border-gray-200">
          <TouchableOpacity
            onPress={openSummary}
            className="px-5 py-4 border-b border-gray-200 flex-row justify-between items-center"
          >
            <View className="flex-row items-center gap-3">
              <Ionicons name="receipt-outline" size={22} color="#FF571A" />
              <Text className="font-bold text-gray-800">Ringkasan (1 item)</Text>
            </View>
            <Ionicons name="chevron-up" size={22} color="#999" />
          </TouchableOpacity>

          <View className="px-5 py-4 flex-row justify-between items-center">
            <View>
              <Text className="text-gray-500 text-sm">Total Bayar</Text>
              <Text className="text-2xl font-bold text-orange-600">Rp 87.250</Text>
            </View>
            <TouchableOpacity>
              <LinearGradient colors={["#FF7733", "#FF571A"]} className="px-8 py-4 rounded-2xl flex-row items-center gap-3">
                <Ionicons name="checkmark-circle-outline" size={24} color="white" />
                <Text className="text-white font-bold text-lg">Checkout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ringkuasan Modal */}
        <Modal visible={showSummary} transparent animationType="none" onRequestClose={closeSummary}>
          {/* Overlay blur */}
          <View className="flex-1 bg-black/40">
            <TouchableOpacity activeOpacity={1} onPress={closeSummary} className="flex-1" />
          </View>

          {/* Bottom Sheet dengan Gesture */}
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
              {/* Konten utama */}
              <View className="bg-white px-6 pb-12 rounded-t-3xl">
                {/* Drag */}
                <View className="bg-white items-center pt-4 pb-3">
                  <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
                </View>

                {/* Header */}
                <View className="flex-row items-center justify-between mb-9">
                  <View className="flex-row items-center gap-4">
                    <Ionicons name="receipt-outline" size={48} color="#FF571A" />
                    <Text className="text-xl font-bold text-gray-900">Ringkasan (1 item)</Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-sm text-gray-500 line-through">Rp 85.000</Text>
                    <Text className="text-2xl font-bold text-orange-600 -mt-1">Rp 72.250</Text>
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
                    <Text className="font-bold text-gray-900 text-base">Rp 72.250</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600 text-base">Ongkir</Text>
                    <Text className="font-bold text-gray-900 text-base">Rp 15.000</Text>
                  </View>

                  <View className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex-row items-center gap-4">
                    <Ionicons name="cart-outline" size={24} color="#3B82F6" />
                    <Text className="text-blue-700 text-base font-medium flex-1">
                      Belanja Rp 27.750 lagi gratis ongkir!
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

//moal balegg