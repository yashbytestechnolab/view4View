import React from 'react'
import Svg, { Path, Rect } from 'react-native-svg'

export default function MasterCard(props: any) {
    return (
        <Svg
            width={34}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Rect x={0.5} y={0.5} width={33} height={23} rx={3.5} fill="#fff" />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.179 16.83a6.803 6.803 0 0 1-4.398 1.6c-3.745 0-6.781-3-6.781-6.7s3.036-6.7 6.78-6.7c1.679 0 3.215.603 4.399 1.6a6.802 6.802 0 0 1 4.398-1.6c3.745 0 6.781 3 6.781 6.7s-3.036 6.7-6.78 6.7a6.802 6.802 0 0 1-4.399-1.6Z"
                fill="#ED0006"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.18 16.83a6.653 6.653 0 0 0 2.382-5.1c0-2.042-.925-3.87-2.383-5.1a6.802 6.802 0 0 1 4.399-1.6c3.744 0 6.78 3 6.78 6.7s-3.036 6.7-6.78 6.7a6.802 6.802 0 0 1-4.399-1.6Z"
                fill="#F9A000"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.179 16.83a6.653 6.653 0 0 0 2.382-5.1c0-2.042-.924-3.87-2.382-5.1a6.653 6.653 0 0 0-2.383 5.1c0 2.042.925 3.87 2.383 5.1Z"
                fill="#FF5E00"
            />
            <Rect x={0.5} y={0.5} width={33} height={23} rx={3.5} stroke="#F2F4F7" />
        </Svg>
    )
}
