import MoveCategory from "@/models/Move/Category.model";
import { ValuesType } from "../forms/formUtils";
import MovePackage from "@/models/Move/Package";

export type MoveItemsResponseType = {
  data: {
    item_categories: MoveCategory[];
  };
};

export type MovePackagesResponseType = {
  data: {
    move_packages: MovePackage[];
  };
};

export type BookMoveRequestType = ValuesType;
export type BookMoveResponseType = {
  data: {
    move_data: {
      id: number;
    };
  };
};
