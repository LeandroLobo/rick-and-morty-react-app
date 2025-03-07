import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function CharacterDetail() {
  const { id, name } = useLocalSearchParams();
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
          headerBackTitle: 'Back',
          headerBackVisible: true,
          headerTintColor: 'black',
          headerTitle: String(name),
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
