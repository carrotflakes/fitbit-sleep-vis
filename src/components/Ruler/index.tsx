import { VFC } from "react";
import styles from './index.module.css';

const Ruler: VFC = () => {
  return (
    <div className={styles.bar}>
      {[...Array(24)].map((_, i) => (
        <div key={i} className={styles.scale}>
          {i}
        </div>
      ))}
      {[...Array(23)].map((_, i) => (
        <div
          key={i}
          className={styles.division}
          style={{
            left: (((100 / 24) * (i + 1)) | 0) + "%",
          }}
        ></div>
      ))}
    </div>
  );
}

export default Ruler;
