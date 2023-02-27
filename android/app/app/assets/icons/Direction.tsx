import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Direction(props: any) {
  return (
    <Svg
      width="25"
      height="22"
      viewBox="0 0 25 22"
      fill="none">
      <Path
        d="M8.5 17L1.5 21V5L8.5 1M8.5 17L16.5 21M8.5 17V1M16.5 21L23.5 17V1L16.5 5M16.5 21V5M16.5 5L8.5 1"
        stroke="#0F0742"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
