import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

export const BuyCoin = () => {

    return (
        <Svg
            width={48}
            height={48}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          
        >
            <Circle cx={24} cy={24} r={24} fill="#BC2649" fillOpacity={0.1} />
            <Path
                d="M22.594 33.423c1.165 0 2.11-.87 2.11-1.942 0-1.073-.945-1.942-2.11-1.942s-2.11.87-2.11 1.942c0 1.073.945 1.942 2.11 1.942zM29.674 33.423c1.165 0 2.11-.87 2.11-1.942 0-1.073-.945-1.942-2.11-1.942s-2.11.87-2.11 1.942c0 1.073.945 1.942 2.11 1.942zM12.703 15.295h2.932l3.395 10.942-.266.49c-.701 1.29.316 2.812 1.887 2.812h11.833c.389 0 .703-.29.703-.648 0-.358-.314-.647-.703-.647H20.65c-.522 0-.863-.506-.628-.937l.194-.358h12.268c.314 0 .59-.192.677-.47l2.812-9.064a.608.608 0 00-.115-.568.728.728 0 00-.561-.257H17.5l-.658-2.12c-.087-.278-.363-.47-.677-.47h-3.462c-.388 0-.703.29-.703.647 0 .358.315.648.703.648z"
                fill="#FF5371"
            />
        </Svg>
    )
}