import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Colors } from "../../Theme"

export const Home = (props: string | number) => {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 25 24"
      fill="none">
      <Path
        d="M24.326 10.439l-.002-.002L14.126.647A2.335 2.335 0 0012.5 0c-.615 0-1.193.23-1.628.647L.68 10.432l-.01.01a2.15 2.15 0 00.004 3.12 2.334 2.334 0 001.598.648h.406v7.204C2.677 22.84 3.886 24 5.371 24h3.99c.404 0 .732-.315.732-.703v-5.649c0-.65.552-1.18 1.23-1.18h2.352c.678 0 1.23.53 1.23 1.18v5.649c0 .388.327.703.732.703h3.99c1.485 0 2.693-1.16 2.693-2.586V14.21h.377c.615 0 1.193-.23 1.628-.648a2.15 2.15 0 00.001-3.123z"
        fill={props.color ? props.color : Colors?.placeHolderTextBlack}
      />
    </Svg>
  )
}


