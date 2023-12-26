import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle
        cx={6}
        cy={6}
        r={5}
        fill="#323232"
        stroke="#323232"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default SvgComponent
