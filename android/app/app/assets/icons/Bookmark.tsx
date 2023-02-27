import React from 'react';
import Svg, {Path} from 'react-native-svg';

export function BookMark(props: any) {
  return (
    <Svg
      width={props?.width ? props.width : '14'}
      height={props?.height ? props.height : '18'}
      viewBox="0 0 14 18"
      fill="none">
      <Path
        d="M12.8334 16.5L7.00008 12.3333L1.16675 16.5L1.16675 3.16667C1.16675 2.72464 1.34234 2.30072 1.6549 1.98816C1.96746 1.67559 2.39139 1.5 2.83341 1.5L11.1667 1.5C11.6088 1.5 12.0327 1.67559 12.3453 1.98816C12.6578 2.30072 12.8334 2.72464 12.8334 3.16667L12.8334 16.5Z"
        stroke="#101828"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
