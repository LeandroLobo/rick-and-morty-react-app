import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

interface SidebarMenuButtonProps {
  setMenuOpen: (open: boolean) => void;
}

export default function SidebarMenuButton({ setMenuOpen }: SidebarMenuButtonProps) {
  return (
    <TouchableOpacity
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={() => setMenuOpen(true)}
      className="flex-row items-center justify-center">
      <FontAwesome name="gears" size={32} color="black" />
    </TouchableOpacity>
  );
}
