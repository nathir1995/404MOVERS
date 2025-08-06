import React from "react";
import { Rating } from "react-simple-star-rating";

const StarsRating = ({
  onClick,
  iconsCount = 5,
  initialValue = 0,
  ...props
}) => {
  // const fraction = 100 / iconsCount;

  return (
    <Rating
      iconsCount={iconsCount}
      size={32}
      initialValue={initialValue}
      onClick={(newRating) => onClick?.(newRating)}
      allowFraction
      {...props}
    />
  );
};

export default StarsRating;
