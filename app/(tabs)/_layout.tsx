import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Animated, Dimensions } from "react-native";
import { useEffect, useRef } from "react";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 80,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 8,
          position: 'absolute',
        },
        tabBarActiveTintColor: '#2563eb', // blue-600
        tabBarInactiveTintColor: '#64748b', // slate-500
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          marginBottom: 8,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
      initialRouteName="Homepage"
    >
      <Tabs.Screen
        name="Konsultan"
        options={{
          title: "Konsultan",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              focused={focused}
              iconName={focused ? "search" : "search-outline"}
              color={color}
              size={size}
              label="Konsultan"
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Homepage"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              focused={focused}
              iconName={focused ? "home" : "home-outline"}
              color={color}
              size={size}
              label="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="RumahUMKM"
        options={{
          title: "Rumah UMKM",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon 
              focused={focused}
              iconName={focused ? "business" : "business-outline"}
              color={color}
              size={size}
              label="Rumah UMKM"
            />
          ),
        }}
      />
    </Tabs>
  );
}

interface TabBarIconProps {
  focused: boolean;
  iconName: string;
  color: string;
  size: number;
  label: string;
}

function TabBarIcon({ focused, iconName, color, size, label }: TabBarIconProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (focused) {
      // Animation sequence for focused state
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1.2,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.8,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      // Reset to normal state
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  return (
    <Animated.View 
      style={{ 
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
      }}
      className="items-center justify-center flex-1"
    >
      {/* Active Indicator */}
      {focused && (
        <Animated.View 
          className="absolute -top-2 w-12 h-1 bg-blue-600 rounded-full"
          style={{
            transform: [{
              translateY: opacityAnim.interpolate({
                inputRange: [0.8, 1],
                outputRange: [0, -2],
              })
            }]
          }}
        />
      )}
      
      {/* Icon Container with subtle background when focused */}
      <View className={`items-center justify-center p-2 rounded-2xl ${
        focused ? 'bg-blue-50' : ''
      }`}>
        <Ionicons 
          name={iconName as any} 
          size={focused ? size + 2 : size} 
          color={color} 
        />
      </View>
      
      {/* Subtle pulse animation for active tab */}
      {focused && (
        <Animated.View 
          className="absolute inset-0 bg-blue-100 rounded-2xl"
          style={{
            opacity: opacityAnim.interpolate({
              inputRange: [0.8, 1],
              outputRange: [0.3, 0],
            }),
            transform: [{ scale: scaleAnim }],
          }}
        />
      )}
    </Animated.View>
  );
}

export function ProfessionalTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          height: 85,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 12,
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          overflow: 'hidden',
        },
        tabBarActiveTintColor: '#7c3aed', // violet-600
        tabBarInactiveTintColor: '#64748b',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginBottom: 6,
        },
      }}
      initialRouteName="Homepage"
    >
      <Tabs.Screen
        name="Konsultan"
        options={{
          title: "Konsultan",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon 
              focused={focused}
              iconName={focused ? "search" : "search-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Homepage"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <FloatingTabIcon 
              focused={focused}
              iconName={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="RumahUMKM"
        options={{
          title: "UMKM",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon 
              focused={focused}
              iconName={focused ? "business" : "business-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function AnimatedTabIcon({ focused, iconName, color, size }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: focused ? 1.15 : 1,
      useNativeDriver: true,
      tension: 150,
      friction: 12,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Ionicons 
        name={iconName as any} 
        size={focused ? size + 1 : size} 
        color={color} 
      />
    </Animated.View>
  );
}

// Floating icon 
function FloatingTabIcon({ focused, iconName, color, size }: any) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1.3,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: -8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.spring(translateYAnim, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused]);

  return (
    <Animated.View 
      style={{ 
        transform: [
          { scale: scaleAnim },
          { translateY: translateYAnim }
        ],
      }}
      className={`items-center justify-center w-14 h-14 rounded-2xl ${
        focused ? 'bg-violet-600 shadow-lg' : 'bg-slate-100'
      }`}
    >
      <Ionicons 
        name={iconName as any} 
        size={focused ? size + 4 : size + 2} 
        color={focused ? '#ffffff' : color} 
      />
    </Animated.View>
  );
}