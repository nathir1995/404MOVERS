import React from "react";
import { v4 as uuidv4 } from "uuid";

const ExtraImagesContext = React.createContext();
export const useExtraImagesContext = () => React.useContext(ExtraImagesContext);

const ExtraImagesContextProvider = ({
  existingImages = [],
  MAX_IMAGES = 5,
  children,
}) => {
  const [newImages, setNewImages] = React.useState([]);
  const [deletedImagesIDs, setDeletedImagesIDs] = React.useState([]);

  const filteredExistingImages = React.useMemo(
    () => existingImages.filter((img) => !deletedImagesIDs.includes(img.id)),
    [existingImages, deletedImagesIDs]
  );

  const addNewImages = React.useCallback(
    (imageFiles) => {
      const imagesToAdd = imageFiles.map((file) => ({ id: uuidv4(), file }));
      setNewImages((prev) => {
        const maxRemaining = MAX_IMAGES - filteredExistingImages.length;
        return [...prev, ...imagesToAdd].slice(0, maxRemaining);
      });
    },
    [filteredExistingImages, MAX_IMAGES]
  );

  const removeImage = React.useCallback(
    (imageID) => {
      const existsInNewArray =
        newImages.find((img) => img.id === imageID) !== undefined;
      if (existsInNewArray) {
        setNewImages((prev) => prev.filter((img) => img.id !== imageID));
      } else {
        setDeletedImagesIDs((prev) => [...prev, imageID]);
      }
    },
    [newImages]
  );

  const memoedValue = React.useMemo(
    () => ({
      newImages,
      deletedImagesIDs,
      addNewImages,
      removeImage,
      filteredExistingImages,
      MAX_IMAGES,
    }),
    [
      newImages,
      deletedImagesIDs,
      addNewImages,
      removeImage,
      filteredExistingImages,
      MAX_IMAGES,
    ]
  );
  return (
    <ExtraImagesContext.Provider value={memoedValue}>
      {children}
    </ExtraImagesContext.Provider>
  );
};

export default ExtraImagesContextProvider;
