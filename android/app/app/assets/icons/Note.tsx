import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function Note(props: any) {
  return (
    <Svg width="11" height="12" viewBox="0 0 11 12" fill="none">
      <Path
        d="M1.41659 11.25L5.49992 8.33333L9.58325 11.25V1.91667C9.58325 1.60725 9.46034 1.3105 9.24154 1.09171C9.02275 0.872916 8.726 0.75 8.41659 0.75H2.58325C2.27383 0.75 1.97709 0.872916 1.75829 1.09171C1.5395 1.3105 1.41659 1.60725 1.41659 1.91667V11.25Z"
        fill="#0F0742"
        stroke="#0F0742"
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
