import React from "react";
import { useFormikContext } from "formik";
import { ValuesType } from "./formUtils";

import { MuiStepSliderControlType } from "@/components/MultiStepSliderComponent/types";
import StepControls from "../components/StepControls";

import colors from "@/assets/scss/colors.module.scss";
import styles from "./styles.module.scss";

import SelectableItem from "@/components/SelectableItem";

import { useMovePackages } from "../api/BookMove.hooks";
import QueryStatus from "@/components/QueryStatus";
import MovePackage from "@/models/Move/Package";
import { safeMap, hasItems } from "@/utility/arraySafety";

const Item = ({ item }: { item: MovePackage }) => {
  const formik = useFormikContext<ValuesType>();
  const selectedMovePackageId = formik.values.move_package_id;
  const currentId = item.id;

  const handleClick = () => {
    formik.setFieldValue("move_package_id", currentId);
  };

  return (
    <SelectableItem
      isSelected={currentId === selectedMovePackageId}
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      <div
        style={{
          display: "flex",
          gap: ".5rem",
          justifyContent: "space-between",
          marginBottom: ".25rem",
        }}
      >
        <h6 style={{ lineHeight: 1.2 }}>{item.name}</h6>
        <p>
          <strong>{item.price}$</strong>
        </p>
      </div>

      <p>{item.description}</p>
    </SelectableItem>
  );
};

const PackagesForm = ({
  controls,
  move_packages,
}: {
  controls: MuiStepSliderControlType;
  move_packages: MovePackage[];
}) => {
  return (
    <>
      <div className={styles.items_form_container}>
        <h5>
          CHOOSE YOUR <span style={{ color: colors.primary }}>PLAN</span>
        </h5>
        {!hasItems(move_packages) ? (
          <p
            style={{
              fontWeight: "bold",
              fontSize: ".85em",
              paddingBlock: "2rem",
              textAlign: "center",
            }}
          >
            No Packages Available
          </p>
        ) : (
          <div className={styles.row_2}>
            {safeMap(move_packages, (item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      <StepControls controls={controls} />
    </>
  );
};

const PackagesWithQuery = ({
  controls,
}: {
  controls: MuiStepSliderControlType;
}) => {
  const { data, isLoading, isError, refetch } = useMovePackages();
  const move_packages = React.useMemo(() => {
    if (data?.data.move_packages) return data.data.move_packages;
    return [];
  }, [data]);

  if (isLoading || isError) {
    return (
      <QueryStatus isLoading={isLoading} isError={isError} refetch={refetch} />
    );
  }
  return <PackagesForm controls={controls} move_packages={move_packages} />;
};

export default PackagesWithQuery;
