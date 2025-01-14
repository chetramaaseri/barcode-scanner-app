import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { TextInput as PaperTextInput, TextInputProps as PaperTextInputProps } from 'react-native-paper';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AppScale } from '@/AppScale';

export type ThemedTextInputProps = PaperTextInputProps & {
    lightColor?: string;
    darkColor?: string;
    size?: string;
    mode?: 'outlined' | 'flat';
    style?: StyleProp<TextStyle>;
};

export function ThemedTextInput({
    mode = 'outlined',
    size = 'default',
    style,
    lightColor,
    darkColor,
    ...otherProps
}: ThemedTextInputProps) {
    const primaryColor = useThemeColor({ light: lightColor, dark: darkColor }, 'lightText');
    const lightBackground = useThemeColor({ light: lightColor, dark: darkColor }, 'lightBackground');

    return (
        <PaperTextInput
            mode={mode}
            style={[
                { backgroundColor : lightBackground, paddingHorizontal : AppScale(5)},
                size === 'default' ? styles.default : undefined,
                style,
            ]}
            outlineColor={primaryColor}
            textColor={primaryColor}
            placeholderTextColor={primaryColor}
            {...otherProps}
        />
    );
}

const styles = StyleSheet.create({
    default: {
        height: AppScale(50)
    },
});

