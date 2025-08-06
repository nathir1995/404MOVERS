import React from "react";
import { Badge } from "reactstrap";
import {
  mapValueToLabel,
  PRODUCT_TYPE,
} from "constants/products/product_types";

export const color = {
  [PRODUCT_TYPE.STORABLE]: "primary",
  [PRODUCT_TYPE.SERVICE]: "success",
  [PRODUCT_TYPE.RENTABLE]: "warning",
};

const ProductTypebadge = ({ product_type_name, ...props }) => {
  if (!product_type_name) return null;
  return (
    <Badge color={color[product_type_name]} {...props}>
      {mapValueToLabel(product_type_name)}
    </Badge>
  );
};

export default ProductTypebadge;
