import * as React from "react";
import type { SVGProps } from "react";
const SvgBranchRegular = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="M9.167 4.583a2.92 2.92 0 0 1-2.5 2.888v2.112h5.208a1.875 1.875 0 0 0 1.875-1.875V7.38a2.918 2.918 0 0 1 .834-5.712A2.917 2.917 0 0 1 15 7.47v.237a3.125 3.125 0 0 1-3.125 3.125H6.667v1.696a2.917 2.917 0 1 1-1.25.092V7.379a2.918 2.918 0 0 1 .833-5.712 2.917 2.917 0 0 1 2.917 2.916M6.25 6.25a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333m8.334 0a1.667 1.667 0 1 0 0-3.333 1.667 1.667 0 0 0 0 3.333m-6.667 9.167a1.667 1.667 0 1 0-3.334 0 1.667 1.667 0 0 0 3.334 0"
    />
  </svg>
);
export default SvgBranchRegular;
