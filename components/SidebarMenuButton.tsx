import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'lib/context/ThemeContext';
import React from 'react';
import { TouchableOpacity } from 'react-native';

interface SidebarMenuButtonProps {
  setMenuOpen: (open: boolean) => void;
}

export default function SidebarMenuButton({ setMenuOpen }: SidebarMenuButtonProps) {
  const { theme } = useTheme();

  // Determinar el color del icono basado en el tema
  const iconColor = theme === 'dark' ? '#f9fafb' : '#000000'; // dark-text : black

  return (
    <TouchableOpacity
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={() => setMenuOpen(true)}
      className="flex-row items-center justify-center rounded-full p-2">
      <FontAwesome name="bars" size={24} color={iconColor} />
    </TouchableOpacity>
  );
}
