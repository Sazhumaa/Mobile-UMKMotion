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

import { useFavorites } from "../hooks/useFavorites";
import { useCart } from "../hooks/useCart";

export default function Konsultan() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { favorites } = useFavorites();
  const { getCartItemsCount } = useCart();

  // Data sementara konsultan (nanti bisa diganti dari API atau file data)
  const konsultanList = [
    {
      id: 1,
      name: "Elaina",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.98,
      totalUlasan: 428,
      lokasi: "Jakarta Selatan",
      spesialis: "Spesialis Pemasaran Digital",
      pengalaman: "15 tahun",
      totalKlien: 312,
      totalJamKonsultasi: "2.150+ jam",
      kepuasan: 98,        // % untuk progress bar
      kecepatanRespons: "Respons < 15 menit",
      kepercayaan: 99,     // % (bisa dari repeat client atau rekomendasi)
      harga: "Rp 150.000 / sesi",
    },
    {
      id: 2,
      name: "Kazuma",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.92,
      totalUlasan: 256,
      lokasi: "Bandung",
      spesialis: "Spesialis Manajemen Keuangan",
      pengalaman: "5 tahun",
      totalKlien: 189,
      totalJamKonsultasi: "980+ jam",
      kepuasan: 96,
      kecepatanRespons: "Respons < 30 menit",
      kepercayaan: 97,
      harga: "Rp 200.000 / sesi",
    },
    {
      id: 3,
      name: "Aqua",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.75,
      totalUlasan: 189,
      lokasi: "Surabaya",
      spesialis: "Spesialis Branding & Desain",
      pengalaman: "8 tahun",
      totalKlien: 156,
      totalJamKonsultasi: "1.420+ jam",
      kepuasan: 94,
      kecepatanRespons: "Respons < 1 jam",
      kepercayaan: 93,
      harga: "Rp 180.000 / sesi",
    },
    {
      id: 4,
      name: "Megumin",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.88,
      totalUlasan: 312,
      lokasi: "Yogyakarta",
      spesialis: "Spesialis Konten Kreator",
      pengalaman: "4 tahun",
      totalKlien: 278,
      totalJamKonsultasi: "1.105+ jam",
      kepuasan: 97,
      kecepatanRespons: "Respons < 10 menit",
      kepercayaan: 98,
      harga: "Rp 170.000 / sesi",
    },
    {
      id: 5,
      name: "Darkness",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.65,
      totalUlasan: 145,
      lokasi: "Medan",
      spesialis: "Spesialis Operasional & Logistik",
      pengalaman: "10 tahun",
      totalKlien: 98,
      totalJamKonsultasi: "1.680+ jam",
      kepuasan: 91,
      kecepatanRespons: "Respons < 2 jam",
      kepercayaan: 90,
      harga: "Rp 190.000 / sesi",
    },
    {
      id: 6,
      name: "Yunyun",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.94,
      totalUlasan: 267,
      lokasi: "Bali",
      spesialis: "Spesialis HR & Pengembangan Tim",
      pengalaman: "6 tahun",
      totalKlien: 201,
      totalJamKonsultasi: "1.350+ jam",
      kepuasan: 97,
      kecepatanRespons: "Respons < 20 menit",
      kepercayaan: 98,
      harga: "Rp 160.000 / sesi",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="bg-white px-6 pt-4 pb-6 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-4">
              <Image
                source={require("../../assets/images/Profile.jpg")}
                className="max-w-14 max-h-14 rounded-full border-2 border-indigo-100"
              />
              <View>
                <Text className="text-2xl font-bold text-gray-800">
                  Halo, Elaina!
                </Text>
                <Text className="text-gray-500">
                  Selamat berbelanja lagi bro
                </Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              {/* Favorite */}
              <TouchableOpacity
                className="relative"
                onPress={() => router.push("/Favorites")}
              >
                <Ionicons name="heart-outline" size={28} color="#1f2937" />
                {favorites.length > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
                    <Text className="text-white text-xs font-bold">
                      {favorites.length}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Cart */}
              <TouchableOpacity
                className="relative"
                onPress={() => router.push("/Cartpage")}
              >
                <Ionicons name="cart-outline" size={28} color="#1f2937" />
                {getCartItemsCount() > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
                    <Text className="text-white text-xs font-bold">
                      {getCartItemsCount() > 99 ? "99+" : getCartItemsCount()}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View className="px-6 mt-4">
          {/* Banner Tim Ahli */}
          <View className="bg-orange-400 items-center justify-center py-3 px-6 rounded-xl">
            <Text className="text-white font-bold text-lg">
              Tim Ahli Kami
            </Text>
          </View>

          {/* Judul */}
          <View className="mt-8 items-center">
            <Text className="text-2xl font-bold text-gray-800">
              Konsultan UMKM{" "}
              <Text className="text-orange-500">Profesional</Text>
            </Text>
            <Text className="text-center text-gray-600 mt-3 px-4">
              Pilih konsultan yang paling cocok untuk masalah Anda. Chat dulu,
              atau langsung booking sesi.
            </Text>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center rounded-xl px-4 py-3 border-2 border-orange-300 mt-8 bg-white">
            <Ionicons
              name="search"
              size={22}
              color={search ? "#f97316" : "#9ca3af"}
            />
            <TextInput
              className="ml-3 flex-1 text-base text-gray-800"
              placeholder="Cari konsultan atau keahlian..."
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

          {/* Filter (placeholder) */}
          <View className="mt-4">
            <TouchableOpacity className="items-center rounded-xl py-3 border-2 border-orange-300">
              <Text className="text-orange-600 font-semibold">Filter</Text>
            </TouchableOpacity>
          </View>

          {/* Daftar Konsultan */}
          <View className="mt-8 mb-10">
            <Text className="text-gray-700 font-medium">
              Menampilkan {konsultanList.length} dari {konsultanList.length} konsultan
            </Text>

            <View className="mt-6 space-y-5 mb-10">
              {konsultanList.map((konsultan) => (
                <View
                  key={konsultan.id}
                  className="border border-orange-600 rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  {/* Foto + Nama + Spesialis + Icon */}
                  <View className="p-5 flex-row items-center">
                    <Image
                      source={require("../../assets/images/Profile.jpg")}
                      className="max-w-16 max-h-16 rounded-xl border-2 border-indigo-100"
                    />

                    <View className="ml-4 flex-1">
                      <Text className="text-lg font-bold text-gray-800">
                        {konsultan.name}
                      </Text>
                      <Text className="text-gray-500 text-sm">
                        {konsultan.spesialis}
                      </Text>
                      <Text className="text-orange-500 font-bold mt-2">
                        {konsultan.harga}
                      </Text>
                    </View>

                    {/* Icon Favorit & Bookmark */}
                    <View className="flex-row gap-3">
                      <TouchableOpacity className="p-2 border border-gray-300 rounded-xl">
                        <Ionicons name="heart-outline" size={26} color="#1f2937" />
                      </TouchableOpacity>
                      <TouchableOpacity className="p-2 border border-gray-300 rounded-xl">
                        <Ionicons name="bookmark-outline" size={26} color="#1f2937" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Rating + Pengalaman */}
                  <View className="flex-row justify-between items-center px-5 mb-3">
                    <View className="flex-row items-center bg-orange-50 border border-orange-200 rounded-lg py-2 px-4">
                      <Ionicons name="star" size={18} color="#f59e0b" />
                      <Text className="ml-2 font-bold text-orange-700">
                        {konsultan.rating}
                      </Text>
                      <Text className="ml-1 text-xs text-orange-600">({konsultan.totalUlasan})</Text>
                    </View>

                    <View className="flex-row items-center">
                      <Ionicons name="briefcase-outline" size={18} color="#6b7280" />
                      <Text className="ml-2 font-semibold text-gray-700">
                        {konsultan.pengalaman}
                      </Text>
                    </View>
                  </View>

                  {/* Total Klien + Respons Cepat */}
                  <View className="flex-row justify-between items-center px-5 mb-3">
                    <View className="flex-row items-center bg-blue-50 border border-blue-200 rounded-lg py-2 px-4">
                      <Ionicons name="people-outline" size={18} color="#2563eb" />
                      <Text className="ml-2 font-bold text-blue-700">
                        {konsultan.totalKlien}+ Klien
                      </Text>
                    </View>

                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={18} color="#16a34a" />
                      <Text className="ml-2 font-semibold text-green-700">
                        {konsultan.kecepatanRespons}
                      </Text>
                    </View>
                  </View>

                  {/* Lokasi */}
                  <View className="flex-row justify-between items-center px-5 mb-4">
                    <View className="flex-row items-center">
                      <Ionicons name="location-outline" size={18} color="#ef4444" />
                      <Text className="ml-2 text-gray-600 font-medium">
                        {konsultan.lokasi}
                      </Text>
                    </View>

                    <Text className="text-xs text-gray-500">
                      {konsultan.totalJamKonsultasi} konsultasi
                    </Text>
                  </View>

                  {/* Tombol Chat & Detail */}
                  <View className="px-5 py-5 ">
                    <View className="flex-row space-x-3">
                      <TouchableOpacity className="flex-1 bg-orange-500 py-4 rounded-xl items-center">
                        <Text className="text-white font-bold text-base">Chat Sekarang</Text>
                      </TouchableOpacity>

                      <TouchableOpacity className="flex-1 border-2 border-orange-500 py-4 rounded-xl items-center bg-white">
                        <Text className="text-orange-500 font-bold text-base">Lihat Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}