import React from "react";
import { useHistory } from "react-router-dom";

import styles from "./../styles/auth.module.scss";
import CloseButton from "./CloseButton";
import { CountrySide } from "./illustrations";

const AuthFormWrapper = ({ children }) => {
  const history = useHistory();
  return (
    <div className={styles.auth_container}>
      <div className={styles.calque}></div>
      <CloseButton onClick={() => history.push("/")} />
      {children}
      <div className={styles.illustrator}>
        <CountrySide />
      </div>
    </div>
  );
};

export default AuthFormWrapper;
