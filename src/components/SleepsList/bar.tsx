import { VFC } from "react";
import { Sleep } from "../../models/sleep";

import styles from './index.module.css';

const Bar: VFC<{ date: Date, sleeps: Sleep[] }> = ({ date, sleeps }) => {
  return (
  <div className={styles.bar}>
    {sleeps
      .filter(
        sleep =>
          date.getTime() <= sleep.endTime.getTime() &&
          sleep.startTime.getTime() <= date.getTime() + 86400000
      )
      .map(sleep => {
        const factor = 500 / (60 * 60 * 24 * 1000)
        const left =
          (sleep.startTime.getTime() - date.getTime()) * factor - 5 // 5 is borderRadius
        const width =
          (sleep.endTime.getTime() - sleep.startTime.getTime()) *
          factor +
          5 * 2 // 5 is borderRadius
        return (
          <div
            className={styles.barItem}
            key={sleep.startTime.getTime()}
            style={{
              left: (left | 0) + "px",
              width: (width | 0) + "px",
            }}
          ></div>
        )
      })}
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className={styles.division}
        style={{
          left: (((500 / 4) * (i + 1)) | 0) + "px",
        }}
      ></div>
    ))}
  </div>)
  
};

export default Bar;