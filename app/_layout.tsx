import SidebarMenu from 'components/SidebarMenu';
import { TopHeaderLogo } from 'components/TopHeaderLogo';
import { SplashScreen, Stack } from 'expo-router';
import { FavoritesProvider } from 'lib/context/FavoritesContext';
import { ThemeProvider, useTheme } from 'lib/context/ThemeContext';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';

import SidebarMenuButton from '../components/SidebarMenuButton';

import '../global.css';

// Variable global para controlar si ya se configuró la barra de estado
let statusBarConfigured = false;

// Componente interno para acceder al contexto de tema
function AppLayoutWithTheme() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme();

  // Eliminamos completamente la configuración de la barra de estado de este componente
  // Ya que lo manejaremos exclusivamente desde el componente raíz

  return (
    <SafeAreaView className="flex-1">
      <FavoritesProvider>
        <View className="bg-rick-50 dark:bg-dark-background flex-1">
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: theme === 'dark' ? '#374151' : '#fed7aa', // dark-card : rick-200
              },
              headerTitleStyle: {
                color: theme === 'dark' ? '#f9fafb' : '#000000', // dark-text : black
              },
              headerTitle: 'Rick & Morty ::: Wiki',
              headerLeft: () => <TopHeaderLogo />,
              headerRight: () => <SidebarMenuButton setMenuOpen={setMenuOpen} />,
            }}
          />
          {menuOpen && <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
        </View>
      </FavoritesProvider>
    </SafeAreaView>
  );
}

export default function Layout() {
  // Configuramos la barra de estado una sola vez, al inicio de la aplicación
  useEffect(() => {
    // Si ya se configuró la barra de estado, no hacemos nada
    if (statusBarConfigured) return;

    // Configuramos la barra de estado
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#fed7aa');
      StatusBar.setTranslucent(false);
    }

    // Marcamos que ya se configuró para no volver a hacerlo
    statusBarConfigured = true;

    // Patching StatusBar methods to prevent changes
    const originalSetBarStyle = StatusBar.setBarStyle;
    const originalSetBackgroundColor = StatusBar.setBackgroundColor;

    // Override the methods to prevent further changes
    StatusBar.setBarStyle = function (style) {
      if (!statusBarConfigured) {
        originalSetBarStyle(style);
      }
      // If already configured, do nothing
    };

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor = function (color) {
        if (!statusBarConfigured) {
          originalSetBackgroundColor(color);
        }
        // If already configured, do nothing
      };
    }

    // Para la carga inicial y el splash screen
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 2000);
    }
    prepare();
  }, []);

  return (
    <>
      {/* Componente StatusBar fijo que no cambia */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fed7aa"
        translucent={false}
        animated={false}
      />
      <ThemeProvider>
        <AppLayoutWithTheme />
      </ThemeProvider>
    </>
  );
}
