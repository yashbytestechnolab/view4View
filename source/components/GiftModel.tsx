import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { F40014, F60016, F60032, colorBackGround, darkBackGround } from '../Theme';
import { ButtonComponent } from './ButtonComponent';
import { String } from '../constants';
import YouWon from '../assets/icons/YouWon';
import Modal from "react-native-modal";
import { InputContextProvide } from '../context/CommonContext';
interface model {
    isVisible: boolean;
    setIsVisible: any;
    onPress?: any;
    fromAdds?: any;
}

const GiftModel = (props: model) => {
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)
    const { onPress, isVisible, setIsVisible, fromAdds } = props
    return (
        <Modal
            onBackdropPress={() => setIsVisible(false)}
            transparent={true}
            backdropOpacity={0.70}
            style={styles.model}
            isVisible={isVisible}>
            <View style={[styles.modelView, darkBackGround(darkModeTheme)]}>
                <YouWon />
                <Text style={[F60016.textStyle, F60016.semiBolt, colorBackGround(darkModeTheme)]}>
                    {fromAdds ? "You Won" : ""}
                </Text>
                <Text style={[styles.points, F60032.textStyle]}>
                    {fromAdds ? " 100 points!" : "Out of coins.."}
                </Text>
                <Text style={[styles.description, F40014.main, colorBackGround(darkModeTheme)]}>
                    {fromAdds ? "Hurry, you are rewarded" : "Sorry, You don't have enough coins to create the campaign. Would you like to earn more coins?"}
                </Text>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <ButtonComponent
                        wrapperStyle={styles.button}
                        buttonTitle={fromAdds ? "Close" : "Earn Coins Now"}
                        onPrees={() => { onPress() }}
                    />
                    <ButtonComponent
                        wrapperStyle={styles.button}
                        buttonTitle={fromAdds ? "Close" : "No"}
                        onPrees={() => setIsVisible(false)}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default GiftModel

const styles = StyleSheet.create({
    model: { backgroundColor: 'transparent', flex: 1 },
    modelView: {
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 16,
        backgroundColor: "white",
        alignItems: "center"
    },
    won: { marginTop: 24 },
    button: { width: "40%", marginTop: 33 },
    points: { marginTop: 12 },
    description: { marginTop: 12, textAlign: "center", opacity: 0.6 }
})