import { View, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Logo } from '../assets/icons';
import { Colors } from '../Theme';


export const GradientHeader = ({ children }) => {
    return (
        <>
            <LinearGradient colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]} style={styles.linearGradient}>
                <View style={[styles.Icon]}>
                    <Logo />
                </View>
                {children}
            </LinearGradient>
        </>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    Icon: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },

})