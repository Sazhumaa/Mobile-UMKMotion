// Detailproduct.tsx
import { useLocalSearchParams, useRouter } from "expo-router";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  FlatList,
  Alert,
  Animated
} from "react-native";
import { useState, useRef, useEffect } from "react";
import dataProduk from "./data/product";
import { useCart } from "./hooks/useCart";

export default function Detailproduk() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  
  // Animasi untuk popup
  const popupAnim = useRef(new Animated.Value(-100)).current;
  const popupOpacity = useRef(new Animated.Value(0)).current;
  
  // Refs untuk menyimpan timeout ID
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
    categoryId
  } = params;

  const rekomendasi = dataProduk
    .filter(item => item.id !== Number(id))
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  // Cleanup timeout ketika component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Show popup animation
  const showPopupAnimation = () => {
    // Jika sedang animasi, jangan jalankan lagi
    if (isAnimating.current) return;
    
    isAnimating.current = true;
    setShowPopup(true);
    
    // Reset animasi
    popupAnim.setValue(-100);
    popupOpacity.setValue(0);
    
    // Batalkan timeout sebelumnya jika ada
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Animasi masuk
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

  // Hide popup animation
  const hidePopupAnimation = () => {
    // Batalkan timeout jika masih ada
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    Animated.parallel([
      Animated.timing(popupAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(popupOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => {
      setShowPopup(false);
      isAnimating.current = false;
    });
  };

  // Handle add to cart dengan popup - dengan debounce
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
    showPopupAnimation();
  };

  // Handle buy now - dengan debounce
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
    showPopupAnimation();
    
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

          <TextInput 
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
        
        {/* Store Info */}
        <View style={{marginTop: 24}}>
          <View style={{borderRadius: 16, padding: 24, borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.2)', backgroundColor: "white"}}>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
              <View>
                <Text style={{fontWeight: "bold", fontSize: 18}}>{seller || "Nusantara Rasa"}</Text>
                <Text style={{color: "#6b7280"}}>Aktif beberapa menit lalu</Text>
              </View>

              <TouchableOpacity style={{backgroundColor: "#f97316", paddingHorizontal: 24, paddingVertical: 16, borderRadius: 8}}>
                <Text style={{color: "white", fontWeight: "600"}}>Lihat Toko 🏬</Text>
              </TouchableOpacity>
            </View>
            
            <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 24, paddingHorizontal: 8}}>
              <View style={{alignItems: "center", flex: 1}}>
                <Text style={{color: "#374151", fontSize: 16, fontWeight: "600"}}>⭐ {storeRating || "4.8"}</Text>
                <Text style={{color: "#6b7280", fontSize: 14}}>Rating Toko</Text>
              </View>

              <View style={{alignItems: "center", flex: 1}}>
                <Text style={{color: "#374151", fontSize: 16, fontWeight: "600"}}>{totalReviews || "3400"}+</Text>
                <Text style={{color: "#6b7280", fontSize: 14}}>Total Review</Text>
              </View>

              <View style={{alignItems: "center", flex: 1}}>
                <Text style={{color: "#374151", fontSize: 16, fontWeight: "600"}}>{responseRate || "98%"}</Text>
                <Text style={{color: "#6b7280", fontSize: 14}}>Response Rate</Text>
              </View>
            </View>
          </View>
          
          {/* Recommended Products */}
          <View style={{marginTop: 24}}>
            <Text style={{fontWeight: "bold", fontSize: 20}}>Rekomendasi Produk</Text>
            
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
                    style={{width: 176, marginRight: 16, backgroundColor: "white", borderRadius: 16, padding: 12, overflow: "hidden", position: "relative", 
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
                    <View style={{position: "absolute", top: 12, left: 12, backgroundColor: "#ef4444", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, zIndex: 10}}>
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

      {/* Popup Notification - Sesuai dengan gambar */}
      {showPopup && (
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
                source={{ uri: image as string }}
                style={{ width: 40, height: 40, borderRadius: 8, marginRight: 12 }}
                resizeMode="cover"
              />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 14, color: "#374151", marginBottom: 4}} numberOfLines={1}>
                  {name}
                </Text>
                <Text style={{fontSize: 14, fontWeight: "bold", color: "#f97316"}}>
                  {quantity} x Rp {Number(price).toLocaleString("id-ID")}
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