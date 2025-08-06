export type CommonRegisterMoverType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  password: string;
  password_confirmation: string;

  province: string;
  city: string;
  street: string;
  appartment_or_unit_number: string;
  postal_code: string;

  metropolitan_area: string;
  // t_shirt_size: string;
  moves_each_week: string;

  // hear_about_us: string;
  // why_great_mover: string;
};

export type DriverRegisterRequestType = CommonRegisterMoverType & {
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number | "";
  vehicle_type: string;
};

export type LaborRegisterRequestType = CommonRegisterMoverType & {
  able: 0 | 1;
};

export type MoverRegisterRequestType = CommonRegisterMoverType &
  DriverRegisterRequestType &
  LaborRegisterRequestType;
