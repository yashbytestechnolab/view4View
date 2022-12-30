import { StyleSheet } from "react-native";
import { Fonts } from "../assets/fonts";
import { Colors } from "./Color";



export const F40014 = StyleSheet.create({
    main: {
        color: Colors.placeHolderTextBlack,
        fontSize: 14,
        fontWeight: "400",
        fontFamily: Fonts?.InterRegular
    },
    color: {
        color: Colors.primaryRed,
        left: 2
    },
    colorBlack: {
        color: Colors.black16233A
    }
})
export const F40012 = StyleSheet.create({
    main: {
        color: Colors.greyD8D8D8,
        fontSize: 12,
        fontWeight: "400",
    },
    color: {
        color: Colors.primaryRed,
        left: 2
    },
    bottom: {
        bottom: 5
    }
})


export const F50012 = StyleSheet.create({
    main: {
        color: Colors.placeHolderTextBlack,
        fontSize: 12,
        fontWeight: "500",
        fontFamily: Fonts?.InterMedium
    },
    color: {
        color: Colors.primaryRed,
        left: 2
    }
})

export const F60024 = StyleSheet.create({
    textStyle: {
        color: Colors?.placeHolderTextBlack,
        fontSize: 24,
        fontWeight: "600",
        fontFamily: Fonts?.InterSemiBold
    },
})

export const F60016 = StyleSheet.create({
    textStyle: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: "600",
        fontFamily: Fonts?.InterSemiBold
    },
})


