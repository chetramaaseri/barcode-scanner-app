import { Platform } from "react-native";

export const AppScale = (number: number) => {
    const factor: number = 1;
    return Platform.OS == "ios" ? number * factor : number;
}