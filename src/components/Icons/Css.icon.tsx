function CssIcon(props: any) {
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
          fill="#0277bd"
        />
        <path d="M112.5 37.5v149.531l52.5-15L176.719 37.5z" fill="#039be5" />
        <path
          d="M155.156 60.938H112.5v18.75h22.969l-1.406 18.75H112.5v18.75h20.625l-1.406 21.093-19.219 6.563v19.687l37.031-12.187 3.281-53.906z"
          fill="#fff"
        />
        <path
          d="M112.5 60.938v18.75H70.781l-1.406-18.75zm-21.563 37.5.938 18.75H112.5v-18.75zm1.876 28.124h-18.75l1.406 25.782L112.5 164.53v-19.687l-19.219-6.563z"
          fill="#eee"
        />
      </g>
    </svg>
  );
}

export default CssIcon;
