import React from "react";
import ReactDOM from "react-dom/client";
import ScaleLoader from "react-spinners/ScaleLoader";

const style = {
  position: "fixed",
  inset: 0,
  zIndex: 1200,

  backgroundColor: "rgba(0, 0, 0, 0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Component = () => (
  <div style={style}>
    <ScaleLoader color="#fff" />
  </div>
);

const ID = "loading-backdrop";

const LoadingBackdrop = () => {
  React.useEffect(() => {
    const RootElement = document.createElement("div");
    RootElement.id = ID;
    document.body.appendChild(RootElement);

    const Container = ReactDOM.createRoot(RootElement);
    Container.render(<Component />);

    return () => {
      // Container.unmount();
      document.body.removeChild(RootElement);
    };
  }, []);

  return null;
};

export default LoadingBackdrop;
