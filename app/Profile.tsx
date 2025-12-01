import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-4">
        {/* Section Upload Foto */}
        <View className="p-5 border border-gray-200 rounded-2xl shadow-sm mb-6">
          <View className="flex-row items-center">
            <View className="flex-shrink-0">
              <Image
                source={require("../assets/images/Profile.jpg")}
                className="max-w-20 max-h-20 rounded-full border-2 border-gray-200"
              />
            </View>
            <View className="flex-1 ml-4">
              <Text className="font-bold text-lg text-gray-900">Upload Foto Profil</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Minimal 800×800 px. Format JPG atau PNG.
              </Text>
            </View>
          </View>
        </View>

        {/* Follow & Follower */}
        <View className="p-5 border border-gray-200 rounded-2xl shadow-sm mb-6">
          <Text className="font-bold text-lg text-gray-900 mb-6">Follow & Follower</Text>
          <View className="flex-row justify-between">
            <View className="flex-1 items-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl mr-4">
              <Text className="text-3xl font-bold text-blue-600">125</Text>
              <Text className="text-sm text-gray-700 font-medium mt-1">Following</Text>
            </View>
            <View className="flex-1 items-center p-6 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-2xl ml-4">
              <Text className="text-3xl font-bold text-blue-600">247</Text>
              <Text className="text-sm text-gray-700 font-medium mt-1">Follower</Text>
            </View>
          </View>
        </View>

        {/* Informasi Pribadi */}
        <View className="p-5 border border-gray-200 rounded-2xl shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-bold text-lg text-gray-900">Informasi Pribadi</Text>
            <TouchableOpacity className="px-4 py-2 bg-orange-50 rounded-full">
              <Text className="text-orange-500 text-sm font-semibold">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="space-y-5">
            <View>
              <Text className="text-gray-600 font-medium text-sm mb-2">Nama Panggilan</Text>
              <Text className="text-base font-semibold text-gray-900">The Ashen Witch</Text>
            </View>
            <View>
              <Text className="text-gray-600 font-medium text-sm mb-2">Nama Lengkap</Text>
              <Text className="text-base font-semibold text-gray-900">Elaina</Text>
            </View>
            <View>
              <Text className="text-gray-600 font-medium text-sm mb-2">Email</Text>
              <Text className="text-base text-gray-900">Elaina@gmail.com</Text>
            </View>
            <View>
              <Text className="text-gray-600 font-medium text-sm mb-2">Alamat</Text>
              <Text className="text-base text-gray-400">-</Text>
            </View>
          </View>
        </View>

        {/* Deskripsi */}
        <View className="p-5 border border-gray-200 rounded-2xl shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-5">
            <Text className="font-bold text-lg text-gray-900">Deskripsi</Text>
            <TouchableOpacity className="px-4 py-2 bg-orange-50 rounded-full">
              <Text className="text-orange-500 text-sm font-semibold">Edit</Text>
            </TouchableOpacity>
          </View>
          <View className="py-6 px-5 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
            <Text className="text-center text-gray-500 text-sm">
              Belum ada deskripsi. Klik Edit untuk menambahkan deskripsi profil Anda.
            </Text>
          </View>
        </View>

        {/* Alamat */}
        <View className="p-5 border border-gray-200 rounded-2xl shadow-sm">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="font-bold text-lg text-gray-900">Alamat Pengiriman</Text>
              <Text className="text-sm text-gray-600 mt-1">Kelola alamat pengiriman Anda</Text>
            </View>
            <TouchableOpacity className="px-4 py-2 bg-orange-50 rounded-full">
              <Text className="text-orange-500 text-sm font-semibold">Kelola</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-4 mb-6">
            <View className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center">
                  <View className="w-2.5 h-2.5 bg-orange-500 rounded-full mr-3" />
                  <Text className="font-semibold text-base text-gray-900">Alamat Rumah</Text>
                  <View className="ml-3 px-3 py-1 bg-orange-100 rounded-full">
                    <Text className="text-orange-600 text-xs font-medium">Alamat Utama</Text>
                  </View>
                </View>
                <View className="flex-row items-center space-x-3">
                  <TouchableOpacity className="w-11 h-11 bg-gray-100 rounded-full items-center justify-center">
                    <Text className="text-gray-600 text-lg">✏️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="w-11 h-11 bg-gray-100 rounded-full items-center justify-center">
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

          <TouchableOpacity className="flex-row items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 py-4 rounded-2xl shadow-lg">
            <Text className="text-white font-semibold text-base">Tambah Alamat Baru</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}