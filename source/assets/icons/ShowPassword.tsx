
import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const ShowPassword = (props: any) => {
    return (
        <Svg width="16" height="16" viewBox="0 0 24 18" fill="none">
            <Path
                d="M1 9C1 9 5 1 12 1C19 1 23 9 23 9C23 9 19 17 12 17C5 17 1 9 1 9Z"
                stroke={props?.color?props?.color:"#121212"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
                stroke={props?.color?props?.color:"#121212"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
