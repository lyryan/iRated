import React from "react";
import styles from "./index.module.css";
import StarRatings from "react-star-ratings";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default (props) => {
  const { rating, content, timestamp } = props.data;
  let submissionDate = new Date(timestamp);

  submissionDate = `${
    MONTHS[submissionDate.getMonth()]
  } ${submissionDate.getDate()}, ${submissionDate.getFullYear()}`;

  return (
    <div className={styles.container}>
      <span className={styles.top}>
        <StarRatings
          rating={rating}
          starRatedColor="orange"
          numberOfStars={5}
          starDimension={"20px"}
          starSpacing="0px"
        />
        <span>{submissionDate}</span>
      </span>

      <span className={styles.content}>{content}</span>
    </div>
  );
};
