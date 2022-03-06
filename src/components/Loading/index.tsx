import { VFC } from "react";

import styles from './index.module.css';

const Loading: VFC = () => {
  return (
    <div className={styles.container}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;
