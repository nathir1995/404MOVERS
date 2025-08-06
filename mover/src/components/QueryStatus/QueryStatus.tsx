import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import colors from "@/assets/scss/colors.module.scss";
import Button from "../Button";
import { MdError } from "react-icons/md";

type IProps = React.ComponentProps<"div"> & {
  isLoading: boolean;
  isError: boolean;
  refetch?: () => void;
};

const containerStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  minHeight: " 20rem",
  width: "100%",
};

const QueryStatus = ({
  isLoading,
  isError,
  refetch,
  style = {},
  ...props
}: IProps) => {
  return (
    <div style={{ ...containerStyles, ...style }} {...props}>
      {isLoading && <ScaleLoader color={colors.primary} />}
      {isError && (
        <>
          <MdError color={"red"} size={48} />
          <h6 style={{ textAlign: "center", color: "red" }}>
            An Error occured, Please try again
          </h6>
          {refetch && (
            <Button style={{ padding: ".5rem 1.5rem" }} onClick={refetch}>
              Retry
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default QueryStatus;
