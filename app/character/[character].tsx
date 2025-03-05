import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function CharacterDetail() {
  const { id, name } = useLocalSearchParams();

  return (
    <View className="flex-1 items-center justify-center">
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
      <Text className="text-3xl">Character Detail</Text>
      <Text>Name: {name}</Text>
      <Text>ID: {id}</Text>
    </View>
  );
}
