import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import React, { useContext } from 'react';
import Modal from 'react-native-modal';
import {
    colorBackGround,
    Colors,
    darkBackGround,
    F40014,
    F60016,
} from '../Theme';
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
    selectedValue?: any;
    setSelectValue?: any;
    setTotalCost?: any;
    getOtherCoast?: number;
    modelWrapper?: object
    DropDownTextStyle?: object
}
export const DropDownModel = (props: dropDownItem) => {
    const {
        data,
        setIsVisible,
        isVisible,
        selectedValue,
        setSelectValue,
        title,
        subTitle,
        setTotalCost,
        getOtherCoast,
        modelWrapper,
        DropDownTextStyle

    } = props;
    const {
        storeCreator: { darkModeTheme },
    }: any = useContext(InputContextProvide);
 

    const Item = ({ item, onPress, backgroundColor, textColor }: any) => {
        return (

            <TouchableOpacity
                onPress={() => { onPress() }}
                style={[styles.item, darkBackGround(darkModeTheme), { backgroundColor }, DropDownTextStyle]}>
                <Text style={[styles.title2, colorBackGround(darkModeTheme), { color: textColor }]}>
                    {item.value}
                </Text>
            </TouchableOpacity>
        );
    }
    const renderItems = ({ item }: any) => {
        const backgroundColor =
            item?.value === selectedValue
                ? Colors?.primaryRed
                : darkModeTheme
                    ? Colors?.darkModeColor
                    : Colors?.white;
        const TextColor: any =
            item?.value === selectedValue ? Colors?.white : darkModeTheme
                ? Colors?.GrayLightC2C9D1
                : Colors?.black;
        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectValue(item?.value);
                    setTotalCost(parseInt((item?.value * (getOtherCoast || 1)) / 1));
                    setIsVisible(false);
                }}
                backgroundColor={backgroundColor}
                textColor={TextColor}
            />
        );
    };

    return (
        <Modal
            onBackdropPress={() => setIsVisible(false)}
            transparent={true}
            backdropOpacity={0.7}
            style={[styles.model,]}

            isVisible={isVisible}>
            <View style={[modelWrapper, styles.modelView, darkBackGround(darkModeTheme), { elevation: darkModeTheme ? 0 : 8 }]}>
                <TouchableOpacity
                    style={styles.close}
                    activeOpacity={1}
                    onPress={() => {
                        setIsVisible(false);
                    }}>
                    <Close height={25} width={25} color={Colors?.primaryRed} />
                </TouchableOpacity>
                <Text
                    style={[F60016?.bold, styles.title]}>
                    {title}
                </Text>
                <Text style={[F40014?.main, colorBackGround(darkModeTheme), { paddingBottom: 8 }]}>
                    {subTitle}
                </Text>

                <FlatList
                    style={[
                        darkBackGround(darkModeTheme),
                        styles.flatListWrapper
                    ]}
                    data={data}
                    renderItem={renderItems}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    extraData={selectedValue}
                    keyExtractor={(index) => index.toString()}
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
        width: '75%',
        justifyContent: 'center',
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 16,
        backgroundColor: 'white',
        shadowColor: Colors?.whiteShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        shadowRadius: 4,
    },
    flatListWrapper: {
        alignSelf: 'center',
    },
    close: { alignSelf: 'flex-end', padding: 3, marginTop: 5 },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        width: 200,
        paddingVertical: 5,
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: Fonts?.InterRegular,
        color: Colors?.primaryRed,
        paddingBottom: 4
    },
    title2: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
    },
});
