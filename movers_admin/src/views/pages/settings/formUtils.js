export const getInitialValues = (settings) => {
  return {
    options: settings.map((item) => ({
      id: item.id,
      option_name: item.option_name,
      option_value: item.option_value,
      status: item.status,
    })),
  };
};
