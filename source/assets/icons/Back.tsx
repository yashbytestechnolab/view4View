import React from 'react'
import { Path, Svg } from 'react-native-svg'

export const Back = (props: any) => {
    return (
        <Svg width="18" height="18" viewBox="0 0 10 16" fill="none" >
            <Path d="M9.03033 0.46967C9.2966 0.735936 9.3208 1.1526 9.10295 1.44621L9.03033 1.53033L2.561 8L9.03033 14.4697C9.2966 14.7359 9.3208 15.1526 9.10295 15.4462L9.03033 15.5303C8.76406 15.7966 8.3474 15.8208 8.05379 15.6029L7.96967 15.5303L0.96967 8.53033C0.703403 8.26406 0.679197 7.8474 0.897051 7.55379L0.96967 7.46967L7.96967 0.46967C8.26256 0.176777 8.73744 0.176777 9.03033 0.46967Z"
                fill={props?.color ? props.color : "#CED4DA"} />
        </Svg>
    )
}

export default Back

