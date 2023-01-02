import { View, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Logo } from '../assets/icons';
import { Colors } from '../Theme';


export const GradientHeader = () => {
    return (
        <>
            <LinearGradient colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]} style={styles.linearGradient}>
                <View style={styles.Icon}>
                    <Logo />
                </View>
                <View style={styles.borderWrapper} />
            </LinearGradient>

        </>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: "35%"
    },
    Icon: {
        justifyContent: 'center', alignItems: 'center', flex: 1
    },
    borderWrapper: {
        backgroundColor: Colors?.pink, width: '100%',
        borderTopEndRadius: 40,
        height: 17,
        borderTopStartRadius: 40,
    },

})