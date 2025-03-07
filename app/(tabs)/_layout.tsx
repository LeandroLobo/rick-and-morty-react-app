import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: 'top',
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarStyle: {
          backgroundColor: '#f97316',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'App Info',
          tabBarIcon: ({ color }) => <FontAwesome name="info" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="otro"
        options={{
          title: 'Otro',
          tabBarIcon: ({ color }) => <FontAwesome name="circle" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
