import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity  } from "react-native";

export default function Detailproduk() {
  const params = useLocalSearchParams();
  const { id, name, price, rating, sold, image, desc, storeRating, totalReviews,responseRate } = params;

  return (
    <ScrollView style={{ padding: 24, backgroundColor: "#f9fafb" }}>
      <Image
        source={{
          uri: (image as string) || "https://via.placeholder.com/400x300?text=No+Image",
        }}
        style={{
          width: "100%",
          height: 300,
          borderRadius: 20,
          backgroundColor: "#e5e7eb",
        }}
        resizeMode="cover"
      />

      <Text style={{ fontSize: 24, fontWeight: "bold", marginTop: 20 }}>
        {name}
      </Text>

      <Text
        style={{
          fontSize: 30,
          fontWeight: "900",
          color: "#f97316",
          marginTop: 10,
        }}
      >
        Rp {Number(price).toLocaleString("id-ID")}
      </Text>

      <Text style={{ marginTop: 10, fontSize: 16, color: "#6b7280" }}>
        ⭐ {rating} • {sold} terjual
      </Text>
      
      <View className="mt-6 bg-gray-500/10 p-4 rounded-lg">
        <Text className="font-bold text-lg mb-2">
          Detail Produk
        </Text>
        
        <Text>
          {desc}
        </Text>
      </View>

      <View className="mt-6 flex-row items-center gap-4">
        <Text className="font-bold text-lg">Qty</Text>

        <TouchableOpacity className="w-10 h-10 rounded-full border-2 border-black/30 items-center justify-center bg-white">
          <Text className="text-xl font-bold">-</Text>
        </TouchableOpacity>

        <TextInput 
          className="bg-white p-2 rounded-lg w-14 text-center text-lg border"
          value="1"
          keyboardType="numeric"
        />

        <TouchableOpacity className="w-10 h-10 rounded-full border-2 border-black/30 items-center justify-center bg-white">
          <Text className="text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
      
      <View className="mt-6 flex-row gap-4">
        <View className="flex-1 bg-orange-500 p-4 rounded-lg items-center">
          <TouchableOpacity className="font-bold text-white">
            Beli Sekarang
          </TouchableOpacity>
        </View>
        
        <View className="border-2 border-black/60 rounded-lg items-center">
          <TouchableOpacity className="font-bold bg-white p-4 rounded-lg items-center ">
            Tambah Kekranjang 🛒
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="mt-6">
        <View className="rounded-2xl p-6 border border-black/20 bg-white">
          <View className="flex-row items-center justify-between">
            <View>
            <Text className="font-bold text-lg">Nusantara Rasa</Text>
            <Text className="text-gray-600">Aktif beberapa menit lalu</Text>
            </View>

            <TouchableOpacity className="bg-orange-500 px-6 py-4 rounded-lg">
              <Text className="text-white font-semibold">Lihat Toko  🏬</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row justify-between mt-6 px-2">
            <View className="items-center flex-1">
              <Text className="text-gray-700 text-base font-semibold">⭐ {storeRating}</Text>
              <Text className="text-gray-500 text-sm">Rating Toko</Text>
            </View>

            <View className="items-center flex-1">
              <Text className="text-gray-700 text-base font-semibold">{totalReviews}+</Text>
              <Text className="text-gray-500 text-sm">Total Review</Text>
            </View>

            <View className="items-center flex-1">
              <Text className="text-gray-700 text-base font-semibold">{responseRate}</Text>
              <Text className="text-gray-500 text-sm">Response Rate</Text>
            </View>
          </View>
        </View>
        
        <View className="mt-6">
          <Text className="font-bold text-xl">Rekomendasi Produk</Text>
          
          <View>
            
          </View>
        </View>
      </View>


      <View
        style={{
          marginTop: 24,
          padding: 12,
          backgroundColor: "#f3f4f6",
          borderRadius: 12,
        }}
      >
      </View>
    </ScrollView>
  );
}
