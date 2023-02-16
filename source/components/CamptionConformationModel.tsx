import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import Modal from "react-native-modal";

import { InputContextProvide } from '../context/CommonContext';
import { colorBackGround, Colors, darkBackGround, F40014, F60016, F60032 } from '../Theme';
import { ButtonComponent } from './ButtonComponent';
import { Close } from '../assets/icons';
interface model {
    isVisible: boolean;
    setIsVisible: any;
    onPress?: any;
    fromAdds?: any;
}
export const CamptionConformationModel = (props: model) => {
    const { storeCreator: { darkModeTheme } }: any = useContext(InputContextProvide)
    const { onPress, isVisible, setIsVisible } = props
   
    return (
        <Modal
            onBackdropPress={() => setIsVisible(false)}
            transparent={true}
            backdropOpacity={0.7}
            style={styles.model}
            isVisible={isVisible}>
            <View style={[styles.modelView, darkBackGround(darkModeTheme)]}>

                <Text style={[F60016.textStyle, F60016.semiBolt, colorBackGround(darkModeTheme)]}>
                    Create Campaign
                </Text>
                <Text style={[styles.description, F40014.main, colorBackGround(darkModeTheme)]}>
                    Your Campaign will be create.you can see {`\n`}the camaign in list.Are you sure you {`\n`}create campaign ? </Text>
                <ButtonComponent
                    wrapperStyle={styles.button}
                    buttonTitle={'Create Campigan'}
                    onPrees={() => { onPress() }}
                />
                <TouchableOpacity activeOpacity={1} onPress={() => setIsVisible(false)} style={{ position: 'absolute', top: 5, right: 5, padding: 8 }}>
                    <Close />
                </TouchableOpacity>
            </View>

        </Modal>

    )
}

const styles = StyleSheet.create({
    model: { backgroundColor: 'transparent', flex: 1 },
    modelView: {
        paddingTop: 40,
        paddingBottom: 40,
        borderRadius: 16,
        backgroundColor: Colors?.white,
        alignItems: "center",
        shadowColor: Colors?.whiteShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        shadowRadius: 4,

    },
    won: { marginTop: 24 },
    button: { marginTop: 33, width: '60%' },
    points: { marginTop: 12 },
    description: { marginTop: 12, textAlign: "center", opacity: 0.6 }
})