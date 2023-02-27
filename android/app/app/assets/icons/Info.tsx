import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Info(props: any) {
  return (
    <Svg width="23" height="22" viewBox="0 0 23 22" fill="none">
      <Path
        d="M11.5 15V11M11.5 7H11.51M21.5 11C21.5 16.5228 17.0228 21 11.5 21C5.97715 21 1.5 16.5228 1.5 11C1.5 5.47715 5.97715 1 11.5 1C17.0228 1 21.5 5.47715 21.5 11Z"
        stroke="#FF8F50"
        // strokeWidth="2"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
