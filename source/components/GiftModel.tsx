import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { F40014, F60016, F60032, colorBackGround, darkBackGround } from '../Theme';
import { ButtonComponent } from './ButtonComponent';
import YouWon from '../assets/icons/YouWon';
import Modal from "react-native-modal";
import { InputContextProvide } from '../context/CommonContext';
import AnimatedLottieView from 'lottie-react-native';
interface model {
    isVisible: boolean;
    setIsVisible: any;
    onPress?: any;
    fromAdds?: any;
    title?: string;
    title2?: string
    subTitle?: string;
    cancleButtonTitle?: string;
    saveButtonTitle?: string;
    CancleOnPress?: any
    showCancleButton?: boolean
    showRating?: boolean,
    negativeActionStyle?: any,
    negativeActionTextStyle?:any
}

const GiftModel = (props: model) => {
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)
    const { onPress, isVisible, setIsVisible, title, subTitle, cancleButtonTitle, saveButtonTitle, title2, showCancleButton = true, showRating = false, CancleOnPress, negativeActionStyle, negativeActionTextStyle } = props
    return (
        <Modal
            onBackdropPress={() => setIsVisible(false)}
            transparent={true}
            backdropOpacity={0.70}
            style={styles.model}
            isVisible={isVisible}>
            <View style={[styles.modelView, darkBackGround(darkModeTheme)]}>

                {showRating ?
                    <AnimatedLottieView style={styles.rating}
                        source={require('../assets/ratingStar.json')} autoPlay loop /> : <YouWon />
                }
                <Text style={[F60016.textStyle, F60016.semiBolt, colorBackGround(darkModeTheme)]}>
                    {title}
                </Text>
                <Text style={[styles.points, F60032.textStyle]}>
                    {title2}
                </Text>
                <Text style={[styles.description, F40014.main, colorBackGround(darkModeTheme)]}>
                    {subTitle}
                </Text>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <ButtonComponent
                        wrapperStyle={[styles.button, negativeActionStyle]}
                        buttonTextStyle={negativeActionTextStyle}
                        buttonTitle={saveButtonTitle}
                        onPrees={() => { onPress() }}
                    />
                    {
                        showCancleButton && <ButtonComponent
                            wrapperStyle={styles.button}
                            buttonTitle={cancleButtonTitle}
                            onPrees={() => { CancleOnPress ? CancleOnPress() : setIsVisible(false) }}
                        />
                    }
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
    button: { flex: 1, marginTop: 33 },
    points: { marginTop: 12 },
    rating: {
        alignItems: 'center',
        width: '50%'
    },
    description: { marginTop: 12, textAlign: "center", opacity: 0.6, paddingHorizontal:12 }
})