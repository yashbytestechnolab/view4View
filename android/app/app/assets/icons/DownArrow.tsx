import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function DownArrow(props: any) {
  return (
    <Svg width="10" height="6" viewBox="0 0 10 6" fill="none">
      <Path
        d="M1 1L5 5L9 1"
        stroke="#101828"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
