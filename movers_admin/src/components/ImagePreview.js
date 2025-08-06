import React from "react";
import { useTranslation } from "utility/language";

const ImagePreview = ({
  preview,
  height = 200,
  emptyText = "image_preview",
}) => {
  const t = useTranslation();

  return (
    <div
      style={{
        border: "1px solid lightgray",
        height: `${height}px`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {preview ? (
        <img
          className="p-1"
          style={{
            maxWidth: "100%",
            objectFit: "contain",
          }}
          height={height}
          src={preview}
          alt=""
        />
      ) : (
        <div>{t(emptyText)}</div>
      )}
    </div>
  );
};

export default ImagePreview;
