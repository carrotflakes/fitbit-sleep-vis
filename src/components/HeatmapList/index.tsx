import { FC, useMemo } from "react";
import { Sleep } from "../../models/sleep";
import Ruler from "../Ruler";
import Heatmap from "./heatmap";

import styles from './index.module.css';

const HeatmapList: FC<{ sleeps: Sleep[], keyFn: (_: Date) => string }> = ({ sleeps, keyFn }) => {
  const groups: Sleep[][] = useMemo(() => {
    const result: Sleep[][] = [[]];
    let key = keyFn(sleeps[0].startTime);
    for (const sleep of sleeps) {
      if (key !== keyFn(sleep.startTime)) {
        result.push([]);
        key = keyFn(sleep.startTime);
      }
      result[result.length - 1].push(sleep);
    }
    return result;
  }, [sleeps, keyFn]);
  
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
