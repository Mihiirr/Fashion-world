import { eventNames } from "process";
import React, { useRef, useState } from "react";

interface Props {
  onChange: (file: File) => any;
  imageUrl?: string;
}

const ImageUploader = ({ onChange, imageUrl }: Props) => {
  const [draggingOver, setDraggingOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropRef = useRef(null);

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    preventDefault(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(event.currentTarget.files[0]);
    }
  };

  return (
    <div
      ref={dropRef}
      onDragEnter={() => setDraggingOver(true)}
      onDragLeave={() => setDraggingOver(false)}
      onDrag={preventDefault}
      onDragStart={preventDefault}
      onDragEnd={preventDefault}
      onDragOver={preventDefault}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input type="file" ref={fileInputRef} onChange={handleChange} />
    </div>
  );
};

export default ImageUploader;
