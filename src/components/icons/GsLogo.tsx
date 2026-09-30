import React from 'react';

interface GsLogoProps {
  size?: number;
  className?: string;
  active?: boolean;
}

export const GsLogo: React.FC<GsLogoProps> = ({ size = 24, className = '', active = false }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer geometric frame */}
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        rx="4"
        fill="#121215"
        stroke={active ? "#22C55E" : "#2A2A2E"}
        strokeWidth="1.5"
      />
      {/* Geometric 'G' in crisp off-white */}
      <path
        d="M 14.5 10 L 9.5 10 C 8 10 7 11 7 12.5 L 7 19.5 C 7 21 8 22 9.5 22 L 14.5 22 C 15.5 22 16 21 16 20 L 16 16 L 11.5 16"
        stroke="#EDEDED"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Geometric 'S' with restrained green stroke when active or off-white */}
      <path
        d="M 24 11 C 24 10 23 10 21.5 10 L 19 10 C 18 10 17.5 10.5 17.5 11.5 C 17.5 13.5 24.5 13.5 24.5 17 C 24.5 20.5 23 22 20.5 22 L 18 22 C 17 22 16.5 21 16.5 20.5"
        stroke={active ? "#22C55E" : "#8C8C93"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
