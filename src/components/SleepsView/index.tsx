import { useState, VFC } from "react";
import { showDate } from "../../models/date";
import { Sleep } from "../../models/sleep";
import HeatmapList from "../HeatmapList";
import SleepsList from "../SleepsList";

import styles from "./index.module.css";

const SleepsView: VFC<{ sleeps: Sleep[] }> = ({ sleeps }) => {
  const [mode, setMode] = useState(0);
  
  if (sleeps.length === 0) {
    return <div>loading</div>
  }

  const weeklyKeyFn = (date: Date): string => {
    const base = new Date(sleeps[0].endDate.replace(/-/g, "/")).getTime()
    const weekDur = 1000 * 60 * 60 * 24 * 7;
    const time = ((date.getTime() - base) / weekDur | 0) * weekDur + base
    return showDate(new Date(time))
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
      {mode === 2 && <HeatmapList sleeps={sleeps} keyFn={date => showDate(date).slice(0, 7)} />}
      {mode === 3 && <HeatmapList sleeps={sleeps} keyFn={date => showDate(date).slice(0, 4)} />}
    </div>
  );
};

export default SleepsView;
