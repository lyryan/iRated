import React from "react";
import styles from "./index.module.css";
import Background from "../assets/images/classroom-background.png";

const Home = () => {
  return (
    <div>
      <img src={Background} />
      <div className={styles.slogan}>Real professors, real reviews.</div>
    </div>
  );
};

export default Home;
