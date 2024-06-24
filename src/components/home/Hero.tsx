import Image from "next/image";
import React from "react";
import { TiTick } from "react-icons/ti";
import cloudImage from "../../../public/cloud-hosting.png";
import styles from "./hero.module.css";

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroLeft}>
        <h1 className={styles.title}>kareem</h1>
        <p className={styles.desc}>
          the best web hosting solution for your online success
        </p>
        <div className={styles.services}>
          <div className={styles.serviceItem}>
            <TiTick /> easy to use control panel
          </div>
          <div className={styles.serviceItem}>
            <TiTick /> secure hosting
          </div>
          <div className={styles.serviceItem}>
            <TiTick /> website maintenance
          </div>
        </div>
      </div>
      <div className="">
        <Image src={cloudImage} alt="cloud" width={500} height={500} />
      </div>
    </div>
  );
};

export default Hero;