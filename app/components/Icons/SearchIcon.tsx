import React from "react";

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="presentation"
      viewBox="0 0 64 64"
      height="30"
      width="30"
      fillOpacity="0"
      stroke="black"
      strokeWidth="1.5"
      {...props}
    >
      <path d="M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42"></path>
    </svg>
  );
};

export default SearchIcon;
