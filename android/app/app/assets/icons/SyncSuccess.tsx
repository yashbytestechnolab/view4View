import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function SyncSuccess(props: any) {
  return (
    <Svg
      height={props.height}
      width={props.width}
      style={props.style}
      viewBox="0 0 44 45"
      fill="none">
      <Path
        d="M42 21.1597V22.9997C41.9975 27.3126 40.601 31.5091 38.0187 34.9634C35.4363 38.4177 31.8066 40.9447 27.6707 42.1675C23.5349 43.3904 19.1145 43.2435 15.0689 41.7489C11.0234 40.2543 7.56931 37.4919 5.22192 33.8739C2.87453 30.2558 1.75958 25.9759 2.04335 21.6724C2.32712 17.3689 3.99441 13.2724 6.79656 9.99387C9.59871 6.71537 13.3856 4.43049 17.5924 3.48002C21.7992 2.52955 26.2005 2.9644 30.14 4.71973M42 6.99973L22 27.0197L16 21.0197"
        stroke={props.color}
        // stroke="#52FF9A"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
