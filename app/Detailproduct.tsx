import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";

export default function Detailproduk() {
  const params = useLocalSearchParams();
  const { id, name, price, rating, sold, image } = params;

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
