import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  TextInput as RNTextInput,
  Alert,
  Animated
} from "react-native";
import { useState, useRef, useEffect } from "react";
import dataProduk from "./data/product";
import { useCart } from "./hooks/useCart";
import { Ionicons } from "@expo/vector-icons";

export default function Detailproduk() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState<{name: string, image: string, price: number, quantity: number} | null>(null);
  const [rekomendasi, setRekomendasi] = useState<any[]>([]);
  
  // Animasi untuk popup
  const popupAnim = useRef(new Animated.Value(-100)).current;
  const popupOpacity = useRef(new Animated.Value(0)).current;
  
  // Refs untuk menyimpan timeout ID dan state animasi
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isAnimating = useRef(false);

  const { 
    id, 
    name, 
    image, 
    price, 
    rating, 
    sold, 
    desc, 
    storeRating, 
    totalReviews, 
    responseRate,
    seller,
    categoryId,
    // Field toko baru
    storeDescription,
    storeJoinDate,
    storeTotalProducts,
    storeFollowers,
    storeLocation,
    storeIsOfficial,
    storeIsPowerMerchant,
    storeBadge,
    storeResponseTime,
    storePerformance
  } = params;

  // Cari data produk lengkap dari dataProduk berdasarkan ID
  const fullProductData = dataProduk.find(product => product.id === Number(id));

  // Generate rekomendasi sekali saja berdasarkan categoryId
  useEffect(() => {
    const currentProductId = Number(id);
    const currentCategoryId = Number(categoryId) || 2;
    
    // Filter produk dengan category yang sama, exclude produk saat ini
    const produkSameCategory = dataProduk.filter(item => 
      item.id !== currentProductId && 
      item.categoryId === currentCategoryId
    );
    
    // Jika produk dengan category yang sama kurang dari 10, tambahkan dari category lain
    let recommendedProducts = [...produkSameCategory];
    
    if (recommendedProducts.length < 10) {
      const otherProducts = dataProduk.filter(item => 
        item.id !== currentProductId && 
        item.categoryId !== currentCategoryId
      );
      
      // Ambil produk dari category lain sampai cukup 10
      recommendedProducts = [
        ...recommendedProducts,
        ...otherProducts.slice(0, 10 - recommendedProducts.length)
      ];
    }
    
    // Jika masih kurang dari 10, ulangi dari awal
    if (recommendedProducts.length < 10) {
      const allOtherProducts = dataProduk.filter(item => item.id !== currentProductId);
      while (recommendedProducts.length < 10 && allOtherProducts.length > 0) {
        recommendedProducts.push(allOtherProducts[recommendedProducts.length % allOtherProducts.length]);
      }
    }
    
    // Potong maksimal 10 produk
    setRekomendasi(recommendedProducts.slice(0, 10));
  }, [id, categoryId]);

  // Cleanup timeout ketika component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Navigasi ke halaman toko
  const navigateToStore = () => {
    if (fullProductData) {
      router.push({
        pathname: "/Toko",
        params: { 
          storeName: fullProductData.seller
        }
      });
    } else {
      // Fallback jika fullProductData tidak ditemukan
      router.push({
        pathname: "/Toko",
        params: { 
          storeName: seller as string || "Batagor Ibu Eni"
        }
      });
    }
  };

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Hide popup animation dengan slide out ke atas
  const hidePopupAnimation = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    Animated.parallel([
      Animated.timing(popupAnim, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(popupOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowPopup(false);
      setPopupData(null);
      isAnimating.current = false;
    });
  };

  // Show popup animation dengan slide in dari atas
  const showPopupAnimation = (productData: {name: string, image: string, price: number, quantity: number}) => {
    // Jika sedang animasi, langsung hide dulu yang lama dengan cepat
    if (isAnimating.current) {
      // Reset animasi dan langsung hide yang lama
      Animated.timing(popupAnim, {
        toValue: -100,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        // Set data baru dan langsung show yang baru
        setPopupData(productData);
        setShowPopup(true);
        startFreshAnimation();
      });
    } else {
      // Jika tidak ada animasi, langsung show yang baru
      setPopupData(productData);
      setShowPopup(true);
      startFreshAnimation();
    }
  };

  // Start fresh animation untuk popup baru
  const startFreshAnimation = () => {
    isAnimating.current = true;
    
    // Reset animasi ke posisi awal
    popupAnim.setValue(-100);
    popupOpacity.setValue(0);
    
    // Batalkan timeout sebelumnya jika ada
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Animasi masuk yang fresh
    Animated.parallel([
      Animated.timing(popupAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(popupOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();

    // Auto hide setelah 3 detik
    timeoutRef.current = setTimeout(() => {
      hidePopupAnimation();
    }, 3000);
  };

  // Handle add to cart dengan popup - dengan sistem antrian
  const handleAddToCart = () => {
    const product = {
      id: Number(id),
      name: name as string,
      price: Number(price),
      image: image as string,
      seller: seller as string || "Nusantara Rasa",
      quantity: quantity,
      categoryId: Number(categoryId) || 2,
      rating: Number(rating) || 4.9,
      sold: Number(sold) || 0,
      addedAt: new Date().toISOString()
    };

    addToCart(product);
    
    const popupProductData = {
      name: name as string,
      image: image as string,
      price: Number(price),
      quantity: quantity
    };
    
    showPopupAnimation(popupProductData);
  };

  // Handle buy now - dengan sistem antrian
  const handleBuyNow = () => {
    const product = {
      id: Number(id),
      name: name as string,
      price: Number(price),
      image: image as string,
      seller: seller as string || "Nusantara Rasa",
      quantity: quantity,
      categoryId: Number(categoryId) || 2,
      rating: Number(rating) || 4.9,
      sold: Number(sold) || 0,
      addedAt: new Date().toISOString()
    };

    addToCart(product);
    
    const popupProductData = {
      name: name as string,
      image: image as string,
      price: Number(price),
      quantity: quantity
    };
    
    showPopupAnimation(popupProductData);
    
    // Navigate ke cart page setelah delay kecil
    setTimeout(() => {
      router.push("/Cartpage");
    }, 1000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <ScrollView style={{ padding: 24 }}>
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
        
        <View style={{marginTop: 24, backgroundColor: 'rgba(107, 114, 128, 0.1)', padding: 16, borderRadius: 8}}>
          <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 8}}>
            Detail Produk
          </Text>
          
          <Text>
            {desc}
          </Text>
        </View>

        {/* Quantity Selector */}
        <View style={{marginTop: 24, flexDirection: "row", alignItems: "center", gap: 16}}>
          <Text style={{fontWeight: "bold", fontSize: 18}}>Qty</Text>

          <TouchableOpacity 
            style={{width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'rgba(0, 0, 0, 0.3)', alignItems: "center", justifyContent: "center", backgroundColor: "white"}}
            onPress={decreaseQuantity}
          >
            <Text style={{fontSize: 20, fontWeight: "bold"}}>-</Text>
          </TouchableOpacity>

          <RNTextInput 
            style={{backgroundColor: "white", padding: 8, borderRadius: 8, width: 56, textAlign: "center", fontSize: 18, borderWidth: 1}}
            value={quantity.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const num = parseInt(text) || 1;
              setQuantity(num > 0 ? num : 1);
            }}
          />

          <TouchableOpacity 
            style={{width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: 'rgba(0, 0, 0, 0.3)', alignItems: "center", justifyContent: "center", backgroundColor: "white"}}
            onPress={increaseQuantity}
          >
            <Text style={{fontSize: 20, fontWeight: "bold"}}>+</Text>
          </TouchableOpacity>
        </View>
        
        {/* Action Buttons */}
        <View style={{marginTop: 24, flexDirection: "row", gap: 16}}>
          <TouchableOpacity 
            style={{flex: 1, backgroundColor: "#f97316", padding: 16, borderRadius: 8, alignItems: "center"}}
            onPress={handleBuyNow}
          >
            <Text style={{fontWeight: "bold", color: "white", fontSize: 18}}>Beli Sekarang</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{flex: 1, borderWidth: 2, borderColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 8, alignItems: "center", justifyContent: "center"}}
            onPress={handleAddToCart}
          >
            <Text style={{fontWeight: "bold", backgroundColor: "white", padding: 16, borderRadius: 8, fontSize: 18}}>
              + Keranjang 🛒
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Store Info - Diperbarui dengan data toko lengkap */}
        <View style={{marginTop: 24}}>
          <View style={{borderRadius: 16, padding: 24, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.2)', backgroundColor: "white"}}>
            {/* Header Toko */}
            <View style={{flexDirection: "row", alignItems: "center", marginBottom: 16}}>
              <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3">
                <Text className="text-lg font-bold text-gray-600">
                  {(seller as string)?.charAt(0) || "B"}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{fontWeight: "bold", fontSize: 18}}>{seller || "Batagor Ibu Eni"}</Text>
                <Text style={{color: "#6b7280"}}>{storeLocation as string || "Bandung, Jawa Barat"}</Text>
              </View>
              {fullProductData?.storeIsOfficial && (
                <View className="bg-blue-500 px-2 py-1 rounded-full">
                  <Text className="text-white text-xs font-medium">Official</Text>
                </View>
              )}
            </View>

            {/* Badge Toko */}
            <View style={{flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 16}}>
              <View className="bg-orange-100 px-3 py-1 rounded-full">
                <Text className="text-orange-600 text-xs font-medium">
                  {fullProductData?.storeBadge || "Power Merchant"}
                </Text>
              </View>
              {fullProductData?.storeIsPowerMerchant && (
                <View className="bg-green-100 px-3 py-1 rounded-full">
                  <Text className="text-green-600 text-xs font-medium">Power Merchant</Text>
                </View>
              )}
            </View>
            
            {/* Stats Toko */}
            <View style={{flexDirection: "row", justifyContent: "space-between", marginBottom: 16, paddingHorizontal: 8}}>
              <View style={{alignItems: "center", flex: 1}}>
                <Text style={{color: "#374151", fontSize: 16, fontWeight: "600"}}>
                  ⭐ {storeRating || fullProductData?.storeRating || "4.8"}
                </Text>
                <Text style={{color: "#6b7280", fontSize: 14}}>Rating Toko</Text>
              </View>

              <View style={{alignItems: "center", flex: 1}}>
                <Text style={{color: "#374151", fontSize: 16, fontWeight: "600"}}>
                  {storeTotalProducts || fullProductData?.storeTotalProducts || "12"}
                </Text>
                <Text style={{color: "#6b7280", fontSize: 14}}>Produk</Text>
              </View>

              <View style={{alignItems: "center", flex: 1}}>
                <Text style={{color: "#374151", fontSize: 16, fontWeight: "600"}}>
                  {storeFollowers ? Number(storeFollowers).toLocaleString() : fullProductData?.storeFollowers.toLocaleString() || "12.5K"}
                </Text>
                <Text style={{color: "#6b7280", fontSize: 14}}>Followers</Text>
              </View>
            </View>

            {/* Tombol Lihat Toko */}
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <View style={{flex: 1}}>
                <Text style={{color: "#6b7280", fontSize: 12}}>
                  Bergabung {storeJoinDate || fullProductData?.storeJoinDate || "15 Mar 2015"}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={{
                  backgroundColor: "#f97316", 
                  paddingHorizontal: 24, 
                  paddingVertical: 12, 
                  borderRadius: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8
                }} 
                onPress={navigateToStore}
              >
                <Ionicons name="storefront-outline" size={16} color="white" />
                <Text style={{color: "white", fontWeight: "600"}}>Kunjungi Toko</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Recommended Products */}
          <View style={{marginTop: 24}}>
            <Text style={{fontWeight: "bold", fontSize: 20, marginBottom: 12}}>Rekomendasi Produk</Text>
            
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
                  style={{
                    width: 176, 
                    marginRight: 16, 
                    backgroundColor: "white", 
                    borderRadius: 16, 
                    padding: 12, 
                    overflow: "hidden", 
                    position: "relative", 
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}
                >
                  <View style={{
                    position: "absolute", 
                    top: 12, 
                    left: 12, 
                    backgroundColor: "#ef4444", 
                    paddingHorizontal: 8, 
                    paddingVertical: 4, 
                    borderRadius: 12, 
                    zIndex: 10
                  }}>
                    <Text style={{fontSize: 12, fontWeight: "bold", color: "white"}}>HOT</Text>
                  </View>

                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: 150, borderRadius: 8, backgroundColor: "#e5e7eb" }}
                    resizeMode="cover"
                  />

                  <Text
                    numberOfLines={2}
                    style={{fontWeight: "bold", fontSize: 14, color: "#1f2937", marginTop: 12}}
                  >
                    {item.name}
                  </Text>

                  <Text style={{color: "#f97316", fontWeight: "800", fontSize: 16, marginTop: 4}}>
                    Rp {Number(item.price).toLocaleString("id-ID")}
                  </Text>

                  <View style={{flexDirection: "row", alignItems: "center", marginTop: 8}}>
                    <Text style={{color: "#fbbf24", fontWeight: "bold", marginRight: 8}}>⭐{item.rating} </Text>
                    <Text style={{color: "#6b7280", fontSize: 12}}>{item.sold} • terjual</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Popup Notification */}
      {showPopup && popupData && (
        <Animated.View 
          style={{
            position: 'absolute',
            top: 40,
            left: 20,
            right: 20,
            transform: [{ translateY: popupAnim }],
            opacity: popupOpacity,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              padding: 16,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderWidth: 1,
              borderColor: "#e5e7eb",
            }}
          >
            {/* Header dengan icon centang */}
            <View style={{flexDirection: "row", alignItems: "center", marginBottom: 12}}>
              <View style={{backgroundColor: "#10b981", borderRadius: 20, width: 24, height: 24, alignItems: "center", justifyContent: "center", marginRight: 8}}>
                <Text style={{color: "white", fontWeight: "bold", fontSize: 14}}>✓</Text>
              </View>
              <Text style={{fontWeight: "bold", fontSize: 16, color: "#1f2937"}}>Berhasil Ditambahkan</Text>
            </View>

            {/* Product Info */}
            <View style={{flexDirection: "row", alignItems: "center", marginBottom: 16}}>
              <Image
                source={{ uri: popupData.image }}
                style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }}
                resizeMode="cover"
              />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: "#374151", marginBottom: 4}} numberOfLines={1}>
                  {popupData.name}
                </Text>
                <Text style={{fontSize: 14, fontWeight: "bold", color: "#f97316"}}>
                  {popupData.quantity} x Rp {Number(popupData.price).toLocaleString("id-ID")}
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={{flexDirection: "row", gap: 12}}>
              <TouchableOpacity 
                style={{
                  flex: 1, 
                  backgroundColor: "#f3f4f6", 
                  paddingVertical: 10, 
                  borderRadius: 8, 
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#d1d5db"
                }}
                onPress={hidePopupAnimation}
              >
                <Text style={{fontWeight: "600", color: "#374151", fontSize: 14}}>Lanjut Belanja</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{
                  flex: 1, 
                  backgroundColor: "#f97316", 
                  paddingVertical: 10, 
                  borderRadius: 8, 
                  alignItems: "center" 
                }}
                onPress={() => {
                  hidePopupAnimation();
                  router.push("/Cartpage");
                }}
              >
                <Text style={{fontWeight: "600", color: "white", fontSize: 14}}>Lihat Keranjang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}