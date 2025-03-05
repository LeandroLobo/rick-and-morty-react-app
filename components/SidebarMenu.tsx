import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, FlatList } from 'react-native';

// Define la interfaz para los items del menú
interface MenuItem {
  title: string;
  path: string;
  icon: string;
}

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems: MenuItem[] = [
  { title: 'Home', path: '/', icon: 'home' },
  { title: 'App Info', path: '/about', icon: 'info' },
  { title: 'Page 1', path: '/page1', icon: 'file' },
  { title: 'Page 2', path: '/page2', icon: 'book' },
  { title: 'Page 3', path: '/page3', icon: 'trash' },
  // Agrega más elementos aquí
];

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const router = useRouter(); // 🛠️ Hook de navegación de expo-router
  const slideAnim = useRef(new Animated.Value(-250)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -250,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const navigateTo = (path: string) => {
    onClose(); // Cierra el menú
    router.replace(path); // 📌 Navega con expo-router
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity onPress={() => navigateTo(item.path)} className="mb-3 flex-row items-center">
      <View className="w-6 items-center">
        {/* Icono dinámico de FontAwesome */}
        <FontAwesome name={item.icon as any} size={18} color="white" />
      </View>
      <Text className="ml-4 font-bold text-white">{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="absolute left-0 top-0 h-full w-full flex-row">
      <Animated.View
        style={{ transform: [{ translateX: slideAnim }] }}
        className="h-full w-64 bg-orange-500 p-5 shadow-lg">
        <Text className="mb-4 text-lg font-bold text-white">Pages List</Text>

        {/* FlatList para manejo eficiente de una lista larga */}
        <FlatList
          data={menuItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.path}
          className="flex-1"
        />
      </Animated.View>

      {isOpen && <TouchableOpacity onPress={onClose} className="flex-1" activeOpacity={1} />}
    </View>
  );
}
