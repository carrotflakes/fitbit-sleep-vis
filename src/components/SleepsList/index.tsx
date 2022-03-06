import { VFC } from "react";
import { showDate } from "../../models/date";
import { Sleep } from "../../models/sleep";
import Scale from "../Scale";
import Bar from "./bar";

import styles from './index.module.css';

const SleepsList: VFC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  return (
    <div className={styles.container}>
      <div className={styles.list}>
        <div
          className={styles.scaleRow}
          key={1}
        >
          <div className={styles.date}></div>
          <Scale />
        </div>
        {sleeps
          .flatMap(sleep => [sleep.endDate, sleep.startDate])
          .filter((x, i, a) => a.indexOf(x) === i)
          .map(date => new Date(date + " "))
          .map(date => (
            <div
              className={styles.row}
              key={date.getTime()}
            >
              <div className={styles.date}>
                {showDate(date)}
              </div>
              <Bar date={date} sleeps={sleeps} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default SleepsList;
