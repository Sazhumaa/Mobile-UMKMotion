import { Text, View, ScrollView, Image, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import dataProduk from './data/product'

export default function Toko() {
  const router = useRouter()
  const params = useLocalSearchParams()
  
  // Ambil data toko dari parameter
  const storeName = params.storeName as string
  const storeData = dataProduk.find(product => product.seller === storeName)
  
  const [activeTab, setActiveTab] = useState<'beranda' | 'produk' | 'ulasan'>('beranda')
  const [modalOpen, setModalOpen] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followerCount, setFollowerCount] = useState(12500)

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

  // Handler follow toko
  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1)
  }

  // Render stars rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    return (
      <View className="flex-row items-center">
        {[...Array(5)].map((_, index) => {
          if (index < fullStars) {
            return <Ionicons key={index} name="star" size={16} color="#F59E0B" />
          } else if (index === fullStars && hasHalfStar) {
            return <Ionicons key={index} name="star-half" size={16} color="#F59E0B" />
          } else {
            return <Ionicons key={index} name="star-outline" size={16} color="#D1D5DB" />
          }
        })}
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header Toko */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Banner dan Info Toko */}
        <View className="bg-white rounded-b-3xl shadow-lg overflow-hidden">
          {/* Banner */}
          <View className="h-32 bg-gradient-to-r from-orange-500 to-red-500 relative">
            <View className="absolute -bottom-6 left-6">
              <View className="w-20 h-20 bg-white rounded-2xl shadow-xl items-center justify-center border-4 border-white">
                <Text className="text-2xl font-bold text-gray-600">
                  {storeData.seller.charAt(0)}
                </Text>
              </View>
            </View>
          </View>

          {/* Info Toko */}
          <View className="px-6 pt-8 pb-6">
            <View className="flex-row justify-between items-start">
              <View className="flex-1">
                <View className="flex-row items-center mb-2">
                  <Text className="text-xl font-bold text-gray-900 mr-2">{storeData.seller}</Text>
                  {storeData.storeIsOfficial && (
                    <View className="bg-blue-500 px-2 py-1 rounded-full">
                      <Text className="text-white text-xs font-medium">Official</Text>
                    </View>
                  )}
                </View>
                
                <Text className="text-gray-500 text-sm mb-3">{storeData.storeLocation}</Text>
                
                {/* Stats */}
                <View className="flex-row items-center space-x-4 mb-4">
                  <View className="flex-row items-center">
                    {renderStars(storeData.storeRating)}
                    <Text className="text-sm font-semibold text-gray-700 ml-1">
                      {storeData.storeRating}
                    </Text>
                  </View>
                  <Text className="text-gray-400">•</Text>
                  <Text className="text-sm text-gray-600">{storeData.totalReviews} ulasan</Text>
                  <Text className="text-gray-400">•</Text>
                  <Text className="text-sm text-gray-600">{followerCount.toLocaleString()} follower</Text>
                </View>

                {/* Action Buttons - Kecil di samping */}
                <View className="flex-row space-x-2">
                  <TouchableOpacity 
                    className={`flex-row items-center px-4 py-2 rounded-full border ${
                      isFollowing 
                        ? 'bg-orange-500 border-orange-500' 
                        : 'bg-white border-orange-500'
                    }`}
                    onPress={handleFollow}
                  >
                    <Ionicons 
                      name={isFollowing ? "checkmark" : "add"} 
                      size={16} 
                      color={isFollowing ? "white" : "#f97316"} 
                    />
                    <Text className={`ml-1 text-sm font-medium ${
                      isFollowing ? 'text-white' : 'text-orange-500'
                    }`}>
                      {isFollowing ? 'Following' : 'Follow'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    className="flex-row items-center px-4 py-2 bg-orange-500 rounded-full"
                    onPress={() => {/* Handle chat */}}
                  >
                    <Ionicons name="chatbubble-outline" size={16} color="white" />
                    <Text className="text-white text-sm font-medium ml-1">Chat</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    className="flex-row items-center px-4 py-2 bg-gray-100 rounded-full"
                    onPress={() => setModalOpen(true)}
                  >
                    <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
                    <Text className="text-gray-600 text-sm font-medium ml-1">Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row bg-white mt-4 border-b border-gray-200">
          {(['beranda', 'produk', 'ulasan'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              className={`flex-1 py-4 items-center ${
                activeTab === tab ? 'border-b-2 border-orange-500' : ''
              }`}
              onPress={() => setActiveTab(tab)}
            >
              <Text className={`font-semibold ${
                activeTab === tab ? 'text-orange-500' : 'text-gray-500'
              }`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Konten Berdasarkan Tab */}
        <View className="p-4">
          {activeTab === 'beranda' && (
            <>
            </>
          )}

          {/* Produk */}
          {(activeTab === 'beranda' || activeTab === 'produk') && (
            <View className="bg-white rounded-2xl p-4 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-gray-900">
                  Produk ({storeProducts.length})
                </Text>
                <TouchableOpacity>
                  <Text className="text-orange-500 text-sm font-medium">Lihat Semua</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-4">
                <View className="flex-row space-x-4">
                  {storeProducts.map(product => (
                    <TouchableOpacity 
                      key={product.id}
                      className="bg-gray-50 rounded-xl w-40 overflow-hidden border border-gray-200"
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
                          {renderStars(product.rating)}
                          <Text className="text-xs text-gray-600 ml-1">
                            • Terjual {product.sold}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Ulasan */}
          {activeTab === 'ulasan' && (
            <View className="bg-white rounded-2xl p-4 shadow-sm">
              <Text className="text-lg font-bold text-gray-900 mb-4">Ulasan Pelanggan</Text>
              <View className="items-center py-8">
                <Ionicons name="chatbubble-outline" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 mt-2">Belum ada ulasan</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal Detail Toko */}
      <Modal
        visible={modalOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalOpen(false)}
      >
        <SafeAreaView className="flex-1 bg-white">
          {/* Header Modal */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">Detail Toko</Text>
            <TouchableOpacity 
              onPress={() => setModalOpen(false)}
              className="w-8 h-8 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#374151" />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Header Info */}
            <View className="p-4 border-b border-gray-100">
              <View className="flex-row items-center space-x-3 mb-3">
                <View className="w-16 h-16 bg-gray-200 rounded-2xl items-center justify-center">
                  <Text className="text-2xl font-bold text-gray-600">
                    {storeData.seller.charAt(0)}
                  </Text>
                </View>
                <View className="flex-1">
                  <View className="flex-row items-center mb-1">
                    <Text className="text-lg font-bold text-gray-900 mr-2">{storeData.seller}</Text>
                    {storeData.storeIsOfficial && (
                      <View className="bg-blue-500 px-2 py-1 rounded-full">
                        <Text className="text-white text-xs font-medium">Official</Text>
                      </View>
                    )}
                  </View>
                  <Text className="text-gray-500 text-sm">{storeData.storeLocation}</Text>
                </View>
              </View>

              {/* Stats Row */}
              <View className="flex-row justify-around py-3 bg-gray-50 rounded-xl">
                <View className="items-center">
                  <Text className="text-lg font-bold text-gray-900">{storeData.storeRating}</Text>
                  <Text className="text-xs text-gray-500">Rating</Text>
                </View>
                <View className="items-center">
                  <Text className="text-lg font-bold text-gray-900">{storeData.storeTotalProducts}</Text>
                  <Text className="text-xs text-gray-500">Produk</Text>
                </View>
                <View className="items-center">
                  <Text className="text-lg font-bold text-gray-900">{followerCount.toLocaleString()}</Text>
                  <Text className="text-xs text-gray-500">Followers</Text>
                </View>
                <View className="items-center">
                  <Text className="text-lg font-bold text-gray-900">{storeData.totalReviews.toLocaleString()}</Text>
                  <Text className="text-xs text-gray-500">Ulasan</Text>
                </View>
              </View>

              {/* Action Buttons Kecil */}
              <View className="flex-row justify-center space-x-3 mt-4">
                <TouchableOpacity 
                  className={`flex-row items-center px-4 py-2 rounded-full border ${
                    isFollowing 
                      ? 'bg-orange-500 border-orange-500' 
                      : 'bg-white border-orange-500'
                  }`}
                  onPress={handleFollow}
                >
                  <Ionicons 
                    name={isFollowing ? "checkmark" : "add"} 
                    size={16} 
                    color={isFollowing ? "white" : "#f97316"} 
                  />
                  <Text className={`ml-1 text-sm font-medium ${
                    isFollowing ? 'text-white' : 'text-orange-500'
                  }`}>
                    {isFollowing ? 'Following' : 'Follow'}
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="flex-row items-center px-4 py-2 bg-orange-500 rounded-full">
                  <Ionicons name="chatbubble-outline" size={16} color="white" />
                  <Text className="text-white text-sm font-medium ml-1">Chat</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Content Sections */}
            <View className="p-4 space-y-6">
              {/* Deskripsi */}
              <View>
                <Text className="font-semibold text-gray-900 mb-2">Deskripsi Toko</Text>
                <Text className="text-gray-600 leading-6">{storeData.storeDescription}</Text>
              </View>

              {/* Informasi */}
              <View>
                <Text className="font-semibold text-gray-900 mb-3">Informasi Toko</Text>
                <View className="space-y-3">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Bergabung</Text>
                    <Text className="text-gray-900 font-medium">{storeData.storeJoinDate}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Total Produk</Text>
                    <Text className="text-gray-900 font-medium">{storeData.storeTotalProducts}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Lokasi</Text>
                    <Text className="text-gray-900 font-medium">{storeData.storeLocation}</Text>
                  </View>
                </View>
              </View>

              {/* Performance */}
              <View>
                <Text className="font-semibold text-gray-900 mb-3">Performance</Text>
                <View className="space-y-3">
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Waktu Respon</Text>
                    <Text className="text-gray-900 font-medium">{storeData.storeResponseTime}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Pengiriman Tepat Waktu</Text>
                    <Text className="text-gray-900 font-medium">{storeData.storePerformance.onTimeDelivery}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Transaksi Sukses</Text>
                    <Text className="text-gray-900 font-medium">{storeData.storePerformance.transactionSuccess}</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-600">Respon Chat</Text>
                    <Text className="text-gray-900 font-medium">{storeData.storePerformance.chatResponse}</Text>
                  </View>
                </View>
              </View>

              {/* Badge & Status */}
              <View>
                <Text className="font-semibold text-gray-900 mb-3">Status Toko</Text>
                <View className="flex-row flex-wrap gap-2">
                  <View className="bg-orange-100 px-3 py-2 rounded-full">
                    <Text className="text-orange-600 text-xs font-medium">{storeData.storeBadge}</Text>
                  </View>
                  {storeData.storeIsPowerMerchant && (
                    <View className="bg-green-100 px-3 py-2 rounded-full">
                      <Text className="text-green-600 text-xs font-medium">Power Merchant</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  )
}