import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={11}
      height={13}
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M4.62 12.088a4.593 4.593 0 01-2.583-.789 4.633 4.633 0 01-1.943-2.9 4.665 4.665 0 010-1.862 4.633 4.633 0 013.595-3.595 4.665 4.665 0 011.862 0 4.633 4.633 0 013.595 3.595c.123.605.125 1.228.006 1.833a4.614 4.614 0 01-4.532 3.718zM6.21 5.304a.569.569 0 00-.403.167L4.193 7.083a.57.57 0 00.809.807l.806-.806.807-.806a.569.569 0 00-.403-.974z"
        fill="url(#paint0_linear_814_6377)"
      />
      <Path
        d="M2.358.604A.604.604 0 012.963 0h3.624a.604.604 0 110 1.208H2.963a.604.604 0 01-.605-.604z"
        fill="url(#paint1_linear_814_6377)"
      />
      <Path
        d="M8.56 1.733a.624.624 0 01.882 0l.797.797a.624.624 0 01-.883.882l-.797-.797a.624.624 0 010-.882z"
        fill="url(#paint2_linear_814_6377)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_814_6377"
          x1={4.61981}
          y1={2.84814}
          x2={4.61981}
          y2={12.0878}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FE724C" />
          <Stop offset={1} stopColor="#FCA892" />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_814_6377"
          x1={2.3584}
          y1={0.604122}
          x2={7.19144}
          y2={0.604122}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FE724C" />
          <Stop offset={1} stopColor="#FCA892" />
        </LinearGradient>
        <LinearGradient
          id="paint2_linear_814_6377"
          x1={8.55942}
          y1={1.73257}
          x2={10.239}
          y2={3.41216}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FE724C" />
          <Stop offset={1} stopColor="#FCA892" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
