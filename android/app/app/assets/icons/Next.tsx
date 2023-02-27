import React from 'react';
import Svg, {Path} from 'react-native-svg';

function Next(props: any) {
  return (
    // <Svg width={props.width} height={props.height} viewBox="0 0 24 27" fill="none" > -->
    <Svg
      width={props.width? props.width:14}
      height={props.height?props.height:14}
      viewBox="0 0 4 14"
      fill="none">
     
      <Path
       d="M1.16675 7.00033H12.8334M12.8334 7.00033L7.00008 1.16699M12.8334 7.00033L7.00008 12.8337" 
      stroke={props.color ? props.color : '#0F0742'}
      strokeWidth="1.67"
     
      strokeLinecap="round" strokeLinejoin="round"/>
      
      
    
    </Svg>
  );
}

export default Next;
