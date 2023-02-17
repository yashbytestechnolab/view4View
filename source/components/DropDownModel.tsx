import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
    getpreviousIndex?: number
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
        DropDownTextStyle,
        getpreviousIndex
    } = props;
    const {
        storeCreator: { darkModeTheme },
    }: any = useContext(InputContextProvide);
    const [selectIndex, setSelectIndex] = useState();

    const refContainer = useRef();
    useEffect(() => {
        if (refContainer.current) {
            refContainer.current.scrollToIndex({ animated: true, index: 0 })
        }
    }, [selectIndex])


    const Item = ({ item, onPress, backgroundColor, textColor }: any) => {
        return (

            <TouchableOpacity
                onPress={() => { onPress() }}
                style={[styles.item, darkBackGround(darkModeTheme), { backgroundColor }, DropDownTextStyle, {borderRadius:8}]}>
                <Text style={[styles.title2, colorBackGround(darkModeTheme), { color: textColor }]}>
                    {item.value}
                </Text>
            </TouchableOpacity>
        );
    }
    const renderItems = ({ item, index }: any) => {
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
                    setSelectIndex(index)
                    setSelectValue(item?.value);
                    setTotalCost(parseInt((item?.value * (getOtherCoast || 1)) / 1));
                    setIsVisible(false);
                }}
                getpreviousIndex={index}
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
            <View style={[styles.modelView,modelWrapper, darkBackGround(darkModeTheme), { elevation: darkModeTheme ? 0 : 8 }]}>
                
                <View style={{flexDirection:'row', alignItems:'center', marginVertical:15}}>
                    <Text
                        style={[F60016?.bold, styles.title, { flex: 1 }]}>
                        {title}
                    </Text>
                    <TouchableOpacity
                        style={styles.close}
                        activeOpacity={1}
                        onPress={() => {
                            setIsVisible(false);
                        }}>
                        <Close height={25} width={25} color={Colors?.primaryRed} />
                    </TouchableOpacity>
                </View>
                <Text style={[F40014?.main, colorBackGround(darkModeTheme), { paddingBottom: 8, paddingHorizontal:20 }]}>
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
                    keyExtractor={(index) => index.toString()} />

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
        borderRadius: 16,
        backgroundColor: 'white',
        shadowColor: Colors?.whiteShadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
        shadowRadius: 4,
    },
    flatListWrapper: {
        alignSelf: 'center',
        width:'100%',
        paddingHorizontal:20
    },
    close: { position:'absolute', right:20 },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        width: '100%',
        paddingVertical: 5,
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: Fonts?.InterBold,
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

