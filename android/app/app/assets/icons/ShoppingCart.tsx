import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

export function ShoppingCart(props: any) {
  return (
    <Svg
      width={props.width ? props.width : '42'}
      height={props.height ? props.width : '42'}
      viewBox="0 0 42 42"
      fill="none">
      <Path
        d="M1.75 1.75H8.75L13.44 25.1825C13.6 25.9882 14.0383 26.7119 14.6782 27.227C15.3181 27.7421 16.1187 28.0157 16.94 28H33.95C34.7713 28.0157 35.5719 27.7421 36.2118 27.227C36.8517 26.7119 37.29 25.9882 37.45 25.1825L40.25 10.5H10.5M17.5 36.75C17.5 37.7165 16.7165 38.5 15.75 38.5C14.7835 38.5 14 37.7165 14 36.75C14 35.7835 14.7835 35 15.75 35C16.7165 35 17.5 35.7835 17.5 36.75ZM36.75 36.75C36.75 37.7165 35.9665 38.5 35 38.5C34.0335 38.5 33.25 37.7165 33.25 36.75C33.25 35.7835 34.0335 35 35 35C35.9665 35 36.75 35.7835 36.75 36.75Z"
        stroke={props.color ? props.color : '#52FF9A'}
        stroke-width="3.5"
        strokeWidth={3.5}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
