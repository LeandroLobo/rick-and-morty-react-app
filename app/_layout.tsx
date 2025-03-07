import { FontAwesome } from '@expo/vector-icons';
import SidebarMenu from 'components/SidebarMenu';
import { TopHeaderLogo } from 'components/TopHeaderLogo';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import '../global.css';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync(); // Evita que se oculte automáticamente
      setTimeout(async () => {
        await SplashScreen.hideAsync(); // Oculta la splash después de 2 segundos
      }, 2000);
    }
    prepare();
  }, []);
  return (
    <View className="center flex-1">
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: '#dddddd',
          },
          headerTitle: 'Rick & Morty',
          headerLeft: () => <TopHeaderLogo />,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setMenuOpen(true)}
              className="flex-row items-center justify-center">
              <FontAwesome name="bars" size={24} color="black" />
              <Text className="ml-2 text-2xl">Menu</Text>
            </TouchableOpacity>
          ),
        }}
      />
      {/* Menú lateral (aparece al abrirlo) */}
      {menuOpen && <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
    </View>
  );
}
