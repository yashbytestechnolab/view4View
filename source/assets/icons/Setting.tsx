import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Colors } from "../../Theme"

export const Setting = (props: string | number) => {
    return (
        <Svg
            width={22}
            height={22}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M23.467 10.272l-2.753-.677a9.084 9.084 0 00-.635-1.512l1.282-2.136a.703.703 0 00-.106-.86L19.267 3.1a.701.701 0 00-.86-.106l-2.139 1.282a9.063 9.063 0 00-1.503-.63L14.088.894a.703.703 0 00-.682-.533h-2.812a.702.702 0 00-.682.533s-.47 1.921-.676 2.752a9.027 9.027 0 00-1.596.68L5.42 2.993a.705.705 0 00-.859.106L2.574 5.088a.703.703 0 00-.106.859L3.84 8.238a9.06 9.06 0 00-.554 1.355l-2.753.679a.703.703 0 00-.533.682v2.812c0 .323.22.604.533.682l2.753.677a9.07 9.07 0 00.647 1.537L2.706 18.71a.703.703 0 00.105.859L4.8 21.556c.227.227.581.27.859.106 0 0 1.377-.825 2.05-1.23.49.261 1 .476 1.527.643l.676 2.752c.077.313.359.533.682.533h2.812c.323 0 .604-.22.682-.533l.677-2.752a8.935 8.935 0 001.56-.663l2.083 1.25a.703.703 0 00.859-.106l1.988-1.988a.703.703 0 00.106-.86l-1.264-2.105c.25-.474.456-.969.617-1.478l2.753-.677a.703.703 0 00.533-.682v-2.812a.703.703 0 00-.533-.682zM12 17.282a4.928 4.928 0 01-4.922-4.922A4.928 4.928 0 0112 7.438a4.928 4.928 0 014.922 4.922A4.928 4.928 0 0112 17.282z"
                fill={props.color ? props.color : Colors?.placeHolderTextBlack}
            />
        </Svg>
    )
}