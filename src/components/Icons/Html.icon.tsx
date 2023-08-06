function HtmlIcon(props: any) {
  return (
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
          d="M192.188 23.438H32.813l14.062 159.375 65.625 18.75 65.625-18.75 14.063-159.375z"
          fill="#e65100"
        />
        <path d="M112.5 37.5v149.531l52.5-15L176.719 37.5z" fill="#ff6d00" />
        <path
          d="M112.5 117.188v-18.75h40.313l-3.282 53.906L112.5 164.53v-19.687l19.219-6.563 1.406-21.094zm41.719-37.5 1.406-18.75H112.5v18.75z"
          fill="#fff"
        />
        <path
          d="M112.5 144.844v19.687l-37.031-12.187-1.875-25.781h18.75l.937 11.718zM89.531 79.688H112.5v-18.75H69.844l3.281 56.25H112.5v-18.75H90.937z"
          fill="#eee"
        />
      </g>
    </svg>
  );
}

export default HtmlIcon;
