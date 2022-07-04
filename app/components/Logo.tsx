import { Link } from "@remix-run/react";
import React from "react";

type ButtonSizes = "large" | "medium" | "small";

type Props = {
  size?: ButtonSizes;
};

const SizeVariantStyles: {
  [size in ButtonSizes]: Record<string, string>;
} = {
  large: {
    text: "text-7xl lg:text-5xl",
    font: "font-cursive",
  },
  medium: {
    text: "text-5xl lg:text-3xl",
    font: "font-cursive",
  },
  small: {
    text: "text-4xl lg:text-2xl",
    font: "font-cursive",
  },
};

const Logo: React.FC<Props> = (props) => {
  const { size = "large" } = props;
  const sizeStyles = SizeVariantStyles[size];
  return (
    <Link to="/">
      <div className={Object.values(sizeStyles).join(" ")}>Glammy Girl</div>
    </Link>
  );
};

export default Logo;
