import MoveItem from "./Item.model";

type MoveCategory = {
  id: number;
  name: string;
  items: MoveItem[];
};

export default MoveCategory;
