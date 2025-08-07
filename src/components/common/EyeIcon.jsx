const EyeIcon = ({ className = "", width = 32, height = 32 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-purple-600 ${className}`}
    >
      <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path
        d="M10 12H22M10 16H18M10 20H22"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EyeIcon;
