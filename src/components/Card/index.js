import React from "react";
import styles from "./index.module.css";
import StarRatings from "react-star-ratings";

export default (props) => {
  const { rating, content, timestamp } = props.data;
  return (
    <div className={styles.container}>
      <span className={styles.top}>
        <StarRatings
          rating={rating}
          starRatedColor="orange"
          numberOfStars={5}
          starDimension={"20px"}
          starSpacing='0px'
        />
        <span>{timestamp}</span>
      </span>

      <span className={styles.content}>{content}</span>
    </div>
  );
};
