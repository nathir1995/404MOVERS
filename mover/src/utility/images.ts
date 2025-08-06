export const getImageType = (imageSrc: string): string => {
  const splits = imageSrc.split(".");
  if (splits.length === 0) return "";
  return splits[splits.length - 1];
};
