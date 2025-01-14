import { ActivityIndicator, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type AppLoaderProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function AppLoader({ style, lightColor, darkColor }: AppLoaderProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return <View style={[{ flex:1, justifyContent:'center', backgroundColor }, style]}><ActivityIndicator animating={true} size={100}/></View>;
}
