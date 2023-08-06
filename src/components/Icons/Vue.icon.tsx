import { SVGProps } from "react";

const VueIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 225 225"
    style={{ fill: "#000" }}
    {...props}
  >
    <g
      fill="none"
      strokeMiterlimit={10}
      fontFamily="none"
      fontWeight="none"
      fontSize="none"
      textAnchor="none"
      style={{ mixBlendMode: "normal" }}
    >
      <path d="M0 225.99V0h225.99v225.99z" />
      <path
        d="M112.44 79.688 87.815 37.5H13.94l98.498 168.75L210.938 37.5h-73.875z"
        fill="#81c784"
      />
      <path
        d="m137.063 37.5-24.624 42.188L87.816 37.5h-35.57l60.193 103.125L172.631 37.5z"
        fill="#455a64"
      />
    </g>
  </svg>
);

export default VueIcon;
