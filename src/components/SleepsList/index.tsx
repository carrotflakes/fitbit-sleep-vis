import { VFC } from "react";
import { showDate } from "../../models/date";
import { Sleep } from "../../models/sleep";
import Bar from "./bar";

import styles from './index.module.css';

const SleepsList: VFC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  return (
    <div className={styles.container}>
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
  );
}

export default SleepsList;
