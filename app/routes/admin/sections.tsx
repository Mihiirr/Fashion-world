import React from "react";

type Props = {};

const Sections: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-5xl">Sections</p>
      <p className="text-3xl">Work in progress</p>
    </div>
  );
};

export default Sections;
