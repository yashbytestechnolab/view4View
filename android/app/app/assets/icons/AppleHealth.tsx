
import React from 'react';
import Svg, {Defs, LinearGradient, Path, Rect, Stop} from 'react-native-svg';

export function AppleHelth(props: any) {
  return (
    <Svg width={props.width} height={props.height} viewBox="0 0 51 50" fill="none" >
    <Rect x="0.5" width="50" height="50" rx="16" fill="white"/>
    <Path fill-rule="evenodd" clipRule="evenodd" d="M31.0218 28.333C30.4424 28.333 27.0582 26.504 23.8906 23.5088C21.3776 21.1321 19.5591 17.6379 19.5591 14.4915C19.5591 11.6433 21.9485 8.33301 25.8064 8.33301C29.566 8.33301 30.3927 10.3566 31.0228 10.3566C31.5261 10.3566 32.5252 8.33301 36.2393 8.33301C40.3161 8.33301 42.4866 11.9721 42.4866 14.4915C42.4866 17.6368 40.8045 21.0031 38.1551 23.5088C35.0679 26.4268 31.6012 28.333 31.0218 28.333Z" fill="url(#paint0_linear_3700_171939)"/>
    <Defs>
    <LinearGradient  id="paint0_linear_3700_171939" x1="31.0218" y1="8.33311" x2="31.0218" y2="28.3333" gradientUnits="userSpaceOnUse">
    <Stop stopColor="#FF61AD"/>
    <Stop offset="1" stopColor="#FF2616"/>
    </LinearGradient>
    </Defs>
    </Svg>
  );
}
