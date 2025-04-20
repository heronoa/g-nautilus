import * as React from "react";
import type { SVGProps } from "react";
const SvgLocation = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#0587FF"
      d="M7.935 3.987a2 2 0 1 0 0 4 2 2 0 0 0 0-4m0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2"
    />
    <path
      fill="#0587FF"
      d="M11.778 2.141a5.435 5.435 0 0 0-8.397 6.81l3.779 5.8a.925.925 0 0 0 1.55 0l3.78-5.8a5.434 5.434 0 0 0-.712-6.81m-.127 6.264L7.935 14.11 4.22 8.405a4.455 4.455 0 0 1 .58-5.557 4.435 4.435 0 0 1 6.272 0 4.455 4.455 0 0 1 .58 5.557"
    />
  </svg>
);
export default SvgLocation;
