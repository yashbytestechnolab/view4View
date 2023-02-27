import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Logout(props: any) {
  return (
    <Svg
      width={props.width ? props.width : '12'}
      height={props.height ? props.height : '12'}
      viewBox="0 0 12 12"
      fill="none">
      <Path
        d="M4.25 11.25H1.91667C1.60725 11.25 1.3105 11.1271 1.09171 10.9083C0.872916 10.6895 0.75 10.3928 0.75 10.0833V1.91667C0.75 1.60725 0.872916 1.3105 1.09171 1.09171C1.3105 0.872916 1.60725 0.75 1.91667 0.75H4.25M8.33333 8.91667L11.25 6M11.25 6L8.33333 3.08333M11.25 6H4.25"
        stroke="#FF8F50"
        stroke-width="1.33333"
        strokeWidth={1.33333}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
