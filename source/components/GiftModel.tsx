import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { F40014, F60016, F60032 } from '../Theme';
import { ButtonComponent } from './ButtonComponent';
import { String } from '../constants';
import YouWon from '../assets/icons/YouWon';
import Modal from "react-native-modal";
interface model {
    isVisible: boolean;
    setIsVisible: any;
    onPress?: any
}

const GiftModel = (props: model) => {
    const { onPress, isVisible, setIsVisible } = props
    return (
        <Modal
            onBackdropPress={() => setIsVisible(false)}
            transparent={true}
            backdropOpacity={0.70}
            style={{ backgroundColor: 'transparent', flex: 1 }}
            isVisible={isVisible}>
            <View style={{
                paddingTop: 40,
                paddingBottom: 40,
                borderRadius: 16,
                backgroundColor: "white",
                alignItems: "center"
            }}>
                <YouWon />
                <Text style={[F60016.textStyle, F60016.semiBolt, { marginTop: 24 }]}>
                    You Won
                </Text>
                <Text style={[{ marginTop: 12 }, F60032.textStyle]}>
                    130 points!
                </Text>
                <Text style={[{ marginTop: 12, textAlign: "center", opacity: 0.6 }, F40014.main]}>
                    Lorem Ipsum is simply dummy text of the printing and  simply dum industry.
                </Text>
                <ButtonComponent
                    wrapperStyle={{ width: "80%", marginTop: 33 }}
                    buttonTitle={String.commonString.EarnPoints}
                    onPrees={() => { onPress() }}
                />
            </View>
        </Modal>
    )
}

export default GiftModel

const styles = StyleSheet.create({})