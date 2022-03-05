import { VFC } from "react";
import { Sleep } from "../../models/sleep";
import Heatmap from "./heatmap";

import styles from './index.module.css';

const HeatmapList: VFC<{ sleeps: Sleep[], keyFn: (_: Date) => string }> = ({ sleeps, keyFn }) => {
  // TODO: データの端を考慮
  return (
    <div>
      {sleeps
        .map(sleep => keyFn(sleep.startTime))
        .filter((x, i, a) => a.indexOf(x) === i)
        .map(date => (
          <div
            className={styles.row}
            key={date}
          >
            <div className={styles.date}>
              {date}
            </div>
            <Heatmap sleeps={sleeps.filter(sleep => sleep.startDate.startsWith(date))} />
          </div>
        ))}
    </div>
  );
}

export default HeatmapList;
