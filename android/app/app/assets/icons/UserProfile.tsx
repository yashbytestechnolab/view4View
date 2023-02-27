import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function UserProfile(props: any) {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Path
        d="M10.6666 11.25V10.0833C10.6666 9.46449 10.4208 8.871 9.98317 8.43342C9.54558 7.99583 8.95209 7.75 8.33325 7.75H3.66659C3.04775 7.75 2.45425 7.99583 2.01667 8.43342C1.57908 8.871 1.33325 9.46449 1.33325 10.0833V11.25M8.33325 3.08333C8.33325 4.372 7.28858 5.41667 5.99992 5.41667C4.71125 5.41667 3.66659 4.372 3.66659 3.08333C3.66659 1.79467 4.71125 0.75 5.99992 0.75C7.28858 0.75 8.33325 1.79467 8.33325 3.08333Z"
        stroke="#00C2FF"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
