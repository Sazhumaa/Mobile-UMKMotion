import React, { useState, useMemo, useRef } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Animated,
  Easing,
  Modal,
  Share,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { useFavorites } from "../hooks/useFavorites";
import { useCart } from "../hooks/useCart";

// Define types
type KonsultanType = {
  id: number;
  name: string;
  foto: any;
  rating: number;
  totalUlasan: number;
  lokasi: string;
  spesialis: string;
  pengalaman: string;
  totalKlien: number;
  totalJamKonsultasi: string;
  kepuasan: number;
  kecepatanRespons: string;
  kepercayaan: number;
  harga: string;
  deskripsi: string;
  keahlian: string[];
  pendidikan: string;
  sertifikasi: string[];
};

export default function Konsultan() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedKonsultan, setSelectedKonsultan] = useState<KonsultanType | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<{text: string; isUser: boolean; time: string}[]>([]);
  const [showShareModal, setShowShareModal] = useState(false);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const [selectedSpesialis, setSelectedSpesialis] = useState("Semua Spesialisasi");
  const [sortBy, setSortBy] = useState("Rating Tertinggi");

  const { favorites } = useFavorites();
  const { getCartItemsCount } = useCart();

  const konsultanList: KonsultanType[] = [
    {
      id: 1,
      name: "Elaina",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.98,
      totalUlasan: 428,
      lokasi: "Jakarta Selatan",
      spesialis: "Spesialis Pemasaran Digital",
      pengalaman: "15 tahun",
      totalKlien: 312,
      totalJamKonsultasi: "2.150+ jam",
      kepuasan: 98,
      kecepatanRespons: "Respons < 15 menit",
      kepercayaan: 99,
      harga: "Rp 150.000 / sesi",
      deskripsi: "Spesialis pemasaran digital dengan pengalaman 15 tahun membantu UMKM berkembang melalui strategi digital yang terukur dan efektif.",
      keahlian: ["SEO", "Social Media Marketing", "Google Ads", "Content Strategy"],
      pendidikan: "S1 Marketing - Universitas Indonesia",
      sertifikasi: ["Google Ads Certified", "Facebook Blueprint", "Digital Marketing Professional"]
    },
    {
      id: 2,
      name: "Kazuma",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.92,
      totalUlasan: 256,
      lokasi: "Bandung",
      spesialis: "Spesialis Manajemen Keuangan",
      pengalaman: "5 tahun",
      totalKlien: 189,
      totalJamKonsultasi: "980+ jam",
      kepuasan: 96,
      kecepatanRespons: "Respons < 30 menit",
      kepercayaan: 97,
      harga: "Rp 200.000 / sesi",
      deskripsi: "Ahli manajemen keuangan yang membantu UMKM mengoptimalkan arus kas dan perencanaan keuangan bisnis.",
      keahlian: ["Cash Flow Management", "Financial Planning", "Budgeting", "Financial Analysis"],
      pendidikan: "S1 Akuntansi - ITB",
      sertifikasi: ["CFA Level 1", "Financial Planner"]
    },
    {
      id: 3,
      name: "Aqua",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.75,
      totalUlasan: 189,
      lokasi: "Surabaya",
      spesialis: "Spesialis Branding & Desain",
      pengalaman: "8 tahun",
      totalKlien: 156,
      totalJamKonsultasi: "1.420+ jam",
      kepuasan: 94,
      kecepatanRespons: "Respons < 1 jam",
      kepercayaan: 93,
      harga: "Rp 180.000 / sesi",
      deskripsi: "Desainer dan branding specialist yang fokus membangun identitas visual yang kuat untuk UMKM.",
      keahlian: ["Brand Identity", "Logo Design", "UI/UX Design", "Packaging Design"],
      pendidikan: "S1 Desain Komunikasi Visual - ITS",
      sertifikasi: ["Adobe Certified Expert", "Brand Strategy Professional"]
    },
    {
      id: 4,
      name: "Megumin",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.88,
      totalUlasan: 312,
      lokasi: "Yogyakarta",
      spesialis: "Spesialis Konten Kreator",
      pengalaman: "4 tahun",
      totalKlien: 278,
      totalJamKonsultasi: "1.105+ jam",
      kepuasan: 97,
      kecepatanRespons: "Respons < 10 menit",
      kepercayaan: 98,
      harga: "Rp 170.000 / sesi",
      deskripsi: "Content creator dan storyteller yang ahli dalam menciptakan konten engaging untuk berbagai platform digital.",
      keahlian: ["Content Writing", "Video Production", "Social Media Content", "Copywriting"],
      pendidikan: "S1 Ilmu Komunikasi - UGM",
      sertifikasi: ["Content Marketing Certified", "Video Production Specialist"]
    },
    {
      id: 5,
      name: "Darkness",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.65,
      totalUlasan: 145,
      lokasi: "Medan",
      spesialis: "Spesialis Operasional & Logistik",
      pengalaman: "10 tahun",
      totalKlien: 98,
      totalJamKonsultasi: "1.680+ jam",
      kepuasan: 91,
      kecepatanRespons: "Respons < 2 jam",
      kepercayaan: 90,
      harga: "Rp 190.000 / sesi",
      deskripsi: "Spesialis operasional dan logistik dengan pengalaman luas dalam optimasi rantai pasok dan efisiensi operasional.",
      keahlian: ["Supply Chain", "Inventory Management", "Process Optimization", "Logistics"],
      pendidikan: "S1 Teknik Industri - USU",
      sertifikasi: ["Supply Chain Professional", "Lean Six Sigma Green Belt"]
    },
    {
      id: 6,
      name: "Yunyun",
      foto: require("../../assets/images/Profile.jpg"),
      rating: 4.94,
      totalUlasan: 267,
      lokasi: "Bali",
      spesialis: "Spesialis HR & Pengembangan Tim",
      pengalaman: "6 tahun",
      totalKlien: 201,
      totalJamKonsultasi: "1.350+ jam",
      kepuasan: 97,
      kecepatanRespons: "Respons < 20 menit",
      kepercayaan: 98,
      harga: "Rp 160.000 / sesi",
      deskripsi: "HR specialist yang fokus pada pengembangan tim dan budaya organisasi untuk UMKM yang sedang berkembang.",
      keahlian: ["Talent Management", "Team Building", "HR Strategy", "Performance Management"],
      pendidikan: "S1 Psikologi - Udayana",
      sertifikasi: ["HR Professional", "Talent Management Specialist"]
    },
  ];

  const filteredAndSortedList = useMemo(() => {
    return konsultanList
      .filter((k) => {
        const matchesSearch =
          k.name.toLowerCase().includes(search.toLowerCase()) ||
          k.spesialis.toLowerCase().includes(search.toLowerCase()) ||
          k.lokasi.toLowerCase().includes(search.toLowerCase());

        const matchesSpesialis = 
          selectedSpesialis === "Semua Spesialisasi" || 
          k.spesialis.includes(selectedSpesialis.replace("Spesialis ", ""));

        return matchesSearch && matchesSpesialis;
      })
      .sort((a, b) => {
        if (sortBy === "Rating Tertinggi") return b.rating - a.rating;
        if (sortBy === "Pengalaman Terbanyak")
          return parseInt(b.pengalaman) - parseInt(a.pengalaman);
        return 0;
      });
  }, [search, selectedSpesialis, sortBy]);

  const hasActiveFilter = selectedSpesialis !== "Semua Spesialisasi" || sortBy !== "Rating Tertinggi";

  const handleFilterToggle = () => {
    if (!showFilter) {
      setShowFilter(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 400,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowFilter(false);
      });
    }

    if (!showFilter) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  const handleShowDetail = (konsultan: KonsultanType) => {
    setSelectedKonsultan(konsultan);
    setShowDetailModal(true);
  };

  const handleStartChat = (konsultan: KonsultanType) => {
    setSelectedKonsultan(konsultan);
    setChatMessages([{
      text: `Halo! Saya ${konsultan.name}, ${konsultan.spesialis}. Ada yang bisa saya bantu?`,
      isUser: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setShowChatModal(true);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        text: chatMessage,
        isUser: true,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage("");
      
      // Auto reply after 1 second
      setTimeout(() => {
        const autoReply = {
          text: "Terima kasih pesannya. Saya akan membalas secepat mungkin!",
          isUser: false,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setChatMessages(prev => [...prev, autoReply]);
      }, 1000);
    }
  };

  // Share functionality
  const handleShareKonsultan = async (konsultan: KonsultanType) => {
    try {
      const shareMessage = `🌟 Rekomendasi Konsultan UMKM Profesional 🌟

${konsultan.name}
${konsultan.spesialis}
⭐ Rating: ${konsultan.rating}/5 (${konsultan.totalUlasan} ulasan)
💼 Pengalaman: ${konsultan.pengalaman}
👥 Total Klien: ${konsultan.totalKlien}+
📍 Lokasi: ${konsultan.lokasi}
💰 ${konsultan.harga}

${konsultan.deskripsi}

Temukan konsultan UMKM profesional lainnya di aplikasi kami!`;

      const result = await Share.share({
        message: shareMessage,
        title: `Rekomendasi Konsultan: ${konsultan.name}`
      });

      if (result.action === Share.sharedAction) {
        Alert.alert("Berhasil!", "Konsultan berhasil dibagikan");
      }
    } catch (error) {
      Alert.alert("Error", "Gagal membagikan konsultan");
    }
  };

  const handleOpenShareModal = (konsultan: KonsultanType) => {
    setSelectedKonsultan(konsultan);
    setShowShareModal(true);
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ],
  };

  // Modal Detail Konsultan
  const renderDetailModal = () => (
    <Modal
      visible={showDetailModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowDetailModal(false)}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between p-6 border-b border-gray-200">
          <Text className="text-xl font-bold text-gray-800">Detail Konsultan</Text>
          <TouchableOpacity onPress={() => setShowDetailModal(false)}>
            <Ionicons name="close" size={28} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-6">
          {selectedKonsultan && (
            <>
              <View className="flex-row items-center mb-6">
                <Image 
                  source={selectedKonsultan.foto} 
                  className="max-w-20 max-h-20 rounded-xl border-2 border-indigo-100" 
                />
                <View className="ml-4 flex-1">
                  <Text className="text-2xl font-bold text-gray-800">{selectedKonsultan.name}</Text>
                  <Text className="text-gray-500 text-base">{selectedKonsultan.spesialis}</Text>
                  <Text className="text-orange-500 font-bold text-lg mt-2">{selectedKonsultan.harga}</Text>
                </View>
              </View>

              <View className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <Text className="text-gray-700 text-base leading-6">
                  {selectedKonsultan.deskripsi}
                </Text>
              </View>

              <View className="space-y-6">
                <View>
                  <Text className="text-lg font-bold text-gray-800 mb-3">Informasi Profesional</Text>
                  <View className="space-y-3">
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600">Rating</Text>
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={16} color="#f59e0b" />
                        <Text className="ml-1 font-semibold text-gray-800">{selectedKonsultan.rating}</Text>
                        <Text className="ml-1 text-gray-500">({selectedKonsultan.totalUlasan} ulasan)</Text>
                      </View>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600">Pengalaman</Text>
                      <Text className="font-semibold text-gray-800">{selectedKonsultan.pengalaman}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600">Total Klien</Text>
                      <Text className="font-semibold text-gray-800">{selectedKonsultan.totalKlien}+ klien</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600">Jam Konsultasi</Text>
                      <Text className="font-semibold text-gray-800">{selectedKonsultan.totalJamKonsultasi}</Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-gray-600">Tingkat Kepuasan</Text>
                      <Text className="font-semibold text-gray-800">{selectedKonsultan.kepuasan}%</Text>
                    </View>
                  </View>
                </View>

                <View>
                  <Text className="text-lg font-bold text-gray-800 mb-3">Bidang Keahlian</Text>
                  <View className="flex-row flex-wrap gap-2">
                    {selectedKonsultan.keahlian.map((skill: string, index: number) => (
                      <View key={index} className="bg-blue-100 px-3 py-2 rounded-full">
                        <Text className="text-blue-800 text-sm font-medium">{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View>
                  <Text className="text-lg font-bold text-gray-800 mb-3">Pendidikan & Sertifikasi</Text>
                  <View className="space-y-2">
                    <Text className="text-gray-700">{selectedKonsultan.pendidikan}</Text>
                    <View className="flex-row flex-wrap gap-2 mt-2">
                      {selectedKonsultan.sertifikasi.map((cert: string, index: number) => (
                        <View key={index} className="bg-green-100 px-3 py-1 rounded-full">
                          <Text className="text-green-800 text-xs">{cert}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>

        <View className="p-6 border-t border-gray-200">
          <TouchableOpacity 
            onPress={() => {
              setShowDetailModal(false);
              handleStartChat(selectedKonsultan!);
            }}
            className="bg-orange-500 py-4 rounded-xl items-center active:bg-orange-600 mb-3"
          >
            <Text className="text-white font-bold text-lg">Mulai Konsultasi</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => handleShareKonsultan(selectedKonsultan!)}
            className="bg-blue-500 py-4 rounded-xl items-center active:bg-blue-600"
          >
            <Text className="text-white font-bold text-lg">Bagikan Konsultan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );

  // Modal Chat
  const renderChatModal = () => (
    <Modal
      visible={showChatModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowChatModal(false)}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <View className="flex-row items-center flex-1">
            <TouchableOpacity onPress={() => setShowChatModal(false)} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="#6b7280" />
            </TouchableOpacity>
            <Image 
              source={selectedKonsultan?.foto} 
              className="max-w-12 max-h-12 rounded-full border-2 border-indigo-100" 
            />
            <View className="ml-3 flex-1">
              <Text className="text-lg font-bold text-gray-800">{selectedKonsultan?.name}</Text>
              <Text className="text-green-500 text-sm">Online</Text>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 p-4">
          <View className="space-y-4">
            {chatMessages.map((message, index) => (
              <View
                key={index}
                className={`flex-row ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <View
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.isUser
                      ? 'bg-orange-500 rounded-br-none'
                      : 'bg-gray-100 rounded-bl-none'
                  }`}
                >
                  <Text
                    className={`text-base ${
                      message.isUser ? 'text-white' : 'text-gray-800'
                    }`}
                  >
                    {message.text}
                  </Text>
                  <Text
                    className={`text-xs mt-1 ${
                      message.isUser ? 'text-orange-200' : 'text-gray-500'
                    }`}
                  >
                    {message.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View className="p-4 border-t border-gray-200">
          <View className="flex-row items-center">
            <TextInput
              className="flex-1 border border-gray-300 rounded-full px-4 py-3 mr-3"
              placeholder="Ketik pesan..."
              value={chatMessage}
              onChangeText={setChatMessage}
              multiline
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bg-orange-500 w-12 h-12 rounded-full items-center justify-center active:bg-orange-600"
              disabled={!chatMessage.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );

  // Modal Share Options
  const renderShareModal = () => (
    <Modal
      visible={showShareModal}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowShareModal(false)}
    >
      <TouchableOpacity 
        className="flex-1 bg-black/50 justify-end"
        activeOpacity={1}
        onPress={() => setShowShareModal(false)}
      >
        <TouchableOpacity activeOpacity={1}>
          <View className="bg-white rounded-t-3xl p-6">
            <Text className="text-xl font-bold text-gray-800 text-center mb-6">
              Bagikan {selectedKonsultan?.name}
            </Text>
            
            <View className="flex-row justify-around mb-6">
              <TouchableOpacity 
                className="items-center"
                onPress={() => {
                  setShowShareModal(false);
                  handleShareKonsultan(selectedKonsultan!);
                }}
              >
                <View className="bg-blue-100 w-16 h-16 rounded-2xl items-center justify-center mb-2">
                  <Ionicons name="share-social" size={28} color="#3b82f6" />
                </View>
                <Text className="text-gray-700 font-medium">Share</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="items-center"
                onPress={() => {
                  setShowShareModal(false);
                  // Simpan ke clipboard atau action lainnya
                  Alert.alert("Berhasil!", "Link konsultan disalin ke clipboard");
                }}
              >
                <View className="bg-green-100 w-16 h-16 rounded-2xl items-center justify-center mb-2">
                  <Ionicons name="link" size={28} color="#10b981" />
                </View>
                <Text className="text-gray-700 font-medium">Copy Link</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                className="items-center"
                onPress={() => {
                  setShowShareModal(false);
                  // Action untuk WhatsApp
                  Alert.alert("Info", "Fitur WhatsApp akan segera tersedia");
                }}
              >
                <View className="bg-green-100 w-16 h-16 rounded-2xl items-center justify-center mb-2">
                  <Ionicons name="logo-whatsapp" size={28} color="#25D366" />
                </View>
                <Text className="text-gray-700 font-medium">WhatsApp</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => setShowShareModal(false)}
              className="bg-gray-100 py-4 rounded-xl mt-4"
            >
              <Text className="text-center text-gray-700 font-semibold">Batal</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View className="bg-white px-6 pt-4 pb-6 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center space-x-4">
              <Image
                source={require("../../assets/images/Profile.jpg")}
                className="max-w-14 max-h-14 rounded-full border-2 border-indigo-100"
              />
              <View>
                <Text className="text-2xl font-bold text-gray-800">Halo, Elaina!</Text>
                <Text className="text-gray-500">Selamat berbelanja lagi bro</Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <TouchableOpacity className="relative" onPress={() => router.push("/Favorites")}>
                <Ionicons name="heart-outline" size={28} color="#1f2937" />
                {favorites.length > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
                    <Text className="text-white text-xs font-bold">{favorites.length}</Text>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity className="relative" onPress={() => router.push("/Cartpage")}>
                <Ionicons name="cart-outline" size={28} color="#1f2937" />
                {getCartItemsCount() > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
                    <Text className="text-white text-xs font-bold">
                      {getCartItemsCount() > 99 ? "99+" : getCartItemsCount()}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="px-6 mt-4">
          <View className="mt-8 items-center">
            <Text className="text-3xl font-bold text-gray-800">
              Konsultan UMKM <Text className="text-orange-500">Profesional</Text>
            </Text>
            <Text className="text-lg text-center text-gray-600 mt-3 mb-4 px-4">
              Pilih konsultan yang paling cocok untuk masalah Anda. Chat dulu, atau langsung booking sesi.
            </Text>
          </View>

          {/* Search Bar */}
          <View className="flex-row items-center rounded-xl px-5 py-4 border-2 border-orange-300 mt-8 bg-white shadow-sm">
            <Ionicons name="search" size={20} color="#9ca3af" className="mr-3" />
            <TextInput
              className="flex-1 text-base text-gray-800"
              placeholder="Cari konsultan, spesialisasi, atau lokasi..."
              placeholderTextColor="#9ca3af"
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Ionicons name="close-circle" size={22} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter Toggle Button */}
          <View className="mt-4">
            <TouchableOpacity
              onPress={handleFilterToggle}
              className="flex-row items-center justify-between bg-orange-50 border-2 border-orange-300 rounded-xl px-5 py-4 active:bg-orange-100"
            >
              <View className="flex-row items-center">
                <Ionicons name="options-outline" size={22} color="#ea580c" />
                <Text className="ml-3 font-bold text-orange-700">Filter & Urutkan</Text>
                {hasActiveFilter && (
                  <View className="ml-3 bg-orange-600 px-2.5 py-1 rounded-full">
                    <Text className="text-white text-xs font-bold">Aktif</Text>
                  </View>
                )}
              </View>
              <Animated.View style={rotateStyle}>
                <Ionicons name="chevron-down" size={22} color="#ea580c" />
              </Animated.View>
            </TouchableOpacity>

            {showFilter && (
              <Animated.View 
                style={[
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-20, 0],
                        }),
                      },
                    ],
                  }
                ]}
              >
                <View className="mt-4 bg-white border-2 border-orange-300 rounded-xl shadow-2xl">
                  <View className="p-5">
                    {/* Spesialisasi */}
                    <Text className="font-bold text-gray-800 mb-3 text-lg">Spesialisasi</Text>
                    <View className="flex-row flex-wrap gap-2 mb-6">
                      {["Semua Spesialisasi", "Pemasaran Digital", "Manajemen Keuangan", "Branding & Desain", "Konten Kreator", "Operasional & Logistik", "HR & Pengembangan Tim"].map((item) => (
                        <TouchableOpacity
                          key={item}
                          onPress={() => setSelectedSpesialis(item)}
                          className={`px-4 py-2 rounded-full border ${
                            selectedSpesialis === item 
                              ? "bg-orange-500 border-orange-500" 
                              : "bg-white border-orange-300"
                          }`}
                        >
                          <Text className={
                            selectedSpesialis === item 
                              ? "text-white font-semibold" 
                              : "text-gray-700"
                          }>
                            {item}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {/* Urutkan */}
                    <Text className="font-bold text-gray-800 mb-3 text-lg">Urutkan</Text>
                    <View className="space-y-3 mb-6">
                      {[
                        { label: "Rating Tertinggi", value: "Rating Tertinggi" },
                        { label: "Pengalaman Terbanyak", value: "Pengalaman Terbanyak" },
                      ].map((opt) => (
                        <TouchableOpacity 
                          key={opt.value} 
                          onPress={() => setSortBy(opt.value)} 
                          className="flex-row items-center py-2 active:opacity-70"
                        >
                          <View className={`w-6 h-6 rounded-full border-2 mr-4 justify-center items-center ${
                            sortBy === opt.value 
                              ? "border-orange-500 bg-orange-500" 
                              : "border-gray-400 bg-white"
                          }`}>
                            {sortBy === opt.value && (
                              <Ionicons name="checkmark" size={16} color="white" />
                            )}
                          </View>

                          <Text className={`ml-2 text-base ${
                            sortBy === opt.value ? "text-orange-600 font-semibold" : "text-gray-700"
                          }`}>
                            {opt.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>

                    {hasActiveFilter && (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedSpesialis("Semua Spesialisasi");
                          setSortBy("Rating Tertinggi");
                        }}
                        className="bg-gray-100 py-3 rounded-xl border border-gray-300 active:bg-gray-200"
                      >
                        <Text className="text-center font-bold text-gray-700 text-base">Reset Filter</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </Animated.View>
            )}
          </View>

          {/* Daftar Konsultan */}
          <View className="mt-8 mb-10">
            <Text className="text-gray-700 font-medium text-base">
              Menampilkan {filteredAndSortedList.length} dari {konsultanList.length} konsultan
            </Text>

            <View className="mt-6 space-y-5 mb-10">
              {filteredAndSortedList.map((konsultan) => (
                <View 
                  key={konsultan.id} 
                  className="border border-orange-600 rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <View className="p-5 flex-row items-center">
                    <Image source={konsultan.foto} className="max-w-16 max-h-16 rounded-xl border-2 border-indigo-100" />
                    <View className="ml-4 flex-1">
                      <Text className="text-lg font-bold text-gray-800">{konsultan.name}</Text>
                      <Text className="text-gray-500 text-sm">{konsultan.spesialis}</Text>
                      <Text className="text-orange-500 font-bold mt-2">{konsultan.harga}</Text>
                    </View>
                    <View className="flex-row gap-3">
                      <TouchableOpacity className="p-2 border border-gray-300 rounded-xl active:bg-gray-100">
                        <Ionicons name="heart-outline" size={26} color="#1f2937" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        className="p-2 border border-gray-300 rounded-xl active:bg-gray-100"
                        onPress={() => handleOpenShareModal(konsultan)}
                      >
                        <Ionicons name="share-outline" size={26} color="#1f2937" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center px-5 mb-3">
                    <View className="flex-row items-center bg-orange-50 border border-orange-200 rounded-lg py-2 px-4">
                      <Ionicons name="star" size={18} color="#f59e0b" />
                      <Text className="ml-2 font-bold text-orange-700">{konsultan.rating}</Text>
                      <Text className="ml-1 text-xs text-orange-600">({konsultan.totalUlasan})</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="briefcase-outline" size={18} color="#6b7280" />
                      <Text className="ml-2 font-semibold text-gray-700">{konsultan.pengalaman}</Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center px-5 mb-3">
                    <View className="flex-row items-center bg-blue-50 border border-blue-200 rounded-lg py-2 px-4">
                      <Ionicons name="people-outline" size={18} color="#2563eb" />
                      <Text className="ml-2 font-bold text-blue-700">{konsultan.totalKlien}+ Klien</Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={18} color="#16a34a" />
                      <Text className="ml-2 font-semibold text-green-700">{konsultan.kecepatanRespons}</Text>
                    </View>
                  </View>

                  <View className="flex-row justify-between items-center px-5 mb-4">
                    <View className="flex-row items-center">
                      <Ionicons name="location-outline" size={18} color="#ef4444" />
                      <Text className="ml-2 text-gray-600 font-medium">{konsultan.lokasi}</Text>
                    </View>
                    <Text className="text-xs text-gray-500">{konsultan.totalJamKonsultasi} konsultasi</Text>
                  </View>

                  <View className="px-5 pb-5 mb-5">
                    <View className="flex-row space-x-3">
                      <TouchableOpacity 
                        onPress={() => handleStartChat(konsultan)}
                        className="flex-1 bg-orange-500 py-4 rounded-xl items-center active:bg-orange-600 active:scale-95"
                      >
                        <Text className="text-white font-bold text-base">Chat Sekarang</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => handleShowDetail(konsultan)}
                        className="flex-1 border-2 border-orange-500 py-4 rounded-xl items-center bg-white active:bg-orange-50 active:scale-95"
                      >
                        <Text className="text-orange-500 font-bold text-base">Lihat Detail</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modals */}
      {renderDetailModal()}
      {renderChatModal()}
      {renderShareModal()}
    </SafeAreaView>
  );
}