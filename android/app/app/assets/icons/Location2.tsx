import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Location2(props: any) {
  return (
    <Svg
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M19 10C19 17 10 23 10 23C10 23 1 17 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
        stroke="#52FF9A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
        stroke="#52FF9A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
