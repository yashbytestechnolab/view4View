
import React from 'react';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

export function SyncAppleHelth(props: any) {
    return (
        <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect x="0.5" width="24" height="24" rx="2" fill="white" />
            <Path fillRule="evenodd" clipRule="evenodd" d="M15.1505 13.6C14.8724 13.6 13.248 12.7221 11.7276 11.2844C10.5213 10.1436 9.64844 8.46633 9.64844 6.95607C9.64844 5.58892 10.7953 4 12.6471 4C14.4517 4 14.8486 4.97132 15.151 4.97132C15.3926 4.97132 15.8722 4 17.655 4C19.6118 4 20.6537 5.74675 20.6537 6.95607C20.6537 8.46582 19.8463 10.0816 18.5745 11.2844C17.0927 12.685 15.4286 13.6 15.1505 13.6Z" fill="url(#paint0_linear_5640_173438)" />
            <Defs>
                <LinearGradient id="paint0_linear_5640_173438" x1="15.1505" y1="4.00005" x2="15.1505" y2="13.6002" gradientUnits="userSpaceOnUse">
                    <Stop stopColor="#FF61AD" />
                    <Stop offset="1" stopColor="#FF2616" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
}
