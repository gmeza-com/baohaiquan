const Spinner: React.FC<{ size?: number }> = ({ size = 22 }) => {
  return (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      width={size || 22}
      height={size || 22}
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        opacity={0.25}
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        opacity={0.75}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Spinner;
