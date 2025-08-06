import React from "react";
import { Plus } from "react-feather";

export const DragAndDrop = ({ isDragging, ...props }) => {
  return (
    <div
      style={isDragging ? { backgroundColor: "rgba(0,0,0,.1)" } : undefined}
      className="select-image cursor-pointer"
      {...props}
    >
      Click or Drag an image <Plus size={35} />
    </div>
  );
};
