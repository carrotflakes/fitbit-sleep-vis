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
        .map(key => (
          <div
            className={styles.row}
            key={key}
          >
            <div className={styles.date}>
              {key}
            </div>
            <Heatmap sleeps={sleeps.filter(sleep => keyFn(sleep.startTime) === key)} />
          </div>
        ))}
    </div>
  );
}

export default HeatmapList;
