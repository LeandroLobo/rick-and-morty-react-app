import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from 'lib/context/ThemeContext';
import { Platform } from 'react-native';

export default function TabsLayout() {
  const { theme } = useTheme();

  // Colores para el modo claro y oscuro
  const colors = {
    light: {
      background: '#f97316', // rick (naranja)
      active: '#fff7ed', // rick-50 (blanco)
      inactive: '#000000', // negro
    },
    dark: {
      background: '#374151', // dark-card (gris oscuro)
      active: '#f9fafb', // dark-text (blanco)
      inactive: '#9ca3af', // gris claro
    },
  };

  // Seleccionar el esquema de colores según el tema
  const currentColors = colors[theme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: 'bottom',
        tabBarActiveTintColor: currentColors.active,
        tabBarInactiveTintColor: currentColors.inactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          backgroundColor: currentColors.background,
          height: Platform.OS === 'ios' ? 88 : 60, // Altura más grande en iOS y Android
          paddingBottom: Platform.OS === 'ios' ? 28 : 12, // Espacio extra para iOS (safe area)
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Personajes',
          tabBarIcon: ({ color }) => <FontAwesome name="list-ul" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="historia"
        options={{
          title: 'Historia',
          tabBarIcon: ({ color }) => <FontAwesome name="book" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'App Info',
          tabBarIcon: ({ color }) => <FontAwesome name="info" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}
