import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M7.529 16.123H.999"
        stroke="#FE724C"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M19.28 16.123H7.53"
        stroke="#FE724C"
        strokeOpacity={0.25}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M10.347 16a3 3 0 10-6 0 3 3 0 006 0z"
        fill="#FE724C"
        stroke="#FE724C"
        strokeWidth={1.5}
      />
      <Path
        d="M12.752 3.877h6.529"
        stroke="#FE724C"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M1 3.877h11.752"
        stroke="#FE724C"
        strokeOpacity={0.25}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M9.934 4a3 3 0 106 0 3 3 0 00-6 0z"
        fill="#FE724C"
        stroke="#FE724C"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default SvgComponent
