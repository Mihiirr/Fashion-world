import React from "react";

const variantProps = {
  primary: {
    className:
      "w-full p-2 border-2 rounded-sm text-lg border-stone-300 hover:bg-stone-100 active:bg-stone-200",
  },
  secondary: {
    className:
      "p-2 w-full flex items-center justify-center bg-black text-white text-lg rounded-sm",
  },
};

const Button: React.FC<
  Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "className"
  > & {
    variant?: keyof typeof variantProps;
  }
> = ({ children, variant = "primary", ...btnProps }) => {
  return (
    <button type="button" {...variantProps[variant]} {...btnProps}>
      {children}
    </button>
  );
};

export default Button;
