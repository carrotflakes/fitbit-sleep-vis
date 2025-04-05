import { FC, useMemo } from "react";
import { showDateWithWeek } from "../../models/date";
import { Sleep } from "../../models/sleep";
import Ruler from "../Ruler";
import Bar from "./bar";

import styles from './index.module.css';

const SleepsList: FC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  const dates = useMemo(() =>
    sleeps
      .flatMap(sleep => [sleep.endDateStr, sleep.startDateStr])
      .filter((x, i, a) => a.indexOf(x) === i)
      .map(date => new Date(date.replace(/-/g, "/"))),
  [sleeps]);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div
          className={styles.rulerRow}
          key={1}
        >
          <div className={styles.date}></div>
          <Ruler />
        </div>
        {dates
          .map(date => (
            <div
              className={styles.row}
              key={date.getTime()}
            >
              <div className={styles.date}>
                {showDateWithWeek(date)}
              </div>
              <Bar date={date} sleeps={sleeps} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SleepsList;
