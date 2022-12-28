
import * as React from "react"
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from "react-native-svg"

export const Logo = () => {
    return (
        <Svg
            width={100}
            height={90}
            viewBox="0 0 119 100"
            fill="none" >
            <Rect width={118.919} height={100} rx={16} fill="#FFD8D8" />
            <Path
                d="M101.081 27.935v24.757a3.509 3.509 0 01-3.512 3.512h-9.555v-31.78h9.555a3.507 3.507 0 013.512 3.511z"
                fill="#FF8377"
            />
            <Path
                d="M88.014 58.735a3.507 3.507 0 01-3.504 3.514H34.408a3.514 3.514 0 01-3.512-3.514V21.892a3.52 3.52 0 013.512-3.514H84.51a3.512 3.512 0 013.504 3.514v36.843z"
                fill="url(#paint0_linear_777_2230)"
            />
            <Path
                d="M30.897 24.423v31.78H21.35a3.51 3.51 0 01-3.512-3.511V27.935a3.513 3.513 0 013.512-3.512h9.547z"
                fill="#FF8377"
            />
            <Path
                d="M70.678 40.314L52.352 50.567V30.062l18.326 10.252z"
                fill="#fff"
            />
            <Path
                d="M91.834 74.636h9.248v3.47h-9.248v-3.47zM17.838 74.636h59.397v3.47H17.838v-3.47z"
                fill="#FF8377"
            />
            <Path
                d="M84.594 70.81a5.676 5.676 0 105.675 5.675 5.682 5.682 0 00-5.675-5.674z"
                fill="url(#paint1_linear_777_2230)"
            />
            <Defs>
                <LinearGradient
                    id="paint0_linear_777_2230"
                    x1={59.4553}
                    y1={18.3784}
                    x2={59.4553}
                    y2={62.2486}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#FF7B76" />
                    <Stop offset={0.0001} stopColor="#FF7976" />
                    <Stop offset={1} stopColor="#FF5071" />
                </LinearGradient>
                <LinearGradient
                    id="paint1_linear_777_2230"
                    x1={84.5936}
                    y1={70.8108}
                    x2={84.5936}
                    y2={82.1621}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#FF7B76" />
                    <Stop offset={0.0001} stopColor="#FF7976" />
                    <Stop offset={1} stopColor="#FF5071" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}
