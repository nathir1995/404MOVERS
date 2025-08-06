import { MOVE_STATUS_ENUM } from "@/constants/move_status";
import MoveCategory from "./Category.model";
import MoveItem from "./Item.model";
import { User } from "@/features/auth/utils/AuthContextType";
import MovePackage from "./Package";

type ItemType = MoveItem & {
  item_category: MoveCategory;
  pivot: {
    quantity: number;
  };
};

export type Mover = User & {
  pivot: {
    is_started: boolean;
    started_at: string | null;
    confirm_started: boolean;
    confirm_started_at: string | null;

    is_finished: boolean;
    finished_at: string | null;
    confirm_finished: boolean;
    confirm_finished_at: string | null;
  };
};

type Move = {
  id: number;
  created_at: string;

  move_package: MovePackage;

  move_status: {
    key: MOVE_STATUS_ENUM;
  };

  items: ItemType[];

  start_point_name: string;
  start_lat: string;
  start_lang: string;
  start_building_number: string;
  start_apartment_number: string | null;

  end_point_name: string;
  end_lat: string;
  end_lang: string;
  end_building_number: string;
  end_apartment_number: string | null;

  move_date_time: string;
  number_of_drivers: number;
  number_of_labors: number;
  instruction: string | null;

  expected_price: number;
  movers?: Mover[];
  remaining_number_of_drivers?: number;
  remaining_number_of_labors?: number;
};
export default Move;
