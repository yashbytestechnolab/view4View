import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fonts } from '../../../assets';
import { BackButton } from '../../../components/BackButton/BackButton';
import { commonStyles } from '../../../constants/CommonStyles';
import { Colour } from '../../../theme';
import { ROUTES, String } from '../../../constants';
import { Plus } from '../../../assets/icons/Plus';
import PaymentInfo from '../../../components/PaymentInfo/PaymentInfo';

function PaymentInformation(props: any) {
    const navigation: any = useNavigation();
    return (
        <>
            <StatusBar barStyle={String.darkContent} backgroundColor={Colour.white} />
            <SafeAreaView style={style.SafeAreaView} >
                <View style={[commonStyles.whiteBG, style.marginTop]}>
                    <BackButton
                        color={Colour.PrimaryBlue}
                        textStyle={commonStyles.backButtonText}
                        title={String.account.paymentInformation}
                    />
                    <Text style={style.newAddStyle}> {String.addCard.savePayment}</Text>
                    <ScrollView
                        style={{
                            paddingHorizontal: 17,
                            marginTop: 16
                        }}>
                        <PaymentInfo
                            title={'Billing Address'}
                            wrapperStyle={style.wrapperAdd}
                            addressLine={
                                'Address Line 1, Address Line 2 City, State, Postal Code, Country'
                            }
                            cardNum={'4242 4242 4242 4242'}
                            contactNo={'1234567890'}
                            email={'bytes@gmail.com'}
                            defaultAdd={'Default'}
                        />
                        <PaymentInfo
                            title={'Billing Address'}
                            wrapperStyle={style.wrapperAdd}
                            addressLine={
                                'Address Line 1, Address Line 2 City, State, Postal Code, Country'
                            }
                            cardNum={'4242 4242 4242 4242'}
                            contactNo={'1234567890'}
                            email={'bytes@gmail.com'}
                            defaultAdd={'Set As Default'}
                        />
                        <TouchableOpacity
                            style={style.addNewAddWrapper}
                            onPress={() => { navigation.navigate(ROUTES?.AddNewCard) }}>
                            <Plus />
                            <Text style={style.addPaymentMethod}> {String.addCard.addPaymentMethod}</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </SafeAreaView>

        </>
    )
}

export default PaymentInformation

const style = StyleSheet.create({
    addPaymentMethod: {
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 14,
        color: Colour.PrimaryBlue,
    },
    marginTop: { marginTop: 23 },
    newAddStyle: {
        fontFamily: Fonts.NotoSansMedium,
        fontWeight: '500',
        fontSize: 14,
        color: Colour.PrimaryBlue,
        marginTop: 32,
        paddingHorizontal: 17
    },
    SafeAreaView: { display: 'flex', flex: 1, backgroundColor: Colour.white },
    addNewAddWrapper: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        paddingTop: 31,
        paddingBottom: 16,
    },
    wrapperAdd: {
        backgroundColor: Colour.white,
        borderColor: Colour.solidGray,
        marginTop: 12,
    },
});