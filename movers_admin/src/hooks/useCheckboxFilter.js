import { useState, useEffect } from "react";
import { allAreTrue, objectMap } from "helpers/object";

export const useCheckboxFilter = (data, label, isSuccess) => {
  const [activeChecks, setActiveChecks] = useState({ all: true });

  useEffect(() => {
    if (isSuccess) {
      setActiveChecks((prev) => {
        const obj = { ...prev };
        data.forEach((item) => {
          if (typeof item === "object") {
            obj[item[label]] = true;
          } else {
            obj[item] = true;
          }
        });
        return obj;
      });
    }
  }, [data, label, isSuccess]);

  useEffect(() => {
    if (!activeChecks.all && allAreTrue(activeChecks, ["all"])) {
      setActiveChecks((prev) => ({ ...prev, all: true }));
    }
  }, [activeChecks]);

  const handleChange = (key) => {
    if (key === "all" && activeChecks.all === true) {
      //make all false
      setActiveChecks((prev) => objectMap(prev, () => false));
      return;
    }
    if (key === "all" && activeChecks.all === false) {
      //make all true
      setActiveChecks((prev) => objectMap(prev, () => true));
      return;
    }
    let allShouldToggle = false;
    if (allAreTrue(activeChecks)) {
      allShouldToggle = true;
    }
    setActiveChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
      all: allShouldToggle ? !prev.all : prev.all,
    }));
  };

  const getArrayVersion = () => {
    if (activeChecks.all) return [];
    const ret = [];
    for (const [key, value] of Object.entries(activeChecks)) {
      if (value) ret.push(key);
    }
    return ret;
  };

  return [activeChecks, handleChange, getArrayVersion];
};
