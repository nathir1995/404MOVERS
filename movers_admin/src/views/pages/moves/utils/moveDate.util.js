export const formatDateTime = (value) =>
  new Date(value).toLocaleString("en-CA", {
    hour12: false,
  });
