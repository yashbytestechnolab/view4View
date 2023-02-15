import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import React, { useContext, useState } from 'react';
import Modal from 'react-native-modal';
import { colorBackGround, Colors, darkBackGround, F40012, F40012Black, F40014, F60016 } from '../Theme';
import { InputContextProvide } from '../context/CommonContext';
import { Close } from '../assets/icons';
import { Fonts } from '../assets/fonts';

interface dropDownItem {
    data: number | string | any;
    isVisible: boolean;
    setIsVisible: any;
    onPress?: any;
    fromAdds?: any;
    title: string;
    subTitle: string;
    selectedValue?: any
    setSelectValue?: any
    setTotalCost?: any
    getOtherCoast?: number

}
export const DropDownModel = (props: dropDownItem) => {
    const { data, setIsVisible, isVisible, selectedValue, setSelectValue, title, subTitle, setTotalCost, getOtherCoast } = props; const {
        storeCreator: { darkModeTheme },
    }: any = useContext(InputContextProvide);
    const [selectIndex, setSelectIndex] = useState(0)
    const Item = ({ item, onPress, backgroundColor, TextColor }: any) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, darkBackGround(darkModeTheme), { backgroundColor }]}>
            <Text style={[styles.title, colorBackGround(darkModeTheme), { TextColor }]}>{item.value}</Text>
        </TouchableOpacity>
    );
    const renderItems = ({ item, index }: any) => {
        const backgroundColor = index === selectIndex ? Colors?.primaryRed : darkModeTheme ? Colors?.darkModeColor : Colors?.white;
        const TextColor: any = index === selectIndex ? Colors?.white : Colors?.black;
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectIndex(index)
                    setSelectValue(item?.value)
                    setTotalCost(parseInt(item?.value * (getOtherCoast || 1) / 1))
                }}
                backgroundColor={backgroundColor}
                TextColor={TextColor}
            />
        );
    };

    return (
        <Modal
            onBackdropPress={() => setIsVisible(false)}
            transparent={true}
            backdropOpacity={0.7}
            style={styles.model}

            isVisible={isVisible}>

            <View style={[styles.modelView, darkBackGround(darkModeTheme)]}>
                <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 3 }} activeOpacity={1} onPress={() => { setIsVisible(false) }}>
                    <Close height={25} width={25} color={Colors?.primaryRed} />
                </TouchableOpacity>
                <Text style={[F60016?.bold, { color: Colors?.primaryRed, paddingBottom: 4 }]}>{title}</Text>
                <Text style={[F40014?.main, colorBackGround(darkModeTheme)]}>{subTitle}</Text>

                <FlatList
                    style={[darkBackGround(darkModeTheme), { alignSelf: 'center', padding: 15, backgroundColor: darkModeTheme ? Colors?.darkBackGround : Colors?.white }]}
                    data={data}
                    renderItem={renderItems}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.value}
                    extraData={selectedValue}
                />

            </View>

        </Modal>
    );
};
const styles = StyleSheet.create({
    model: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modelView: {
        height: '45%',
        width: '75%',
        justifyContent: 'center',
        //padding: 16,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 16,
        backgroundColor: 'white',
    },

    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        width: 200
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
        paddingVertical: 10,
        fontSize: 16,
        fontWeight: "400",
        fontFamily: Fonts?.InterRegular
    },
});

