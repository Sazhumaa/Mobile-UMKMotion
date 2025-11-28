import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import dataProduk from './data/product' // Path yang benar

export default function Toko() {
  const router = useRouter()
  const params = useLocalSearchParams()
  
  // Ambil data toko dari parameter
  const storeName = params.storeName as string
  const storeData = dataProduk.find(product => product.seller === storeName)
  
  if (!storeData) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-lg text-gray-500">Toko tidak ditemukan</Text>
        <TouchableOpacity 
          className="mt-4 bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => router.back()}
        >
          <Text className="text-white font-medium">Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }

  // Produk dari toko ini
  const storeProducts = dataProduk.filter(product => product.seller === storeName)

  // Navigasi ke detail produk
  const navigateToProduct = (product: any) => {
    router.push({
      pathname: "/Detailproduct",
      params: { ...product },
    })
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header Toko */}
          <View className="bg-white border-b border-gray-200">
            <View className="px-4 py-4">
              <View className="flex-row items-center mb-4">
                <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mr-3">
                  <Text className="text-2xl font-bold text-gray-600">
                    {storeData.seller.charAt(0)}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-900">{storeData.seller}</Text>
                  <Text className="text-gray-500 text-sm mt-1">{storeData.storeLocation}</Text>
                </View>
                {storeData.storeIsOfficial && (
                  <View className="bg-blue-500 px-2 py-1 rounded-full">
                    <Text className="text-white text-xs font-medium">Official</Text>
                  </View>
                )}
              </View>

              {/* Badge & Status */}
              <View className="flex-row flex-wrap gap-2 mb-4">
                <View className="bg-orange-100 px-3 py-1 rounded-full">
                  <Text className="text-orange-600 text-xs font-medium">{storeData.storeBadge}</Text>
                </View>
                {storeData.storeIsPowerMerchant && (
                  <View className="bg-green-100 px-3 py-1 rounded-full">
                    <Text className="text-green-600 text-xs font-medium">Power Merchant</Text>
                  </View>
                )}
                <View className="bg-gray-100 px-3 py-1 rounded-full">
                  <Text className="text-gray-600 text-xs font-medium">Bergabung {storeData.storeJoinDate}</Text>
                </View>
              </View>

              {/* Stats Toko */}
              <View className="flex-row justify-between py-3 border-t border-b border-gray-100">
                <View className="items-center">
                  <Text className="text-lg font-bold text-gray-900">{storeData.storeRating}</Text>
                  <Text className="text-xs text-gray-500">Rating</Text>
                </View>
                <View className="items-center">
                  <Text className="text-lg font-bold text-gray-900">{storeData.storeTotalProducts}</Text>
                  <Text className="text-xs text-gray-500">Produk</Text>
                </View>
                <View className="items-center">
                  <Text className="text-lg font-bold text-gray-900">{storeData.storeFollowers.toLocaleString()}</Text>
                  <Text className="text-xs text-gray-500">Followers</Text>
                </View>
                <View className="items-center">
                  <Text className="text-lg font-bold text-gray-900">{storeData.totalReviews.toLocaleString()}</Text>
                  <Text className="text-xs text-gray-500">Ulasan</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Deskripsi Toko */}
          <View className="px-4 py-4 border-b border-gray-200">
            <Text className="text-base text-gray-700 leading-6">{storeData.storeDescription}</Text>
          </View>

          {/* Performance Metrics */}
          <View className="px-4 py-4 border-b border-gray-200">
            <Text className="text-lg font-bold text-gray-900 mb-3">Performance Toko</Text>
            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-600 ml-2">Pengiriman Tepat Waktu</Text>
                </View>
                <Text className="text-sm font-medium text-gray-900">{storeData.storePerformance.onTimeDelivery}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <MaterialIcons name="check-circle-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-600 ml-2">Transaksi Sukses</Text>
                </View>
                <Text className="text-sm font-medium text-gray-900">{storeData.storePerformance.transactionSuccess}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Ionicons name="chatbubble-outline" size={16} color="#6B7280" />
                  <Text className="text-sm text-gray-600 ml-2">Respon Chat</Text>
                </View>
                <Text className="text-sm font-medium text-gray-900">{storeData.storePerformance.chatResponse}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <FontAwesome5 name="reply" size={14} color="#6B7280" />
                  <Text className="text-sm text-gray-600 ml-2">Waktu Respon</Text>
                </View>
                <Text className="text-sm font-medium text-gray-900">{storeData.storeResponseTime}</Text>
              </View>
            </View>
          </View>

          {/* Produk dari Toko Ini */}
          <View className="px-4 py-4">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-gray-900">Produk ({storeProducts.length})</Text>
              <TouchableOpacity>
                <Text className="text-blue-500 text-sm font-medium">Lihat Semua</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4">
              <View className="flex-row space-x-4">
                {storeProducts.map(product => (
                  <TouchableOpacity 
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg w-40 overflow-hidden"
                    onPress={() => navigateToProduct(product)}
                  >
                    <Image 
                      source={{ uri: product.image }} 
                      className="w-full h-32"
                      resizeMode="cover"
                    />
                    <View className="p-3">
                      <Text className="text-sm font-medium text-gray-900 mb-1" numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text className="text-lg font-bold text-gray-900">
                        Rp {product.price.toLocaleString()}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Ionicons name="star" size={12} color="#F59E0B" />
                        <Text className="text-xs text-gray-600 ml-1">
                          {product.rating} • Terjual {product.sold}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        {/* Footer Actions */}
        <View className="border-t border-gray-200 bg-white px-4 py-3">
          <View className="flex-row space-x-3">
            <TouchableOpacity className="flex-1 border border-gray-300 rounded-lg py-3 items-center">
              <Text className="text-gray-700 font-medium">Ikuti</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-blue-500 rounded-lg py-3 items-center">
              <Text className="text-white font-medium">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}