import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Homepage() {
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Fashion" },
    { id: 3, name: "Home" },
    { id: 4, name: "Sports" },
    { id: 5, name: "Gaming" },
    { id: 6, name: "Beauty" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">

        <Text className="text-lg font-semibold mb-3">Kategori</Text>

        {/* Horizontal Scroll - Web Friendly */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ columnGap: 10 }}
        >
          {categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-blue-500 px-4 py-2 rounded-xl"
              activeOpacity={0.7}
            >
              <Text className="text-white font-medium">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}
