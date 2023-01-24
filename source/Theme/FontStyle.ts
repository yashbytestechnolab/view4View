import { StyleSheet } from "react-native";
import { Fonts } from "../assets/fonts";
import { Colors } from "./Color";



export function darkBackGround(params: any) {
    return { backgroundColor: params ? Colors.darkModeColor : Colors.white }
}

export function lightBackGround(params: any) {
    return { backgroundColor: params ? Colors.darkModeColor1 : Colors.white }
}

export function colorBackGround(params: any) {
    return { color: params ? Colors.gray : Colors.darkModeColor }
}



export const ActiveTabText = StyleSheet.create({
    main: {
        color: Colors?.primaryRed,
        fontSize: 11,
        fontWeight: "500",
        fontFamily: Fonts?.InterMedium
    },
})
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
    },
    whiteColor: { color: Colors.white }
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
    contain: {
        color: "rgba(0, 0, 0, 0.6)",
        fontFamily: Fonts?.InterRegular
    },
    color06: { color: "rgba(0, 0, 0, 0.6)", marginTop: 4 },

    bottom: {
        bottom: 5
    }
})
export const F40012Black = StyleSheet.create({
    main: {
        color: Colors.black,
        fontSize: 12,
        fontWeight: "400",
        fontFamily: Fonts?.InterRegular,
        lineHeight: 31
    },

})

export const F40010 = StyleSheet.create({
    main: {
        color: Colors.greyD8D8D8,
        fontSize: 10,
        fontWeight: "400",
    },

})


export const F50010 = StyleSheet.create({
    main: {
        color: Colors.GrayLightC2C9D1,
        fontSize: 11,
        fontWeight: "500",
        fontFamily: Fonts?.InterMedium
    },
    color: {
        color: Colors.primaryRed,
        left: 2
    }
})

export const F50013 = StyleSheet.create({
    main: {
        color: Colors.black,
        fontSize: 13,
        fontWeight: "500",
        fontFamily: Fonts?.InterRegular
    },
})

export const F50018 = StyleSheet.create({
    main: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: "500",
        fontFamily: Fonts?.InterMedium
    },
    color: {
        color: Colors.placeHolderTextBlack,
        left: 2
    }
})


export const F50012 = StyleSheet.create({
    main: {
        color: Colors.placeHolderTextBlack,
        fontSize: 12,
        fontWeight: "500",
        fontFamily: Fonts?.InterMedium
    },
    opacity: {
        opacity: 0.5
    },
    fontStyleVideo: {
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
    semiBolt: {
        color: Colors.placeHolderTextBlack,
        fontFamily: Fonts?.InterSemiBold
    },
    campaign: {
        color: Colors.black,
        fontFamily: Fonts?.InterRegular
    },
    bold:{
        fontFamily:Fonts?.InterBold,
        lineHeight:20

    }
})

export const F60032 = StyleSheet.create({
    textStyle: {
        color: Colors.primaryRed,
        fontSize: 32,
        fontWeight: "600",
        fontFamily: Fonts?.InterBold
    },
})

export const F60012 = StyleSheet.create({
    textStyle: {
        color: Colors.primaryRed,
        fontSize: 12,
        fontWeight: "600",
        fontFamily: Fonts?.InterRegular
    },
    colorAccount: {
        color: Colors.placeHolderTextBlack,
    }
})
export const F60012SemiBold = StyleSheet.create({
    textStyle: {
        color: Colors.black,
        fontSize: 12,
        fontWeight: "600",
        fontFamily: Fonts?.InterSemiBold
    },
  
})
export const F70032 = StyleSheet.create({
    textStyle: {
        color: Colors.primaryRed,
        fontSize: 32,
        fontWeight: "700",
        fontFamily: Fonts?.InterBold
    },
})

