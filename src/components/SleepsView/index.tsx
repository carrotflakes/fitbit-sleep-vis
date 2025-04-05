import { useState, FC, useCallback } from "react";
import { showDate, showDateWithWeek } from "../../models/date";
import { Sleep } from "../../models/sleep";
import HeatmapList from "../HeatmapList";
import SleepsList from "../SleepsList";

import styles from "./index.module.css";

const WEEK_MS = 1000 * 60 * 60 * 24 * 7;

const SleepsView: FC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  const [mode, setMode] = useState(0);
  
  const baseTime = sleeps[0] ? new Date(showDate(sleeps[0].endTime).replace(/-/g, "/")).getTime() : 0;
  const weeklyKeyFn = useCallback((date: Date) => {
    const time = ((date.getTime() - baseTime) / WEEK_MS | 0) * WEEK_MS + baseTime
    return showDateWithWeek(new Date(time))
  }, [baseTime]);

  if (sleeps.length === 0) {
    return <div>loading</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.selector}>
        <div className={mode === 0 ? styles.selected : ""} onClick={() => setMode(0)}>Daily</div>
        <div className={mode === 1 ? styles.selected : ""} onClick={() => setMode(1)}>Weekly</div>
        <div className={mode === 2 ? styles.selected : ""} onClick={() => setMode(2)}>Monthly</div>
        <div className={mode === 3 ? styles.selected : ""} onClick={() => setMode(3)}>Yearly</div>
      </div>
      {mode === 0 && <SleepsList sleeps={sleeps} />}
      {mode === 1 && <HeatmapList sleeps={sleeps} keyFn={weeklyKeyFn} />}
      {mode === 2 && <HeatmapList sleeps={sleeps} keyFn={monthlyKeyFn} />}
      {mode === 3 && <HeatmapList sleeps={sleeps} keyFn={yearlyKeyFn} />}
    </div>
  );
};

export default SleepsView;

function monthlyKeyFn(date: Date) {
  return showDate(date).slice(0, 7);
}

function yearlyKeyFn(date: Date) {
  return showDate(date).slice(0, 4);
}
