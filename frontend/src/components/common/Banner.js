import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styles from "./../../styles/banner.module.scss";
import CloseButton from "./CloseButton";

const Banner = ({ message, type, visibility }) => {
  const [_visibility, _setVisibility] = useState(visibility);

  useEffect(() => {
    _setVisibility(visibility);
  }, [visibility, message]);

  const close = (e) => {
    e.stopPropagation();
    _setVisibility(false);
  };

  if (_visibility) {
    return (
      <motion.div
        positionTransition
        initial={{ opacity: 0, x: 0, scale: 1 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        className={`${styles.banner} ${styles[type]}`}
      >
        <CloseButton className={styles.close} onClick={close} />
        {message}
      </motion.div>
    );
  } else return <></>;
};

export default Banner;
