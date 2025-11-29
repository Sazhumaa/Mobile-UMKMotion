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
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useRef, useEffect } from "react";
import dataProduk from "./data/product";
import { useCart } from "./hooks/useCart";
import { Ionicons } from "@expo/vector-icons";


export default function Profile () {
    return (
        <>
            <SafeAreaView className="flex-1 bg-white">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="px-4 py-4">
                        <View className="p-5 border border-gray-300 rounded-xl shadow-lg">
                            {/* Upload Foto */}
                            <View className="flex-row items-center">
                                <View className="">
                                    <Image
                                    source={require("../assets/images/Profile.jpg")}
                                    className="max-w-14 max-h-14 rounded-full border-2 border-indigo-100"
                                    />  
                                </View>
                                <View className="">
                                    <Text className="font-bold text-lg ml-5">Upload Foto Baru</Text>
                                    <Text>Minimal 800×800 px. Format JPG atau PNG.</Text>
                                </View>
                            </View>
                        </View>
                            {/* Biodata */}
                            <View className="mt-5 p-5 border border-gray-300 rounded-xl shadow-lg">
                                
                            </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}