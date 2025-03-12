import { FontAwesome } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CharacterGoogleSearch() {
  const { image, name } = useLocalSearchParams();
  const imageUrl = Array.isArray(image) ? image[0] : image;
  const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent('Rick and Morty Character: ' + name)}`;

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
        <WebView source={{ uri: googleSearchUrl }} />
      </View>
    </View>
  );
}

function CharacterImage({ image }: { image: string }) {
  return (
    <View className="flex-row items-center">
      <TouchableOpacity
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={() => router.back()}
        className="mr-4 flex-row items-center">
        <FontAwesome name="arrow-left" size={20} color="black" />
      </TouchableOpacity>
      <Image source={{ uri: image }} className="m-2 mr-4 h-16 w-16 rounded-full" />
    </View>
  );
}
