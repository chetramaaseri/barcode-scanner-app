import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { ThemedText } from '../ThemedText'
import { AppScale } from '@/AppScale'

const LogoName = () => {
    return (
        <View style={styles.logoNameContainer}>
            <Image
                source={require('../../assets/images/icon.png')}
                style={styles.logoNameImage}
            />
            <ThemedText type="heading">Pero</ThemedText>
        </View>
    )
}

export default LogoName

const styles = StyleSheet.create({
    logoNameContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    logoNameImage : {
        height : AppScale(100),
        width : AppScale(100)
    }
})