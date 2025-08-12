import React from "react";
import { safeFind } from "@/utility/arraySafety";

const useProcessingArrayOnMutation = <T>() => {
  const [processingIDs, setProccesingIDs] = React.useState<T[]>([]);

  const startProcessing = React.useCallback(
    (id: T) => setProccesingIDs((prev) => [...prev, id]),
    []
  );

  const endProcessing = React.useCallback(
    (id: T) => setProccesingIDs((prev) => prev.filter((_id) => _id !== id)),
    []
  );

  const isProcessing = React.useCallback(
    (id: T) => safeFind(processingIDs, (_id) => _id === id) !== undefined,
    [processingIDs]
  );

  return React.useMemo(
    () => ({
      processingIDs,
      startProcessing,
      endProcessing,
      isProcessing,
    }),
    [processingIDs, startProcessing, endProcessing, isProcessing]
  );
};

export default useProcessingArrayOnMutation;
