import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// Define mappings for different icon sets
const ICON_MAPPING = {
  // MaterialIcons mappings
  'house.fill': { lib: MaterialIcons, name: 'home' },
  'paperplane.fill': { lib: MaterialIcons, name: 'send' },
  'profile.fill': { lib: MaterialIcons, name: 'person' },
  'chevron.left.forwardslash.chevron.right': { lib: MaterialIcons, name: 'code' },
  'chevron.right': { lib: MaterialIcons, name: 'chevron-right' },

  // AntDesign mappings
  'user': { lib: AntDesign, name: 'user' },
  'staro': { lib: AntDesign, name: 'staro' },

  // FontAwesome mappings
  'facebook': { lib: FontAwesome, name: 'facebook' },
  'twitter': { lib: FontAwesome, name: 'twitter' },
} as const;

export type IconSymbolName = keyof typeof ICON_MAPPING;

/**
 * An icon component that supports multiple libraries: MaterialIcons, AntDesign, FontAwesome, etc.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const iconData = ICON_MAPPING[name];

  if (!iconData) {
    console.warn(`Icon "${name}" not found in mappings.`);
    return null;
  }

  // Explicitly type as "any" to avoid TypeScript issues
  const IconComponent = iconData.lib as React.ComponentType<{
    name: string;
    size?: number;
    color?: string | OpaqueColorValue;
    style?: StyleProp<TextStyle>;
  }>;

  return <IconComponent name={iconData.name} size={size} color={color} style={style} />;
}
