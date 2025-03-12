import SidebarMenu from 'components/SidebarMenu';
import { TopHeaderLogo } from 'components/TopHeaderLogo';
import { SplashScreen, Stack } from 'expo-router';
import { FavoritesProvider } from 'lib/favoritesContext';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';

import SidebarMenuButton from '../components/SidebarMenuButton';
import '../global.css';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
    }
    prepare();
  }, []);

  return (
    <FavoritesProvider>
      <SafeAreaView className="flex-1">
        <View className="center flex-1 bg-orange-200">
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#fed7aa',
              },
              headerTitle: 'Rick & Morty ::: Wiki',
              headerLeft: () => <TopHeaderLogo />,
              headerRight: () => <SidebarMenuButton setMenuOpen={setMenuOpen} />,
            }}
          />
          {menuOpen && <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
        </View>
      </SafeAreaView>
    </FavoritesProvider>
  );
}
