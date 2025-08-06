export const formatFromBackend = (value) => value.split("T")[0];
export const formatToBackend = (value) => value.replace("T", " ");
export const getFormattedToday = () => new Date().toJSON().slice(0, 10);
export const formateDateObject = (value) =>
  value.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
