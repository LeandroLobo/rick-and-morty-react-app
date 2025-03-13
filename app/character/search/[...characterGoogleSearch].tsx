import { FontAwesome } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, Alert, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CharacterGoogleSearch() {
  const { image, name } = useLocalSearchParams();
  const imageUrl = Array.isArray(image) ? image[0] : image;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent('Rick and Morty Character: ' + name)}`;
  const [currentUrl, setCurrentUrl] = useState(googleSearchUrl);
  const webViewRef = useRef<WebView>(null);

  // Esta función determina si se debe cargar una URL
  const shouldStartLoadWithRequest = (request: any) => {
    // Permitimos Google o las URLs que contengan "google" (para resultados de búsqueda)
    if (
      request.url.includes('google.com') ||
      request.url.includes('gstatic.com') ||
      request.url.includes('googleapis.com')
    ) {
      setCurrentUrl(request.url);
      return true;
    }

    // Para cualquier otro dominio, mostramos un mensaje y bloqueamos la navegación
    Alert.alert('Navegación bloqueada', 'Solo se pueden ver resultados de Google en esta vista.', [
      { text: 'Entendido', style: 'cancel' },
    ]);
    return false;
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#f97316',
        overflow: 'hidden',
      }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: '#f97316',
          },
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          headerShadowVisible: true,
          headerTitleStyle: {
            fontSize: 22,
          },
          headerTitle: String(name),
          headerLeft: () => <CharacterImage image={imageUrl} />,
        }}
      />
      <View
        style={{
          flex: 1,
          borderRadius: 16,
          overflow: 'hidden',
        }}>
        <WebView
          ref={webViewRef}
          source={{ uri: currentUrl }}
          onShouldStartLoadWithRequest={shouldStartLoadWithRequest}
          // Para iOS y Android, asegúrate de usar ambas propiedades
          onNavigationStateChange={(navState) => {
            // Si estamos en iOS, este evento también se dispara
            // y podemos usar la misma lógica
            if (Platform.OS === 'ios') {
              if (!shouldStartLoadWithRequest(navState)) {
                // Si no permitimos la navegación, volvemos a la URL anterior
                webViewRef.current?.goBack();
              }
            }
          }}
        />

        {/* Opcionalmente, puedes agregar botones de navegación para el WebView */}
        <View className="absolute bottom-4 right-4 flex-row">
          <TouchableOpacity
            onPress={() => webViewRef.current?.goBack()}
            className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-orange-500">
            <FontAwesome name="arrow-left" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => webViewRef.current?.reload()}
            className="h-12 w-12 items-center justify-center rounded-full bg-orange-500">
            <FontAwesome name="refresh" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function CharacterImage({ image }: { image: string }) {
  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        onPress={() => router.back()}
        className="mr-4 flex-row items-center">
        <FontAwesome name="arrow-left" size={20} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: image }} className="m-2 mr-4 h-16 w-16 rounded-full" />
    </View>
  );
}
