import * as React from "react";
import type { SVGProps } from "react";
const SvgEnterprise = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#0587FF"
      d="M4 4h1v2H4zM4 7h1v2H4zM7 4h1v2H7zM7 7h1v2H7zM4 10h1v2H4zM7 10h1v2H7z"
    />
    <path
      fill="#0587FF"
      d="M15 7a1 1 0 0 0-1-1h-3V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v13h14zM2 2h8v12H2zm9 12V7h3v7z"
    />
  </svg>
);
export default SvgEnterprise;
