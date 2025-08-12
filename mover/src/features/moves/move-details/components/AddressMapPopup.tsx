import React from "react";
import { PopupUtils } from "@/hooks/usePopup";
import Modal from "react-modal";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { MdClose } from "react-icons/md";
import Move from "@/models/Move/Move.model";

const StartDotImg = "https://maps.google.com/mapfiles/kml/paddle/A.png";
const EndDotImg = "https://maps.google.com/mapfiles/kml/paddle/B.png";

type IProps = {
  popup: PopupUtils;
  move: Move;
  type: "start" | "end";
};

const customStyles = {
  overlay: {
    zIndex: 1100,
    background: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    padding: 0,
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
    height: "70%",
    width: "min(90%, 45rem)",
  },
};

const AddressMapPopup = ({ popup, move, type }: IProps) => {
  const { start_lat, start_lang, end_lat, end_lang } = move || {};

  const start = React.useMemo(
    () => ({
      lat: parseFloat(start_lat || "0"),
      lng: parseFloat(start_lang || "0"),
    }),
    [start_lat, start_lang]
  );
  
  const end = React.useMemo(
    () => ({
      lat: parseFloat(end_lat || "0"),
      lng: parseFloat(end_lang || "0"),
    }),
    [end_lat, end_lang]
  );

  const centerPosition = type === "start" ? start : end;

  return (
    <Modal
      closeTimeoutMS={200}
      style={customStyles}
      isOpen={popup.isOpen}
      onRequestClose={popup.handleClose}
      contentLabel="Address Map Popup"
      ariaHideApp={false}
    >
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
          <Map
            defaultCenter={centerPosition}
            defaultZoom={14}
            style={{ width: "100%", height: "100%" }}
            gestureHandling="greedy"
            disableDefaultUI={true}
            zoomControl
          >
            <AdvancedMarker position={start} title="Start Location">
              <img
                src={StartDotImg}
                alt="Start"
                style={{ width: 32, height: 37 }}
              />
            </AdvancedMarker>
            
            <AdvancedMarker position={end} title="End Location">
              <img
                src={EndDotImg}
                alt="End"
                style={{ width: 32, height: 37 }}
              />
            </AdvancedMarker>
          </Map>
        </APIProvider>

        <button
          type="button"
          onClick={popup.handleClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: "2.5rem",
            height: "2.5rem",
            cursor: "pointer",
            border: "none",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            backgroundColor: "#fff",
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 4px -1px",
          }}
        >
          <MdClose size={22} />
        </button>
      </div>
    </Modal>
  );
};

export default AddressMapPopup;
