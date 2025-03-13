import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites } from 'lib/favoritesContext';
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';

interface MenuItem {
  title: string;
  path?: string;
  icon: string;
  disabled?: boolean;
  children?: MenuItem[];
}

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
  const router = useRouter(); // 🛠️ Hook de navegación de expo-router
  const slideAnim = useRef(new Animated.Value(-250)).current;

  const { favorites } = useFavorites();

  const getFavoritesMenuItem = (): MenuItem => {
    const favoritesMenu: MenuItem = {
      title: 'Personajes Favoritos',
      icon: 'heart',
      children: favorites.map((char) => ({
        title: char.name,
        path: `/character/${char.id}`,
        icon: 'caret-right',
        disabled: false,
      })),
    };

    // Si no hay favoritos, mostrar un mensaje
    if (favorites.length === 0) {
      favoritesMenu.children = [
        {
          title: 'No hay favoritos',
          icon: 'info-circle',
          disabled: true,
        },
      ];
    }

    return favoritesMenu;
  };

  // Crear menú dinámico combinando los estáticos con los favoritos
  const dynamicMenuItems: MenuItem[] = [
    { title: 'Personajes', path: '/', icon: 'list-ul' },
    { title: 'Historia', path: '/historia', icon: 'book' },
    { title: 'Acerca de la App', path: '/about', icon: 'info' },
    getFavoritesMenuItem(),
  ];

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

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleExit = () => {
    Alert.alert('Salir de la aplicación', '¿Estás seguro de que quieres salir?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Salir', onPress: () => BackHandler.exitApp() },
    ]);
  };

  const renderMenuItem = (item: MenuItem, level = 0) => (
    <View key={item.title} className={`ml-${level * 4}`}>
      {/* Botón principal */}
      <TouchableOpacity
        onPress={() =>
          item.children
            ? toggleSection(item.title)
            : item.disabled
              ? () => {}
              : navigateTo(item.path!)
        }
        className="mb-3 flex-row items-center">
        <View className="w-6 items-center">
          <FontAwesome name={item.icon as any} size={20 - level * 2} color="#f97316" />
        </View>
        <Text className={`ml-4 text-${level === 0 ? 'xl' : level === 1 ? 'lg' : 'md'} text-black`}>
          {item.title}
        </Text>
      </TouchableOpacity>

      {/* Renderizar hijos si existen y están abiertos */}
      {item.children && openSections[item.title] && (
        <View className="ml-4">
          {item.children.map((child) => renderMenuItem(child, level + 1))}
        </View>
      )}
    </View>
  );

  return (
    <View className="absolute left-0 top-0 h-full w-full flex-row">
      <Animated.View
        style={{ transform: [{ translateX: slideAnim }] }}
        className="h-full w-72 bg-orange-200 p-5 shadow-lg">
        <Text className="mb-4 text-3xl font-bold text-black">Menu</Text>

        {/* Envolvemos el contenido del menú en un ScrollView */}
        <ScrollView className="flex-1 px-2">
          <View>{dynamicMenuItems.map((item) => renderMenuItem(item))}</View>
          {/* Añadimos espacio en la parte inferior para el botón de salir */}
          <View style={{ height: 80 }} />
        </ScrollView>

        {/* El botón de salir permanece fijo en la parte inferior */}
        <View className="absolute bottom-0 left-0 right-0 bg-orange-300 px-5 py-4">
          <TouchableOpacity onPress={handleExit} className="flex-row items-center justify-end">
            <FontAwesome name="sign-out" size={31} color="#000" />
            <Text className="ml-4 text-2xl font-bold text-black">Salir de la App</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {isOpen && <TouchableOpacity onPress={onClose} className="flex-1" activeOpacity={1} />}
    </View>
  );
}
