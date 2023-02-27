import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fonts } from '../../assets';
import { Colour } from '../../theme';
import { String } from '../../constants';
import MasterCard from '../../assets/icons/MasterCard';
import { commonStyles } from '../../constants/CommonStyles';


interface paymentInfo {
    title?: String;
    addressLine?: String;
    email?: String; 
    contactNo?: String;
    wrapperStyle?: Object;
    defaultAdd?: String;
    editPress?: any;
    cardNum?:String
}
export default function PaymentInfo(props: paymentInfo) {
    const { title, addressLine, defaultAdd, editPress, wrapperStyle, email, contactNo, cardNum } = props;

    return (
        <View style={[style.main, wrapperStyle]}>
            <View style={commonStyles.row}>
                <MasterCard/>
                <Text style={style.address}>{cardNum}</Text>
            </View>
            <Text style={style.addTitle}>{title}</Text>
            <Text style={style.address}>{addressLine}</Text>
            <Text style={style.address}>{contactNo}</Text>
            <Text style={style.address}>{email}</Text>
            <View style={style.editWrapper}>
                <Text style={style.default}>{defaultAdd}</Text>
                <TouchableOpacity onPress={editPress}>
                    <Text style={style.edit}>{String.addCard.edit}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style: any = StyleSheet.create({
    main: {
        backgroundColor: Colour.addressBackground,
        borderRadius: 8,
        borderColor: Colour.addressBorderColor,
        borderWidth: 1,
        padding: 16,
    },

    edit: {
        fontFamily: Fonts.NotoSansMedium,
        color: Colour.primaryBlue700,
        fontWeight: '500',
        fontSize: 14,
        padding: 2,
    },
    default: {
        fontFamily: Fonts.NotoSansMedium,
        color: Colour.primaryBlue500,
        fontWeight: '500',
        fontSize: 14,
    },
    address: {
        fontFamily: Fonts.ManropeRegular,
        color: Colour.gray500,
        fontWeight: '400',
        fontSize: 14,
        paddingTop: 4,
    },
    addTitle: {
        fontFamily: Fonts.ManropeBold,
        color: Colour.solidBlue,
        fontWeight: '700',
        fontSize: 14,
    },
    editWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8,
    },
});