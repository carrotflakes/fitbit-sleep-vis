import { VFC } from "react";
import { Sleep } from "../../models/sleep";
import Ruler from "../Ruler";
import Heatmap from "./heatmap";

import styles from './index.module.css';

const HeatmapList: VFC<{ sleeps: Sleep[], keyFn: (_: Date) => string }> = ({ sleeps, keyFn }) => {
  // TODO: データの端を考慮
  const groups: Sleep[][] = [[]];
  let key = keyFn(sleeps[0].startTime);
  for (const sleep of sleeps) {
    if (key !== keyFn(sleep.startTime)) {
      groups.push([]);
      key = keyFn(sleep.startTime);
    }
    groups[groups.length - 1].push(sleep);
  }
  
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
        {groups.map(sleeps => {
          const key = keyFn(sleeps[0].startTime);
          return (
            <div
              className={styles.row}
              key={key}
            >
              <div className={styles.date}>
                {key}
              </div>
              <div className={styles.bar}>
                <Heatmap sleeps={sleeps} />
              </div>
            </div>
          )
        })
        }
      </div>
    </div>
  );
}

export default HeatmapList;
