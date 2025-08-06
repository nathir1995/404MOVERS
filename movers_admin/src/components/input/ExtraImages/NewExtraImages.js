import React from "react";
import { useExtraImagesContext } from "./ExtraImagesContext";
import ImageInputWithPreview from "../ImageInputWithPreview";
import RemoveButton from "./RemoveButton";
import { MdAdd } from "react-icons/md";

const NewExtraImages = () => {
  const {
    newImages,
    removeImage,
    addNewImages,
    filteredExistingImages,
    MAX_IMAGES,
  } = useExtraImagesContext();
  const isMaxed =
    filteredExistingImages.length + newImages.length >= MAX_IMAGES;

  return (
    <>
      {newImages.map((img) => (
        <div
          key={img.id}
          style={{ position: "relative", display: "inline-block" }}
        >
          <ImageInputWithPreview
            disabled
            name={`extra_image_${img.id}`}
            preview={URL.createObjectURL(img.file)}
            style={{ cursor: "auto" }}
            showIcon={false}
          />
          <RemoveButton onClick={() => removeImage(img.id)} />
        </div>
      ))}

      {!isMaxed && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <ImageInputWithPreview
            name={`extra_image`}
            showIcon={false}
            onChange={(e) =>
              addNewImages(
                Object.keys(e.target.files).map((idx) => e.target.files[idx])
              )
            }
            inputProps={{
              multiple: true,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.65)",
              pointerEvents: "none",
              cursor: "pointer",
            }}
          >
            <MdAdd size={52} />
          </div>
        </div>
      )}
    </>
  );
};

export default NewExtraImages;
