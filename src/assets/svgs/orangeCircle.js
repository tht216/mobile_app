import * as React from "react"
import Svg, { Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={77}
      height={72}
      viewBox="0 0 77 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Circle cx={90.5} cy={-18.5} r={90.5} fill="#FE724C" />
    </Svg>
  )
}

export default SvgComponent

