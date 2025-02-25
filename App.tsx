// import * as SplashScreen from 'expo-splash-screen';
import { Main } from 'components/Main';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './global.css';

export default function App() {
  // React.useEffect(() => {
  //   async function prepare() {
  //     try {
  //       // Mantén el splash screen visible
  //       await SplashScreen.preventAutoHideAsync();
  //       // Simula una carga de recursos (por ejemplo, 3 segundos)
  //       await new Promise((resolve) => setTimeout(resolve, 3000));
  //     } catch (e) {
  //       console.warn(e);
  //     } finally {
  //       // Oculta el splash screen
  //       await SplashScreen.hideAsync();
  //     }
  //   }

  //   prepare();
  // }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar style="light" hidden />
        <Main />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
