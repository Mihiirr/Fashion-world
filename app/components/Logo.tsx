import React from "react";

type ButtonSizes = "large" | "medium" | "small";

type Props = {
  size?: ButtonSizes;
};

const SizeVariantStyles: {
  [size in ButtonSizes]: Record<string, string>;
} = {
  large: {
    text: "text-4xl",
  },
  medium: {
    text: "text-2xl",
  },
  small: {
    text: "text-xl",
  },
};

const Logo: React.FC<Props> = (props) => {
  const { size = "large" } = props;
  const sizeStyles = SizeVariantStyles[size];
  return (
    <div className={Object.values(sizeStyles).join(" ")}>FASHION ₰ WORLD</div>
  );
};

export default Logo;
