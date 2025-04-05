import { FC } from "react";
import { Sleep } from "../../models/sleep";

import styles from './index.module.css';

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

const Bar: FC<{ date: Date, sleeps: Sleep[] }> = ({ date, sleeps }) => {
  return (
    <div className={styles.bar}>
      {sleeps
        .filter(
          sleep =>
            date.getTime() <= sleep.endTime.getTime() &&
            sleep.startTime.getTime() <= date.getTime() + ONE_DAY_MS
        )
        .map(sleep => {
          const factor = 100 / ONE_DAY_MS
          const left =
            (sleep.startTime.getTime() - date.getTime()) * factor
          const width =
            (sleep.endTime.getTime() - sleep.startTime.getTime()) *
            factor
          return (
            <div
              className={styles.barItem}
              key={sleep.startTime.getTime()}
              style={{
                left: (left | 0) + "%",
                width: (width | 0) + "%",
              }}
            ></div>
          )
        })}
      {[...Array(23)].map((_, i) => (
        <div
          key={i}
          className={styles.division}
          style={{
            left: (((100 / 24) * (i + 1)) | 0) + "%",
          }}
        ></div>
      ))}
      {/* {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={styles.division}
          style={{
            left: (((100 / 24) * (i * 2 + 1)) | 0) + "%",
            width: (100 / 24) + "%",
          }}
        ></div>
      ))} */}
    </div>)

};

export default Bar;
