import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

export const Invitefriends = () => {

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
                d="M26.002 24.05c3.314 0 6-2.474 6-5.525S29.316 13 26.002 13s-6 2.474-6 5.525 2.686 5.525 6 5.525zM29 25.892h-6c-1.856.002-3.635.681-4.947 1.89-1.313 1.208-2.05 2.846-2.053 4.555v1.842c0 .244.105.478.293.651.187.173.442.27.707.27h18c.265 0 .52-.097.707-.27A.885.885 0 0036 34.18v-1.842c-.002-1.709-.74-3.347-2.052-4.555-1.313-1.209-3.092-1.888-4.948-1.89zM16 19.446c-.265 0-.52.097-.707.27a.886.886 0 00-.293.65v1.842h-2c-.265 0-.52.097-.707.27a.886.886 0 00-.293.651c0 .244.105.479.293.651.187.173.442.27.707.27h2v1.842c0 .244.105.478.293.65.188.173.442.27.707.27.265 0 .52-.097.707-.27a.885.885 0 00.293-.65V24.05h2c.265 0 .52-.097.707-.27a.886.886 0 00.293-.65.886.886 0 00-.293-.652 1.045 1.045 0 00-.707-.27h-2v-1.841a.885.885 0 00-.293-.652 1.045 1.045 0 00-.707-.27z"
                fill="#FF5371"
            />
        </Svg>
    )
}