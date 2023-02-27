import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Back(props: any) {
  return (
    <Svg
      width={props.width ? props.width : '16'}
      height={props.height ? props.height : '16'}
      viewBox="0 0 16 16"
      fill="none">
      <Path
        d="M15 8H1M1 8L8 15M1 8L8 1"
        stroke={props.color ? props.color : '#0F0742'}
        stroke-width="2"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
