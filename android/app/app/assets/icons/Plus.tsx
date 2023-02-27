import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Plus(props: any) {
  return (
    <Svg
      width={props.width ? props.width : '17'}
      height={props.height ? props.height : '17'}
      viewBox="0 0 17 17"
      fill="none">
      <Path
        d="M8.5 1.5V15.5M1.5 8.5H15.5"
        stroke="#101828"
        stroke-width="2"
        strokeWidth={2}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
