import React from 'react';
import Svg, { Path } from 'react-native-svg';

export function Cross(props: any) {
  return (
    <Svg width={props.width ? props.width : "14"} height={props.height ? props.height : "14"} viewBox="0 0 14 14" fill="none">
      <Path
        d="M13 1L1 13M1 1L13 13"
        stroke={props.color ? props.color : 'white'}
        stroke-width="2"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
