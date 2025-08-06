import React from "react";
import { useGetEmployees } from "api/employees";

const useEmployeesOptions = () => {
  const { data } = useGetEmployees();

  return React.useMemo(() => {
    let options = [];
    if (data && Array.isArray(data)) {
      options = data.map(({ id, first_name, last_name }) => ({
        value: id,
        label: `${first_name} ${last_name}`,
      }));
    }
    return options;
  }, [data]);
};

export default useEmployeesOptions;
