
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useContext, } from 'react';
import { Colors, F50018, F60016 } from '../Theme';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Back } from '../assets/icons';
import { InputContextProvide } from '../context/CommonContext';
import { ROUTES } from '../constants';
import Lottie from 'lottie-react-native';
import { kFormatter } from '../services/CoinValueFormat';
import { Anaylitics } from '../constants/analytics';

interface IheaderProps {
    title?: string;
    showBacKIcon?: boolean;
    showCoin?: boolean;
    coin?: number | string;
    titleStyle?: object;
    onPrees?: () => void;

}
export const HeaderTest = (props: IheaderProps) => {
    const {
        storeCreator: {
            coinBalance: { getBalance },
        },

    }: any = useContext(InputContextProvide);

    const { title, showBacKIcon, showCoin = true, onPrees, titleStyle } = props;
    const navigation = useNavigation();

    return (
        <>
            <LinearGradient
                colors={[Colors?.gradient1, Colors?.gradient2, Colors?.gradient3]}
                style={style.header}>
                <View style={style.Wrapper}>
                    {showBacKIcon && (
                        <TouchableOpacity
                            activeOpacity={1}
                            style={{
                                flex: 1,
                            }}
                            onPress={() => {
                                Anaylitics("user_coin", { getBalance })
                                onPrees ? onPrees() : navigation.goBack();
                            }}>
                            <Back color={Colors?.white} />
                        </TouchableOpacity>
                    )}

                    <View style={[style.titleWrapper, titleStyle]}>
                        <Text numberOfLines={1} style={[F50018.main, style.titleText]}>
                            {title}
                        </Text>
                    </View>
                    <View style={[style.coinWrapper,]}>
                        {showCoin && (
                            <TouchableOpacity
                                style={[style.coinWrapper,]}
                                activeOpacity={1}
                                onPress={() => {
                                    navigation?.navigate(ROUTES?.VIEWCOIN);
                                }}>
                                <Text style={[F60016.textStyle]} numberOfLines={1}>
                                    {kFormatter(getBalance)}
                                </Text>

                                <Lottie style={{
                                    height: 35,
                                    width: 30,
                                    alignSelf: 'center',
                                    top: -3,
                                    marginLeft: -3
                                }}
                                    source={require('../assets/flipCoin.json')}
                                    autoPlay loop
                                />

                            </TouchableOpacity>
                        )}
                    </View>

                </View>
            </LinearGradient>
        </>
    );
};
const style = StyleSheet.create({
    header: {
        backgroundColor: Colors?.pink,
        justifyContent: 'center',
    },
    titleText: {
        textAlign: 'center',
        alignItems: "center",
    },
    Wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        height: 60,
        alignItems: 'center',
        paddingHorizontal: 16
    },
    coinWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    titleWrapper: {
        alignSelf: 'center',
        flex: 3,
    },

});
