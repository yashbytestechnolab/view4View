import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Doller(props: any) {
  return (
    <Svg width="10" height="16" viewBox="0 0 10 16" fill="none">
      <Path
        d="M5 0.666504V15.3332M8.33333 3.33317H3.33333C2.71449 3.33317 2.121 3.579 1.68342 4.01659C1.24583 4.45417 1 5.04767 1 5.6665C1 6.28534 1.24583 6.87883 1.68342 7.31642C2.121 7.754 2.71449 7.99984 3.33333 7.99984H6.66667C7.28551 7.99984 7.879 8.24567 8.31658 8.68325C8.75417 9.12084 9 9.71433 9 10.3332C9 10.952 8.75417 11.5455 8.31658 11.9831C7.879 12.4207 7.28551 12.6665 6.66667 12.6665H1"
        stroke="#0F0742"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
