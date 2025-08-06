import React from "react";
import { useExtraImagesContext } from "./ExtraImagesContext";
import ImageInputWithPreview from "../ImageInputWithPreview";
import RemoveButton from "./RemoveButton";

const FilteredExistingExtraImages = () => {
  const { filteredExistingImages, removeImage } = useExtraImagesContext();

  return (
    <>
      {filteredExistingImages.map((img) => (
        <div
          key={img.id}
          style={{ position: "relative", display: "inline-block" }}
        >
          <ImageInputWithPreview
            disabled
            name={`extra_image_${img.id}`}
            preview={img.original_url}
            style={{ cursor: "auto" }}
            showIcon={false}
          />
          <RemoveButton onClick={() => removeImage(img.id)} />
        </div>
      ))}
    </>
  );
};

export default FilteredExistingExtraImages;
