import colors from "@/assets/scss/colors.module.scss";
import { MuiStepSliderControlType } from "@/components/MultiStepSliderComponent/types";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import React from "react";
import { BiTargetLock } from "react-icons/bi";
import AddressDetails from "../components/AddressDetails";
import StepControls from "../components/StepControls";
import ViewOnlyMap from "../components/ViewOnlyMap";
import styles from "./styles.module.scss";

const LocationForm = ({ controls }: { controls: MuiStepSliderControlType }) => {
  const [selectedType, setSelectedType] = React.useState<"start" | "end">(
    "start"
  );
  const places = useMapsLibrary("places");

  if (!places) {
    return null;
  }
  return (
    <div>
      <div className={styles.location_details_content}>
        <div className={styles.padding_container}>
          <h6
            style={{
              marginBottom: ".5rem",
              color: selectedType === "start" ? colors.primary : "#000",
              cursor: "pointer",
            }}
            onClick={() => setSelectedType("start")}
          >
            <BiTargetLock
              fontSize={24}
              style={{ transform: "translateY(6px)" }}
            />{" "}
            Pick-Up
          </h6>
          <AddressDetails type="start" setSelectedType={setSelectedType} />

          <h6
            style={{
              marginBottom: ".5rem",
              marginTop: "1.5rem",
              color: selectedType === "end" ? colors.primary : "#000",
              cursor: "pointer",
            }}
            onClick={() => {
              setSelectedType("end");
              window.scrollTo({ top: 0 });
            }}
          >
            <BiTargetLock
              fontSize={24}
              style={{ transform: "translateY(6px)" }}
            />{" "}
            Drop-Off
          </h6>
          <AddressDetails type="end" setSelectedType={setSelectedType} />
        </div>

        <div>
          <ViewOnlyMap />
        </div>
      </div>

      <StepControls controls={controls} />
    </div>
  );
};

export default LocationForm;
