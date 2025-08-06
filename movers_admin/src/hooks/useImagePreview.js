import { useState, useEffect } from "react";

export const useImagePreview = (defaultValue) => {
  const [preview, setPreview] = useState(defaultValue || null);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(preview);

    };
  }, [preview]);

  const handleImageChange = (event) => {

    setPreview(URL.createObjectURL(event.target.files[0]));

  };

  return {
    preview,
    handleImageChange,
    setPreview,
  };
};
