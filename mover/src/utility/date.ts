export const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-CA", {
    hour12: false,
  });
