import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={160}
      height={66}
      viewBox="0 0 160 66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={77.5} cy={-16.5} r={82.5} fill="#FFECE7" />
    </Svg>
  )
}

export default SvgComponent
