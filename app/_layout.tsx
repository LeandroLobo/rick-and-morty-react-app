import { TopHeader } from 'components/TopHeader';
import { Slot } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View className="flex-1">
      <TopHeader />
      <Slot />
    </View>
  );
}
