import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { MdError } from "react-icons/md";

const AddressIndicator = ({
  isLoading,
  isError,
}: {
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) return <PulseLoader size={4} style={{ display: "inline" }} />;
  if (isError)
    return <MdError color="red" style={{ transform: "translateY(2px)" }} />;
  return null;
};

export default AddressIndicator;
