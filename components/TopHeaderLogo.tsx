import { View, Image } from 'react-native';

import favicon from '../assets/ricksanchez.png';

export function TopHeaderLogo() {
  return (
    <View className="flex-row items-center justify-evenly">
      <Image source={favicon} className="mr-4 h-8 w-8" />
    </View>
  );
}
