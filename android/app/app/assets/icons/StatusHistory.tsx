import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function StatusHistory(props: any) {
  return (
    <Svg width="12" height="14" viewBox="0 0 12 14" fill="none">
      <Path
        d="M8.33333 1.1665V3.49984M3.66667 1.1665V3.49984M0.75 5.83317H11.25M1.91667 2.33317H10.0833C10.7277 2.33317 11.25 2.85551 11.25 3.49984V11.6665C11.25 12.3108 10.7277 12.8332 10.0833 12.8332H1.91667C1.27233 12.8332 0.75 12.3108 0.75 11.6665V3.49984C0.75 2.85551 1.27233 2.33317 1.91667 2.33317Z"
        stroke="#00C2FF"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
