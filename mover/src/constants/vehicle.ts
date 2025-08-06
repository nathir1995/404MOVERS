export const MAX_VEHICLE_YEAR = new Date().getFullYear() + 1;
export const MIN_VEHICLE_YEAR = 1970;

export const VEHICLE_TYPES = ["Sedan", "SUV", "Pickup Truck", "Mini Van"];
export const VEHICLE_TYPES_AS_OPTIONS = VEHICLE_TYPES.map((item) => ({
  label: item,
  value: item,
}));
