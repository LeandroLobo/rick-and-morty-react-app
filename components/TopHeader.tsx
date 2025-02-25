import { View, Text, Image } from 'react-native';

import favicon from '../assets/favicon.png';

export function TopHeader() {
  return (
    <View className="flex-row items-center justify-evenly pb-2">
      <Image source={favicon} className="h-10 w-10" />
      <Text className="text-3xl font-bold">Rick and Morty Wiki</Text>
    </View>
  );
}
