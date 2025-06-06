import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFavorites } from 'lib/context/FavoritesContext';
import { useTheme } from 'lib/context/ThemeContext'; // Importamos el contexto de tema
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
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme(); // Obtenemos el tema actual y la función para cambiarlo

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
    router.replace(path);
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
    <View key={item.path ?? item.title} className={`ml-${level * 4}`}>
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
          <FontAwesome
            name={item.icon as any}
            size={20 - level * 2}
            color={theme === 'dark' ? '#818cf8' : '#f97316'}
          />
        </View>
        <Text
          className={`ml-4 text-${level === 0 ? 'xl' : level === 1 ? 'lg' : 'md'} dark:text-dark-text text-black`}>
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
      {/* Primero colocamos el overlay que ocupa toda la pantalla */}
      {isOpen && (
        <TouchableOpacity
          onPress={onClose}
          className="absolute bottom-0 left-0 right-0 top-0 bg-black/50"
          activeOpacity={1}
        />
      )}
      <Animated.View
        style={{ transform: [{ translateX: slideAnim }], zIndex: 10 }}
        className="bg-rick-200 dark:bg-dark-card h-full w-72 p-5 shadow-lg">
        {/* Header con título y botón de toggle */}
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="dark:text-dark-text text-3xl font-bold text-black">Menu</Text>

          {/* Toggle de tema */}
          <TouchableOpacity
            hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
            onPress={toggleTheme}
            className="bg-rick-300 dark:bg-dark-accent h-10 w-10 items-center justify-center rounded-full"
            activeOpacity={0.7}>
            <FontAwesome
              name={theme === 'dark' ? 'sun-o' : 'moon-o'}
              size={20}
              color={theme === 'dark' ? '#ffffff' : '#000000'}
            />
          </TouchableOpacity>
        </View>

        {/* Envolvemos el contenido del menú en un ScrollView */}
        <ScrollView className="flex-1 px-2">
          <View>{dynamicMenuItems.map((item) => renderMenuItem(item))}</View>
          {/* Añadimos espacio en la parte inferior para el botón de salir */}
          <View style={{ height: 80 }} />
        </ScrollView>

        {/* El botón de salir permanece fijo en la parte inferior */}
        <View className="bg-rick-300 dark:bg-dark-accent absolute bottom-0 left-0 right-0 px-5 py-4">
          <TouchableOpacity onPress={handleExit} className="flex-row items-center justify-end">
            <FontAwesome
              name="sign-out"
              size={31}
              color={theme === 'dark' ? '#ffffff' : '#000000'}
            />
            <Text className="dark:text-dark-text ml-4 text-2xl font-bold text-black">
              Salir de la App
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
