export const customModalStyles = {
  overlay: {
    zIndex: 1100,
    background: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    padding: "1.5rem 1rem",
    border: "none",
    boxShadow: "0px 4px 4px 0px #00000040",
    borderRadius: "8px",

    zIndex: 1105,
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90%",
    width: "min(90%, 30rem)",
  },
};
