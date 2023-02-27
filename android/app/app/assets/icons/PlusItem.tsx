import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function PlusItem(props: any) {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Path
        d="M6.0001 1.1001V10.9001M1.1001 6.0001H10.9001"
        stroke="#52FF9A"
        stroke-width="1.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
