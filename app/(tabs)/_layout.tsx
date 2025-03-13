import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: 'bottom',
        tabBarActiveTintColor: '#fff7ed',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        tabBarStyle: {
          backgroundColor: '#f97316',
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
          tabBarIcon: ({ color }) => <FontAwesome name="list-ul" size={26} color={color} />, // Icono más grande
        }}
      />
      <Tabs.Screen
        name="historia"
        options={{
          title: 'Historia',
          tabBarIcon: ({ color }) => <FontAwesome name="book" size={26} color={color} />, // Icono más grande
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'App Info',
          tabBarIcon: ({ color }) => <FontAwesome name="info" size={26} color={color} />, // Icono más grande
        }}
      />
    </Tabs>
  );
}
