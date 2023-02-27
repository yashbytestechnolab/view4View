import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export function Shared(props: any) {
  return (
    <Svg width="20" height="22" viewBox="0 0 20 22" fill="none">
      <Path
        d="M6.59 12.51L13.42 16.49M13.41 5.51L6.59 9.49M19 4C19 5.65685 17.6569 7 16 7C14.3431 7 13 5.65685 13 4C13 2.34315 14.3431 1 16 1C17.6569 1 19 2.34315 19 4ZM7 11C7 12.6569 5.65685 14 4 14C2.34315 14 1 12.6569 1 11C1 9.34315 2.34315 8 4 8C5.65685 8 7 9.34315 7 11ZM19 18C19 19.6569 17.6569 21 16 21C14.3431 21 13 19.6569 13 18C13 16.3431 14.3431 15 16 15C17.6569 15 19 16.3431 19 18Z"
        stroke="#0F0742"
        stroke-width="2"
        strokeWidth={2}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
