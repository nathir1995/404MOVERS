export const preventFormSubmit = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
  }
};
