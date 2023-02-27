import React from 'react';
import Svg, {Path} from 'react-native-svg';

function NextArrow(props: any) {
  return (
    // <Svg width={props.width} height={props.height} viewBox="0 0 24 27" fill="none" > -->
    <Svg width="8" height="12" viewBox="0 0 8 12" fill="none">
      <Path
        d="M1.75 10.5L6.25 6L1.75 1.5"
        stroke="#98A2B3"
        stroke-width="2"
        strokeWidth={2}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}

export default NextArrow;
