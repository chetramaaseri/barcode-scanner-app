import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { AppScale } from '@/AppScale';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'heading' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'heading' ? styles.heading : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: AppScale(16),
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: AppScale(16),
    lineHeight: 24,
    fontWeight: '600',
  },
  heading: {
    fontSize: AppScale(64),
    fontFamily : 'UbuntuBold',
    lineHeight: 60,
  },
  title: {
    fontSize: AppScale(32),
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: AppScale(20),
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: AppScale(16),
    color: '#0a7ea4',
    textDecorationLine : 'underline'
  },
});
