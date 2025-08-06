import Address from "./Address";
import Vehicle from "./Vehicle";

export default interface Driver {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;

  address: Address;
  vehicle: Vehicle;
}
