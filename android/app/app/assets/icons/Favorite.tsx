import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Favorite(props: any) {
  return (
    <Svg width="15" height="15" viewBox="0 0 10 12" fill="none">
      <Path
        d="M9.08342 11.25L5.00008 8.33333L0.916748 11.25V1.91667C0.916748 1.60725 1.03966 1.3105 1.25846 1.09171C1.47725 0.872916 1.774 0.75 2.08341 0.75H7.91675C8.22617 0.75 8.52291 0.872916 8.74171 1.09171C8.9605 1.3105 9.08342 1.60725 9.08342 1.91667V11.25Z"
        stroke="#00C2FF"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
