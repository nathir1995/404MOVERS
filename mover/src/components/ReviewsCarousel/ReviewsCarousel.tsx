import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import styles from "./ReviewsCarousel.module.scss";

const items = [
  {
    id: 1,
    name: "Mary",
    description:
      "It is very easy to use, efficient, and much more affordable than most other moving companies.",
  },
  {
    id: 2,
    name: "John",
    description:
      "404MOVERS is such a fast, easy and convenient service I have used them when I moved recently and I highly recommend this service to transport big items.",
  },
  {
    id: 3,
    name: "Linda",
    description:
      "The mover was very friendly and helped us a lot. They are fairly priced and highly recommend this service.",
  },
];

const ReviewsCarousel = () => {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showIndicators={false}
      showThumbs={false}
      showStatus={false}
      interval={5000}
      className={styles.container}
    >
      {items.map((item) => (
        <div className={styles.item} key={item.id}>
          <div className={styles.avatar}>
            <h5>{item.name.charAt(0)}</h5>
          </div>
          <div>
            <h5>{item.name}</h5>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ReviewsCarousel;
