import { IconSvgProps } from "@/type/svg";

export const IconWorld: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
    <path d="M3.6 9h16.8" />
    <path d="M3.6 15h16.8" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </svg>
);

export const IconArrowLeft: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M15 6l-6 6l6 6" />
  </svg>
);

export const IconArrowRight: React.FC<IconSvgProps> = ({
  size,
  width = 24,
  height = 24,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 6l6 6l-6 6" />
  </svg>
);

export const IconCaretUp: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.2959 16.4012C20.1914 16.5061 20.0672 16.5893 19.9304 16.6461C19.7937 16.7029 19.6471 16.7321 19.499 16.7321C19.351 16.7321 19.2043 16.7029 19.0676 16.6461C18.9309 16.5893 18.8067 16.5061 18.7021 16.4012L12 9.69901L5.2959 16.4012C5.08455 16.6125 4.79791 16.7313 4.49902 16.7313C4.20014 16.7313 3.91349 16.6125 3.70215 16.4012C3.4908 16.1899 3.37207 15.9032 3.37207 15.6043C3.37207 15.3054 3.4908 15.0188 3.70215 14.8074L11.2021 7.30745C11.3067 7.20257 11.4309 7.11935 11.5676 7.06257C11.7043 7.00579 11.851 6.97656 11.999 6.97656C12.1471 6.97656 12.2937 7.00579 12.4304 7.06257C12.5672 7.11935 12.6914 7.20257 12.7959 7.30745L20.2959 14.8074C20.4008 14.912 20.484 15.0362 20.5408 15.1729C20.5976 15.3096 20.6268 15.4563 20.6268 15.6043C20.6268 15.7524 20.5976 15.899 20.5408 16.0357C20.484 16.1725 20.4008 16.2967 20.2959 16.4012Z"
      fill={fill}
    />
  </svg>
);

export const IconCaretDown: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M20.2959 16.4012C20.1914 16.5061 20.0672 16.5893 19.9304 16.6461C19.7937 16.7029 19.6471 16.7321 19.499 16.7321C19.351 16.7321 19.2043 16.7029 19.0676 16.6461C18.9309 16.5893 18.8067 16.5061 18.7021 16.4012L12 9.69901L5.2959 16.4012C5.08455 16.6125 4.79791 16.7313 4.49902 16.7313C4.20014 16.7313 3.91349 16.6125 3.70215 16.4012C3.4908 16.1899 3.37207 15.9032 3.37207 15.6043C3.37207 15.3054 3.4908 15.0188 3.70215 14.8074L11.2021 7.30745C11.3067 7.20257 11.4309 7.11935 11.5676 7.06257C11.7043 7.00579 11.851 6.97656 11.999 6.97656C12.1471 6.97656 12.2937 7.00579 12.4304 7.06257C12.5672 7.11935 12.6914 7.20257 12.7959 7.30745L20.2959 14.8074C20.4008 14.912 20.484 15.0362 20.5408 15.1729C20.5976 15.3096 20.6268 15.4563 20.6268 15.6043C20.6268 15.7524 20.5976 15.899 20.5408 16.0357C20.484 16.1725 20.4008 16.2967 20.2959 16.4012Z"
      fill={fill}
    />
  </svg>
);

export const IconMenu2: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 6l16 0" />
    <path d="M4 12l16 0" />
    <path d="M4 18l16 0" />
  </svg>
);

export const IconVideo: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
    <path d="M8 4l0 16" />
    <path d="M16 4l0 16" />
    <path d="M4 8l4 0" />
    <path d="M4 16l4 0" />
    <path d="M4 12l16 0" />
    <path d="M16 8l4 0" />
    <path d="M16 16l4 0" />
  </svg>
);

export const IconArticle: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11" />
    <path d="M8 8l4 0" />
    <path d="M8 12l4 0" />
    <path d="M8 16l4 0" />
  </svg>
);

export const IconSearch: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </svg>
);

export const IconUser: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width || size}
    height={height || size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={fill}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  </svg>
);

export const IconList: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12ZM3.75 7.125H20.25C20.5484 7.125 20.8345 7.00647 21.0455 6.7955C21.2565 6.58452 21.375 6.29837 21.375 6C21.375 5.70163 21.2565 5.41548 21.0455 5.2045C20.8345 4.99353 20.5484 4.875 20.25 4.875H3.75C3.45163 4.875 3.16548 4.99353 2.9545 5.2045C2.74353 5.41548 2.625 5.70163 2.625 6C2.625 6.29837 2.74353 6.58452 2.9545 6.7955C3.16548 7.00647 3.45163 7.125 3.75 7.125ZM20.25 16.875H3.75C3.45163 16.875 3.16548 16.9935 2.9545 17.2045C2.74353 17.4155 2.625 17.7016 2.625 18C2.625 18.2984 2.74353 18.5845 2.9545 18.7955C3.16548 19.0065 3.45163 19.125 3.75 19.125H20.25C20.5484 19.125 20.8345 19.0065 21.0455 18.7955C21.2565 18.5845 21.375 18.2984 21.375 18C21.375 17.7016 21.2565 17.4155 21.0455 17.2045C20.8345 16.9935 20.5484 16.875 20.25 16.875Z"
      fill={fill}
    />
  </svg>
);

export const IconMagnifyingGlass: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M21.7953 20.2044L17.3431 15.7504C18.678 14.0108 19.3013 11.8286 19.0864 9.64643C18.8715 7.46426 17.8347 5.44552 16.1861 3.99972C14.5376 2.55393 12.4008 1.78935 10.2092 1.86107C8.01768 1.9328 5.93546 2.83546 4.38497 4.38595C2.83448 5.93644 1.93182 8.01865 1.86009 10.2102C1.78837 12.4018 2.55295 14.5385 3.99875 16.1871C5.44454 17.8356 7.46328 18.8725 9.64545 19.0874C11.8276 19.3023 14.0098 18.679 15.7494 17.3441L20.2053 21.801C20.31 21.9056 20.4342 21.9886 20.5709 22.0453C20.7077 22.1019 20.8542 22.1311 21.0022 22.1311C21.1502 22.1311 21.2967 22.1019 21.4335 22.0453C21.5702 21.9886 21.6944 21.9056 21.7991 21.801C21.9037 21.6963 21.9867 21.5721 22.0434 21.4354C22.1 21.2986 22.1291 21.1521 22.1291 21.0041C22.1291 20.8561 22.1 20.7096 22.0434 20.5728C21.9867 20.4361 21.9037 20.3119 21.7991 20.2072L21.7953 20.2044ZM4.12438 10.5004C4.12438 9.2395 4.49827 8.00696 5.19876 6.9586C5.89926 5.91024 6.8949 5.09314 8.05978 4.61063C9.22466 4.12812 10.5065 4.00187 11.7431 4.24785C12.9797 4.49383 14.1156 5.10099 15.0072 5.99255C15.8987 6.88411 16.5059 8.02003 16.7519 9.25666C16.9979 10.4933 16.8716 11.7751 16.3891 12.94C15.9066 14.1048 15.0895 15.1005 14.0411 15.801C12.9928 16.5015 11.7602 16.8754 10.4994 16.8754C8.80916 16.8736 7.18866 16.2014 5.9935 15.0062C4.79833 13.8111 4.12612 12.1906 4.12438 10.5004Z"
      fill={fill}
    />
  </svg>
);

export const IconCaretRight: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.4137 10.6632L8.16374 16.9132C7.98761 17.0894 7.74874 17.1883 7.49967 17.1883C7.2506 17.1883 7.01173 17.0894 6.83561 16.9132C6.65949 16.7371 6.56055 16.4983 6.56055 16.2492C6.56055 16.0001 6.65949 15.7612 6.83561 15.5851L12.4223 9.99997L6.83717 4.41325C6.74997 4.32604 6.68079 4.22251 6.6336 4.10857C6.5864 3.99463 6.56211 3.87251 6.56211 3.74919C6.56211 3.62586 6.5864 3.50374 6.6336 3.3898C6.68079 3.27586 6.74997 3.17233 6.83717 3.08512C6.92438 2.99792 7.02791 2.92874 7.14185 2.88155C7.25579 2.83435 7.37791 2.81006 7.50124 2.81006C7.62456 2.81006 7.74668 2.83435 7.86062 2.88155C7.97456 2.92874 8.07809 2.99792 8.1653 3.08512L14.4153 9.33512C14.5026 9.42232 14.5718 9.5259 14.619 9.63991C14.6662 9.75392 14.6904 9.87612 14.6903 9.99951C14.6901 10.1229 14.6656 10.245 14.6182 10.3589C14.5707 10.4728 14.5012 10.5763 14.4137 10.6632Z"
      fill={fill}
    />
  </svg>
);

export const IconCaretLeft: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.1633 15.5867C13.3394 15.7628 13.4383 16.0017 13.4383 16.2508C13.4383 16.4998 13.3394 16.7387 13.1633 16.9148C12.9872 17.091 12.7483 17.1899 12.4992 17.1899C12.2501 17.1899 12.0113 17.091 11.8351 16.9148L5.58515 10.6648C5.49775 10.5777 5.4284 10.4742 5.38108 10.3603C5.33377 10.2463 5.30941 10.1242 5.30941 10.0008C5.30941 9.87738 5.33377 9.75521 5.38108 9.64125C5.4284 9.5273 5.49775 9.42381 5.58515 9.33671L11.8351 3.08671C12.0113 2.91059 12.2501 2.81165 12.4992 2.81165C12.7483 2.81165 12.9872 2.91059 13.1633 3.08671C13.3394 3.26283 13.4383 3.5017 13.4383 3.75077C13.4383 3.99984 13.3394 4.23871 13.1633 4.41483L7.57812 9.99999L13.1633 15.5867Z"
      fill={fill}
    />
  </svg>
);

export const IconGlobal: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    width={size || width}
    height={size || height}
    viewBox="0 0 36 37"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18.003 3.09961C26.1631 3.09982 32.78 9.58167 32.9971 17.6885C33.0414 17.8176 33.0664 17.956 33.0664 18.0996C33.0564 18.2097 33.0317 18.3159 32.9981 18.418C32.8293 26.5678 26.1948 33.0979 18.0039 33.0986V33.0996L18.003 33.0986V33.0996C9.70509 33.0996 3.00296 26.3975 3.00296 18.0996C3.00303 9.93129 9.49718 3.30919 17.6153 3.10449L18.003 3.09961ZM13.6885 19.376C13.9517 26.2933 16.3172 30.6083 18.003 30.6094H18.0039C19.6897 30.6088 22.0552 26.2937 22.3184 19.376H13.6885ZM5.55667 19.376C6.04548 24.1692 9.25654 28.1736 13.6123 29.8135C12.1624 27.1757 11.3451 23.28 11.1983 19.376H5.55667ZM24.8086 19.376C24.6618 23.2799 23.8434 27.1747 22.3936 29.8125C26.7489 28.1724 29.9595 24.1688 30.4483 19.376H24.8086ZM13.6123 6.38477C9.2567 8.02438 6.04592 12.0295 5.55667 16.8223H11.1983C11.3453 12.9182 12.1622 9.02228 13.6123 6.38477ZM18.003 5.58887C16.3173 5.58995 13.9519 9.90574 13.6885 16.8223H22.3184C22.0549 9.90535 19.6896 5.58945 18.0039 5.58887H18.003ZM22.3936 6.38574C23.8436 9.02325 24.6616 12.9183 24.8086 16.8223H30.4483C29.9591 12.0299 26.7487 8.02559 22.3936 6.38574Z"
      fill={fill}
    />
  </svg>
);

export const IconHeadphones: React.FC<IconSvgProps> = ({
  size,
  width = 22,
  height = 22,
  fill = "currentColor",
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || width}
    height={size || height}
    fill={fill}
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="M201.89,54.66A103.43,103.43,0,0,0,128.79,24H128A104,104,0,0,0,24,128v56a24,24,0,0,0,24,24H64a24,24,0,0,0,24-24V144a24,24,0,0,0-24-24H40.36A88,88,0,0,1,128,40h.67a87.71,87.71,0,0,1,87,80H192a24,24,0,0,0-24,24v40a24,24,0,0,0,24,24h16a24,24,0,0,0,24-24V128A103.41,103.41,0,0,0,201.89,54.66ZM64,136a8,8,0,0,1,8,8v40a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V136Zm152,48a8,8,0,0,1-8,8H192a8,8,0,0,1-8-8V144a8,8,0,0,1,8-8h24Z"></path>
  </svg>
);
