import React from 'react';
import { StyleSheet, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';
import { Button, type ButtonProps } from 'react-native-paper';
import { useThemeColor } from '@/hooks/useThemeColor';
import { AppScale } from '@/AppScale';

export type ThemedButtonProps = ButtonProps & {
    lightColor?: string;
    darkColor?: string;
    buttonStyle?: 'default' | 'hollow';
    contentStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

export function ThemedButton({
    lightColor,
    darkColor,
    contentStyle,
    textStyle,
    style,
    buttonStyle = 'default',
    mode = 'contained',
    ...otherProps
}: ThemedButtonProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const buttonBackground = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonBackground');
    const buttonTextColor = useThemeColor({ light: lightColor, dark: darkColor }, 'buttonText');
    const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
    return (
        <Button
            {...otherProps}
            contentStyle={[
                buttonStyle === 'default' ? contentStyles.default : undefined,
                contentStyle
            ]}
            labelStyle={[
                buttonStyle === 'default' ? labelStyles.default : undefined,
                textStyle
            ]}
            style={[
                buttonStyle === 'default' ? buttonStyles.default : undefined,
                style
            ]}
            mode={mode}
            buttonColor={buttonStyle !== 'hollow'? buttonBackground : 'transparent'}
            textColor={buttonStyle !== 'hollow'? buttonTextColor : textColor}
            rippleColor={backgroundColor}
        />
    );
}

const contentStyles = StyleSheet.create({
    default: {
        paddingVertical: AppScale(3),
    }
});
const labelStyles = StyleSheet.create({
    default: {
        fontSize : AppScale(16),
        fontWeight: 'bold',
    },
});
const buttonStyles = StyleSheet.create({
    default: {
        borderRadius: AppScale(125),
    },
});

