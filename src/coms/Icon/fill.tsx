import { IconSvgProps } from "@/type/svg";

export const IconBook: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <svg
    fill="none"
    viewBox="0 0 28 28"
    width={size || width}
    height={size || height}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_330_1753)">
      <path
        d="M1.72693 6.86719V19.4287C1.72693 20.8354 2.87382 21.9829 4.28259 21.9863C6.26081 21.9911 9.52255 22.3773 11.8324 24.5635C7.83734 23.5853 3.62525 24.2215 1.22498 24.7686C1.07799 24.8025 0.92479 24.8031 0.77771 24.7695C0.630722 24.736 0.493056 24.6694 0.375366 24.5752C0.136093 24.3843 -0.000610352 24.0984 -0.000610352 23.792V7.86914C-0.000600364 7.31694 0.448309 6.86744 1.00037 6.86719H1.72693ZM26.9974 6.86719C27.5497 6.86729 27.9995 7.31685 27.9994 7.86914V23.792C27.9998 23.9423 27.9658 24.0911 27.9008 24.2266C27.8355 24.3621 27.7402 24.4816 27.6224 24.5752C27.5047 24.6694 27.3671 24.736 27.2201 24.7695C27.073 24.8031 26.9199 24.8025 26.7728 24.7686C24.3725 24.2216 20.1606 23.5863 16.1654 24.5645C18.4755 22.3781 21.738 21.991 23.7162 21.9863C25.1249 21.9826 26.2709 20.8353 26.2709 19.4287V6.86719H26.9974ZM4.28259 3.40235C6.62006 3.40781 10.8719 3.94891 13.0844 7.51172C13.1744 7.65691 13.222 7.83277 13.222 8.01953V23.7432C10.5265 20.9223 6.61871 20.4362 4.2865 20.4307C3.73331 20.4292 3.28357 19.9796 3.28357 19.4287V4.4043C3.28319 4.27223 3.30917 4.14154 3.35974 4.01953C3.41037 3.89746 3.48469 3.78646 3.57849 3.69336C3.67041 3.60103 3.77944 3.52745 3.89978 3.47754C4.02027 3.42762 4.15022 3.40207 4.28064 3.40235H4.28259ZM23.7191 3.40235C23.8494 3.40213 23.9786 3.42766 24.099 3.47754C24.2194 3.52744 24.3283 3.60103 24.4203 3.69336C24.6104 3.88305 24.7152 4.13542 24.7152 4.4043V19.4287C24.7152 19.9796 24.2654 20.4293 23.7123 20.4307C21.38 20.4363 17.4732 20.9224 14.7777 23.7432V8.01953C14.7777 7.83277 14.8254 7.65691 14.9154 7.51172C17.1279 3.94932 21.3789 3.40793 23.7162 3.40235H23.7191Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_330_1753">
        <rect
          width="28"
          height="28"
          fill="white"
          transform="translate(2.28882e-05 0.0986328)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const IconBlink: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <svg
    fill="none"
    viewBox="0 0 30 30"
    width={size || width}
    height={size || height}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_330_1721)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6491 1.11254C14.6723 1.0362 14.7194 0.969327 14.7835 0.921807C14.8476 0.874287 14.9253 0.848633 15.0051 0.848633C15.0849 0.848633 15.1626 0.874287 15.2267 0.921807C15.2907 0.969327 15.3379 1.0362 15.361 1.11254L16.7104 5.63744C17.258 7.47387 18.2542 9.14505 19.6092 10.5001C20.9642 11.8552 22.6353 12.8515 24.4717 13.399L28.9966 14.7484C29.0729 14.7717 29.1396 14.8188 29.187 14.8829C29.2345 14.9469 29.2601 15.0245 29.2601 15.1042C29.2601 15.1839 29.2345 15.2615 29.187 15.3256C29.1396 15.3896 29.0729 15.4368 28.9966 15.46L24.4717 16.8094C22.6354 17.357 20.9644 18.3533 19.6094 19.7083C18.2545 21.0633 17.2583 22.7344 16.7107 24.5707L15.361 29.0956C15.3378 29.1719 15.2907 29.2386 15.2266 29.286C15.1625 29.3335 15.0849 29.3591 15.0052 29.3591C14.9255 29.3591 14.848 29.3335 14.7839 29.286C14.7198 29.2386 14.6727 29.1719 14.6494 29.0956L13.3 24.5707C12.7524 22.7344 11.7561 21.0633 10.4011 19.7084C9.046 18.3534 7.37485 17.3572 5.53845 16.8097L1.01415 15.4597C0.93792 15.4365 0.871177 15.3893 0.823753 15.3253C0.77633 15.2612 0.750732 15.1836 0.750732 15.1039C0.750732 15.0242 0.77633 14.9466 0.823753 14.8826C0.871177 14.8185 0.93792 14.7714 1.01415 14.7481L5.53875 13.3987C7.37521 12.8512 9.04641 11.8549 10.4015 10.4999C11.7565 9.1448 12.7528 7.47361 13.3003 5.63714L14.6491 1.11254Z"
        fill={fill}
      />
    </g>
    <defs>
      <clipPath id="clip0_330_1721">
        <rect
          width="30"
          height="30"
          fill="white"
          transform="translate(3.05176e-05 0.0986328)"
        />
      </clipPath>
    </defs>
  </svg>
);

export const IconBadge: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  ...props
}) => (
  <svg
    fill="none"
    viewBox="0 0 28 28"
    width={size || width}
    height={size || height}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M 18 0 H 28 L 20 28 H 10 L 18 0 Z" fill="#83ccf4" />
    <path d="M 8 0 H 18 L 10 28 H 0 L 8 0 Z" fill="#1d80e3" />
  </svg>
);

export const IconPlay: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  ...props
}) => (
  <svg
    fill="none"
    viewBox="0 0 76 76"
    width={size || width}
    height={size || height}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_330_1799)">
      <path
        d="M 7.5 37.3 C 7.5 20.7 20.9 7.3 37.5 7.3 C 54.1 7.3 67.5 20.7 67.5 37.3 C 67.5 53.9 54.1 67.3 37.5 67.3 C 20.9 67.3 7.5 53.9 7.5 37.3 Z"
        fill="white"
        fillOpacity="0.35"
        shapeRendering="crispEdges"
      />
      <path
        d="M 48.2 35.9 L 34.2 25.7 C 34 25.6 33.7 25.5 33.4 25.4 C 33.1 25.4 32.8 25.5 32.5 25.6 C 32.2 25.7 32 26 31.8 26.2 C 31.6 26.5 31.5 26.8 31.5 27.1 V 47.5 C 31.5 47.8 31.6 48.1 31.8 48.4 C 32 48.6 32.2 48.8 32.5 49 C 32.7 49.1 33.1 49.2 33.4 49.2 C 33.7 49.1 34 49 34.2 48.8 L 48.2 38.7 C 48.5 38.5 48.6 38.3 48.8 38.1 C 48.9 37.8 48.9 37.6 48.9 37.3 C 48.9 37 48.9 36.8 48.8 36.5 C 48.6 36.3 48.5 36.1 48.2 35.9 Z"
        fill="white"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_330_1799"
        x="-37.0006"
        y="-40.9014"
        width="150"
        height="150"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_330_1799"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_330_1799"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export const IconWaveRight: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  ...props
}) => (
  <svg
    fill="none"
    viewBox="0 0 80 80"
    width={size || width}
    height={size || height}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      transform="matrix(1.2,0,0,1,-0.5,0)"
      x="0.6"
      y="24.3"
      width="4"
      height="32"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-2,0)"
      opacity="0.5"
      x="9.9"
      y="29.3"
      width="4"
      height="22"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-3.6,0)"
      x="19.2"
      y="4.3"
      width="4"
      height="72"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-5.1,0)"
      opacity="0.5"
      x="28.6"
      y="16.3"
      width="4"
      height="48"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-6.6,0)"
      x="37.9"
      y="20.3"
      width="4"
      height="40"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-8.2,0)"
      opacity="0.5"
      x="47.2"
      y="20.3"
      width="4"
      height="40"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-9.7,0)"
      x="56.5"
      y="13.3"
      width="4"
      height="54"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-11.3,0)"
      opacity="0.5"
      x="65.8"
      y="29.3"
      width="4"
      height="22"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);

export const IconWaveLeft: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  ...props
}) => (
  <svg
    fill="none"
    viewBox="0 0 80 80"
    width={size || width}
    height={size || height}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      transform="matrix(1.2,0,0,1,-2.8,0)"
      x="2.8"
      y="24"
      width="4"
      height="32"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-4.9,0)"
      opacity="0.5"
      x="12.5"
      y="4"
      width="4"
      height="72"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-7.1,0)"
      x="22.2"
      y="29"
      width="4"
      height="22"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-9.2,0)"
      opacity="0.5"
      x="32"
      y="20"
      width="4"
      height="40"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-11.4,0)"
      x="41.7"
      y="16"
      width="4"
      height="48"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-13.5,0)"
      opacity="0.5"
      x="51.4"
      y="13"
      width="4"
      height="54"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-15.7,0)"
      x="61.2"
      y="20"
      width="4"
      height="40"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
    <rect
      transform="matrix(1.2,0,0,1,-17.8,0)"
      opacity="0.5"
      x="70.9"
      y="16"
      width="4"
      height="48"
      rx="2"
      fill="white"
      fillOpacity="0.3"
    />
  </svg>
);
