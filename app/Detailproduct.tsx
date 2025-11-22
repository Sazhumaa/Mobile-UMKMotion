import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, FlatList } from "react-native";
import dataProduk from "./data/product";

export default function Detailproduk() {
  const params = useLocalSearchParams();
  const router = useRouter();
  
  const { id, name, image, price, rating, sold, desc, storeRating, totalReviews, responseRate } = params;
  const rekomendasi = dataProduk
    .filter( item => item.id !==Number(id) )
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);
  
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
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: 12 }}
              contentContainerStyle={{ paddingVertical: 4, paddingLeft: 2 }}
            >
              {rekomendasi.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.92}
                  onPress={() =>
                    router.push({ pathname: "/Detailproduct", params: { ...item } })
                  }
                  className="w-44 mr-4 bg-white rounded-2xl p-3 overflow-hidden relative shadow-md"
                >
                  <View className="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-full z-10">
                    <Text className="text-xs font-bold text-white">HOT</Text>
                  </View>

                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: 150 }}
                    className="rounded-lg bg-gray-200"
                    resizeMode="cover"
                  />

                  <Text
                    numberOfLines={2}
                    className="font-bold text-sm text-gray-800 mt-3"
                  >
                    {item.name}
                  </Text>

                  <Text className="text-orange-500 font-extrabold text-base mt-1 font-bold">
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </Text>

                  <View className="flex-row items-center mt-2">
                    <Text className="text-yellow-400 font-bold mr-2">⭐{item.rating} </Text>
                    <Text className="text-gray-500 text-xs">{item.sold}  •  terjual</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
