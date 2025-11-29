import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-4">
        {/* Section Upload Foto */}
        <View className="p-5 border border-gray-300 rounded-xl shadow-lg mb-5">
          <View className="flex-row items-center">
            <View className="flex-shrink-0">
              <Image
                source={require("../assets/images/Profile.jpg")}
                className="max-w-16 max-h-16 rounded-full border-2 border-indigo-100"
              />
            </View>
            <View className="flex-1 ml-4">
              <Text className="font-bold text-lg">Upload Foto Baru</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Minimal 800×800 px. Format JPG atau PNG.
              </Text>
            </View>
          </View>
        </View>

        {/* Follow & Follower */}
        <View className="p-5 border border-gray-300 rounded-xl shadow-lg mb-5">
          <Text className="font-bold text-lg mb-5">Follow & Follower</Text>
          <View className="flex-row justify-between">
            <View className="flex-1 items-center p-5 bg-blue-50 rounded-xl mr-3">
              <Text className="text-3xl font-bold text-blue-600">125</Text>
              <Text className="text-sm text-gray-600 mt-1 font-medium">Following</Text>
            </View>
            <View className="flex-1 items-center p-5 bg-blue-50 rounded-xl ml-3">
              <Text className="text-3xl font-bold text-blue-600">247</Text>
              <Text className="text-sm text-gray-600 mt-1 font-medium">Follower</Text>
            </View>
          </View>
        </View>

        {/* Informasi Pribadi */}
        <View className="p-5 border border-gray-300 rounded-xl shadow-lg mb-5">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="font-bold text-lg">Informasi Pribadi</Text>
            <TouchableOpacity>
              <Text className="text-orange-500 text-base font-semibold">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-4">
            <View>
              <Text className="text-gray-500 font-medium text-sm mb-1">Nama Panggilan</Text>
              <Text className="text-base">The Ashen Witch</Text>
            </View>
            <View>
              <Text className="text-gray-500 font-medium text-sm mb-1">Nama Lengkap</Text>
              <Text className="text-base">Elaina</Text>
            </View>
            <View>
              <Text className="text-gray-500 font-medium text-sm mb-1">Email</Text>
              <Text className="text-base">Elaina@gmail.com</Text>
            </View>
            <View>
              <Text className="text-gray-500 font-medium text-sm mb-1">Alamat</Text>
              <Text className="text-base text-gray-400">-</Text>
            </View>
          </View>
        </View>

        {/* Deskripsi */}
        <View className="p-5 border border-gray-300 rounded-xl shadow-lg mb-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-lg">Deskripsi</Text>
            <TouchableOpacity>
              <Text className="text-orange-500 text-base font-semibold">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center py-4 px-4 border border-dashed border-gray-300 rounded-lg">
            <Text className="text-gray-500 text-sm flex-1">
              Belum ada deskripsi. Klik Edit untuk menambahkan.
            </Text>
          </View>
        </View>

        {/* Alamat */}
        <View className="p-5 border border-gray-200 rounded-2xl shadow-sm">
        <View className="flex-row justify-between items-center mb-6">
            <View>
            <Text className="font-bold text-xl text-gray-900">Alamat Pengiriman</Text>
            <Text className="text-sm text-gray-500 mt-1">Kelola alamat pengiriman Anda</Text>
            </View>
            <TouchableOpacity className="px-4 py-2 bg-orange-50 rounded-full">
            <Text className="text-orange-500 text-sm font-semibold">Kelola</Text>
            </TouchableOpacity>
        </View>

        {/* Daftar Alamat */}
        <View className="space-y-4">
            <View className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center">
                <View className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-1" />
                <Text className="font-semibold text-base text-gray-900">Alamat Rumah</Text>
                <View className="ml-3 px-2.5 py-1 bg-orange-100 rounded-full">
                    <Text className="text-orange-600 text-xs font-medium">Alamat Utama</Text>
                </View>
                </View>
                <View className="flex-row items-center space-x-3">
                <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                    <Text className="text-gray-600 text-lg">✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center">
                    <Text className="text-gray-500 text-lg">×</Text>
                </TouchableOpacity>
                </View>
            </View>

            <View className="space-y-2">
                <Text className="text-base font-semibold text-gray-900">Elaina</Text>
                <View className="flex-row items-center space-x-3">
                <Text className="text-gray-500 text-sm">📞</Text>
                <Text className="text-sm text-gray-700">+62 883 321 2321</Text>
                </View>
                <View className="flex-row items-start space-x-3">
                <Text className="text-gray-500 text-sm mt-0.5">📍</Text>
                <View className="flex-1">
                    <Text className="text-sm text-gray-700">Jl. Pekapuran</Text>
                    <Text className="text-sm text-gray-600">Depok, Jawa Barat 16330</Text>
                </View>
                </View>
            </View>
            </View>
        </View>

        {/* Tombol Tambah Alamat */}
        <View className="mt-6">
            <TouchableOpacity className="flex-row items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 py-4 rounded-2xl shadow-lg">
            <Text className="text-white font-semibold text-base">Tambah Alamat Baru</Text>
            </TouchableOpacity>
        </View>
        </View>      
    </ScrollView>
    </SafeAreaView>
  );
}