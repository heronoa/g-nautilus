import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronDown2 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m4 6 4 4 4-4"
    />
  </svg>
);
export default SvgChevronDown2;
