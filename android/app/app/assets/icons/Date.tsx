import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Date(props: any) {
  return (
    <Svg width="18" height="20" viewBox="0 0 18 20" fill="none">
      <Path
        d="M12.3333 1.6665V4.99984M5.66667 1.6665V4.99984M1.5 8.33317H16.5M3.16667 3.33317H14.8333C15.7538 3.33317 16.5 4.07936 16.5 4.99984V16.6665C16.5 17.587 15.7538 18.3332 14.8333 18.3332H3.16667C2.24619 18.3332 1.5 17.587 1.5 16.6665V4.99984C1.5 4.07936 2.24619 3.33317 3.16667 3.33317Z"
        stroke="#667085"
        stroke-width="1.66667"
        strokeWidth={1.66667}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
